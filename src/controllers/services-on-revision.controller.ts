import * as express from "express"
import { Controller } from "#/common/abstracts/controller.abs";

export class ServicesOnRevisionController extends Controller {
  constructor(req: express.Request, res: express.Response){
    super(req,res)
  }

  async all(){
    const res = await this.CONN
      .from("pago_mis_servicios")
      .select("*");

    if(res.error) return this.res
      .status(res.status)
      .send({error: res.error.message});

    let record = {}
    for (const {service_name, on_revision} of res.data) {
      record[service_name] = on_revision
    }

    return this.res.status(200).send(record)
  }
}