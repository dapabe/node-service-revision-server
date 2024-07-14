import { createClient, SupabaseClient } from "@supabase/supabase-js";
import express from "express";
import * as http from "http"
import { AppRoutes } from "./Router";
import { DefaultEnv } from "./common/env";
import { Database } from "./common/types/supabase";
import { DatabaseClient } from "./common/types/random";

export class App {
  readonly #EXP = express();
  readonly #SERVER = http.createServer(this.#EXP);
  static #SUPA_CONN: DatabaseClient
  /**
   *  Database connection
   */
  static get SUPA(): DatabaseClient {
    return App.#SUPA_CONN
  }

  /**
   *  Start server
   */
  async start(): Promise<http.Server> {
    await this.getConnection()
    this.#configureExpress();
    this.#configureRouter();
    return this.#SERVER
  }

  /**
   *  Database connection
   */
  async getConnection(): Promise<void> {
    App.#SUPA_CONN = createClient<Database>(DefaultEnv.SUPA_REST_URL, DefaultEnv.SUPA_KEY, {
      db:{
        schema: "pago_mis_servicios"
      },
    })
  }

  /**
  * Config express middlewares
  */
  #configureExpress(): void {
    // this.#EXP.use(logger('dev'));
    // this.#EXP.use(express.json());
    this.#EXP.use(express.urlencoded({ extended: false }));
    this.#EXP.use((_, res, next): void => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
        res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
        next();
    });
    //this.app.use(cookieParser());
  }

  #configureRouter(): void {
    this.#EXP.use("/ping",(_,res)=>{
      res.sendStatus(204)
    })

    for(const [version, routes] of Object.entries(AppRoutes)) {
      for (const config of routes) {
        this.#EXP.use(
        `/api${version}${config.route.BASE_ROUTE_NAME}`,
        ...config.middlewares, 
        config.route.ROUTER
        )
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