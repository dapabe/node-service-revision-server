import type { PostgrestError } from "@supabase/supabase-js";
import { CustomExpressError } from "./CustomExpress.error";

export class CustomSupabaseError extends CustomExpressError<PostgrestError> { }
