// Shopping Cart Management
let cart = JSON.parse(localStorage.getItem('kalonji-cart')) || [];

// Add item to cart
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCart();
    showCartNotification(product.name);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        saveCart();
    }
}

// Calculate cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count badge
    if (cartCount) {
        const itemCount = getCartItemCount();
        cartCount.textContent = itemCount;
        cartCount.style.display = itemCount > 0 ? 'flex' : 'none';
    }
    
    // Update cart items
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">KSh ${item.price.toLocaleString()}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; background: #ff4444; color: white;">×</button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }
    
    // Update cart total
    if (cartTotal) {
        cartTotal.textContent = getCartTotal().toLocaleString();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('kalonji-cart', JSON.stringify(cart));
}

// Show cart notification
function showCartNotification(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle"></i>
            <span>${productName} added to cart!</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Generate WhatsApp message
function generateWhatsAppMessage() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let message = "Hello! I'd like to place an order from Kalonji Online Shop:\n\n";
    
    cart.forEach(item => {
        message += `• ${item.name} - Qty: ${item.quantity} - KSh ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\nTotal: KSh ${getCartTotal().toLocaleString()}\n\n`;
    message += "Please confirm availability and delivery details. Thank you!";
    
    const whatsappNumber = "254700000000"; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    
    // Cart modal functionality
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            cartModal.classList.add('active');
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
        });
    }
    
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            generateWhatsAppMessage();
            cartModal.classList.remove('active');
        });
    }
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                generateWhatsAppMessage();
            } else {
                const message = "Hello! I'm interested in your products. Could you please share your catalog?";
                const whatsappNumber = "254700000000";
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    }
});
