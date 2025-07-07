// Power Washing Pros - Interactive JavaScript
// Professional power washing business website functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeScrollEffects();
    initializePortfolio();
    initializeModal();
});

// Navigation Functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(27, 54, 93, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '#1B365D';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation System
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes based on element type
                if (element.classList.contains('fade-in')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
                
                if (element.classList.contains('slide-in')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                }
                
                if (element.classList.contains('slide-up')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }

                // Stagger animations for service cards
                if (element.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .slide-up, .service-card');
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        if (element.classList.contains('fade-in') || element.classList.contains('slide-up')) {
            element.style.transform = 'translateY(30px)';
        }
        if (element.classList.contains('slide-in')) {
            element.style.transform = 'translateX(-50px)';
        }
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(element);
    });

    // Hero scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const nextSection = document.querySelector('.services-overview, .contact-info, .about-summary');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Parallax effect for hero backgrounds
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroes = document.querySelectorAll('.hero, .services-hero, .about-hero');
        
        heroes.forEach(hero => {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const modal = document.getElementById('success-modal');
    const closeModal = document.getElementById('close-modal');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Validate required fields
            const requiredFields = ['name', 'email', 'phone'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    input.style.borderColor = '#A52A2A';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
            });

            // Email validation
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                emailInput.style.borderColor = '#A52A2A';
                isValid = false;
            }

            // Phone validation
            const phoneInput = document.getElementById('phone');
            const phonePattern = /^[\d\s\-\(\)\+]{10,}$/;
            if (!phonePattern.test(phoneInput.value)) {
                phoneInput.style.borderColor = '#A52A2A';
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                // Simulate API call delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success modal
                    if (modal) {
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Log form submission (in real app, this would send to server)
                    console.log('Form submitted:', data);
                }, 2000);
            } else {
                // Show error message
                alert('Please fill in all required fields correctly.');
            }
        });

        // Input focus effects
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#A52A2A';
                this.style.boxShadow = '0 0 0 3px rgba(165, 42, 42, 0.1)';
            });

            input.addEventListener('blur', function() {
                this.style.borderColor = '#ddd';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Modal functionality
    if (modal && closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Scroll Effects
function initializeScrollEffects() {
    // Progress bar for reading progress (if needed)
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FF6B35, #1B365D);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Scroll-to-top button
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #FF6B35;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    `;
    document.body.appendChild(scrollToTop);

    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });
}

// Portfolio/Gallery Functionality
function initializePortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            const lightboxContent = document.createElement('div');
            lightboxContent.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                background: white;
                border-radius: 15px;
                padding: 2rem;
                text-align: center;
                position: relative;
            `;

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            `;

            const title = this.querySelector('.portfolio-overlay h4').textContent;
            const description = this.querySelector('.portfolio-overlay p').textContent;
            const category = this.getAttribute('data-category');

            lightboxContent.innerHTML = `
                <div style="width: 100%; height: 300px; background: linear-gradient(45deg, #1B365D,rgb(60, 94, 141)); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; margin-bottom: 1rem;">
                    <i class="fas fa-${getIconForCategory(category)}"></i>
                </div>
                <h3 style="color: #1B365D; margin-bottom: 1rem;">${title}</h3>
                <p style="color: #666; margin-bottom: 1.5rem;">${description}</p>
                <p style="color: #555; font-size: 0.9rem;">Professional power washing service showcasing our expertise in ${category.replace('-', ' ')}.</p>
            `;



            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Animate in
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);

            // Close functionality
            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }, 300);
            };

            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        });
    });
}

function getIconForCategory(category) {
    const icons = {
        'house-washing': 'home',
        'driveway-cleaning': 'road',
        'commercial-cleaning': 'building',
        'roof-cleaning': 'home',
        'deck-patio-cleaning': 'chess-board',
        'fence-cleaning': 'border-all'
    };
    return icons[category] || 'spray-can';
}

// Modal System
function initializeModal() {
    // Generic modal functionality for any modal on the page
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close-modal');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // Close on outside click
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="display: block"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
}

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('SW registration failed: ', error);
            });
    });
}

// Performance optimizations
function optimizePerformance() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Call performance optimizations
optimizePerformance();

// Google Analytics (placeholder - would need actual tracking ID)
function initializeAnalytics() {
    // This would be replaced with actual Google Analytics code
    console.log('Analytics initialized');
}

// Initialize analytics
initializeAnalytics();

// Phone number click tracking
document.addEventListener('click', function(event) {
    if (event.target.href && event.target.href.includes('tel:')) {
        console.log('Phone number clicked:', event.target.href);
        // Track phone clicks for analytics
    }
});

// Form field auto-formatting
function initializeFormFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            this.value = value;
        });
    });
}

// Initialize form formatting
initializeFormFormatting();

// Console welcome message
console.log(`
🚿 J-4 Pressure Wash Website
🌟 Professional pressure washing services in Winter Park, FL
📞 Call us: (407) 461-0224
🌐 Built with modern web technologies
`);