// Sweet Whisk Creations – Digital Menu JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeMenu();
    setupWhatsAppIntegration();
    setupPrintFunctionality();
    addScrollAnimations();
    enhanceAccessibility();
    console.log('Sweet Whisk Creations Menu Loaded Successfully');
});

// Initialize menu with fade-in effect
function initializeMenu() {
    // Add smooth fade-in animation for the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease-in-out';
    
    // Trigger fade-in after a brief delay
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
}

// Setup WhatsApp link functionality
function setupWhatsAppIntegration() {
    const whatsappLink = document.querySelector('.whatsapp-link');
    
    if (whatsappLink) {
        // Ensure the link works properly
        whatsappLink.addEventListener('click', function(e) {
            // Store original text
            const originalText = this.textContent;
            
            // Show feedback
            this.textContent = 'Opening WhatsApp...';
            
            // Reset text after delay
            setTimeout(() => {
                this.textContent = originalText;
            }, 1500);
            
            // Log for debugging
            console.log('WhatsApp link clicked - opening wa.me/919867219151');
        });
        
        // Ensure target="_blank" is set
        whatsappLink.setAttribute('target', '_blank');
        whatsappLink.setAttribute('rel', 'noopener noreferrer');
    }
}

// Setup print functionality for PDF generation
function setupPrintFunctionality() {
    // Add print button to page
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ Print/Save as PDF';
    printButton.className = 'print-btn btn btn--secondary';
    printButton.setAttribute('aria-label', 'Print menu or save as PDF');
    
    // Style the print button
    printButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        padding: 12px 16px;
        background: var(--color-pink-100);
        border: 2px solid var(--color-pink-300);
        border-radius: 8px;
        color: var(--color-charcoal-800);
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(244, 114, 182, 0.2);
    `;
    
    // Add hover effects
    printButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--color-pink-200)';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 16px rgba(244, 114, 182, 0.3)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--color-pink-100)';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(244, 114, 182, 0.2)';
    });
    
    // Add print functionality
    printButton.addEventListener('click', function() {
        this.textContent = '📄 Preparing...';
        
        setTimeout(() => {
            window.print();
            this.textContent = '🖨️ Print/Save as PDF';
        }, 300);
    });
    
    // Add to page
    document.body.appendChild(printButton);
    
    // Also listen for Ctrl+P / Cmd+P
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });
}

// Add scroll-based animations with Intersection Observer
function addScrollAnimations() {
    const menuCategories = document.querySelectorAll('.menu-category');
    
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: just show all categories
        menuCategories.forEach(category => {
            category.classList.add('in-view');
        });
        return;
    }
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('in-view');
                }, index * 100);
                
                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial state and observe elements
    menuCategories.forEach((category) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(category);
    });
}

// Enhance accessibility
function enhanceAccessibility() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Add keyboard navigation
    menuItems.forEach((item) => {
        // Ensure proper ARIA attributes are set
        if (!item.hasAttribute('role')) {
            item.setAttribute('role', 'button');
        }
        if (!item.hasAttribute('tabindex')) {
            item.setAttribute('tabindex', '0');
        }
        
        // Add keyboard interaction
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add click feedback
        item.addEventListener('click', function() {
            // Visual feedback for click
            this.style.transform = 'scale(0.98) translateX(6px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Enhance WhatsApp link accessibility
    const whatsappLink = document.querySelector('.whatsapp-link');
    if (whatsappLink && !whatsappLink.hasAttribute('aria-label')) {
        whatsappLink.setAttribute('aria-label', 'Contact us on WhatsApp to place your order');
    }
}

// Add image loading optimization
function optimizeImageLoading() {
    const images = document.querySelectorAll('.item-image');
    
    // Add error handling for images
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // Set a fallback or placeholder
            this.style.background = 'var(--color-pink-100)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = '🍰';
            this.style.fontSize = '24px';
        });
        
        img.addEventListener('load', function() {
            console.log('Image loaded successfully:', this.alt);
        });
    });
}

// Initialize image optimization
optimizeImageLoading();

// Add smooth scroll behavior for any internal navigation
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
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

// Performance optimization - preload important images
function preloadImages() {
    const imageUrls = [
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/d2f0aecd-25e0-4fe7-931f-d6bf80f18d96.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/5e4613da-249b-4c8e-a678-0a86f9bf9b8c.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/e4e8d4bb-6ffd-49f0-946f-19123ee41536.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/db407644-4192-4293-9188-ad2a276cd51e.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/0e02d529-cefb-4427-8c8f-9698e2427305.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/a9816c00-7ba6-4022-a0b2-7b8593a56af4.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Start preloading after page load
window.addEventListener('load', preloadImages);

// Add print event listeners for better PDF generation
window.addEventListener('beforeprint', function() {
    console.log('Preparing for print...');
    // Ensure all images are visible for print
    document.querySelectorAll('.item-image').forEach(img => {
        img.style.display = 'block';
    });
});

window.addEventListener('afterprint', function() {
    console.log('Print dialog closed.');
});

// Export functions for potential external use
window.SweetWhiskMenu = {
    print: () => window.print(),
    scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    version: '1.0.0'
};