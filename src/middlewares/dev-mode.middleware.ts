import { DefaultEnv } from "#/common/env";
import { IExpressParams } from "#/common/types/random";


export const DevModeMiddleware: IExpressParams = (_, res, next)=> {
  if(!DefaultEnv.DEV_MODE) return res.sendStatus(404)
  return next()
}