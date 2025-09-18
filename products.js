// Product Data - Organized by Body System
const products = [
    // DIGESTIVE SYSTEM
    {
        id: 1,
        name: "Black Seed Oil (Kalonji Oil)",
        category: "digestive",
        price: 1500,
        image: "images/products/black-seed-oil.jpg",
        description: "Pure black seed oil with powerful antioxidant properties for digestive health and overall wellness.",
        badge: "Best Seller"
    },
    {
        id: 15,
        name: "Probiotics 50 Billion CFU",
        category: "digestive",
        price: 3800,
        image: "images/products/probiotics.jpg",
        description: "High-potency probiotic supplement for optimal digestive health and gut microbiome balance.",
        badge: "Best Seller"
    },
    {
        id: 17,
        name: "Green Tea Extract",
        category: "digestive",
        price: 1800,
        image: "images/products/green-tea.jpg",
        description: "Concentrated green tea extract with powerful antioxidants for digestive support and metabolism.",
        badge: ""
    },
    
    // CIRCULATORY SYSTEM
    {
        id: 6,
        name: "Omega-3 Fish Oil",
        category: "circulatory",
        price: 2500,
        image: "images/products/omega3.jpg",
        description: "High-quality fish oil capsules for heart health, circulation, and cardiovascular support.",
        badge: ""
    },
    {
        id: 2,
        name: "Vitamin D3 5000 IU",
        category: "circulatory",
        price: 2200,
        image: "images/products/vitamin-d3.jpg",
        description: "High potency Vitamin D3 supplement for cardiovascular health and circulation support.",
        badge: ""
    },
    {
        id: 11,
        name: "Magnesium Glycinate",
        category: "circulatory",
        price: 2000,
        image: "images/products/magnesium.jpg",
        description: "Highly absorbable magnesium for heart function, circulation, and cardiovascular health.",
        badge: ""
    },
    
    // REPRODUCTIVE SYSTEM
    {
        id: 18,
        name: "Zinc Picolinate 30mg",
        category: "reproductive",
        price: 1400,
        image: "images/products/zinc.jpg",
        description: "Highly bioavailable zinc for reproductive health, hormone balance, and fertility support.",
        badge: ""
    },
    {
        id: 13,
        name: "Ashwagandha Root Extract",
        category: "reproductive",
        price: 2400,
        image: "images/products/ashwagandha.jpg",
        description: "Adaptogenic herb for hormonal balance, reproductive health, and stress management.",
        badge: ""
    },
    
    // SKIN SYSTEM
    {
        id: 4,
        name: "Collagen Beauty Powder",
        category: "skin",
        price: 3500,
        image: "images/products/collagen.jpg",
        description: "Marine collagen powder for healthy skin, hair, nails, and youthful appearance.",
        badge: "New"
    },
    {
        id: 9,
        name: "Argan Oil Hair Treatment",
        category: "skin",
        price: 2800,
        image: "images/products/argan-oil.jpg",
        description: "Pure Moroccan argan oil for skin nourishment, hair repair, and natural beauty.",
        badge: ""
    },
    {
        id: 12,
        name: "Rosehip Oil Serum",
        category: "skin",
        price: 3200,
        image: "images/products/rosehip-oil.jpg",
        description: "Anti-aging rosehip oil serum for radiant, youthful skin and natural skincare.",
        badge: "Premium"
    },
    {
        id: 16,
        name: "Coconut Oil Virgin",
        category: "skin",
        price: 1200,
        image: "images/products/coconut-oil.jpg",
        description: "Cold-pressed virgin coconut oil for natural skin and hair care moisturizing.",
        badge: "Organic"
    },
    {
        id: 20,
        name: "Jojoba Oil Pure",
        category: "skin",
        price: 2500,
        image: "images/products/jojoba-oil.jpg",
        description: "Pure jojoba oil for skin moisturizing, balance, and natural beauty care.",
        badge: ""
    },
    
    // OTHERS (General Health & Nutrition)
    {
        id: 3,
        name: "Organic Turmeric Capsules",
        category: "others",
        price: 1800,
        image: "images/products/turmeric.jpg",
        description: "Premium organic turmeric with curcumin for anti-inflammatory support and general wellness.",
        badge: "Organic"
    },
    {
        id: 5,
        name: "Spirulina Superfood Tablets",
        category: "others",
        price: 2800,
        image: "images/products/spirulina.jpg",
        description: "Nutrient-dense spirulina tablets packed with protein, vitamins, and essential nutrients.",
        badge: ""
    },
    {
        id: 7,
        name: "Moringa Leaf Powder",
        category: "others",
        price: 1200,
        image: "images/products/moringa.jpg",
        description: "Pure moringa leaf powder rich in vitamins, minerals, and essential nutrients.",
        badge: "Organic"
    },
    {
        id: 8,
        name: "Vitamin C 1000mg",
        category: "others",
        price: 1600,
        image: "images/products/vitamin-c.jpg",
        description: "High-potency Vitamin C tablets for immune system support and antioxidant protection.",
        badge: ""
    },
    {
        id: 10,
        name: "Chia Seeds Organic",
        category: "others",
        price: 800,
        image: "images/products/chia-seeds.jpg",
        description: "Premium organic chia seeds rich in omega-3, fiber, and essential nutrients.",
        badge: "Organic"
    },
    {
        id: 14,
        name: "Goji Berries Dried",
        category: "others",
        price: 1500,
        image: "images/products/goji-berries.jpg",
        description: "Antioxidant-rich goji berries for immune support, eye health, and general wellness.",
        badge: ""
    },
    {
        id: 19,
        name: "Quinoa Seeds Organic",
        category: "others",
        price: 1800,
        image: "images/products/quinoa.jpg",
        description: "Complete protein quinoa seeds for healthy nutrition and balanced diet support.",
        badge: "Organic"
    }
];

