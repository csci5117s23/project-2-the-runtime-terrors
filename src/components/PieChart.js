import 'chart.js/auto';
import { Pie } from "react-chartjs-2";

const PieChart = ({ label1, value1, label2, value2 }) => {
    const data = {
      labels: [label1, label2],
      datasets: [
        {
          data: [value1, value2],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };
  
    return (
        <div style={{ width: '300px', height: '300px' }}>
            <Pie data= { data } />
        </div>
    );
  };
  
  export default PieChart;