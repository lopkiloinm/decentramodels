// AI Model Hub JavaScript - Fixed Version

// Model data
const modelsData = [
    {
        name: "Pony Diffusion V6 XL",
        platform: "Civitai",
        category: "Anime/Anthro",
        base: "SDXL",
        downloads: "250.9M",
        rating: 4.8,
        specialty: "Furry, Anime, Cartoon",
        hardware: "12GB+ VRAM",
        architecture: "sdxl",
        style: "anime",
        usecase: "character",
        quality: "production"
    },
    {
        name: "Illustrious XL v1.1",
        platform: "Civitai",
        category: "Anime",
        base: "SDXL",
        downloads: "82K",
        rating: 4.9,
        specialty: "Character comprehension",
        hardware: "12GB+ VRAM",
        architecture: "sdxl",
        style: "anime",
        usecase: "character",
        quality: "production"
    },
    {
        name: "NoobAI-XL V-Pred",
        platform: "Civitai",
        category: "Anime",
        base: "SDXL Custom",
        downloads: "3.3M",
        rating: 4.7,
        specialty: "Comprehensive anime",
        hardware: "12GB+ VRAM",
        architecture: "sdxl",
        style: "anime",
        usecase: "character",
        quality: "production"
    },
    {
        name: "Imagen4 Preview",
        platform: "Fal.ai",
        category: "Commercial",
        base: "Proprietary",
        api_cost: "$0.05/image",
        rating: 4.9,
        specialty: "Highest quality",
        hardware: "Cloud only",
        architecture: "proprietary",
        style: "realistic",
        usecase: "concept",
        quality: "production"
    },
    {
        name: "FLUX.1 Kontext Pro",
        platform: "Fal.ai",
        category: "Professional",
        base: "FLUX",
        api_cost: "$0.03/image",
        rating: 4.8,
        specialty: "Reference-guided editing",
        hardware: "Cloud only",
        architecture: "flux",
        style: "realistic",
        usecase: "concept",
        quality: "production"
    },
    {
        name: "Veo 3",
        platform: "Fal.ai",
        category: "Video",
        base: "Proprietary",
        api_cost: "$0.50/video",
        rating: 4.9,
        specialty: "Cinematic video",
        hardware: "Cloud only",
        architecture: "proprietary",
        style: "realistic",
        usecase: "concept",
        quality: "production"
    },
    {
        name: "Realistic Vision V6.0",
        platform: "Civitai",
        category: "Realistic",
        base: "SDXL",
        downloads: "45.2M",
        rating: 4.6,
        specialty: "Photorealistic images",
        hardware: "8GB+ VRAM",
        architecture: "sdxl",
        style: "realistic",
        usecase: "portrait",
        quality: "standard"
    },
    {
        name: "FLUX.1 Dev",
        platform: "Fal.ai",
        category: "Open Source",
        base: "FLUX",
        api_cost: "$0.02/image",
        rating: 4.7,
        specialty: "Open source excellence",
        hardware: "Cloud/Local",
        architecture: "flux",
        style: "artistic",
        usecase: "concept",
        quality: "standard"
    }
];

// Platform comparison data
const platformData = {
    labels: [
        'Community Models',
        'API Infrastructure', 
        'Anime/Manga Models',
        'Commercial Models',
        'Training Tools',
        'Speed',
        'Cost Effectiveness',
        'Customization',
        'Reliability',
        'Model Variety'
    ],
    datasets: [
        {
            label: 'Civitai',
            data: [10, 4, 9, 3, 6, 6, 9, 10, 7, 9],
            backgroundColor: '#3B82F6',
            borderColor: '#3B82F6',
            borderWidth: 1
        },
        {
            label: 'Fal.ai',
            data: [3, 10, 4, 10, 8, 9, 6, 5, 9, 7],
            backgroundColor: '#F97316',
            borderColor: '#F97316',
            borderWidth: 1
        }
    ]
};

