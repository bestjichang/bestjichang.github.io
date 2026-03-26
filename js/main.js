// Main Application Logic
(function() {
    'use strict';
    
    // Load airport data
    let airportsData = null;
    
    // DOM Elements
    const featuredContainer = document.getElementById('featured-airports');
    const airportsGrid = document.getElementById('airports-grid');
    const comparisonTable = document.getElementById('comparison-table');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Generate rating stars
    function generateStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? '★' : '☆';
        }
        return stars;
    }
    
    // Generate airport card HTML - Horizontal Layout
    function generateAirportCard(airport, isFeatured = false) {
        const couponHtml = airport.coupon ? 
            `<div class="coupon mb-2">优惠码：${airport.coupon} <span class="text-xs ml-1">(${airport.couponDesc})</span></div>` : '';
        
        const featuresHtml = airport.features.slice(0, 4).map(feature => 
            `<li class="flex items-start">
                <svg class="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>${feature}</span>
            </li>`
        ).join('');
        
        const plansHtml = airport.plans.slice(0, 3).map(plan => 
            `<div class="plan">
                <div>
                    <span class="price">${plan.price}</span>
                    <span class="block text-xs text-text-secondary-light dark:text-text-secondary-dark">${plan.name}</span>
                </div>
                <span class="details">${plan.details}</span>
            </div>`
        ).join('');
        
        const featuredClass = isFeatured ? 'ring-2 ring-primary-light dark:ring-primary-dark' : '';
        const featuredBadge = isFeatured ? '<span class="inline-block px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded mb-2">主力推荐</span>' : '';
        
        return `
            <div class="card ${featuredClass}" data-category="${airport.category}">
                <div class="card-header">
                    ${featuredBadge}
                    <h3 class="text-xl font-bold mb-2">${airport.name}</h3>
                    <div class="rating">${generateStars(airport.rating)}</div>
                    <a href="${airport.url}" target="_blank" rel="noopener noreferrer" class="btn-primary w-full mt-4">
                        官网入口
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                    ${couponHtml}
                </div>
                <div class="card-content">
                    <div>
                        <h4 class="font-semibold mb-2">核心优势</h4>
                        <ul class="features">
                            ${featuresHtml}
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-2">推荐套餐</h4>
                        <div class="space-y-2">
                            ${plansHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render featured airports
    function renderFeaturedAirports() {
        if (!featuredContainer || !airportsData) return;
        
        featuredContainer.innerHTML = airportsData.featured.map(airport => 
            generateAirportCard(airport, true)
        ).join('');
    }
    
    // Check if airport has unlimited package
    function hasUnlimitedPackage(airport) {
        return airport.plans.some(plan =>
            plan.name && plan.name.includes('不限时')
        );
    }
    
    // Render all airports
    function renderAirports(filter = 'all') {
        if (!airportsGrid || !airportsData) return;
        
        let airports = airportsData.airports;
        
        if (filter !== 'all') {
            if (filter === 'unlimited') {
                // Filter airports that have unlimited packages (including featured)
                const allAirports = [...airportsData.featured, ...airportsData.airports];
                airports = allAirports.filter(hasUnlimitedPackage);
            } else {
                airports = airports.filter(airport => airport.category === filter);
            }
        }
        
        airportsGrid.innerHTML = airports.map(airport => 
            generateAirportCard(airport)
        ).join('');
    }
    
    // Render comparison table
    function renderComparisonTable() {
        if (!comparisonTable || !airportsData) return;
        
        const allAirports = [...airportsData.featured, ...airportsData.airports];
        
        comparisonTable.innerHTML = allAirports.map(airport => `
            <tr class="border-b border-border-light dark:border-border-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark">
                <td class="font-medium">${airport.name}</td>
                <td>${airport.minPrice}</td>
                <td>${airport.maxSpeed}</td>
                <td>${airport.specialFeatures}</td>
                <td class="rating">${generateStars(airport.rating)}</td>
            </tr>
        `).join('');
    }
    
    // Filter functionality
    function setupFilters() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter airports
                const filter = button.dataset.filter;
                renderAirports(filter);
            });
        });
    }
    
    // Load airport data
    async function loadAirportsData() {
        try {
            const response = await fetch('data/airports.json');
            if (!response.ok) {
                throw new Error('Failed to load airports data');
            }
            airportsData = await response.json();
            
            // Render content
            renderFeaturedAirports();
            renderAirports();
            renderComparisonTable();
        } catch (error) {
            console.error('Error loading airports data:', error);
            if (airportsGrid) {
                airportsGrid.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <p class="text-text-secondary-light dark:text-text-secondary-dark">加载机场数据失败，请刷新页面重试。</p>
                    </div>
                `;
            }
        }
    }
    
    // Initialize
    function init() {
        loadAirportsData();
        setupFilters();
    }
    
    // Run on DOM content loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
