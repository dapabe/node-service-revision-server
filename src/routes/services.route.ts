import { Route } from "#/common/abstracts/route.abs";
import { ServicesController } from "#/controllers/services.controller";
import { DevModeMiddleware } from "#/middlewares/dev-mode.middleware";
import { BodyValidator } from "#/validators/body.validator";
import { QueryValidator } from "#/validators/query.validator";
import { z } from "zod";

export class ServicesRoute extends Route {
	constructor() {
		super(ServicesController);
		this.BASE_ROUTE_NAME = "/services";
		this.ROUTER.post(
			"/",
			DevModeMiddleware,
			BodyValidator(
				z
					.object({
						service_name: z.string().min(1),
						on_revision: z.boolean().default(true),
					})
					.array(),
			),
			this.handler(ServicesController.prototype.add),
		)
			.delete(
				"/",
				DevModeMiddleware,
				QueryValidator({
					names: z.string(),
				}),
				this.handler(ServicesController.prototype.delete),
			)
			.get("/statuses", this.handler(ServicesController.prototype.all))
			.post(
				"/statuses",
				DevModeMiddleware,
				QueryValidator({
					toggle: z.string(),
				}),
				this.handler(ServicesController.prototype.toggleStatus),
			);
	}
}
