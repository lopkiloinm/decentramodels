import React from 'react';
import { Bar } from 'react-chartjs-2';
import { platformData } from '../data';

export const PlatformComparison: React.FC = () => {
	return (
		<section className="platform-comparison">
			<div className="container">
				<h2>Platform Strengths Comparison</h2>
				<div className="comparison-chart">
					<div className="chart-container" style={{ position: 'relative', height: 400 }}>
						<Bar
							data={platformData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								indexAxis: 'y' as const,
								plugins: {
									title: {
										display: true,
										text: 'Platform Capabilities Comparison (1-10 Scale)',
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