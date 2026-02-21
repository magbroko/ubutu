/* ============================================
   Thegracebaker - Modern Redesign
   Premium Baking Website JavaScript
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Initialize all components
    initNavbar();
    initSmoothScroll();
    initButtonFunctionality();
    initContactForm();
    initScrollToTop();
    initTestimonialCarousel();
    initGallery();
    initWhatsApp();
    initSocialLinks();
    initAboutSection();
    initFooterYear();
}

// ===== About Section – count-up stats =====
function initAboutSection() {
    const statsContainer = document.querySelector('.about-section .about-stats');
    if (!statsContainer) return;

    const statItems = statsContainer.querySelectorAll('.stat-item[data-stat]');
    if (!statItems.length) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            const container = entry.target;
            container.querySelectorAll('.stat-item[data-stat]').forEach(function(item) {
                const target = parseInt(item.getAttribute('data-stat'), 10);
                const valueEl = item.querySelector('.stat-value');
                if (!valueEl || isNaN(target)) return;
                animateValue(valueEl, 0, target, 1200);
            });
            observer.unobserve(container);
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

    observer.observe(statsContainer);
}

function animateValue(el, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2);
        const current = Math.floor(start + (end - start) * eased);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = end;
    }
    requestAnimationFrame(update);
}

// ===== Navbar Functionality =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Navbar brand click - scroll to top
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        navbarBrand.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    // Handle all anchor links with smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Button Functionality =====
function initButtonFunctionality() {
    // Function to pre-fill contact form
    function prefillContactForm(intent, service) {
        const messageField = document.getElementById('message');
        const serviceTypeField = document.getElementById('serviceType');
        const intentTypeField = document.getElementById('intentType');
        
        if (serviceTypeField) {
            serviceTypeField.value = service || '';
        }
        
        if (intentTypeField) {
            intentTypeField.value = intent || '';
        }
        
        if (messageField) {
            let messageText = '';
            
            switch(intent) {
                case 'order':
                    messageText = `Hello! I'm interested in ordering ${service || 'your products'}. Please provide more information about pricing and availability.\n\nThank you!`;
                    break;
                case 'book':
                    messageText = `Hello! I would like to book ${service || 'a service'}. Please let me know about availability and scheduling.\n\nThank you!`;
                    break;
                case 'learn':
                    messageText = `Hello! I'm interested in learning more about ${service || 'your services'}. Could you please provide additional details?\n\nThank you!`;
                    break;
                case 'contact':
                    messageText = `Hello! I would like to get in touch with Thegracebaker. Please contact me at your earliest convenience.\n\nThank you!`;
                    break;
                default:
                    messageText = `Hello! I'm interested in your services. Please contact me.\n\nThank you!`;
            }
            
            messageField.value = messageText;
            
            // Focus on message field after scroll
            setTimeout(() => {
                messageField.focus();
                messageField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 800);
        }
    }
    
    // Handle all buttons with data-intent attribute
    document.querySelectorAll('a[data-intent]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const intent = this.getAttribute('data-intent');
            const service = this.getAttribute('data-service') || '';
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                
                if (target) {
                    // Scroll to target
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Pre-fill form after scroll completes
                    setTimeout(() => {
                        prefillContactForm(intent, service);
                    }, 600);
                }
            }
        });
    });
}

// ===== Contact Form =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        const serviceType = document.getElementById('serviceType')?.value || '';
        const intentType = document.getElementById('intentType')?.value || '';
        
        // Validation
        let isValid = true;
        
        // Name validation
        if (name === '') {
            showFieldError('name', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showFieldError('name', 'Name must be at least 2 characters');
            isValid = false;
        } else {
            clearFieldError('name');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearFieldError('email');
        }
        
        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (phone === '') {
            showFieldError('phone', 'Phone number is required');
            isValid = false;
        } else if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
            showFieldError('phone', 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearFieldError('phone');
        }
        
        // Message validation
        if (message === '') {
            showFieldError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showFieldError('message', 'Message must be at least 10 characters');
            isValid = false;
        } else {
            clearFieldError('message');
        }
        
        // If valid, submit form
        if (isValid) {
            const formData = {
                name: name,
                email: email,
                phone: phone,
                message: message,
                serviceType: serviceType,
                intentType: intentType,
                timestamp: new Date().toISOString()
            };
            
            // Log form data (in production, send to server)
            console.log('Form submitted:', formData);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                if (document.getElementById('serviceType')) {
                    document.getElementById('serviceType').value = '';
                }
                if (document.getElementById('intentType')) {
                    document.getElementById('intentType').value = '';
                }
            }, 100);
        }
    });
}

// Form validation helpers
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.mb-3') || field.parentElement;
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-danger small mt-1';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.mb-3') || field.parentElement;
    
    field.classList.remove('is-invalid');
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function showSuccessMessage() {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message alert alert-success alert-dismissible fade show mt-3';
    successDiv.innerHTML = `
        <strong>Success!</strong> Your message has been sent. We'll get back to you soon!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const contactForm = document.getElementById('contactForm');
    contactForm.insertAdjacentElement('afterend', successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// ===== Scroll to Top Button =====
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Testimonial Carousel =====
function initTestimonialCarousel() {
    const carousel = document.querySelector('#testimonialCarousel');
    
    if (carousel && typeof bootstrap !== 'undefined') {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            pause: 'hover'
        });
    }
}

// ===== Gallery =====
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                const title = overlay.querySelector('h5')?.textContent || 'Gallery Item';
                const description = overlay.querySelector('p')?.textContent || '';
                showImageModal(title, description);
            }
        });
    });
}

function showImageModal(title, description) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(75, 54, 33, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="position: relative; max-width: 90%; max-height: 90%; text-align: center; color: white;">
            <button class="close-modal" style="
                position: absolute;
                top: -40px;
                right: 0;
                background: #8B5A2B;
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
            ">&times;</button>
            <h3 style="color: white; margin-bottom: 1rem;">${title}</h3>
            <p style="color: #F5E6D3; margin-bottom: 2rem;">${description}</p>
            <p style="color: #D4A574; font-size: 0.9rem;">Click outside to close</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.contains(modal)) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
}

// ===== WhatsApp Button =====
function initWhatsApp() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            const phoneNumber = this.getAttribute('href').replace('https://wa.me/', '').replace(/[^0-9]/g, '');
            const serviceType = document.getElementById('serviceType')?.value || '';
            const intentType = document.getElementById('intentType')?.value || '';
            
            if (serviceType || intentType) {
                let message = 'Hello! I\'m interested in ';
                if (intentType === 'order') {
                    message += `ordering ${serviceType}`;
                } else if (intentType === 'book') {
                    message += `booking ${serviceType}`;
                } else if (intentType === 'learn') {
                    message += `learning more about ${serviceType}`;
                } else {
                    message += 'your services';
                }
                message += '. Please provide more information. Thank you!';
                
                const encodedMessage = encodeURIComponent(message);
                this.setAttribute('href', `https://wa.me/${phoneNumber}?text=${encodedMessage}`);
            }
        });
    }
}

// ===== Footer year =====
function initFooterYear() {
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ===== Social Links =====
function initSocialLinks() {
    // All social links are already set up in HTML with proper hrefs
    // This function can be used for analytics tracking if needed
    document.querySelectorAll('.social-link, .social-icon, .footer-social-icon').forEach(link => {
        link.addEventListener('click', function() {
            // Track social link clicks if needed
            console.log('Social link clicked:', this.getAttribute('href'));
        });
    });
}

// ===== Console Welcome Message =====
console.log('%cThegracebaker', 'font-size: 24px; font-weight: bold; color: #8B5A2B;');
console.log('%cCrafting sweetness, elegance, and unforgettable moments.', 'font-size: 14px; color: #4B3621;');
console.log('%cWebsite fully functional!', 'font-size: 12px; color: #8B5A2B;');
