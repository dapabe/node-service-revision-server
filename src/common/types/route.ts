import { RequestHandler, Router } from "express";
import { Route } from "../abstracts/route.abs";

export type IRoutePath = `/${string}`;

export type IAppRoute = {
	/**
	 *  Route level middlewares.
	 */
	middlewares: RequestHandler[];
	route: Route;
};
