import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";

const Introspection = () => {
  const getIntroData = api?.ai?.getIntrospection?.useMutation();
  const [words, setWords] = useState<any>("");
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const {
    data: introQueryData,
    isError,
    isLoading,
  } = api?.ai?.getIntroQuery?.useQuery({
    introspectionDate: yesterday.toLocaleDateString("en-GB"),
  });
  useEffect(() => {
    getIntrospection();
  });

  const getIntrospection = () => {
    const introspectionWOrds = introQueryData?.introspectionData
      ?.replaceAll(/\*\*/g, "")
      ?.split(/\s+/)
      ? introQueryData?.introspectionData
          ?.replaceAll(/\*\*/g, "")
          .replace(/^\d+\.\s/gm, "")
          .replace(/[, ]+/g, " ")
          .trim()
          .split(/\s+/)
          .join()
      : ["No data found"];
    setWords(introspectionWOrds);
    console.log(
      introQueryData?.introspectionData
        ?.replaceAll(/\*\*/g, "")
        .replace(/^\d+\.\s/gm, "")
        .replace(/[, ]+/g, " ")
        .trim()
        .split(/\s+/)
        .join(),
      "introspectionWOrds",
      typeof introspectionWOrds,
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-[100%] flex-col gap-6 rounded-xl  border-gray-200 bg-white px-10  py-12 text-left text-3xl font-semibold shadow-lg">
      <div>Introspection ✨</div>

      <div
        style={{
          scrollbarWidth: "thin",
          msOverflowStyle: "none",
          scrollbarColor: "black",
          overflowX: "auto", // Add this line to enable horizontal scrolling
        }}
        className="h-56 text-wrap  w-[100%] overflow-y-scroll rounded-md border"
      >
        <div className="text-wrap ">
          <div className="px-10 py-10 text-sm text-gray-400">{words}</div>
        </div>
      </div>
    </div>
  );
};

export default Introspection;
