import React from 'react';

interface QuickFilter {
	id: string;
	label: string;
	count?: number;
}

interface QuickAccessBarProps {
	onQuickAction: (action: string) => void;
}

export const QuickAccessBar: React.FC<QuickAccessBarProps> = ({ onQuickAction }) => {
	const quickFilters: QuickFilter[] = [
		{ id: 'all', label: 'All Models', count: 612 },
		{ id: 'new', label: 'New This Week', count: 38 },
		{ id: 'trending', label: 'Trending', count: 67 },
		{ id: 'image', label: 'Image', count: 385 },
		{ id: 'video', label: 'Video', count: 89 },
		{ id: 'lora', label: 'LoRA', count: 234 },
	];

	return (
		<div className="quick-access-bar">
			<div className="container">
				<div className="quick-filters">
					{quickFilters.map((filter) => (
						<button
							key={filter.id}
							className="quick-filter"
							onClick={() => onQuickAction(filter.id)}
						>
							<span className="filter-label">{filter.label}</span>
							{filter.count && <span className="filter-count">{filter.count}</span>}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default QuickAccessBar; 