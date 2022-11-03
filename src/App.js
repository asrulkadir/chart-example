import './App.css';
import Chart from "react-apexcharts";
import { dataChart } from './dataChart';
import { useState } from 'react';
import Echart from './Component/Echart';

const unit = {
  kbn: 'kbn',
  cilincing: 'cilincing',
  cibitung: 'cibitung',
}

const month = {
  jan: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  may: '05',
  jun: '06',
  jul: '07',
  aug: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dec: '12',
}

function App() {
  const [unitSelected, setUnitSelected] = useState(unit.kbn);
  const [monthSelected, setMonthSelected] = useState(month.jan);
  const filterChart = dataChart.data.filter(item => item.unit === unitSelected);
  const filterChartByMonth = dataChart.data.filter(item => item.month === monthSelected);

  const chart1 = {
    series: [
      {
      name: 'PLN',
      data: filterChart.filter(item => item.type === 'pln').map(item => item.value)
      },
      {
      name: 'GENZET',
      data: filterChart.filter(item => item.type === 'genzet').map(item => item.value)
      }, 
      {
      name: 'SOLAR PANEL',
      data: filterChart.filter(item => item.type === 'solar').map(item => item.value)
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: false,
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'bottom',
        // offsetX: 0,
        // offsetY: 50
      },
      colors: ['#4470C2', '#EA7D31', '#A4A2A4'],
    },
  }

  const chart2 = {
    series: [
      {
      name: 'PLN',
      data: filterChartByMonth.filter(item => item.type === 'pln').map(item => item.value)
      },
      {
      name: 'GENZET',
      data:filterChartByMonth.filter(item => item.type === 'genzet').map(item => item.value)
      }, 
      {
      name: 'SOLAR PANEL',
      data: filterChartByMonth.filter(item => item.type === 'solar').map(item => item.value)
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: false,
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      xaxis: {
        categories: ['Cilincing', 'KBN', 'Cibitung'],
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'bottom',
        // offsetX: 0,
        // offsetY: 50
      },
      colors: ['#4470C2', '#EA7D31', '#A4A2A4'],
    },
  }

  return (
    <>
      <div style={{
        margin: '5rem auto',
        width: '50%',
      }}>
        <select onChange={(e) => setUnitSelected(e.target.value)}>
          <option value={unit.kbn}>Kbn</option>
          <option value={unit.cibitung}>Cibitung</option>
          <option value={unit.cilincing}>Cilincing</option>
        </select>
        <Chart options={chart1.options} series={chart1.series} type="bar" height={350} />
        <select onChange={(e) => setMonthSelected(e.target.value)}>
          {Object.keys(month).map((item, index) => (
            <option key={index} value={month[item]}>{item.toUpperCase()}</option>
          ))}
        </select>
        <Chart options={chart2.options} series={chart2.series} type="bar" height={350} />
      </div>
      <Echart />
    </>
  );
}

export default App;
