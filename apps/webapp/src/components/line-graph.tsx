"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  use,
} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/utils/api";
// const {
//   data = [],
//   isLoading,
//   isError,
// } = api.dailytask?.getMindfulTasks?.useQuery();

const data = [
  {
    name: "week 1",
    progress: 0,
  },
  {
    name: "week 2",
    progress: 1000,
  },
  {
    name: "week 3",
    progress: 700,
  },
  {
    name: "week 4",
    progress: 500,
  },
];

const LineGraph = () => {
  const [dimensions, setDimensions] = useState({ width: 500, height: 400 });
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(22);
  const [data, setData] = useState<any>();

  useLayoutEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const newFontSize = screenWidth < 768 ? 10 : 22; // Adjust the font size based on the screen width
      setFontSize(newFontSize);
    };

    handleResize(); // Call the function initially

    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };
  }, []);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);
  useEffect(() => {
    getAllData();
  }, []);
  const {
    data: getTaskData,
    isError,
    isLoading,
  } = api.progress.getProgress.useQuery();
  useEffect(() => {
    // console.log(getTaskData, "getTaskData");
    getAllData();
  }, [getTaskData]);
  const getAllData = async () => {
    // console.log("callllled");
    if (!isLoading && !isError) {
      const transformedData = getTaskData.map((task: any, index: any) => ({
        name: `day ${index + 1}`,
        progress: task.progress,
      }));

      setData(transformedData);
    }
  };
  return (
    <div className="flex w-[100%] flex-col rounded-xl border border-gray-200 bg-white py-5 text-3xl font-semibold shadow-lg">
      Progress
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%" }}
        className="px-2 py-5"
      >
        <div>
          <Tabs defaultValue="day" className="w-[100%]">
            <TabsList>
              <TabsTrigger value="day">day</TabsTrigger>
              <TabsTrigger value="week">week</TabsTrigger>
              <TabsTrigger value="month">month</TabsTrigger>
            </TabsList>
            <TabsContent value="day">
              <LineChart
                style={{ margin: "auto" }}
                width={dimensions.width}
                height={dimensions.width}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="2 2" /> */}
                <XAxis dataKey="name" fontSize={fontSize} />
                <YAxis fontSize={fontSize} />
                <Tooltip />

                <Line type="monotone" dataKey="progress" stroke="blue" />
              </LineChart>
            </TabsContent>
            <TabsContent value="week">
              {" "}
              <LineChart
                style={{ margin: "auto" }}
                width={dimensions.width}
                height={dimensions.width}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="2 2" /> */}
                <XAxis dataKey="name" fontSize={fontSize} />
                <YAxis fontSize={fontSize} />
                <Tooltip />

                <Line type="monotone" dataKey="progress" stroke="blue" />
              </LineChart>
            </TabsContent>

            <TabsContent value="month">
              {" "}
              <LineChart
                style={{ margin: "auto" }}
                width={dimensions.width}
                height={dimensions.width}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="2 2" /> */}
                <XAxis dataKey="name" fontSize={fontSize} />
                <YAxis fontSize={fontSize} />
                <Tooltip />

                <Line type="monotone" dataKey="progress" stroke="blue" />
              </LineChart>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LineGraph;
