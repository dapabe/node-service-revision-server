import { App } from "#/App";
import type e from "express";
import { CustomSupabaseError } from "../errors/CustomSupabase.error";

/**
 *  Base Controller to acces and manipulate Supabase \
 *  data.
 */
export abstract class Controller {
	protected req: e.Request;
	protected res: e.Response;
	protected next: e.NextFunction;

	protected CONN = App.SUPA;

	constructor(req: e.Request, res: e.Response, next: e.NextFunction) {
		this.req = req;
		this.res = res;
		this.next = next
	}

	protected async handleRequestError(unk: unknown): Promise<e.Response> {
		if (unk instanceof CustomSupabaseError) {
			return this.res
				.status(unk.status)
				.send({ error: unk.statusText, message: unk.data.details });
		}

		return this.res.status(501).json({ error: "Unhandled error", message: JSON.stringify(unk) })
	}
}
