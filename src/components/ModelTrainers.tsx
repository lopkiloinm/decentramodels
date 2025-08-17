import React from 'react';

interface TrainingOption {
	name: string;
	description: string;
	type: 'lora' | 'style' | 'video-lora' | 'checkpoint';
	baseModel: string;
	requirements: string;
	estimatedTime: string;
	features: string[];
	icon: string;
	releaseDate?: string; // ISO date string
}

// Training options with real models
const trainingOptions: TrainingOption[] = [
	{
		name: 'FLUX LoRA Training',
		description: 'Train custom LoRAs on FLUX.1 [dev] for incredible detail and prompt adherence',
		type: 'lora',
		baseModel: 'FLUX.1 [dev]',
		requirements: 'Any GPU with 12GB+ VRAM',
		estimatedTime: '2-4 hours',
		features: ['Style Transfer', 'Character Training', 'Concept Learning'],
		icon: '⚡',
		releaseDate: '2024-11-15'
	},
	{
		name: 'Illustrious XL Training',
		description: 'Fine-tune the anime powerhouse model with rich character knowledge',
		type: 'lora',
		baseModel: 'Illustrious XL v0.1',
		requirements: 'Any GPU with 8GB+ VRAM',
		estimatedTime: '1-3 hours',
		features: ['Anime Styles', 'Character LoRA', 'Outfit Training'],
		icon: '🎨',
		releaseDate: '2024-10-20'
	},
	{
		name: 'NoobAI XL Training',
		description: 'Train on the community favorite for both anime and realistic styles',
		type: 'lora',
		baseModel: 'NoobAI XL',
		requirements: 'Any GPU with 8GB+ VRAM',
		estimatedTime: '1-2 hours',
		features: ['Multi-Style', 'Fast Convergence', 'Stable Training'],
		icon: '🌟',
		releaseDate: '2024-09-10'
	},
	{
		name: 'HunyuanVideo LoRA',
		description: 'Create custom video generation LoRAs for Tencent\'s latest model',
		type: 'video-lora',
		baseModel: 'HunyuanVideo',
		requirements: 'Any GPU with 16GB+ VRAM',
		estimatedTime: '4-8 hours',
		features: ['Motion LoRA', 'Style Transfer', 'Character Animation'],
		icon: '🎬',
		releaseDate: '2024-11-28'
	},
	{
		name: 'Qwen2-VL Image Training',
		description: 'Train vision-language LoRAs for advanced image understanding',
		type: 'lora',
		baseModel: 'Qwen2-VL 2B',
		requirements: 'Any GPU with 8GB+ VRAM',
		estimatedTime: '2-4 hours',
		features: ['OCR Enhancement', 'Object Detection', 'Visual QA'],
		icon: '👁️',
		releaseDate: '2024-11-05'
	},
	{
		name: 'WAN-2.2 LoRA Training',
		description: 'Train on the latest WAN architecture for cutting-edge image generation',
		type: 'lora',
		baseModel: 'WAN-2.2',
		requirements: 'Any GPU with 10GB+ VRAM',
		estimatedTime: '2-3 hours',
		features: ['High Resolution', 'Fine Details', 'Photorealism'],
		icon: '🚀',
		releaseDate: '2024-11-20'
	},
	{
		name: 'SD 1.5 DreamBooth',
		description: 'Classic DreamBooth training for maximum compatibility',
		type: 'style',
		baseModel: 'Stable Diffusion 1.5',
		requirements: 'Any GPU with 6GB+ VRAM',
		estimatedTime: '30-60 minutes',
		features: ['Fast Training', 'Wide Compatibility', 'Low VRAM'],
		icon: '🎯',
		releaseDate: '2023-06-15'
	},
	{
		name: 'SDXL Fine-tuning',
		description: 'Full model fine-tuning for SDXL with advanced techniques',
		type: 'style',
		baseModel: 'SDXL 1.0',
		requirements: 'Any GPU with 16GB+ VRAM',
		estimatedTime: '4-6 hours',
		features: ['Full Fine-tune', 'Advanced Techniques', 'Best Quality'],
		icon: '🔧',
		releaseDate: '2023-09-20'
	},
	{
		name: 'ControlNet Training',
		description: 'Train custom ControlNet models for precise image control',
		type: 'lora',
		baseModel: 'Various (SD1.5/SDXL)',
		requirements: 'Any GPU with 12GB+ VRAM',
		estimatedTime: '3-5 hours',
		features: ['Pose Control', 'Edge Detection', 'Custom Controls'],
		icon: '🎮',
		releaseDate: '2024-08-10'
	},
	{
		name: 'LTX Video Training',
		description: 'Train lightweight video generation models',
		type: 'video-lora',
		baseModel: 'LTX Video 0.9',
		requirements: 'Any GPU with 10GB+ VRAM',
		estimatedTime: '2-4 hours',
		features: ['Fast Inference', 'Efficient Training', 'Style Transfer'],
		icon: '📹',
		releaseDate: '2024-10-30'
	},
	{
		name: 'Checkpoint Merging',
		description: 'Intelligently merge multiple checkpoints for hybrid models',
		type: 'checkpoint',
		baseModel: 'Any Compatible Models',
		requirements: 'Any GPU with 6GB+ VRAM',
		estimatedTime: '5-15 minutes',
		features: ['Weight Merging', 'Block Merging', 'Adaptive Merge'],
		icon: '🔀',
		releaseDate: '2024-07-20'
	}
];

interface P2PNetworkStats {
	availableNodes: number;
	totalGPUs: number;
	avgWaitTime: string;
	activeJobs: number;
	gpuTypes: { [key: string]: number };
}

