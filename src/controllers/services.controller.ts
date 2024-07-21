import { Controller } from "#/common/abstracts/controller.abs";
import { CustomSupabaseError } from "#/common/errors/CustomSupabase.error";
import type e from "express";

export class ServicesController extends Controller {

	async all(): Promise<e.Response> {
		try {
			const res = await this.CONN
				.from("servicios_en_revision")
				.select("service_name, on_revision");

			if (res.error) throw new CustomSupabaseError(res.status, res.statusText, res.error)

			const record = {};
			for (const { service_name, on_revision } of res.data!) {
				record[service_name] = on_revision;
			}

			return this.res.status(res.status).json(record);
		} catch (error) {
			return await this.handleRequestError(error)
		}
	}

	async toggleStatus(): Promise<e.Response> {
		const toggleQ = this.req.query.toggle as string;
		try {
			/**
			 *  On selected services toggle current boolean value.
			*/
			const res1 = await this.CONN.from("servicios_en_revision")
				.select("service_name, on_revision")
				.in("service_name", toggleQ.split(","))

			if (res1.error) throw new CustomSupabaseError(res1.status, res1.statusText, res1.error)

			const updates = res1.data!.map((x) => ({
				service_name: x.service_name,
				on_revision: !x.on_revision,
			}));

			const res2 = await this.CONN
				.from("servicios_en_revision")
				.upsert(updates);

			if (res2.error) throw new CustomSupabaseError(res2.status, res2.statusText, res2.error)

			return this.res.status(res2.status).json(res2.statusText);
		} catch (error) {
			return await this.handleRequestError(error)
		}
	}

	async add(): Promise<e.Response> {
		try {
			const res = await this.CONN
				.from("servicios_en_revision")
				.insert(this.req.body);

			if (res.error) throw new CustomSupabaseError(res.status, res.statusText, res.error)

			return this.res.status(res.status).json(res.statusText);
		} catch (error) {
			return await this.handleRequestError(error)
		}
	}

	async delete(): Promise<e.Response> {
		const namesQ = this.req.query.names as string;
		try {
			const res = await this.CONN.from("servicios_en_revision")
				.delete()
				.in("service_name", namesQ.split(","));

			if (res.error) throw new CustomSupabaseError(res.status, res.statusText, res.error)

			return this.res.status(res.status).json(res.statusText);
		} catch (error) {
			return await this.handleRequestError(error)
		}
	}
}
