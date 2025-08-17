import React from 'react';

interface WorkflowExample {
	id: string;
	name: string;
	description: string;
	steps: {
		model: string;
		action: string;
		output: string;
	}[];
	benefits: string[];
	icon: string;
}

const workflowExamples: WorkflowExample[] = [
	{
		id: 'anime-dataset',
		name: 'Anime Character Dataset Generation',
		description: 'Use Illustrious XL to generate training data for Qwen2-VL or WAN models that lack anime knowledge',
		steps: [
			{
				model: 'Illustrious XL v0.1',
				action: 'Generate 1000 character variations',
				output: 'High-quality anime images with metadata'
			},
			{
				model: 'BLIP-2 Captioning',
				action: 'Auto-caption generated images',
				output: 'Detailed text descriptions'
			},
			{
				model: 'Qwen2-VL LoRA',
				action: 'Train on synthetic dataset',
				output: 'Anime-aware vision model'
			}
		],
		benefits: [
			'Transfer artistic knowledge between models',
			'No manual dataset creation needed',
			'Consistent style and quality'
		],
		icon: '🎨'
	},
	{
		id: 'video-editing',
		name: 'Video-to-Video Style Transfer',
		description: 'High-fidelity video editing using FLUX.1 Kontext for keyframe control and style consistency',
		steps: [
			{
				model: 'Frame Extraction',
				action: 'Extract keyframes at scene changes',
				output: 'Key video frames for editing'
			},
			{
				model: 'FLUX.1 Kontext',
				action: 'Apply style/edits with reference consistency',
				output: 'Edited keyframes with style transfer'
			},
			{
				model: 'EbSynth/FILM',
				action: 'Propagate edits to all frames',
				output: 'Fully edited video with temporal coherence'
			},
			{
				model: 'Video Encoder',
				action: 'Compile and optimize final video',
				output: 'High-quality edited video'
			}
		],
		benefits: [
			'Edit entire videos with just keyframe changes',
			'Maintain temporal consistency automatically',
			'Apply complex style transfers to video',
			'No need to edit every frame manually'
		],
		icon: '🎬'
	},
	{
		id: 'master-agent-workflow',
		name: 'Intelligent Multi-Model Generation',
		description: 'Let the Master Agent decide optimal model combinations for your prompt',
		steps: [
			{
				model: 'Master Agent',
				action: 'Analyze prompt and determine best approach',
				output: 'Routing strategy with confidence scores'
			},
			{
				model: 'Model Router',
				action: 'Select 3-5 optimal model+LoRA combinations',
				output: 'Parallel generation pipelines'
			},
			{
				model: 'Parallel Execution',
				action: 'Generate using all selected pipelines',
				output: 'Multiple high-quality variations'
			},
			{
				model: 'Quality Ranker',
				action: 'Present results for user selection',
				output: 'Best result based on user preference'
			}
		],
		benefits: [
			'No expertise required - AI handles model selection',
			'Compare multiple approaches simultaneously',
			'Learn from community preferences',
			'Optimal results on first try'
		],
		icon: '🧠'
	},
	{
		id: 'video-enhancement',
		name: 'Multi-Stage Video Enhancement',
		description: 'Chain multiple models for superior video generation results',
		steps: [
			{
				model: 'FLUX.1',
				action: 'Generate keyframes',
				output: 'High-quality still images'
			},
			{
				model: 'HunyuanVideo',
				action: 'Interpolate between frames',
				output: 'Smooth video generation'
			},
			{
				model: 'Real-ESRGAN',
				action: 'Upscale and enhance',
				output: '4K enhanced video'
			}
		],
		benefits: [
			'Leverage strengths of each model',
			'Higher quality than single model',
			'Modular pipeline - swap models anytime'
		],
		icon: '📹'
	},
	{
		id: 'game-asset-pipeline',
		name: 'Game Asset Generation Pipeline',
		description: 'Create consistent game assets across different styles and resolutions',
		steps: [
			{
				model: 'NoobAI XL',
				action: 'Generate concept art',
				output: 'Character designs'
			},
			{
				model: 'ControlNet',
				action: 'Extract poses and structure',
				output: 'Pose templates'
			},
			{
				model: 'Stable Diffusion XL',
				action: 'Generate variations',
				output: 'Multiple asset versions'
			}
		],
		benefits: [
			'Consistent art style across assets',
			'Rapid iteration and prototyping',
			'Export-ready for game engines'
		],
		icon: '🎮'
	}
];

const AgentWorkflows: React.FC = () => {
	const [selectedWorkflow, setSelectedWorkflow] = React.useState(workflowExamples[0]);

	return (
		<section className="agent-workflows" id="workflows">
			<div className="container">
				<h2>Agent Workflows</h2>
				<p>Chain models together to create powerful pipelines impossible on centralized platforms</p>
				
				<div className="workflows-grid">
					{/* Workflow Selector */}
					<div className="workflow-selector">
						{workflowExamples.map(workflow => (
							<button
								key={workflow.id}
								className={`workflow-option ${selectedWorkflow.id === workflow.id ? 'active' : ''}`}
								onClick={() => setSelectedWorkflow(workflow)}
							>
								<span className="workflow-icon">{workflow.icon}</span>
								<div className="workflow-info">
									<h4>{workflow.name}</h4>
									<p>{workflow.description}</p>
								</div>
							</button>
						))}
					</div>
					
					{/* Workflow Details */}
					<div className="workflow-details">
						<div className="workflow-visualization">
							<h3>{selectedWorkflow.name}</h3>
							<div className="workflow-steps">
								{selectedWorkflow.steps.map((step, idx) => (
									<React.Fragment key={idx}>
										<div className="workflow-step">
											<div className="step-model">{step.model}</div>
											<div className="step-action">{step.action}</div>
											<div className="step-output">→ {step.output}</div>
										</div>
										{idx < selectedWorkflow.steps.length - 1 && (
											<div className="workflow-arrow">↓</div>
										)}
									</React.Fragment>
								))}
							</div>
							
							<div className="workflow-benefits">
								<h4>Benefits</h4>
								<ul>
									{selectedWorkflow.benefits.map((benefit, idx) => (
										<li key={idx}>{benefit}</li>
									))}
								</ul>
							</div>
							
							<button className="btn btn--primary">
								Create This Workflow
							</button>
						</div>
					</div>
				</div>
				
				{/* Quick Actions */}
				<div className="workflow-actions">
					<button className="btn btn--outline">
						Browse Templates
					</button>
					<button className="btn btn--outline">
						Import Workflow
					</button>
					<button className="btn btn--outline">
						View Examples
					</button>
				</div>
			</div>
		</section>
	);
};

export default AgentWorkflows; 