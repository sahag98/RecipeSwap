import "server-only";
import { Inter } from "next/font/google";
import SupabaseListener from "../components/supabase-listener";
import SupabaseProvider from "../components/supabase-provider";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { createServerClient } from "../utils/supabase-server";
import NextTopLoader from "nextjs-toploader";
import type { Database } from "@/types/supabase-types";
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export type TypedSupabaseClient = SupabaseClient<Database>;
const inter = Inter({ subsets: ["latin"] });
// do not cache this layout
export const revalidate = 0;

export const metadata = {
  title: "RecipeSwap",
  description: "Swap recipes with people all around the world.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: avatar } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", session?.user.id);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={inter.className}>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />

          <NextTopLoader color="#E0777D" showSpinner={false} />
          <div className="lg:px-64 relative">
            <Navbar avatar={avatar} />
          </div>
          <div className="lg:px-64 relative px-4">{children}</div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
