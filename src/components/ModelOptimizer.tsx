import React from 'react';
import type { ModelInfo } from '../types';

interface ModelOptimizerProps {
	model: ModelInfo;
	onConfirm: (options: OptimizationOptions) => void;
	onCancel: () => void;
}

interface OptimizationOptions {
	quantization: 'none' | '4bit' | '8bit' | '16bit';
	optimization: 'none' | 'nunchaku-svd' | 'tensorrt' | 'onnx';
	precision: 'fp32' | 'fp16' | 'int8';
}

export const ModelOptimizer: React.FC<ModelOptimizerProps> = ({ model, onConfirm, onCancel }) => {
	const [options, setOptions] = React.useState<OptimizationOptions>({
		quantization: 'none',
		optimization: 'none',
		precision: 'fp16'
	});

	const handleConfirm = () => {
		onConfirm(options);
	};

	// Calculate performance impact
	const getPerformanceImpact = () => {
		let speedup = 1;
		let vramReduction = 0;

		if (options.quantization === '4bit') {
			speedup *= 2.5;
			vramReduction = 75;
		} else if (options.quantization === '8bit') {
			speedup *= 1.8;
			vramReduction = 50;
		}

		if (options.optimization === 'nunchaku-svd') {
			speedup *= 1.4;
			vramReduction += 10;
		} else if (options.optimization === 'tensorrt') {
			speedup *= 1.6;
		}

		return { speedup, vramReduction };
	};

	const { speedup, vramReduction } = getPerformanceImpact();

	return (
		<div className="optimizer-modal">
			<div className="optimizer-content">
				<h3>Optimize {model.name}</h3>
				<p className="optimizer-subtitle">Configure optimization for faster inference and lower VRAM usage</p>

				<div className="optimizer-section">
					<h4>Quantization</h4>
					<div className="optimizer-options">
						<label className="optimizer-option">
							<input
								type="radio"
								name="quantization"
								value="none"
								checked={options.quantization === 'none'}
								onChange={(e) => setOptions({ ...options, quantization: e.target.value as any })}
							/>
							<span>None (Full Precision)</span>
						</label>
						<label className="optimizer-option">
							<input
								type="radio"
								name="quantization"
								value="8bit"
								checked={options.quantization === '8bit'}
								onChange={(e) => setOptions({ ...options, quantization: e.target.value as any })}
							/>
							<span>8-bit (50% VRAM, 1.8x faster)</span>
						</label>
						<label className="optimizer-option">
							<input
								type="radio"
								name="quantization"
								value="4bit"
								checked={options.quantization === '4bit'}
								onChange={(e) => setOptions({ ...options, quantization: e.target.value as any })}
							/>
							<span>4-bit (75% VRAM, 2.5x faster)</span>
						</label>
					</div>
				</div>

				<div className="optimizer-section">
					<h4>Optimization</h4>
					<div className="optimizer-options">
						<label className="optimizer-option">
							<input
								type="radio"
								name="optimization"
								value="none"
								checked={options.optimization === 'none'}
								onChange={(e) => setOptions({ ...options, optimization: e.target.value as any })}
							/>
							<span>None</span>
						</label>
						<label className="optimizer-option">
							<input
								type="radio"
								name="optimization"
								value="nunchaku-svd"
								checked={options.optimization === 'nunchaku-svd'}
								onChange={(e) => setOptions({ ...options, optimization: e.target.value as any })}
							/>
							<span>Nunchaku SVD (1.4x faster)</span>
						</label>
						<label className="optimizer-option">
							<input
								type="radio"
								name="optimization"
								value="tensorrt"
								checked={options.optimization === 'tensorrt'}
								onChange={(e) => setOptions({ ...options, optimization: e.target.value as any })}
							/>
							<span>TensorRT (1.6x faster, NVIDIA only)</span>
						</label>
					</div>
				</div>

				<div className="optimizer-summary">
					<h4>Performance Impact</h4>
					<div className="impact-stats">
						<div className="impact-stat">
							<span className="impact-label">Speed:</span>
							<span className="impact-value">{speedup.toFixed(1)}x faster</span>
						</div>
						<div className="impact-stat">
							<span className="impact-label">VRAM:</span>
							<span className="impact-value">{vramReduction}% reduction</span>
						</div>
					</div>
				</div>

				<div className="optimizer-actions">
					<button className="btn btn--outline" onClick={onCancel}>
						Cancel
					</button>
					<button className="btn btn--primary" onClick={handleConfirm}>
						Apply & Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModelOptimizer; 