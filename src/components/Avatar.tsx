"use client";
import React, { useEffect, useState } from "react";
import { useSupabase } from "./supabase-provider";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";

const Avatar = () => {
  const [file, setFile] = useState<any>(null);
  const { supabase, session } = useSupabase();
  const [user, setUser] = useState<any>(null);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!file) {
        throw new Error("You must select an image to upload.");
      }

      if (!session) {
        throw new Error("You need to be signed in.");
      }

      const fileExt = file.name.split(".").pop();

      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: imageData, error: getUrlError } = await supabase.storage
        .from("avatars")
        .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year expiry

      if (getUrlError) {
        throw getUrlError;
      }

      const { data, error } = await supabase
        .from("profiles")
        .update({
          avatar_url: imageData.signedUrl,
        })
        .eq("id", session.user.id);

      if (error) {
        throw error;
      }
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  }

  function handleFileChange(event: any) {
    setFile(event.target.files[0]);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id);
      if (!profiles) {
        throw new Error("Profile not found");
      }
      setUser(profiles[0]);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const profiles = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${session?.user.id}`,
        },
        (payload) => {
          setUser(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profiles);
    };
  }, []);

  return (
    <div className="relative">
      {user ? (
        <Image
          alt="profile photo"
          src={user.avatar_url}
          width={100}
          height={100}
          className="rounded-full w-32 h-32 object-cover"
        />
      ) : (
        <Image
          alt="profile photo"
          src="/user-profile.svg"
          width={100}
          height={100}
          className="rounded-full object-cover p-1 bg-accent/25"
        />
      )}
      <form onSubmit={handleUpload} className="flex items-center">
        <div className="bg-accent cursor-pointer flex justify-center items-center rounded-full absolute bottom-0 right-0 w-8 h-8">
          <label className="cursor-pointer">
            <AiOutlinePlus className="text-white w-5 h-5" />
            <input
              type="file"
              name="upload-image"
              className="bg-accent flex justify-center items-center rounded-full  w-0 h-0"
              accept=".png,.jpeg,.jpg"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {file && (
          <button className="bg-accent text-white px-3 mt-1 py-1 rounded-md">
            Submit
          </button>
        )}
        {/* <button>Submit</button> */}
      </form>
    </div>
  );
};

export default Avatar;
