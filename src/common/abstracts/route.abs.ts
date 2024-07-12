import { Router } from "express";

export abstract class Route {
  ROUTER: Router;
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