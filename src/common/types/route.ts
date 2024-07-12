import { SupabaseClient } from "@supabase/supabase-js";
import { RequestHandler, Router } from "express";
import { DatabaseClient } from "./supabase";

export type IAppRoute = {
  path: string;
  middlewares: RequestHandler[];
  router: Router
}