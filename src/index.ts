import { App } from "./App";
import { DefaultEnv } from "./common/env";

new App()
  .start()
  .then(server=>{
    server.listen(DefaultEnv.PORT);
    server.on("error", (error: any) => {
        if (error.syscall !== "listen") {
          console.log(error)
        }
        switch (error.code) {
            case "EACCES":
                console.error("Port requires elevated privileges");
            case "EADDRINUSE":
                console.error("Port is already in use");
            default:
                console.log(error)
        }
        return process.exit(1)
    });
    server.on("listening",()=>{
      console.log(`Server started in localhost:${DefaultEnv.PORT}, PID:${process.pid}`)
    })
  })