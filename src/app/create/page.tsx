import CreateRecipe from "@/components/CreateRecipe";
import React from "react";

const Create = () => {
  return (
    <>
      <h1 className="font-semibold text-center text-lg mb-5">
        <span className="text-secondary"> Create </span>a recipe and
        <span className="text-secondary"> share </span> it with others.
      </h1>
      <CreateRecipe />
    </>
  );
};

export default Create;
