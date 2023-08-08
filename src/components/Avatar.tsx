"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useSupabase } from "./supabase-provider";
import Image from "next/image";
import { AiOutlineCloudUpload, AiOutlinePlus } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { BsFillPersonFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";

const Avatar = ({ avatar }: any) => {
  const [file, setFile] = useState<any>(null);
  const { supabase, session } = useSupabase();
  const [user, setUser] = useState<any>(null);
  let [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleUpload() {
    try {
      setUploading(true);
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
      toast.success("Successfully changed profile picture.");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      closeModal();
      setUploading(false);
    }
  }

  function handleFileChange(event: any) {
    setFile(event.target.files[0]);
  }

  return (
    <div className="relative">
      {avatar ? (
        <Image
          alt="profile photo"
          src={avatar[0].avatar_url}
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8UQ8AAlUBaWcVN3EAAAAASUVORK5CYII="
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

      <div className="bg-accent text-white hover:bg-primary hover:border hover:border-accent hover:text-accent transition cursor-pointer flex justify-center items-center rounded-full absolute bottom-0 right-0 w-8 h-8">
        <AiOutlinePlus onClick={openModal} className=" w-5 h-5" />
      </div>
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg flex items-center justify-center text-center font-medium leading-6 text-secondary"
                    >
                      Change Avatar
                      <BsFillPersonFill className="ml-2" size={30} />
                    </Dialog.Title>

                    <label>
                      {!file && (
                        <div className="h-60 mt-2 cursor-pointer bg-accent/20 p-8 flex rounded-lg flex-col justify-center items-center">
                          <p className="font-bold text-4xl">
                            <AiOutlineCloudUpload />
                          </p>
                          <p>Click to upload</p>
                          <input
                            type="file"
                            name="upload-image"
                            className="w-0 h-0"
                            accept=".png,.jpeg,.jpg"
                            onChange={handleFileChange}
                          />
                        </div>
                      )}
                      {file && (
                        <>
                          <div className="h-96 mt-2 cursor-pointer relative bg-[#d5d8d8]flex flex-col justify-center items-center">
                            <Image
                              className="w-full h-full rounded-lg object-cover"
                              src={URL.createObjectURL(file)}
                              alt="image-preview"
                              width={500}
                              height={500}
                            />
                          </div>
                        </>
                      )}
                    </label>

                    <div className="mt-4 gap-3 flex items-center justify-end">
                      <Button
                        type="button"
                        onClick={closeModal}
                        disabled={uploading}
                        size={"lg"}
                        variant={"outline"}
                        className="space-x-2 text-accent"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleUpload} size={"lg"}>
                        {uploading ? "Changing..." : "Change"}
                      </Button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </div>
  );
};

export default Avatar;
