import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Style LoRAs
const styleLoRAs = [
    'Makoto Shinkai Style (Your Name, Suzume)',
    'Studio Ghibli Style',
    'Wlop Art Style',
    'Samdoesarts Style',
    'ChannelCastStation Style',
    'Guweiz Art Style',
    'Ross Tran Style',
    'Kuvshinov Ilya Style',
    'Artgerm Style',
    'Greg Rutkowski Style',
    'Loish Art Style',
    'WLOP Digital Painting',
    'Sakimichan Style',
    'RossDraws Style',
    'James Jean Style',
    'Kim Jung Gi Line Art',
    'Yoji Shinkawa Style',
    'Moebius (Jean Giraud) Style',
    'Junji Ito Horror Style',
    'Hirohiko Araki (JoJo) Style',
    'ONE (Mob Psycho) Style',
    'Kentaro Miura (Berserk) Style',
    'Yoshitaka Amano Style',
    'Range Murata Style',
    'Katsuhiro Otomo Style',
    'Studio Trigger Style',
    'KyoAni Style',
    'Ufotable Style',
    'A-1 Pictures Style',
    'Wit Studio Style',
    'MAPPA Style',
    'CloverWorks Style',
    'Studio Pierrot Style',
    'Madhouse Style',
    'Bones Studio Style'
];

// Character LoRAs
const characterLoRAs = [
    'Hatsune Miku (Vocaloid)',
    'Kasane Teto (UTAU/SynthV)',
    'Zundamon',
    'Kagamine Rin/Len',
    'Megurine Luka',
    'GUMI (Vocaloid)',
    'IA (Vocaloid)',
    'Blue Archive - Arona',
    'Blue Archive - Shiroko',
    'Blue Archive - Hoshino',
    'Blue Archive - Aru',
    'Blue Archive - Serika',
    'Blue Archive - Nonomi',
    'Blue Archive - Izuna',
    'Blue Archive - Yuuka',
    'Genshin Impact - Hu Tao',
    'Genshin Impact - Ganyu',
    'Genshin Impact - Raiden Shogun',
    'Genshin Impact - Yae Miko',
    'Genshin Impact - Nahida',
    'Genshin Impact - Furina',
    'Genshin Impact - Keqing',
    'Genshin Impact - Ayaka',
    'Genshin Impact - Yelan',
    'Arknights - Amiya',
    'Arknights - Texas',
    'Arknights - Exusiai',
    'Arknights - SilverAsh',
    'Honkai Star Rail - Kafka',
    'Honkai Star Rail - Silver Wolf',
    'Honkai Star Rail - Fu Xuan',
    'Honkai Star Rail - Jingliu',
    'Azur Lane - Enterprise',
    'Azur Lane - Belfast',
    'Fate/GO - Artoria Pendragon',
    'Fate/GO - Mash Kyrielight',
    'Fate/GO - Jeanne d\'Arc',
    'Uma Musume - Daiwa Scarlet',
    'Uma Musume - Gold Ship',
    'Nikke - Rapi',
    'Nikke - Anis',
    'Nikke - Neon',
    'Princess Connect - Pecorine',
    'Princess Connect - Kyaru',
    'Hololive - Gawr Gura',
    'Hololive - Usada Pekora',
    'Hololive - Inugami Korone',
    'Nijisanji - Tsukino Mito',
    'Nijisanji - Kuzuha'
];

// Read and parse CSV
function parseCSV(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/).filter(Boolean);
    const rows = [];
    
    for (const line of lines) {
        const cells = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                cells.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        cells.push(current);
        rows.push(cells);
    }
    
    return rows;
}

// Generate a rating between 4.0 and 5.0
function generateRating() {
    return (Math.random() * 1 + 4).toFixed(1);
}

// Generate created date
function generateCreatedDate() {
    const daysAgo = Math.floor(Math.random() * 365);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
}

