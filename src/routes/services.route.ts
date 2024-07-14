import { Route } from "#/common/abstracts/route.abs";
import { IRoutePath } from "#/common/types/route";
import { ServicesController } from "#/controllers/services.controller";

export class ServicesRoute extends Route {
  constructor() {
    super(ServicesController)
    this.BASE_ROUTE_NAME = "/services"
    this.ROUTER
      .get("/statuses", this.handler(ServicesController.prototype.all));
  }
}