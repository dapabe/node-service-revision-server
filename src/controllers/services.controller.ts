import * as express from "express"
import { Controller } from "#/common/abstracts/controller.abs";

export class ServicesController extends Controller {
  constructor(req: express.Request, res: express.Response){
    super(req,res)
  }

  async all(){
    const res = await this.CONN
      .from("servicios_en_revision")
      .select("*");

    if(res.error) return this.res
      .status(res.status)
      .send({error: res.error.message});

    let record = {}
    for (const {service_name, on_revision, deleted_at} of res.data) {
      if(!deleted_at) record[service_name] = on_revision
    }

    return this.res.status(200).send(record)
  }
}