// Generate last updated date
function generateLastUpdated(createdDate) {
    const created = new Date(createdDate);
    const daysAfter = Math.floor(Math.random() * 60);
    created.setDate(created.getDate() + daysAfter);
    return created.toISOString().split('T')[0];
}

// Map CSV row to model object
function mapCSVToModel(row, headers, source) {
    if (source === 'models.csv') {
        const [name, platform, category, modality, base, trainingData, useCase, downloads] = row;
        if (!name || !platform) return null;
        
        return {
            name: name.trim(),
            platform: 'DecentraModels',
            category: category?.trim() || 'Unknown',
            base: base?.trim() || 'Unknown',
            downloads: downloads?.trim() || 'N/A',
            rating: generateRating(),
            specialty: useCase?.trim() || trainingData?.trim() || 'General purpose',
            hardware: 'Varies',
            architecture: base?.trim() || 'Unknown',
            style: 'artistic',
            usecase: 'concept',
            quality: 'production',
            modality: modality?.trim() || 'text-to-image',
            created_at: generateCreatedDate(),
            trending_score: Math.floor(Math.random() * 100),
            popularity_score: Math.floor(Math.random() * 100000),
            source: 'community',
            lastUpdated: '',
            verified: 'true',
            subtitle: '',
            description: '',
            primaryUseCase: '',
            keyFeatures: '',
            performance: '',
            recommendedSettings: '',
            creator: '',
            license: '',
            modelSize: '',
            trainingDataset: ''
        };
    } else {
        // comprehensive_ai_models.csv format
        const platformIdx = headers.indexOf('platform');
        const categoryIdx = headers.indexOf('category');
        const modelIdx = headers.indexOf('model');
        const specialtyIdx = headers.indexOf('specialty');
        const baseIdx = headers.indexOf('base');
        const downloadsIdx = headers.indexOf('downloads');
        
        const name = row[modelIdx]?.trim();
        const platform = row[platformIdx]?.trim();
        
        if (!name || !platform) return null;
        
        return {
            name,
            platform: 'DecentraModels',
            category: row[categoryIdx]?.trim() || 'Unknown',
            base: row[baseIdx]?.trim() || 'Unknown',
            downloads: row[downloadsIdx]?.trim() || 'N/A',
            rating: generateRating(),
            specialty: row[specialtyIdx]?.trim() || 'General purpose',
            hardware: 'Varies',
            architecture: row[baseIdx]?.trim() || 'Unknown',
            style: 'artistic',
            usecase: 'concept',
            quality: 'standard',
            modality: 'text-to-image',
            created_at: generateCreatedDate(),
            trending_score: Math.floor(Math.random() * 100),
            popularity_score: Math.floor(Math.random() * 100000),
            source: 'community',
            lastUpdated: '',
            verified: 'true',
            subtitle: '',
            description: '',
            primaryUseCase: '',
            keyFeatures: '',
            performance: '',
            recommendedSettings: '',
            creator: '',
            license: '',
            modelSize: '',
            trainingDataset: ''
        };
    }
}

