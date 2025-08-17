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
	new?: boolean;
}

const trainingOptions: TrainingOption[] = [
	// FLUX Training Ecosystem
	{
		name: 'FLUX LoRA Fast Training',
		type: 'lora',
		baseModel: 'FLUX.1 [dev]',
		description: 'Train styles, characters, and concepts at blazing speeds using distributed compute',
		requirements: 'Any GPU with 8GB+ VRAM',
		estimatedTime: '15-45 minutes',
		features: ['Style training', 'Character LoRA', 'Concept injection', 'Auto-captioning'],
		icon: '⚡',
	},
	{
		name: 'FLUX Portrait Optimizer',
		type: 'lora',
		baseModel: 'FLUX.1 [dev]',
		description: 'Specialized training for portrait generation with enhanced facial details',
		requirements: 'Any GPU with 10GB+ VRAM',
		estimatedTime: '30-60 minutes',
		features: ['Face enhancement', 'Lighting optimization', 'Expression control', 'Detail preservation'],
		icon: '👤',
	},
	{
		name: 'FLUX Kontext Training',
		type: 'lora',
		baseModel: 'FLUX.1 Kontext',
		description: 'Reference-guided training with just 5-10 images for consistent character generation',
		requirements: 'Any GPU with 8GB+ VRAM',
		estimatedTime: '20-40 minutes',
		features: ['Few-shot learning', 'Reference consistency', 'Style transfer', 'Context preservation'],
		icon: '🎯',
	},
	
	// Community Model Training
	{
		name: 'Illustrious XL Training',
		type: 'lora',
		baseModel: 'Illustrious XL v1.1',
		description: 'Train on the most popular anime checkpoint with Danbooru tag support',
		requirements: 'Any GPU with 6GB+ VRAM',
		estimatedTime: '1-2 hours',
		features: ['Danbooru tags', 'Anime styles', 'Character training', 'Art style mixing'],
		icon: '🎨',
		new: true,
	},
	{
		name: 'NoobAI XL V-Pred Training',
		type: 'lora',
		baseModel: 'NoobAI XL V-Pred',
		description: 'Advanced anime training with V-Prediction and zero terminal SNR',
		requirements: 'Any GPU with 8GB+ VRAM',
		estimatedTime: '1-3 hours',
		features: ['V-Prediction', 'Zero SNR', 'Enhanced colors', 'Noise control'],
		icon: '🌸',
	},
	{
		name: 'Pony Diffusion V6 Training',
		type: 'lora',
		baseModel: 'Pony Diffusion V6 XL',
		description: 'Community favorite for anthro and stylized content with e621 tagging',
		requirements: 'Any GPU with 6GB+ VRAM',
		estimatedTime: '1-2 hours',
		features: ['E621 tags', 'Species training', 'Style LoRA', 'Rating tags'],
		icon: '🦄',
	},
	
	// Video Training
	{
		name: 'HunyuanVideo LoRA Training',
		type: 'video-lora',
		baseModel: 'HunyuanVideo',
		description: 'Train video LoRAs for characters, objects, and motion patterns',
		requirements: 'Any GPU with 16GB+ VRAM',
		estimatedTime: '4-8 hours',
		features: ['Motion LoRA', 'Character consistency', 'Style transfer', 'Temporal coherence'],
		icon: '🎬',
		new: true,
	},
	{
		name: 'LTX Video Training',
		type: 'video-lora',
		baseModel: 'LTX-Video 0.9',
		description: 'Train custom styles and effects for video generation',
		requirements: 'Any GPU with 12GB+ VRAM',
		estimatedTime: '3-6 hours',
		features: ['Style training', 'Effect LoRA', 'Motion control', 'Scene consistency'],
		icon: '📹',
	},
	
	// Specialized Training
	{
		name: 'Qwen2-VL Image Training',
		type: 'lora',
		baseModel: 'Qwen2-VL',
		description: 'Train for text rendering and vision-language tasks',
		requirements: 'Any GPU with 10GB+ VRAM',
		estimatedTime: '2-4 hours',
		features: ['Text rendering', 'OCR improvement', 'Multi-language', 'Document understanding'],
		icon: '📝',
		new: true,
	},
	{
		name: 'Style Vector Creation',
		type: 'style',
		baseModel: 'Any SDXL Model',
		description: 'Create reusable style vectors from your reference images',
		requirements: 'Any GPU with 6GB+ VRAM',
		estimatedTime: '30-60 minutes',
		features: ['Style extraction', 'Reusable vectors', 'Style mixing', 'Consistency'],
		icon: '🎨',
	},
	{
		name: 'Checkpoint Merging',
		type: 'checkpoint',
		baseModel: 'Multiple Models',
		description: 'Merge multiple checkpoints to create unique model combinations',
		requirements: 'Any GPU with 8GB+ VRAM',
		estimatedTime: '10-30 minutes',
		features: ['Model fusion', 'Weight blending', 'Block merging', 'Style combination'],
		icon: '🔀',
	},
];

