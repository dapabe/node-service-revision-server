import { App } from "./App";
import { DefaultEnv } from "./common/env";

new App()
  .start()
  .then(server=>{
    server.listen(DefaultEnv.PORT);
    server.on("error", (error: any) => {
        if (error.syscall !== "listen") {
            throw error;
        }
        switch (error.code) {
            case "EACCES":
                console.error("Port requires elevated privileges");
                return process.exit(1);
            case "EADDRINUSE":
                console.error("Port is already in use");
                return process.exit(1);
            default:
                throw error;
        }
    });
    server.on("listening",()=>{
      console.log(`Server started in localhost:${DefaultEnv.PORT}, PID:${process.pid}`)
    })
  })