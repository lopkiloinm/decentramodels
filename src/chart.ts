import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Legend,
	Title,
	Tooltip,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Title, Tooltip); 