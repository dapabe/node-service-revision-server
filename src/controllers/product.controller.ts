import { Controller } from "#/common/abstracts/controller.abs";
import express from "express"

export class ProductController extends Controller {
  constructor(req: express.Request, res: express.Response){
    super(req,res)
  }

  async increaseDownloadCount(){
    // await this.CONN
    //   .from("Downloads")
    //   .update("count")
  }
  
}