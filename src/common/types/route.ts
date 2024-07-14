import { RequestHandler, Router } from "express";
import { Route } from "../abstracts/route.abs";

export type IRoutePath = `/${string}`

export type IAppRoute = {
  middlewares: RequestHandler[];
  route: Route
}