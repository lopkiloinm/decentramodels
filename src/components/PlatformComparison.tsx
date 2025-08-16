import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
	labels: [
		'Community Features',
		'API Infrastructure',
		'Discovery & Search',
		'Creator Tools',
		'Moderation Fairness',
		'Speed',
		'Cost Efficiency',
		'Customization',
		'Reliability',
		'Model Variety',
	],
	datasets: [
		{
			label: 'DecentraModels (Vision)',
			data: [9, 8, 9, 9, 10, 8, 9, 9, 9, 9],
			backgroundColor: '#10B981',
			borderColor: '#10B981',
			borderWidth: 1,
		},
		{
			label: 'Centralized Platforms',
			data: [7, 9, 8, 8, 4, 9, 7, 7, 8, 8],
			backgroundColor: '#F59E0B',
			borderColor: '#F59E0B',
			borderWidth: 1,
		},
	],
};

export const PlatformComparison: React.FC = () => {
	return (
		<section className="platform-comparison">
			<div className="container">
				<h2>Platform Strengths Comparison</h2>
				<div className="comparison-chart">
					<div className="chart-container" style={{ position: 'relative', height: 400 }}>
						<Bar
							data={data}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								indexAxis: 'y' as const,
								plugins: {
									title: {
										display: true,
										text: 'DecentraModels vs Centralized Alternatives',
									},
								},
								scales: {
									x: { beginAtZero: true, max: 10 },
									y: {},
								},
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PlatformComparison; 