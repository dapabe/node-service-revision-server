import type { IAppInitConfig } from "./common/types/app-flags";
import { ServicesRoute } from "./routes/services.route";

export const AppRoutes: IAppInitConfig["appRoutes"] = {
	"v1": [
		{
			middlewares: [],
			route: new ServicesRoute(),
		},
	],
};
