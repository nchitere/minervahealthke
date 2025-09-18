// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                searchProducts(query);
                // Scroll to products section
                document.querySelector('.products-section').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    searchProducts(query);
                    // Scroll to products section
                    document.querySelector('.products-section').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }
            }
        });
        
        // Real-time search with improved debouncing
        let searchInputTimeout;
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            // Clear previous timeout
            if (searchInputTimeout) {
                clearTimeout(searchInputTimeout);
            }
            
            // Debounce the search
            searchInputTimeout = setTimeout(() => {
                if (query.length >= 2) {
                    searchProducts(query);
                } else if (query.length === 0) {
                    renderProducts(); // Show all products
                }
            }, 300); // Increased debounce time for better performance
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            let whatsappMessage = `Hello! I'm ${name} and I'd like to get in touch.\n\n`;
            whatsappMessage += `Email: ${email}\n`;
            if (phone) whatsappMessage += `Phone: ${phone}\n`;
            whatsappMessage += `\nMessage: ${message}`;
            
            const whatsappNumber = "254700000000";
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            showNotification('Message sent! We\'ll get back to you soon.', 'success');
        });
    }
    
    // Scroll-based animations with improved performance
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('fade-in-up')) {
                entry.target.classList.add('fade-in-up');
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Function to observe new elements
    function observeNewElements() {
        // Only observe elements that don't already have the animation class
        document.querySelectorAll('.feature-card:not(.fade-in-up), .category-card:not(.fade-in-up)').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initial observation
    observeNewElements();
    
    // Create a separate observer for product cards that are dynamically added
    const productObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('observed')) {
                entry.target.classList.add('observed');
                // Product cards get their animation from the renderProducts function
                productObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Function to observe new product cards
    window.observeProductCards = function() {
        document.querySelectorAll('.product-card:not(.observed)').forEach(el => {
            productObserver.observe(el);
        });
    };
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Update active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Dropdown menu functionality
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', function() {
            dropdownMenu.style.display = 'block';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.style.display = 'none';
        });
        
        // Handle dropdown links
        dropdownMenu.querySelectorAll('a[data-category]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                filterProducts(category);
                
                // Scroll to products section
                document.querySelector('.products-section').scrollIntoView({ 
                    behavior: 'smooth' 
                });
                
                dropdownMenu.style.display = 'none';
            });
        });
    });
    
    // Footer category links
    document.querySelectorAll('footer a[data-category]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterProducts(category);
            
            // Scroll to products section
            document.querySelector('.products-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });
    
    // CTA button functionality
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.products-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });
    
    // Loading states for buttons with better UX
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const button = e.target;
            const originalText = button.textContent;
            
            button.textContent = 'Adding...';
            button.disabled = true;
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                button.textContent = 'Added!';
                button.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.opacity = '1';
                    button.style.backgroundColor = '';
                }, 800);
            }, 600);
        }
    });
});

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Page is visible, update cart UI in case it was modified in another tab
        updateCartUI();
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const cartModal = document.getElementById('cartModal');
        if (cartModal && cartModal.classList.contains('active')) {
            cartModal.classList.remove('active');
        }
    }
    
    // Search with Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
});
