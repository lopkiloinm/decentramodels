import React from 'react';

interface GenerationExample {
	prompt: string;
	outputs: {
		model: string;
		lora?: string;
		controlnet?: string;
		result: string;
		confidence: number;
	}[];
}

const generationExamples: GenerationExample[] = [
	{
		prompt: "A serene landscape in the style of Studio Ghibli with a girl standing in a field of flowers",
		outputs: [
			{
				model: "Illustrious XL v0.1",
				lora: "Studio Ghibli Style",
				result: "Painterly style with soft colors and whimsical atmosphere",
				confidence: 95
			},
			{
				model: "NoobAI XL",
				lora: "Makoto Shinkai Style",
				result: "Photorealistic with dramatic lighting and lens flares",
				confidence: 88
			},
			{
				model: "SDXL",
				controlnet: "Depth",
				result: "Balanced composition with proper depth layering",
				confidence: 82
			}
		]
	},
	{
		prompt: "Hatsune Miku in a cyberpunk city at night",
		outputs: [
			{
				model: "Pony Diffusion V6",
				lora: "Hatsune Miku (Vocaloid)",
				result: "Accurate character with vibrant neon aesthetic",
				confidence: 97
			},
			{
				model: "Illustrious XL v0.1",
				lora: "Hatsune Miku (Vocaloid)",
				controlnet: "OpenPose",
				result: "Dynamic pose with consistent character design",
				confidence: 93
			},
			{
				model: "FLUX.1 [dev]",
				result: "High detail urban environment with character",
				confidence: 86
			}
		]
	}
];

const MasterAgent: React.FC = () => {
	const [selectedExample, setSelectedExample] = React.useState(0);
	const [userPrompt, setUserPrompt] = React.useState('');
	const [isGenerating, setIsGenerating] = React.useState(false);

	const handleGenerate = () => {
		setIsGenerating(true);
		setTimeout(() => {
			setIsGenerating(false);
			alert('In production, this would generate multiple outputs using intelligent routing!');
		}, 2000);
	};

	return (
		<section className="master-agent" id="master-agent">
			<div className="container">
				<div className="master-agent-header">
					<h2>🧠 Master Agent</h2>
					<p className="master-agent-subtitle">
						Intelligent prompt routing with multi-model generation and comparison
					</p>
				</div>

				<div className="master-agent-content">
					<div className="agent-features">
						<div className="feature-card">
							<span className="feature-icon">🎯</span>
							<h3>Smart Routing</h3>
							<p>Automatically selects best model, LoRA, and ControlNet based on your prompt</p>
						</div>
						<div className="feature-card">
							<span className="feature-icon">🔀</span>
							<h3>Multi-Generation</h3>
							<p>Generates 3-5 variations using different optimal configurations</p>
						</div>
						<div className="feature-card">
							<span className="feature-icon">🏆</span>
							<h3>User Selection</h3>
							<p>Compare results side-by-side and choose your favorite</p>
						</div>
						<div className="feature-card">
							<span className="feature-icon">🧬</span>
							<h3>Learning System</h3>
							<p>Improves routing based on community preferences</p>
						</div>
					</div>

					<div className="agent-demo">
						<h3>How It Works</h3>
						
						<div className="demo-prompt">
							<label>Your Prompt:</label>
							<textarea
								value={userPrompt}
								onChange={(e) => setUserPrompt(e.target.value)}
								placeholder="Describe what you want to generate..."
								rows={3}
							/>
							<button 
								className="btn btn--primary"
								onClick={handleGenerate}
								disabled={isGenerating || !userPrompt}
							>
								{isGenerating ? 'Analyzing & Generating...' : 'Generate with Master Agent'}
							</button>
						</div>

						<div className="routing-visualization">
							<h4>Intelligent Routing Process</h4>
							<div className="routing-steps">
								<div className="routing-step">
									<div className="step-header">
										<span className="step-icon">📝</span>
										<span>Prompt Analysis</span>
									</div>
									<ul>
										<li>Detect style requirements</li>
										<li>Identify characters/subjects</li>
										<li>Determine optimal resolution</li>
									</ul>
								</div>
								<div className="routing-arrow">→</div>
								<div className="routing-step">
									<div className="step-header">
										<span className="step-icon">🔍</span>
										<span>Model Selection</span>
									</div>
									<ul>
										<li>Match to best base models</li>
										<li>Select relevant LoRAs</li>
										<li>Add ControlNet if needed</li>
									</ul>
								</div>
								<div className="routing-arrow">→</div>
								<div className="routing-step">
									<div className="step-header">
										<span className="step-icon">⚡</span>
										<span>Parallel Generation</span>
									</div>
									<ul>
										<li>Generate 3-5 variations</li>
										<li>Different approaches</li>
										<li>Optimized settings</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="example-results">
							<h4>Example Results</h4>
							<div className="example-selector">
								{generationExamples.map((example, idx) => (
									<button
										key={idx}
										className={`example-tab ${selectedExample === idx ? 'active' : ''}`}
										onClick={() => setSelectedExample(idx)}
									>
										Example {idx + 1}
									</button>
								))}
							</div>
							
							<div className="example-content">
								<div className="example-prompt">
									<strong>Prompt:</strong> "{generationExamples[selectedExample].prompt}"
								</div>
								
								<div className="generation-results">
									{generationExamples[selectedExample].outputs.map((output, idx) => (
										<div key={idx} className="result-card">
											<div className="result-header">
												<span className="result-number">Option {idx + 1}</span>
												<span className="confidence-badge">{output.confidence}% match</span>
											</div>
											<div className="result-config">
												<div className="config-item">
													<strong>Model:</strong> {output.model}
												</div>
												{output.lora && (
													<div className="config-item">
														<strong>LoRA:</strong> {output.lora}
													</div>
												)}
												{output.controlnet && (
													<div className="config-item">
														<strong>ControlNet:</strong> {output.controlnet}
													</div>
												)}
											</div>
											<div className="result-description">
												{output.result}
											</div>
											<button className="btn btn--outline btn--sm">
												Select This Style
											</button>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="agent-benefits">
							<h4>Why Use Master Agent?</h4>
							<div className="benefits-grid">
								<div className="benefit">
									<strong>No Expertise Required:</strong> Don't know which model to use? Let the agent decide based on 1M+ community generations.
								</div>
								<div className="benefit">
									<strong>Best of All Worlds:</strong> Compare outputs from different approaches and pick your favorite.
								</div>
								<div className="benefit">
									<strong>Time Saving:</strong> Skip the trial and error - get optimal results on first try.
								</div>
								<div className="benefit">
									<strong>Learning from Community:</strong> Benefits from collective knowledge of what works best.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MasterAgent; 