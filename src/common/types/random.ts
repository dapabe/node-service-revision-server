import type express from "express";

export type IExpressParams = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => void;
