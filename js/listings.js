// listings.js - Dynamic listing rendering, sorting, and filtering logic

// Actual Property Database
const properties = [
    {
        id: "PRP-001",
        title: "Exclusive Land - Prime Location",
        location: "Colombo", // Mapping Kollupitiya to Colombo for filter
        type: "Estate",
        price: 3800000000,
        priceFormatted: "LKR 3.8 Billion",
        specs: `<span><i class="fas fa-chart-area text-gold mr-2"></i> 114 Perches</span><span><i class="fas fa-landmark text-gold mr-2"></i> Near Temple Trees</span>`,
        description: "114 Perches of prime exclusive land for sale in Kollupitiya. Prime location near Temple Trees. A rare opportunity for high-value development.",
        image: "assets/listing_land.jpg",
        featured: true,
        tag: "For Sale",
        dateAdded: new Date("2026-03-01")
    },
    {
        id: "PRP-002",
        title: "Modern 3-Story Villa",
        location: "Galle", // Mapping Unawatuna to Galle for filter
        type: "Villa",
        price: 110000000,
        priceFormatted: "LKR 110 Million",
        specs: `<span><i class="fas fa-home text-gold mr-2"></i> 3 Story Villa</span><span><i class="fas fa-chart-area text-gold mr-2"></i> 47 Perches</span>`,
        description: "A stunning modern 3-story villa located in Unawatuna (Nearest town: Galle). Ideal for luxury living or high yield luxury rentals.",
        image: "assets/listing_villa.jpg",
        featured: true,
        tag: "For Sale",
        dateAdded: new Date("2026-03-02")
    },
    {
        id: "PRP-003",
        title: "Beach Front Mansion",
        location: "Pamunugama", // Mapping Bopitiya to Pamunugama for filter
        type: "Mansion",
        price: 180000000,
        priceFormatted: "LKR 180 Million",
        specs: `<span><i class="fas fa-home text-gold mr-2"></i> 10 300 Sqft</span><span><i class="fas fa-chart-area text-gold mr-2"></i> 62.5 Perches</span>`,
        description: "An Exclusive Beachfront Masterpiece in Bopitiya, Pamunugama.",
        image: "assets/listing_180.png",
        featured: true,
        tag: "For Sale",
        dateAdded: new Date("2026-03-02")
    },
    {
        id: "PRP-004",
        title: "Luxury Mansion in Nawala",
        location: "Nawala",
        type: "Mansion",
        price: 550000000,
        priceFormatted: "LKR 550 Million",
        specs: `<span><i class="fas fa-home text-gold mr-2"></i> Iconic House</span><span><i class="fas fa-chart-area text-gold mr-2"></i> 64 Perches</span>`,
        description: "A breathtaking luxury mansion for sale in the prime location of Nawala, featuring iconic architecture and an expansive 64 perch land area.",
        image: "assets/listing_nawala.jpg",
        featured: false, // Set to false so it doesn't automatically show on the home page if we were to dynamically pull featured
        tag: "For Sale",
        dateAdded: new Date("2026-03-03")
    }
];

document.addEventListener('DOMContentLoaded', () => {

    // DOM Elements
    const grid = document.getElementById('listings-grid');
    const emptyState = document.getElementById('empty-state');
    const resultsCount = document.getElementById('results-count');

    // Filter Inputs
    const searchInput = document.getElementById('search-input');
    const locationSelect = document.getElementById('location-select');
    const typeSelect = document.getElementById('type-select');
    const sortSelect = document.getElementById('sort-select');

    const resetBtn = document.getElementById('reset-filters');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    // Make sure we are on the listings page
    if (!grid) return;

    // Render Function
    function renderProperties(data) {
        grid.innerHTML = '';

        if (data.length === 0) {
            grid.classList.add('hidden');
            emptyState.classList.remove('hidden');
        } else {
            grid.classList.remove('hidden');
            emptyState.classList.add('hidden');

            data.forEach((prop, index) => {
                const delay = (index % 3) * 100;

                const card = `
                <div class="group bg-dark border border-gray-800 overflow-hidden transform hover:-translate-y-2 transition-all duration-500 hover:shadow-gold-glow gold-border-glow reveal active delay-${delay}">
                    <div class="relative h-64 overflow-hidden">
                        <img src="${prop.image}" alt="${prop.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                        <div class="absolute top-4 left-4 bg-dark/80 backdrop-blur text-gold px-3 py-1 text-xs uppercase tracking-widest border border-gold/50">${prop.tag}</div>
                    </div>
                    <div class="p-6">
                        <div class="text-softGray text-sm mb-2 flex items-center justify-between">
                            <span><i class="fas fa-map-marker-alt text-gold mr-1"></i> ${prop.id === 'PRP-001' ? 'Kollupitiya' : (prop.id === 'PRP-002' ? 'Unawatuna' : prop.location)}, Sri Lanka</span>
                            <span class="text-xs tracking-widest uppercase opacity-50">${prop.id}</span>
                        </div>
                        <h3 class="font-serif text-2xl text-white mb-2 line-clamp-1">${prop.title}</h3>
                        <p class="text-gold text-xl font-medium mb-4">${prop.priceFormatted}</p>
                        <p class="text-sm font-light text-lightGray mb-6 line-clamp-2">${prop.description}</p>
                        <hr class="border-gray-800 mb-6">
                        <div class="flex justify-between items-center text-sm text-lightGray mb-6">
                            ${prop.specs}
                        </div>
                        <a href="index.html#contact" class="block w-full text-center gold-gradient text-black font-semibold border border-transparent py-3 hover:shadow-gold-glow transition-all duration-300 uppercase tracking-widest text-sm">Inquire Now</a>
                    </div>
                </div>
                `;
                grid.insertAdjacentHTML('beforeend', card);
            });

            if (window.revealObserver) {
                document.querySelectorAll('#listings-grid .reveal').forEach(el => window.revealObserver.observe(el));
            }
        }

        resultsCount.innerText = data.length;
    }

    // Filter Logic
    function applyFilters() {
        let filtered = [...properties];

        const searchTerm = searchInput.value.toLowerCase();
        const loc = locationSelect.value;
        const type = typeSelect.value;
        const sortMode = sortSelect.value;

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchTerm) ||
                p.location.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.id.toLowerCase().includes(searchTerm)
            );
        }

        if (loc !== 'all') {
            filtered = filtered.filter(p => p.location === loc);
        }

        if (type !== 'all') {
            filtered = filtered.filter(p => p.type === type);
        }

        if (sortMode === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortMode === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortMode === 'featured') {
            filtered.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return b.dateAdded - a.dateAdded;
            });
        }

        renderProperties(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    locationSelect.addEventListener('change', applyFilters);
    typeSelect.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    function handleReset() {
        searchInput.value = '';
        locationSelect.value = 'all';
        typeSelect.value = 'all';
        sortSelect.value = 'featured';
        applyFilters();
    }

    resetBtn.addEventListener('click', handleReset);
    clearSearchBtn.addEventListener('click', handleReset);

    applyFilters();
});
