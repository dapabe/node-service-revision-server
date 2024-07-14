import { Router } from "express";
import { IRoutePath } from "../types/route";

export abstract class Route {
  public ROUTER: Router;
  public BASE_ROUTE_NAME!: IRoutePath;
  #CONTROLLER: any

  constructor(controller: any){
    this.#CONTROLLER = controller;
    this.ROUTER = Router()
  }

  /**
   * Passing down the method to controller.
   */
  protected handler(action: () => void): any{
    return (req: Request, res: Response) => action.call(new this.#CONTROLLER(req, res));
  }
}