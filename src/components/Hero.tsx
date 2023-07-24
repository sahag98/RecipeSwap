"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
const Hero = () => {
  const [searchText, setSearchText] = useState("");
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
          <span className="text-secondary">Share</span> your recipes and{" "}
          <span className="text-secondary"> search </span>
          for the best ones.
        </p>
        {/* <div className="flex rounded-lg overflow-hidden items-center">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className=" w-full lg:h-10 h-11 placeholder-secondary outline-none p-2 bg-[#f9e7e8]"
            type="text"
            placeholder="Search for a recipe"
          />
          <div className="bg-accent hover:bg-accent/75 w-12 h-full items-center flex justify-center">
            <AiOutlineSearch className="cursor-pointer text-white w-8 h-8" />
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default Hero;
