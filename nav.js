// Universal Navigation Script for All Pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    if (window.feather) {
        feather.replace();
    }

    // Universal hamburger menu functionality
    const hamburger = document.getElementById('hambtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        // Set initial state
        mobileMenu.style.transition = 'all 0.3s ease';
        mobileMenu.style.transform = 'translateY(-100%)';
        mobileMenu.style.opacity = '0';
        
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!expanded));
            
            if (!expanded) {
                // Opening menu
                mobileMenu.hidden = false;
                // Force reflow for animation
                mobileMenu.offsetHeight;
                mobileMenu.style.transform = 'translateY(0)';
                mobileMenu.style.opacity = '1';
                hamburger.classList.add('active');
                
                // Add body scroll lock on mobile
                if (window.innerWidth <= 920) {
                    document.body.style.overflow = 'hidden';
                }
            } else {
                // Closing menu
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
                hamburger.classList.remove('active');
                
                // Remove body scroll lock
                document.body.style.overflow = '';
                
                setTimeout(() => {
                    mobileMenu.hidden = true;
                }, 300);
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                if (!mobileMenu.hidden) {
                    mobileMenu.style.transform = 'translateY(-100%)';
                    mobileMenu.style.opacity = '0';
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                    
                    setTimeout(() => {
                        mobileMenu.hidden = true;
                    }, 300);
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.hidden) {
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                
                setTimeout(() => {
                    mobileMenu.hidden = true;
                }, 300);
            }
        });

        // Close menu on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 920 && !mobileMenu.hidden) {
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                
                setTimeout(() => {
                    mobileMenu.hidden = true;
                }, 300);
            }
        });

        // Close menu when clicking on menu links
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                
                setTimeout(() => {
                    mobileMenu.hidden = true;
                }, 300);
            });
        });
    }

    // Initialize Vanta.js background effect if banner exists
    try {
        if (window.VANTA && VANTA.NET && document.getElementById('banner')) {
            VANTA.NET({
                el: '#banner',
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x3b82f6,
                backgroundColor: 0x111827,
                points: 12.00,
                maxDistance: 22.00,
                spacing: 18.00
            });
        }
    } catch (e) {
        console.warn('Vanta initialization failed:', e);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger entrance animations
        setTimeout(() => {
            const animateElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
            animateElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 100);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section, .goal-card, .spark-card, .box');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll-based animations or effects can be added here
        }, 10);
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    // Trap focus in mobile menu when open
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Apply focus trap when mobile menu is open
    if (mobileMenu) {
        const originalOpenHandler = hamburger.addEventListener;
        // This will be handled by the main click handler above
    }
});

// Add CSS for hamburger animation and mobile menu
const navStyle = document.createElement('style');
navStyle.textContent = `
    .hamburger.active .fa-bars {
        transform: rotate(90deg);
        transition: transform 0.3s ease;
    }

    .mobile-menu {
        position: fixed;
        top: 68px;
        left: 12px;
        right: 12px;
        background: rgba(6, 8, 10, 0.95);
        backdrop-filter: blur(8px);
        border-radius: 10px;
        padding: 12px;
        box-shadow: 0 8px 40px rgba(2, 6, 12, 0.8);
        z-index: 50;
    }

    .mobile-menu a {
        color: #ffffff;
        text-decoration: none;
        display: block;
        padding: 8px 0;
        transition: color 0.3s ease;
        border-radius: 4px;
        padding-left: 8px;
    }

    .mobile-menu a:hover {
        color: var(--neon, #00e5b4);
        background: rgba(255, 255, 255, 0.05);
    }

    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .loaded {
        opacity: 1;
    }

    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    @media (max-width: 920px) {
        .nav .links {
            display: none;
        }
        
        .hamburger {
            display: inline-flex;
        }
    }

    @media (min-width: 921px) {
        .hamburger {
            display: none;
        }
        
        .mobile-menu {
            display: none !important;
        }
    }
`;
document.head.appendChild(navStyle);
