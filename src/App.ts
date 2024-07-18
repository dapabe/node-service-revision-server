import { createClient } from "@supabase/supabase-js";
import express, { Router } from "express";
import * as http from "node:http";
import { AppRoutes } from "./Router";
import { DefaultEnv } from "./common/env";
import type { Database } from "./common/types/supabase";
import type { DatabaseClient } from "./common/types/random";
import logger from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export class App {
	readonly #EXP = express();
	readonly #SERVER = http.createServer(this.#EXP);
	static #SUPA_CONN: DatabaseClient;
	/**
	 *  Database connection
	 */
	static get SUPA(): DatabaseClient {
		return App.#SUPA_CONN;
	}

	/**
	 *  Start server
	 */
	async start(port: number): Promise<http.Server> {
		await this.getConnection();
		this.#configureExpress();
		this.#configureRouter();

		this.#SERVER.listen(port)

		return this.#SERVER;
	}

	/**
	 *  Database connection
	 */
	async getConnection(): Promise<void> {
		App.#SUPA_CONN = createClient<Database>(
			DefaultEnv.SUPA_REST_URL,
			DefaultEnv.SUPA_KEY,
			{
				db: {
					schema: "pago_mis_servicios",
				},
			},
		);
	}

	/**
	 * Config express middlewares
	 */
	#configureExpress(): void {
		this.#EXP.use(logger("combined"));
		this.#EXP.use(express.json());
		this.#EXP.use(express.urlencoded({ extended: true }));
		//  Protection middlewares
		this.#EXP.use(
			rateLimit({
				windowMs: 60_000,
				limit: 40,
				standardHeaders: true,
			}),
		);
		this.#EXP.use(helmet());
		this.#EXP.use((_, res, next): void => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header(
				"Access-Control-Allow-Headers",
				"X-Requested-With, Content-Type",
			);
			res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
			next();
		});
	}

	#configureRouter(): void {
		this.#EXP.use(
			"/ping",
			Router().get("/", (_, res) => res.sendStatus(204)),
		);

		for (const [version, routes] of Object.entries(AppRoutes)) {
			for (const config of routes) {
				this.#EXP.use(
					`/api${version}${config.route.BASE_ROUTE_NAME}`,
					...config.middlewares,
					config.route.ROUTER,
				);
			}
		}

		this.#EXP.use((_, res, next): void => {
			res.status(404);
			res.json({
				error: "Not found",
			});
			next();
		});
	}
}
