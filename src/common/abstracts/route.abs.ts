import { Router } from "express";
import { IRoutePath } from "../types/route";
import { Controller } from "./controller.abs";

/**
 *  Base route layer to access and trigger \
 *  controller methods.
 */
export abstract class Route {
  public ROUTER: Router;
  public BASE_ROUTE_NAME!: IRoutePath;
  #CONTROLLER: any

  constructor(controller: typeof Controller){
    this.#CONTROLLER = controller;
    this.ROUTER = Router()
  }

  /**
   * Passing down the method to controller.
   */
  protected handler(action: () => void): any {
    return (req: Request, res: Response) => action.call(new this.#CONTROLLER(req, res));
  }
}