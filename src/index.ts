import { App } from "./App";
import { Database } from "./database/Database";

Database.connect()
Database.populateDatabase()

const server = await new App({
	/**
	 * 	If the provider in which the app is deployed cant access
	 * 	server files, ex: Free tier doesnt allow access, just log
	 * 	incoming requests.
	 */
	loggerPath: process.env.NODE_ENV === "development" ? "dist" : undefined
}).start()

server.listen(process.env.SERVER_HOST, Number.parseInt(process.env.SERVER_PORT));

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
			break;
		default:
			console.log(error);
	}
	return process.exit(1);
});

server.on("listening", () => {
	console.log(
		`Server started in http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}, Process ID:${process.pid}`,
	);
});

