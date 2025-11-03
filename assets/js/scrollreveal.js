/**
 * scrollreveal.js
 * Scroll-triggered animations using IntersectionObserver API
 * Reveals elements with class "reveal" as they enter the viewport
 */

(function() {
    'use strict';

    // ==================== INTERSECTION OBSERVER SETUP ====================
    
    // Configuration options for the observer
    const observerOptions = {
        // Trigger when 10% of the element is visible
        threshold: 0.1,
        
        // Start observing 50px before element enters viewport
        rootMargin: '0px 0px -50px 0px'
    };

    // Create the intersection observer
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            // If element is intersecting (visible in viewport)
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger CSS animation
                entry.target.classList.add('active');
                
                // Optional: Stop observing this element once revealed
                // Uncomment the line below if you want animations to happen only once
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove 'active' class when element leaves viewport
                // This allows animations to repeat when scrolling back up
                // Comment out the line below if you want one-time animations only
                // entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // ==================== OBSERVE ELEMENTS ====================
    
    // Function to start observing all elements with the 'reveal' class
    function initScrollReveal() {
        // Find all elements with the 'reveal' class
        const revealElements = document.querySelectorAll('.reveal');
        
        // Start observing each element
        revealElements.forEach(function(element) {
            observer.observe(element);
        });

        console.log(`Scroll reveal initialized for ${revealElements.length} elements`);
    }

    // ==================== STAGGERED ANIMATIONS ====================
    
    /**
     * Apply staggered animation delays to child elements
     * Useful for animating lists or grids with cascading effect
     */
    function applyStaggeredDelays() {
        const staggerContainers = document.querySelectorAll('[data-stagger]');
        
        staggerContainers.forEach(function(container) {
            const children = container.querySelectorAll('.reveal');
            const delay = parseInt(container.getAttribute('data-stagger')) || 100;
            
            children.forEach(function(child, index) {
                child.style.transitionDelay = (index * delay) + 'ms';
            });
        });
    }

    // ==================== CUSTOM REVEAL ANIMATIONS ====================
    
    /**
     * Apply custom animation directions based on data attributes
     * Examples: data-reveal="left", data-reveal="right", data-reveal="bottom"
     */
    function applyCustomAnimations() {
        const customElements = document.querySelectorAll('[data-reveal]');
        
        customElements.forEach(function(element) {
            const direction = element.getAttribute('data-reveal');
            
            switch(direction) {
                case 'left':
                    element.style.transform = 'translateX(-30px)';
                    break;
                case 'right':
                    element.style.transform = 'translateX(30px)';
                    break;
                case 'bottom':
                    element.style.transform = 'translateY(30px)';
                    break;
                case 'top':
                    element.style.transform = 'translateY(-30px)';
                    break;
                case 'scale':
                    element.style.transform = 'scale(0.9)';
                    break;
            }
        });
    }

    // ==================== UTILITY: ADD REVEAL CLASS TO SECTIONS ====================
    
    /**
     * Automatically add 'reveal' class to all sections that don't have it
     * This ensures all major sections have scroll animations
     */
    function autoRevealSections() {
        const sections = document.querySelectorAll('section:not(.hero)');
        
        sections.forEach(function(section) {
            // Only add if section doesn't already have reveal class
            if (!section.classList.contains('reveal')) {
                section.classList.add('reveal');
            }
        });
    }

    // ==================== PARALLAX EFFECT (OPTIONAL) ====================
    
    /**
     * Simple parallax scrolling effect for elements with data-parallax attribute
     * Usage: <div data-parallax="0.5"></div>
     * The number represents scroll speed (0.5 = half speed, 2 = double speed)
     */
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        function handleParallaxScroll() {
            parallaxElements.forEach(function(element) {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const rect = element.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                
                // Only apply parallax if element is in viewport
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        }

        // Throttle scroll events for better performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleParallaxScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ==================== FADE-IN ON LOAD ====================
    
    /**
     * Fade in elements that are already visible on page load
     * Prevents "pop-in" effect for above-the-fold content
     */
    function revealVisibleElements() {
        const revealElements = document.querySelectorAll('.reveal');
        
        revealElements.forEach(function(element) {
            const rect = element.getBoundingClientRect();
            const isVisible = (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            );
            
            if (isVisible) {
                element.classList.add('active');
            }
        });
    }

    // ==================== INITIALIZE ====================
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already loaded
        init();
    }

    function init() {
        // Auto-add reveal class to sections
        autoRevealSections();
        
        // Apply any custom animations
        applyCustomAnimations();
        
        // Apply staggered delays
        applyStaggeredDelays();
        
        // Initialize intersection observer
        initScrollReveal();
        
        // Reveal elements already visible
        revealVisibleElements();
        
        // Initialize parallax (optional)
        // initParallax();
    }

    // ==================== EXPOSE API ====================
    
    // Expose functions for manual control if needed
    window.ScrollReveal = {
        observer: observer,
        refresh: function() {
            initScrollReveal();
        },
        reveal: function(selector) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(function(el) {
                el.classList.add('active');
            });
        },
        hide: function(selector) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(function(el) {
                el.classList.remove('active');
            });
        }
    };

    console.log('Scroll reveal initialized');

})();