// Global state
let currentFilters = {
    platform: 'all',
    architecture: '',
    style: '',
    usecase: '',
    quality: ''
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing AI Model Hub...');
    initializeApp();
});

function initializeApp() {
    renderModels();
    initializePlatformChart();
    initializeFilters();
    initializeTabs();
    initializeComparison();
    initializePlatformSwitcher();
    initializeSearch();
    console.log('App initialized successfully');
}

// Render model cards
function renderModels() {
    const modelGrid = document.getElementById('modelGrid');
    if (!modelGrid) {
        console.warn('Model grid element not found');
        return;
    }

    modelGrid.innerHTML = modelsData.map(model => createModelCard(model)).join('');
    console.log('Models rendered:', modelsData.length);
}

function createModelCard(model) {
    const platformClass = model.platform === 'Civitai' ? 'platform--civitai' : 'platform--fal';
    const costInfo = model.api_cost || model.downloads;
    const costLabel = model.api_cost ? 'API Cost' : 'Downloads';
    const platformSlug = model.platform.toLowerCase().replace('.', '');
    
    return `
        <div class="model-card" data-platform="${platformSlug}" 
             data-architecture="${model.architecture}" data-style="${model.style}" 
             data-usecase="${model.usecase}" data-quality="${model.quality}">
            <div class="model-card__header">
                <h3 class="model-card__title">${model.name}</h3>
                <span class="model-card__platform ${platformClass}">${model.platform}</span>
            </div>
            <div class="model-card__stats">
                <span>⭐ ${model.rating}</span>
                <span>${costLabel}: ${costInfo}</span>
                <span>Base: ${model.base}</span>
            </div>
            <p class="model-card__specialty">${model.specialty}</p>
            <div class="model-card__tags">
                <span class="tag tag--base">${model.base}</span>
                <span class="tag tag--specialty">${model.category}</span>
            </div>
            <div class="model-card__actions">
                <button class="btn btn--primary btn--sm" onclick="handleModelAction('${model.name}', '${model.platform}')">
                    ${model.platform === 'Civitai' ? 'Download' : 'Use API'}
                </button>
                <button class="btn btn--outline btn--sm" onclick="showModelDetails('${model.name}')">Details</button>
            </div>
        </div>
    `;
}

// Initialize platform comparison chart
function initializePlatformChart() {
    const ctx = document.getElementById('platformChart');
    if (!ctx) {
        console.warn('Platform chart canvas not found');
        return;
    }

    try {
        new Chart(ctx, {
            type: 'bar',
            data: platformData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: 'Platform Capabilities Comparison (1-10 Scale)',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim(),
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 10,
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim()
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim()
                        }
                    },
                    y: {
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim()
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim()
                        }
                    }
                }
            }
        });
        console.log('Platform chart initialized');
    } catch (error) {
        console.error('Failed to initialize platform chart:', error);
    }
}

// Initialize filters - Fixed
function initializeFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    console.log('Found filter selects:', filterSelects.length);
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log('Filter changed:', this.dataset.filter, this.value);
            currentFilters[this.dataset.filter] = this.value;
            applyFilters();
        });
    });
}

function applyFilters() {
    console.log('Applying filters:', currentFilters);
    const modelCards = document.querySelectorAll('.model-card');
    let visibleCount = 0;
    
    modelCards.forEach(card => {
        const matchesArchitecture = !currentFilters.architecture || card.dataset.architecture === currentFilters.architecture;
        const matchesStyle = !currentFilters.style || card.dataset.style === currentFilters.style;
        const matchesUsecase = !currentFilters.usecase || card.dataset.usecase === currentFilters.usecase;
        const matchesQuality = !currentFilters.quality || card.dataset.quality === currentFilters.quality;
        const matchesPlatform = currentFilters.platform === 'all' || card.dataset.platform === currentFilters.platform;
        
        const shouldShow = matchesArchitecture && matchesStyle && matchesUsecase && matchesQuality && matchesPlatform;
        
        if (shouldShow) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    console.log('Visible models after filtering:', visibleCount);
}

// Initialize tabs - Fixed
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    console.log('Found tab buttons:', tabButtons.length);
    console.log('Found tab panes:', tabPanes.length);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            console.log('Tab clicked:', targetTab);
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('tab-button--active'));
            tabPanes.forEach(pane => pane.classList.remove('tab-pane--active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('tab-button--active');
            const targetPane = document.getElementById(targetTab + '-tab');
            if (targetPane) {
                targetPane.classList.add('tab-pane--active');
                console.log('Activated tab:', targetTab);
            } else {
                console.warn('Tab pane not found:', targetTab + '-tab');
            }
        });
    });
}

