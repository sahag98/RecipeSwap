"use client";
import React, { useEffect } from "react";
import { useSupabase } from "./supabase-provider";

const Subscription = () => {
  const { supabase, session } = useSupabase();
  useEffect(() => {
    const channel = supabase
      .channel("table_db_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "recipe",
        },
        (payload) => {
          const newRecord = payload.new;
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <div></div>;
};

export default Subscription;
