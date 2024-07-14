import { RequestHandler, Router } from "express";

export type IAppRoute = {
  path: string;
  middlewares: RequestHandler[];
  router: Router
}