// Render products function with improved performance
function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    // Add loading state
    productsGrid.classList.add('products-loading');
    
    // Use requestAnimationFrame for smooth rendering
    requestAnimationFrame(() => {
        // Clear existing products
        productsGrid.innerHTML = '';
        
        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        productsToRender.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-category', product.category);
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-info">
                    <div class="product-category">${getCategoryName(product.category)}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">KSh ${product.price.toLocaleString()}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            `;
            
            fragment.appendChild(productCard);
        });
        
        // Append all cards at once
        productsGrid.appendChild(fragment);
        
        // Remove loading state and add loaded state
        productsGrid.classList.remove('products-loading');
        productsGrid.classList.add('products-loaded');
        
        // Add staggered animation to new products
        const newCards = productsGrid.querySelectorAll('.product-card');
        newCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 50); // Stagger by 50ms
        });
        
        // Observe new product cards if the function exists
        if (typeof window.observeProductCards === 'function') {
            setTimeout(() => {
                window.observeProductCards();
            }, 100);
        }
    });
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        'digestive': 'Digestive System',
        'circulatory': 'Circulatory System',
        'reproductive': 'Reproductive System',
        'skin': 'Skin System',
        'urinary': 'Urinary System',
        'others': 'General Health & Nutrition'
    };
    return categoryNames[category] || category;
}

// Filter products by category with smooth transition
function filterProducts(category) {
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    
    // Update active filter button first
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-filter="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Render products with smooth transition
    renderProducts(filteredProducts);
}

// Search products with debouncing
let searchTimeout;
function searchProducts(query) {
    // Clear previous timeout
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    // Debounce search to prevent excessive re-renders
    searchTimeout = setTimeout(() => {
        const searchTerm = query.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    }, 200); // 200ms debounce
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    
    // Add event listeners for filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
    
    // Add event listeners for category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProducts(category);
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });
});
