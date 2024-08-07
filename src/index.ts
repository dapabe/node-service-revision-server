import { z } from "zod";
import { App } from "./App";
import { Database } from "./database/Database";
import { AppRoutes } from "./Router";

Database.startConnection()

const EnvSchema = z.object({
	stage: z.enum(["development", "production", "backoffice"]).default("development"),
	sv_host: z.string().default("localhost"),
	sv_port: z.coerce.number().default(3000),
	db_url: z.string().url(),
	db_master_token: z.string(),
	db_common_token: z.string(),
}).safeParse({
	stage: process.env.NODE_ENV,
	sv_host: process.env.SERVER_HOST,
	sv_port: process.env.SERVER_PORT,
	db_url: process.env.DB_URL,
	db_master_token: process.env.DB_MASTER_TOKEN,
	db_common_token: process.env.DB_COMMON_TOKEN
})

if (EnvSchema.error) {
	console.log(EnvSchema.error.errors)
	process.exit(1)
}

export const TypedEnv = EnvSchema.data


const server = await new App({
	/**
	 * 	If the provider in which the app is deployed cant access
	 * 	server files, ex: Free tier doesnt allow access, just log
	 * 	incoming requests.
	 */
	loggerPath: TypedEnv.stage === "development" ? "dist" : undefined,
	appRoutes: AppRoutes
}).start()

server.listen(TypedEnv.sv_port, TypedEnv.sv_host);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
server.on("error", (error: any) => {
	if (error.syscall !== "listen") {
		console.log(error);
	}
	switch (error.code) {
		case "EACCES":
			console.error("Port requires elevated privileges");
			break;
		case "EADDRINUSE":
			console.error("Port is already in use");
			setTimeout(() => {
				server.close();
				server.listen(TypedEnv.sv_port, TypedEnv.sv_host);
			}, 1000);
			break;
		default:
			console.log(error);
	}
	return process.exit(1);
});

server.on("listening", () => {
	console.log(
		`Server started in http://${TypedEnv.sv_host}:${TypedEnv.sv_port}, Process ID:${process.pid}`,
	);
});

