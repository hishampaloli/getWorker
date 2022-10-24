import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getAllWithdraw } from "../../actions/adminActions";

const RadarChart = () => {
    const dispatch = useDispatch();
    let finished = 0, pending = 0
    
  const withdrawHistory = useSelector(state => state.withdrawHistory)

   withdrawHistory.data?.forEach(el => {
    if (el.status === 'finished') {
        finished++;
    }else if (el.status === 'pending') {
        pending++
    }
});




  useEffect(() => {
    dispatch(getAllWithdraw())
  }, [])

  console.log(finished);


  const state = {
          
    series: [finished , pending, withdrawHistory?.data?.length],

    options: {
      chart: {
        type: 'donut',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  
  
  };

  return (
    <div id="chart">
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        height={350}
      />
    </div>
  );
};

export default RadarChart;