// Main function
function generateFullTemplate() {
    const allModels = [];
    
    // Load models.csv
    try {
        const rows = parseCSV(path.join(__dirname, 'models.csv'));
        const headers = rows[0]?.map(h => h.toLowerCase());
        const models = rows.slice(1)
            .map(row => mapCSVToModel(row, headers, 'models.csv'))
            .filter(m => m !== null);
        allModels.push(...models);
    } catch (e) {
        console.error('Error loading models.csv:', e);
    }
    
    // Load comprehensive_ai_models.csv
    try {
        const rows = parseCSV(path.join(__dirname, 'comprehensive_ai_models.csv'));
        const headers = rows[0]?.map(h => h.toLowerCase());
        const models = rows.slice(1)
            .map(row => mapCSVToModel(row, headers, 'comprehensive'))
            .filter(m => m !== null);
        
        // Avoid duplicates
        const existingNames = new Set(allModels.map(m => m.name.toLowerCase()));
        const uniqueModels = models.filter(m => !existingNames.has(m.name.toLowerCase()));
        allModels.push(...uniqueModels);
    } catch (e) {
        console.error('Error loading comprehensive_ai_models.csv:', e);
    }
    
    // Generate Style LoRAs
    styleLoRAs.forEach((name, index) => {
        const created = generateCreatedDate();
        const base = ['SDXL', 'Illustrious XL', 'NoobAI XL', 'Pony Diffusion V6', 'WAN', 'FLUX', 'Stable Diffusion 1.5'][index % 7];
        allModels.push({
            name,
            platform: 'DecentraModels',
            category: 'LoRA',
            base,
            downloads: `${Math.floor(Math.random() * 50 + 10)}k`,
            rating: generateRating(),
            specialty: 'Artistic style replication with high fidelity',
            hardware: 'Any GPU with 6GB+ VRAM',
            architecture: base,
            style: 'artistic',
            usecase: 'style',
            quality: 'production',
            modality: 'lora',
            created_at: created,
            trending_score: Math.floor(Math.random() * 100),
            popularity_score: Math.floor(Math.random() * 50000 + 10000),
            source: 'community',
            lastUpdated: generateLastUpdated(created),
            verified: 'true',
            subtitle: '',
            description: '',
            primaryUseCase: '',
            keyFeatures: '',
            performance: '',
            recommendedSettings: '',
            creator: '',
            license: '',
            modelSize: '',
            trainingDataset: ''
        });
    });
    
    // Generate Character LoRAs
    characterLoRAs.forEach((name, index) => {
        const created = generateCreatedDate();
        const base = ['Illustrious XL', 'NoobAI XL', 'Pony Diffusion V6', 'SDXL', 'HunyuanVideo', 'WAN-2.2', 'Qwen2-VL'][index % 7];
        allModels.push({
            name,
            platform: 'DecentraModels',
            category: 'LoRA',
            base,
            downloads: `${Math.floor(Math.random() * 100 + 20)}k`,
            rating: generateRating(),
            specialty: 'Character consistency and accurate representation',
            hardware: 'Any GPU with 6GB+ VRAM',
            architecture: base,
            style: 'anime',
            usecase: 'character',
            quality: 'production',
            modality: 'lora',
            created_at: created,
            trending_score: Math.floor(Math.random() * 150),
            popularity_score: Math.floor(Math.random() * 100000 + 20000),
            source: 'community',
            lastUpdated: generateLastUpdated(created),
            verified: 'true',
            subtitle: '',
            description: '',
            primaryUseCase: '',
            keyFeatures: '',
            performance: '',
            recommendedSettings: '',
            creator: '',
            license: '',
            modelSize: '',
            trainingDataset: ''
        });
    });
    
    // Generate CSV
    const headers = [
        'name', 'platform', 'category', 'base', 'downloads', 'rating', 
        'specialty', 'hardware', 'architecture', 'style', 'usecase', 
        'quality', 'modality', 'created_at', 'trending_score', 
        'popularity_score', 'source', 'lastUpdated', 'verified',
        'subtitle', 'description', 'primaryUseCase', 'keyFeatures',
        'performance', 'recommendedSettings', 'creator', 'license',
        'modelSize', 'trainingDataset'
    ];
    
    let csv = headers.join(',') + '\n';
    
    allModels.forEach(model => {
        const row = headers.map(header => {
            const value = model[header] || '';
            // Escape quotes and wrap in quotes if contains comma or quote
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        });
        csv += row.join(',') + '\n';
    });
    
    // Write to file
    fs.writeFileSync(path.join(__dirname, 'full_model_template.csv'), csv);
    console.log(`Generated full_model_template.csv with ${allModels.length} models`);
}

// Run the script
generateFullTemplate(); 