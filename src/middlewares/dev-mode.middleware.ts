import { DefaultEnv } from "#/common/env";
import type { IExpressParams } from "#/common/types/random";

export const DevModeMiddleware: IExpressParams = (_, res, next) => {
	if (!DefaultEnv.DEV_MODE) return res.status(404).send();
	return next();
};
