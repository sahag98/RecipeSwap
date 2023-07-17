import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { Database } from "@/types/supabase-types";

export const createServerClient = () =>
  createServerComponentClient<Database>({
    cookies,
  });