interface P2PNetworkStats {
	availableNodes: number;
	totalGPUs: number;
	avgWaitTime: string;
	activeJobs: number;
	gpuTypes: { type: string; count: number }[];
}

// Simulated network stats - in production, this would come from the P2P network
const networkStats: P2PNetworkStats = {
	availableNodes: 342,
	totalGPUs: 1247,
	avgWaitTime: '~3 minutes',
	activeJobs: 156,
	gpuTypes: [
		{ type: 'RTX 3060', count: 412 },
		{ type: 'RTX 3080', count: 287 },
		{ type: 'RTX 4070', count: 198 },
		{ type: 'RTX 4090', count: 143 },
		{ type: 'Other', count: 207 },
	]
};

interface ModelTrainersProps {
	search?: string;
}

export const ModelTrainers: React.FC<ModelTrainersProps> = ({ search = '' }) => {
	const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'image' | 'video' | 'specialized'>('all');
	
	const filtered = React.useMemo(() => {
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
		<section className="model-trainers" id="trainers">
			<div className="container">
				<h2>P2P Model Training</h2>
				<p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: 16 }}>
					Train on community GPUs. No censorship, no corporate control, just open compute.
				</p>

				{/* Network Status Bar */}
				<div className="network-status">
					<div className="network-stat">
						<span className="stat-icon">🌐</span>
						<div>
							<div className="stat-value">{networkStats.availableNodes}</div>
							<div className="stat-label">Active Nodes</div>
						</div>
					</div>
					<div className="network-stat">
						<span className="stat-icon">🖥️</span>
						<div>
							<div className="stat-value">{networkStats.totalGPUs.toLocaleString()}</div>
							<div className="stat-label">Available GPUs</div>
						</div>
					</div>
					<div className="network-stat">
						<span className="stat-icon">⏱️</span>
						<div>
							<div className="stat-value">{networkStats.avgWaitTime}</div>
							<div className="stat-label">Avg Wait Time</div>
						</div>
					</div>
					<div className="network-stat">
						<span className="stat-icon">🔥</span>
						<div>
							<div className="stat-value">{networkStats.activeJobs}</div>
							<div className="stat-label">Active Jobs</div>
						</div>
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
						Image LoRA
					</button>
					<button 
						className={`category-filter ${selectedCategory === 'video' ? 'active' : ''}`}
						onClick={() => setSelectedCategory('video')}
					>
						Video Training
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
					{filtered.map(option => (
						<div key={option.name} className="training-card">
							<div className="training-card__header">
								<div className="training-card__icon">{option.icon}</div>
								<div className="training-card__title">
									<h3>{option.name}</h3>
									{option.new && <span className="badge badge--new">NEW</span>}
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
										<span className="spec-label">Requirements:</span>
										<span className="spec-value">{option.requirements}</span>
									</div>
									<div className="spec-item">
										<span className="spec-label">Time:</span>
										<span className="spec-value">{option.estimatedTime}</span>
									</div>
								</div>
							</div>
							<button className="btn btn--primary btn--full-width">
								Start Training
							</button>
						</div>
					))}
				</div>

				{/* GPU Distribution */}
				<div className="gpu-distribution">
					<h3>Community GPU Distribution</h3>
					<div className="gpu-chart">
						{networkStats.gpuTypes.map(gpu => (
							<div key={gpu.type} className="gpu-bar">
								<div className="gpu-label">{gpu.type}</div>
								<div className="gpu-progress">
									<div 
										className="gpu-fill" 
										style={{ width: `${(gpu.count / networkStats.totalGPUs) * 100}%` }}
									/>
									<span className="gpu-count">{gpu.count}</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* How It Works */}
				<div className="how-it-works">
					<h3>Decentralized Training Process</h3>
					<div className="steps">
						<div className="step">
							<div className="step-number">1</div>
							<h4>Select Model & Type</h4>
							<p>Choose your base model and training type</p>
						</div>
						<div className="step">
							<div className="step-number">2</div>
							<h4>Upload Dataset</h4>
							<p>Images are encrypted and distributed via IPFS</p>
						</div>
						<div className="step">
							<div className="step-number">3</div>
							<h4>P2P Compute</h4>
							<p>Training runs on community GPUs with proof-of-work</p>
						</div>
						<div className="step">
							<div className="step-number">4</div>
							<h4>Download LoRA</h4>
							<p>Get your trained model from decentralized storage</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ModelTrainers; 