import type { IAppRoute } from "./route";

export type VersionedAPI = "v1";

export type IAppInitConfig = {
  /**
   *  If not defined server will only log to the console, else \
   *  will save all incoming request to `{desiredPath}/server.log`, \
   *  relative to app directory.
   *
   *  @default undefined
   */
  loggerPath?: string;
  appRoutes: Record<VersionedAPI, IAppRoute[]>;
};
