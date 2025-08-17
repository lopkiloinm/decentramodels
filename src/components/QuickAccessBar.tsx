import React from 'react';

interface QuickAction {
	icon: string;
	label: string;
	action: () => void;
}

interface QuickAccessBarProps {
	onQuickAction: (action: string) => void;
}

export const QuickAccessBar: React.FC<QuickAccessBarProps> = ({ onQuickAction }) => {
	const quickActions: QuickAction[] = [
		{
			icon: '⚡',
			label: 'Generate Now',
			action: () => onQuickAction('generate')
		},
		{
			icon: '🔍',
			label: 'Browse All',
			action: () => onQuickAction('browse')
		},
		{
			icon: '🆕',
			label: "What's New",
			action: () => onQuickAction('new')
		},
		{
			icon: '📈',
			label: 'Trending',
			action: () => onQuickAction('trending')
		}
	];

	return (
		<div className="quick-access-bar">
			<div className="container">
				<div className="quick-actions">
					{quickActions.map((action) => (
						<button
							key={action.label}
							className="quick-action"
							onClick={action.action}
						>
							<span className="quick-action__icon">{action.icon}</span>
							<span className="quick-action__label">{action.label}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default QuickAccessBar; 