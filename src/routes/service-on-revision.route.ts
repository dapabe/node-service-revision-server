import { Route } from "#/common/abstracts/route.abs";
import { ServicesOnRevisionController } from "#/controllers/services-on-revision.controller";

export class ServicesOnRevisionRoute extends Route {
  constructor() {
    super(ServicesOnRevisionController)
    this.ROUTER
      .get("/", this.handler(ServicesOnRevisionController.prototype.all));
  }
}