"use client";
import React, { useState, useEffect } from "react";
import RootLayout from "~/components/layout";
import { financeAtom } from "~/recoil/atom/finance";
import { fitnessAtom } from "~/recoil/atom/fitness";
import { relationshipAtom } from "~/recoil/atom/relationship";
import { useRecoilValue } from "recoil";
import { fitLengthAtom } from "~/recoil/atom/fitlength";
import { relationshipLengthAtom } from "~/recoil/atom/relationshiplength";
import { financeLengthAtom } from "~/recoil/atom/financelength";
import { motion } from "framer-motion";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { api } from "~/utils/api";

const ToDos = () => {
  const finance = useRecoilValue(financeAtom);
  const fitness = useRecoilValue(fitnessAtom);
  const relationships = useRecoilValue(relationshipAtom);

  const fitLength = useRecoilValue(fitLengthAtom);
  const financeLength = useRecoilValue(financeLengthAtom);
  const relLength = useRecoilValue(relationshipLengthAtom);
  const [startDate, setStartDate] = useState(new Date());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const introData = api?.ai?.createIntrospection?.useMutation();


  
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    // Break down the paragraph into an array of words
    const paragraph =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const wordsArray = paragraph.split(" ");
    setWords(wordsArray);

    // Start rendering words one by one
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
    }, 400); // Adjust the interval time as needed

    // Clear the interval when all words are rendered
    return () => clearInterval(intervalId);
  }, []);

  const selectIntroDate = async () => {
    const formattedDate = startDate.toLocaleDateString("en-GB");
    console.log(formattedDate, "brodate",typeof(formattedDate));
    introData?.mutate({
      date: formattedDate,
    });
  };

  const fitLenthpercent = (fitLength * 100) / fitness.length;
  const financeLenthpercent = (financeLength * 100) / finance.length;
  const relLenthpercent = (relLength * 100) / relationships.length;
  const WordByWordParagraph = ({ paragraph }: any) => {
    // Logic to extract words from the paragraph
    const words = paragraph.split(/\s+/);

    return (
      <div>
        {words.map((word: any, index: any) => (
          <span key={index}>{word} </span>
        ))}
      </div>
    );
  };

  return (
    <RootLayout>
      <div className="flex flex-col">
        <div>
          <h1 className="-mt-2  font-syne text-3xl font-normal tracking-[2px] text-[#0f172a]">
            {" "}
            Get your day-wise journel over here 📖
          </h1>
        </div>

        <div className="ml-1 text-gray-500">
          You can read your day-wise journel over here.
        </div>

        <div className="flex w-[100%]  flex-col gap-10 md:flex-row">
          <div className="mt-10 flex w-[100%] flex-col">
            <span className="font-bold"></span>
            <div className="w-[45%] rounded-xl border bg-white px-5 py-2">
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => {
                  setStartDate(date);
                  
                  selectIntroDate();
                }}
              />
            </div>
          </div>

          <div className="flex w-[100%] flex-wrap gap-1 rounded-xl border border-gray-200 bg-white px-6 py-6 font-[500] text-gray-500 shadow-lg duration-500 ease-in">
            {words.slice(0, currentWordIndex).map((word, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {word}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ToDos;
