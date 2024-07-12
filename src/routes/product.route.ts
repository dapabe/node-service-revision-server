import { Route } from "#/common/abstracts/route.abs";
import { ProductController } from "#/controllers/product.controller";

export class ProductRoute extends Route {
  constructor(){
    super(ProductController)
    this.ROUTER
      .put("/", this.handler(ProductController.prototype.increaseDownloadCount))
  }
}