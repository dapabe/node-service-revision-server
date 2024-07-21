import { App } from "#/App";
import type e from "express";
import msgpack from "@msgpack/msgpack"

/**
 *  Base Controller to access and manipulate Supabase \
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

	protected convertBinary(data: unknown): Buffer {
		const enc = msgpack.encode(data)
		return Buffer.from(enc.buffer, enc.byteOffset, enc.byteLength)
	}

	/**
	 * 	Used to test
	 */
	// protected decodeBinary(buf: Buffer): unknown {
	// 	return msgpack.decode(buf)
	// }
}