// Initialize comparison tool - Enhanced
function initializeComparison() {
    const modelASelect = document.getElementById('modelA');
    const modelBSelect = document.getElementById('modelB');
    const comparisonResults = document.getElementById('comparisonResults');
    
    if (!modelASelect || !modelBSelect) {
        console.warn('Comparison selectors not found');
        return;
    }
    
    // Populate model selectors
    const modelOptions = modelsData.map(model => 
        `<option value="${model.name}">${model.name} (${model.platform})</option>`
    ).join('');
    
    modelASelect.innerHTML = '<option value="">Choose a model...</option>' + modelOptions;
    modelBSelect.innerHTML = '<option value="">Choose a model...</option>' + modelOptions;
    
    // Add change listeners
    modelASelect.addEventListener('change', updateComparison);
    modelBSelect.addEventListener('change', updateComparison);
    
    function updateComparison() {
        const modelAName = modelASelect.value;
        const modelBName = modelBSelect.value;
        
        if (!modelAName || !modelBName) {
            comparisonResults.innerHTML = '<p>Select two models to compare their features, performance, and costs.</p>';
            return;
        }
        
        if (modelAName === modelBName) {
            comparisonResults.innerHTML = '<p>Please select two different models to compare.</p>';
            return;
        }
        
        const modelA = modelsData.find(m => m.name === modelAName);
        const modelB = modelsData.find(m => m.name === modelBName);
        
        if (!modelA || !modelB) {
            console.warn('Models not found for comparison');
            return;
        }
        
        comparisonResults.innerHTML = createComparisonTable(modelA, modelB);
        console.log('Comparison updated:', modelAName, 'vs', modelBName);
    }
    
    console.log('Comparison tool initialized');
}

function createComparisonTable(modelA, modelB) {
    return `
        <div class="comparison-table">
            <div class="comparison-row">
                <div class="comparison-cell"><strong>Attribute</strong></div>
                <div class="comparison-cell"><strong>${modelA.name}</strong></div>
                <div class="comparison-cell"><strong>${modelB.name}</strong></div>
            </div>
            <div class="comparison-row">
                <div class="comparison-cell">Platform</div>
                <div class="comparison-cell">${modelA.platform}</div>
                <div class="comparison-cell">${modelB.platform}</div>
            </div>
            <div class="comparison-row">
                <div class="comparison-cell">Base Architecture</div>
                <div class="comparison-cell">${modelA.base}</div>
                <div class="comparison-cell">${modelB.base}</div>
            </div>
            <div class="comparison-row">
                <div class="comparison-cell">Rating</div>
                <div class="comparison-cell">⭐ ${modelA.rating}</div>
                <div class="comparison-cell">⭐ ${modelB.rating}</div>
            </div>
            <div class="comparison-row">
                <div class="comparison-cell">Specialty</div>
                <div class="comparison-cell">${modelA.specialty}</div>
                <div class="comparison-cell">${modelB.specialty}</div>
            </div>
            <div class="comparison-row">
                <div class="comparison-cell">Hardware</div>
                <div class="comparison-cell">${modelA.hardware}</div>
                <div class="comparison-cell">${modelB.hardware}</div>
            </div>
            <div class="comparison-row">
                <div class="comparison-cell">Cost/Downloads</div>
                <div class="comparison-cell">${modelA.api_cost || modelA.downloads}</div>
                <div class="comparison-cell">${modelB.api_cost || modelB.downloads}</div>
            </div>
        </div>
    `;
}

