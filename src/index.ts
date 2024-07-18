import { App } from "./App";
import { DefaultEnv } from "./common/env";

const server = await new App().start(DefaultEnv.PORT)

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
		`Server started in http://localhost:${DefaultEnv.PORT}, Proccess ID:${process.pid}`,
	);
});
