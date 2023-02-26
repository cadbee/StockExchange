import {
    BarElement,
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {faker} from "@faker-js/faker";

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);


export var chart_data = {
    labels: [],
    datasets: [
        {
            label: 'Open',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Close/Last',
            data: [],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export var chart_options = {
    scales: {
        x: {
            ticks: {
                //all labels
                //autoSkip: false
            }
        }
    },
    plugins: {
        title: {
            display: true,
            text: "STOCKS"
        },
        legend: {
            position: 'top',
            display: true
        }
    }
}