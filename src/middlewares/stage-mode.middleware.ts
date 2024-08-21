import type { IExpressParams } from "#/common/types/random";
import { TypedEnv } from "..";

export const StageModeMiddleware = (...stages: (typeof TypedEnv.stage)[]): IExpressParams => (_, res, next) => {
	console.log(stages, TypedEnv.stage)
	if (stages.some(x => TypedEnv.stage === x)) return next();
	return res.status(404).send();
};
