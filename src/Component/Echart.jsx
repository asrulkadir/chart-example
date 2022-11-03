import React from "react";
import ReactECharts from "echarts-for-react";
import { chartJson } from "../dataChart";

const ColorList = {
  aktual1: "#B1D3E7",
  target1: "#31A9B0",
  current: "#3366FF",
  aktual2: "#F4BA42",
  target2: "#E02128",
  upcoming: "#FFFFFF",
};

const Echart = () => {
  const category = chartJson.data
    .map((item) => item.data)[0]
    .map((item2) => item2.time);
  const summaryCategory = chartJson.summary
    .map((item) => item.data)[0]
    .map((item2) => item2.time)[0];
  console.log("category", category);
  console.log("summaryCategory", summaryCategory);
  const yAxis = chartJson.summary.map((item) => {
    return {
      name: item.asset_name,
      type: "value",
      axisLabel: {
        formatter: `{value} ${item.unit}`,
      },
    };
  });
  console.log("yAxis", yAxis);
  const series = chartJson.data
    .map((item, index) => {
      if (index % 2 !== 0) {
        return [
          {
            name: `Aktual ${item.asset_name}`,
            type: "line",
            data: [
              ...item.data.map((item2) => item2.value),
              chartJson.summary
                .map((item) => item.data)[0]
                .map((item2) => item2.value)[0],
            ],
            yAxisIndex: index,
            tooltip: {
              valueFormatter: (value) => `${value} ${item.unit}`,
            },
          },
          {
            name: `Target ${item.asset_name}`,
            type: "line",
            data: [
              ...item.data.map((item2) => item2.target),
              chartJson.summary
                .map((item) => item.data)[0]
                .map((item2) => item2.target)[0],
            ],
            yAxisIndex: index,
            tooltip: {
              valueFormatter: (value) => `${value} ${item.unit}`,
            },
          },
        ];
      }
      return [
        {
          name: `Aktual ${item.asset_name}`,
          type: "bar",
          data: [
            ...item.data.map((item2) => {
              return {
                value: item2.value,
                itemStyle: {
                  color: item2.current ? ColorList.current : ColorList.aktual1,
                },
              };
            }),
            chartJson.summary
              .map((item) => item.data)[0]
              .map((item2) => {
                return {
                  value: item2.value,
                  itemStyle: {
                    color: ColorList.current,
                    borderType: "dotted",
                    borderWidth: 2,
                    borderColor: "black",
                  },
                };
              })[0],
          ],
          yAxisIndex: index,
          tooltip: {
            valueFormatter: (value) => `${value} ${item.unit}`,
          },
        },
        {
          name: `Target ${item.asset_name}`,
          type: "bar",
          data: [
            ...item.data.map((item2) => {
              return {
                value: item2.target,
                itemStyle: {
                  color:
                    !item2.value && !item2.current
                      ? ColorList.upcoming
                      : ColorList.target1,
                  borderType:
                    !item2.value && !item2.current ? "dotted" : "none",
                  borderWidth: !item2.value && !item2.current ? 2 : 0,
                  borderColor:
                    !item2.value && !item2.current ? "black" : "none",
                },
              };
            }),
            chartJson.summary
              .map((item) => item.data)[0]
              .map((item2) => {
                return {
                  value: item2.target,
                  itemStyle: {
                    color: ColorList.target1,
                    borderType: "dotted",
                    borderWidth: 2,
                    borderColor: "black",
                  },
                };
              })[0],
          ],
          yAxisIndex: index,
          tooltip: {
            valueFormatter: (value) => `${value} ${item.unit}`,
          },
        },
      ];
    })
    .flat();

  const option = {
    color: ["#B1D3E7", "#31A9B0", "#F4BA42", "#E02128"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    // legend: {
    //   data: series.map((item) => item.name),
    //   bottom: 0,
    // },
    xAxis: {
      type: "category",
      data: [...category, summaryCategory],
    },
    yAxis: yAxis,
    series: series,
  };
  console.log("series", series);

  return (
    <div>
      <h1>Echart</h1>
      <ReactECharts option={option} />
    </div>
  );
};

export default Echart;
