"use client";
import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
const Introspection = () => {
  const getIntroData = api?.ai?.getIntrospection?.useMutation();
  const [words, setWords] = useState("");
  useEffect(() => {
    getIntrospection();
  }, []);
  const getIntrospection = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    getIntroData?.mutate({
      introspectionDate: yesterday.toLocaleDateString("en-GB"),
    });
    setWords(
      getIntroData?.data?.introspectionData
        .split("**")
        .join()
        .replace(/^\d+\.\s/gm, "")
        .replace(/[, ]+/g, " ")
        .trim(),
    );
    console.log(
      getIntroData?.data?.introspectionData
        .split("**")
        .join()
        .replace(/^\d+\.\s/gm, "")
        .replace(/[, ]+/g, " ")
        .trim(),
      "lolollo",
    );
  };
  return (
    <div className="flex w-[100%] flex-col gap-6 rounded-xl border-gray-200 bg-white px-10  py-12 text-left text-3xl font-semibold shadow-lg">
      <div>Introspection ✨</div>

      <div
        style={{
          scrollbarWidth: "thin",
          msOverflowStyle: "none",
          scrollbarColor: "black",
        }}
        className="h-56 overflow-y-scroll rounded-md border"
      >
        <div>
          <p className="px-10 py-10 text-sm text-gray-400">{words}</p>
        </div>
      </div>
    </div>
  );
};

export default Introspection;
