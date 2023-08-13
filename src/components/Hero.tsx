import { createServerClient } from "@/utils/supabase-server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Button } from "./ui/button";

const Hero = async () => {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="flex bg-th-background w-full items-center h-full justify-center flex-col gap-3">
      <div className="mb-12 rounded-full flex flex-col justify-center items-center gap-2">
        <Image
          src="/undraw_cooking_p7m1.svg"
          alt="hero img"
          width={200}
          height={200}
          className="mb-2"
        />
        <h1 className="lg:text-6xl text-4xl font-bold bg-gradient-to-r from-sky-300 to-red-400 bg-clip-text text-transparent tracking-wider">
          RecipeSwap
        </h1>
        <p className="text-lg text-center mb-2">
          <span className="text-secondary font-medium">Share </span>
          and <span className="text-secondary font-medium"> Explore </span>
          Delightful Recipes.
        </p>
        <section className="flex items-center justify-center w-full gap-3">
          <Link className="  flex items-center justify-center" href="/recipes">
            <Button
              data-cy="started"
              size={"lg"}
              className=" text-lg text-accent-foreground "
            >
              Get Started
            </Button>
            {/* <button className=" bg-accent border border-accent w-full shadow-lg mt-1 font-medium text-white px-4 py-3  rounded-md hover:bg-accent/80 transition">
              Get Started
            </button> */}
          </Link>
          {session?.user && (
            <Link className=" flex items-center justify-center" href="/create">
              <Button
                size={"lg"}
                variant={"outline"}
                className="space-x-2 text-accent"
              >
                <span className="text-lg">Create</span>
                <AiOutlinePlusCircle className="w-7 h-7" />
              </Button>
            </Link>
          )}
        </section>
      </div>
    </main>
  );
};

export default Hero;
