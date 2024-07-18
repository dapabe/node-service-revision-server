import { IExpressParams } from "#/common/types/random";
import { z } from "zod";


export const BodyValidator = (zodType: z.ZodFirstPartySchemaTypes): IExpressParams => (req, res, next) => {
  const zRes = zodType.safeParse(req.body)
  if (zRes.error) {
    const errs = zRes.error.errors.map(x => ({ [x.path[1]]: x.message }))
    return res.status(400).send({ error: errs })
  } else {
    req.body = zRes.data
    next()
  }
}