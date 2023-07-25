import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <main className="flex w-full items-center h-full justify-center flex-col gap-3">
      <div className="mb-12 rounded-full flex flex-col justify-center items-center gap-2">
        <Image
          src="/undraw_cooking_p7m1.svg"
          alt="hero img"
          width={250}
          height={250}
          className="mb-2"
        />
        <h1 className="lg:text-6xl text-5xl font-bold bg-gradient-to-r from-sky-300 to-red-400 bg-clip-text text-transparent tracking-wider">
          RecipeSwap
        </h1>
        <p className="text-lg text-center">
          <span className="text-secondary font-medium">Share</span> your recipes
          and <span className="text-secondary font-medium"> search </span>
          for the best ones.
        </p>
        <Link
          className="w-full flex items-center justify-center"
          href="/recipes"
        >
          <button className=" bg-accent shadow-lg mt-1 text-white w-2/3 py-2  rounded-md hover:bg-accent/90 transition">
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Hero;
