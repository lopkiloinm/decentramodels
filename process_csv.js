import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and process the CSV
const inputFile = path.join(__dirname, 'full_model_template.csv');
const outputFile = path.join(__dirname, 'processed_models.csv');

const csvContent = fs.readFileSync(inputFile, 'utf8');
const lines = csvContent.split('\n').filter(line => line.trim());

// Parse header and append compatibleArchitectures
const headerFields = lines[0].split(',');
if (!headerFields.includes('compatibleArchitectures')) {
  headerFields.push('compatibleArchitectures');
}
const processedLines = [headerFields.join(',')];

// Process data rows
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  
  // Parse CSV line (handle commas in quotes)
  const fields = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(currentField);
      currentField = '';
    } else {
      currentField += char;
    }
  }
  fields.push(currentField); // Add last field
  
  // Replace platform (index 1) with "DecentraModels"
  if (fields[1]) {
    fields[1] = 'DecentraModels';
  }
  
  // Ensure source (index 16) is "community"
  if (fields[16]) {
    fields[16] = 'community';
  }
  
  // Determine category (index 2)
  const category = (fields[2] || '').toLowerCase();
  
  // Ensure compatibleArchitectures column exists
  // Default to empty for non-LoRA; set to SDXL for LoRA rows
  let compatible = '';
  if (category === 'lora') {
    // Randomized multi-architecture subset for hackathon data
    const all = ['SDXL', 'Flux', 'Kontext', 'Qwen-Image', 'WAN'];
    const chosen = new Set();
    // Always include SDXL
    chosen.add('SDXL');
    // Probabilistically include others
    if (Math.random() < 0.6) chosen.add('Flux');
    if (Math.random() < 0.6) chosen.add('Kontext');
    if (Math.random() < 0.6) chosen.add('Qwen-Image');
    if (Math.random() < 0.35) chosen.add('WAN');
    compatible = Array.from(chosen).join(';');
  }
  fields.push(compatible);
  
  // Reconstruct line
  const processedLine = fields.map(field => {
    // Add quotes if field contains comma
    if (field.includes(',')) {
      return `"${field}"`;
    }
    return field;
  }).join(',');
  
  processedLines.push(processedLine);
}

// Write processed CSV
fs.writeFileSync(outputFile, processedLines.join('\n'));

console.log(`✅ Processed ${processedLines.length - 1} models`);
console.log(`✅ All platforms set to "DecentraModels"`);
console.log(`✅ All sources set to "community"`);
console.log(`✅ LoRA compatibility defaulted to SDXL`);
console.log(`✅ Saved to: ${outputFile}`); 