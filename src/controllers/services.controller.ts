import { Controller } from "#/common/abstracts/controller.abs";
import { Tables, TablesInsert } from "#/common/types/supabase";
import e from "express";

export class ServicesController extends Controller {
  constructor(req: e.Request, res: e.Response){
    super(req,res)
  }

  async all(): Promise<e.Response> {
    const res = await this.CONN
      .from("servicios_en_revision")
      .select("service_name, on_revision");

    this.handleSupaError(res)

    let record = {}
    for (const {service_name, on_revision} of res.data!) {
      record[service_name] = on_revision
    }

    return this.res.send(record)
  }

  async toggleStatus(): Promise<e.Response> {
    const toggleQ = this.req.query["toggle"] as string;

    /**
     *  On said services toggle current boolean value.
     */
    const res1 = await this.CONN
      .from("servicios_en_revision")  
      .select("service_name, on_revision")
      .in("service_name", toggleQ.split(","))

    this.handleSupaError(res1)

    const updates = res1.data!
      .map(x=>({ service_name: x.service_name, on_revision: !x.on_revision}))
    
    const res2 = await this.CONN
      .from("servicios_en_revision")
      .upsert(updates)

    this.handleSupaError(res2)

    return this.res.sendStatus(200)
  }

  async add(): Promise<e.Response> {
    const res = await this.CONN
      .from("servicios_en_revision")
      .insert(this.req.body as any)
    
    this.handleSupaError(res)

    return this.res.status(res.status).send(res.statusText)
  }

  async delete(): Promise<e.Response> {
    const namesQ = this.req.query["names"] as string
    const res = await this.CONN
      .from("servicios_en_revision")
      .delete()
      .in("service_name", namesQ.split(","))
    
    this.handleSupaError(res)

    return this.res.status(res.status).send(res.statusText)
  }
}