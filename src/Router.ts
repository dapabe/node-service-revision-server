import { IAppRoute } from "./common/types/route";
import { ProductRoute } from "./routes/product.route";
import { ServicesOnRevisionRoute } from "./routes/service-on-revision.route";

export type VersionedAPI = "v1"

export const AppRoutes: Record<VersionedAPI, IAppRoute[]>= {
  "v1": [
    {
      path: "services-statuses",
      middlewares: [],
      router: new ServicesOnRevisionRoute().ROUTER
    },
    {
      path: "increase-download-count",
      middlewares: [],
      router: new ProductRoute().ROUTER
    }
  ]
};