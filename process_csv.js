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

// Process header
const processedLines = [lines[0]]; // Keep header as-is

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
console.log(`✅ Saved to: ${outputFile}`); 