// P2P Network statistics
const networkStats: P2PNetworkStats = {
	availableNodes: 342,
	totalGPUs: 1247,
	avgWaitTime: 'Varies by model',
	activeJobs: 89,
	gpuTypes: {
		'RTX 4090': 142,
		'RTX 4080': 98,
		'RTX 4070 Ti': 156,
		'RTX 3090': 234,
		'RTX 3080': 187,
		'RTX 3070': 203,
		'A100 40GB': 12,
		'RTX 4060': 89,
		'RTX 3060': 126,
	}
};

interface ModelTrainersProps {
	search?: string;
}

// Helper to format dates
const formatTrainingDate = (dateStr: string | undefined) => {
	if (!dateStr) return null;
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', { 
		month: 'short', 
		day: 'numeric', 
		year: 'numeric' 
	});
};

export const ModelTrainers: React.FC<ModelTrainersProps> = ({ search = '' }) => {
	const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'image' | 'video' | 'specialized'>('all');
	
	const filteredOptions = React.useMemo(() => {
		let options = trainingOptions;
		
		// Filter by category
		if (selectedCategory !== 'all') {
			options = options.filter(option => {
				if (selectedCategory === 'image') return ['lora', 'style'].includes(option.type);
				if (selectedCategory === 'video') return option.type === 'video-lora';
				if (selectedCategory === 'specialized') return ['style', 'checkpoint'].includes(option.type) || option.baseModel.includes('Qwen');
				return true;
			});
		}
		
		// Filter by search
		if (search) {
			const q = search.toLowerCase();
			options = options.filter(option => 
				option.name.toLowerCase().includes(q) ||
				option.description.toLowerCase().includes(q) ||
				option.baseModel.toLowerCase().includes(q) ||
				option.features.some(f => f.toLowerCase().includes(q))
			);
		}
		
		return options;
	}, [search, selectedCategory]);

	return (
		<section id="trainers" className="model-trainers">
			<div className="container">
				<h2>P2P Training, Inference & Workflows</h2>
				<p>Train models, run instant inference, and create agent workflows on distributed GPUs</p>
				
				{/* Network Status */}
				<div className="network-status">
					<div className="network-stat">
						<span className="stat-icon">🖥️</span>
						<div>
							<div className="stat-value">{networkStats.availableNodes}</div>
							<div className="stat-label">Active Nodes</div>
						</div>
					</div>
					<div className="network-stat">
						<span className="stat-icon">🎮</span>
						<div>
							<div className="stat-value">{networkStats.totalGPUs}</div>
							<div className="stat-label">Total GPUs</div>
						</div>
					</div>
					<div className="network-stat">
						<span className="stat-icon">⏱️</span>
						<div>
							<div className="stat-value">{networkStats.avgWaitTime}</div>
							<div className="stat-label">Inference Time</div>
						</div>
					</div>
					<div className="network-stat">
						<span className="stat-icon">🔄</span>
						<div>
							<div className="stat-value">{networkStats.activeJobs}</div>
							<div className="stat-label">Active Jobs</div>
						</div>
					</div>
				</div>
				
				{/* GPU Distribution */}
				<div className="gpu-distribution">
					<h3>Community GPU Distribution</h3>
					<div className="gpu-chart">
						{Object.entries(networkStats.gpuTypes).map(([gpu, count]) => (
							<div key={gpu} className="gpu-bar">
								<span className="gpu-label">{gpu}</span>
								<div className="gpu-progress">
									<div 
										className="gpu-fill" 
										style={{ width: `${(count / networkStats.totalGPUs) * 100}%` }}
									/>
									<span className="gpu-count">{count}</span>
								</div>
							</div>
						))}
					</div>
				</div>
				
				{/* Category Filters */}
				<div className="training-categories">
					<button 
						className={`category-filter ${selectedCategory === 'all' ? 'active' : ''}`}
						onClick={() => setSelectedCategory('all')}
					>
						All Training
					</button>
					<button 
						className={`category-filter ${selectedCategory === 'image' ? 'active' : ''}`}
						onClick={() => setSelectedCategory('image')}
					>
						Image Models
					</button>
					<button 
						className={`category-filter ${selectedCategory === 'video' ? 'active' : ''}`}
						onClick={() => setSelectedCategory('video')}
					>
						Video Models
					</button>
					<button 
						className={`category-filter ${selectedCategory === 'specialized' ? 'active' : ''}`}
						onClick={() => setSelectedCategory('specialized')}
					>
						Specialized
					</button>
				</div>
				
				{/* Training Options */}
				<div className="training-options">
					{filteredOptions.map((option) => (
						<div key={option.name} className="training-card">
							<div className="training-card__header">
								<span className="training-card__icon">{option.icon}</span>
								<div className="training-card__title">
									<h3>{option.name}</h3>
									{option.releaseDate && (
										<span className="training-date">{formatTrainingDate(option.releaseDate)}</span>
									)}
								</div>
							</div>
							<div className="training-card__content">
								<div className="base-model">Base: {option.baseModel}</div>
								<p className="training-card__description">{option.description}</p>
								<div className="training-features">
									{option.features.map((feature, idx) => (
										<span key={idx} className="feature-tag">{feature}</span>
									))}
								</div>
								<div className="training-specs">
									<div className="spec-item">
										<span className="spec-label">Hardware:</span>
										<span className="spec-value">{option.requirements}</span>
									</div>
									<div className="spec-item">
										<span className="spec-label">Time:</span>
										<span className="spec-value">{option.estimatedTime}</span>
									</div>
								</div>
							</div>
							<button className="btn btn--primary">
								Train
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ModelTrainers; 