// Initialize platform switcher - Fixed
function initializePlatformSwitcher() {
    const platformButtons = document.querySelectorAll('.platform-btn');
    console.log('Found platform buttons:', platformButtons.length);
    
    platformButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            console.log('Platform switched to:', platform);
            
            // Update active button
            platformButtons.forEach(btn => btn.classList.remove('platform-btn--active'));
            this.classList.add('platform-btn--active');
            
            // Update global filter and apply
            currentFilters.platform = platform;
            applyFilters();
        });
    });
}

// Initialize search functionality - Enhanced
function initializeSearch() {
    const searchInput = document.querySelector('.search__input');
    const searchButton = document.querySelector('.search__button');
    
    if (!searchInput) {
        console.warn('Search input not found');
        return;
    }
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value);
        }, 300);
    });
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
    
    console.log('Search functionality initialized');
}

function performSearch(query) {
    console.log('Performing search:', query);
    
    if (!query.trim()) {
        // Reset filters and show all models
        applyFilters();
        return;
    }
    
    const searchTerm = query.toLowerCase();
    const modelCards = document.querySelectorAll('.model-card');
    let foundCount = 0;
    
    modelCards.forEach(card => {
        const modelName = card.querySelector('.model-card__title').textContent.toLowerCase();
        const specialty = card.querySelector('.model-card__specialty').textContent.toLowerCase();
        const platform = card.querySelector('.model-card__platform').textContent.toLowerCase();
        
        const matches = modelName.includes(searchTerm) || 
                       specialty.includes(searchTerm) || 
                       platform.includes(searchTerm);
        
        // Check if card passes other filters too
        const matchesFilters = checkCardAgainstFilters(card);
        const shouldShow = matches && matchesFilters;
        
        card.style.display = shouldShow ? 'block' : 'none';
        
        if (shouldShow) {
            card.style.animation = 'fadeIn 0.3s ease-in';
            foundCount++;
        }
    });
    
    console.log('Search results:', foundCount, 'models found');
}

function checkCardAgainstFilters(card) {
    const matchesArchitecture = !currentFilters.architecture || card.dataset.architecture === currentFilters.architecture;
    const matchesStyle = !currentFilters.style || card.dataset.style === currentFilters.style;
    const matchesUsecase = !currentFilters.usecase || card.dataset.usecase === currentFilters.usecase;
    const matchesQuality = !currentFilters.quality || card.dataset.quality === currentFilters.quality;
    const matchesPlatform = currentFilters.platform === 'all' || card.dataset.platform === currentFilters.platform;
    
    return matchesArchitecture && matchesStyle && matchesUsecase && matchesQuality && matchesPlatform;
}

// Button action handlers
function handleModelAction(modelName, platform) {
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Loading...';
    button.disabled = true;
    
    console.log('Model action:', modelName, platform);
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        
        if (platform === 'Civitai') {
            alert(`Starting download for ${modelName}. In a real app, this would open the download page.`);
        } else {
            alert(`Opening API access for ${modelName}. In a real app, this would show API documentation.`);
        }
    }, 1500);
}

function showModelDetails(modelName) {
    console.log('Show details for:', modelName);
    const model = modelsData.find(m => m.name === modelName);
    
    if (model) {
        alert(`Model Details:\n\nName: ${model.name}\nPlatform: ${model.platform}\nBase: ${model.base}\nRating: ${model.rating}★\nSpecialty: ${model.specialty}\nHardware: ${model.hardware}\n\nIn a real app, this would open a detailed model page.`);
    }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Dark mode detection and chart color updates
function updateChartColors() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('Color scheme:', isDarkMode ? 'dark' : 'light');
}

// Listen for color scheme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addListener(updateChartColors);
}

console.log('AI Model Hub JavaScript loaded successfully');