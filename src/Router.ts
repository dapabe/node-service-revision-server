import { IAppRoute } from "./common/types/route";
import { ServicesOnRevisionRoute } from "./routes/service-on-revision.route";

export type VersionedAPI = "v1"

export const AppRoutes: Record<VersionedAPI, IAppRoute[]>= {
  "v1": [
    {
      path: "services",
      middlewares: [],
      router: new ServicesOnRevisionRoute().ROUTER
    }
  ]
};