import React from "react";
import Chart from "react-apexcharts";

const Charts = ({ purchase, data, type }) => {
  let jan = 0,
    feb = 0,
    mar = 0,
    april = 0,
    may = 0,
    june = 0,
    jul = 0,
    aug = 0,
    sept = 0,
    oct = 0,
    nov = 0,
    dec = 0;

  const pay = purchase?.history?.map((el) => {
    switch (el?.month) {
      case 0:
        jan = jan + el.amount;
        break;

      case 1:
        feb = feb + el.amount;
        break;

      case 2:
        mar = mar + el.amount;
        break;

      case 3:
        april = april + el.amount;
        break;

      case 4:
        may = may + el.amount;
        break;

      case 5:
        june = june + el.amount;
        break;

      case 6:
        jul = jul + el.amount;
        break;

      case 7:
        aug = aug + el.amount;
        break;

      case 8:
        sept = sept + el.amount;
        break;

      case 9:
        oct = oct + el.amount;
        break;

      case 10:
        nov = nov + el.amount;
        break;

      case 11:
        dec = dec + el.amount;
        break;

      default:
        break;
    }
  });


  const PurchaseState = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Janaury",
          "Deceber",
        ],
      },
    },
    series: [
      {
        name: "Employees",
        data: [0,data?.emplyeeLength],
      },
      {
        name: "Employers",
        data: [0,data?.emplyerLength],
      },
    ],
  };

  const DataState = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "April",
          "May",
          "June",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [jan, feb, mar, april, may, june, jul, aug, sept, oct, nov, dec],
      },
    ],
  };

  return (
    <div>
    {type === 'emp' ? <Chart
        options={PurchaseState.options}
        series={PurchaseState.series}
        type="area"
        width="100%"
        height="300px"
      /> : <Chart
        options={DataState.options}
        series={DataState.series}
        type="area"
        width="100%"
        height="300px"
      /> }
      
    </div>
  );
};

export default Charts;
