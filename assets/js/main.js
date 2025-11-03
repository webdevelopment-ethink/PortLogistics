/**
 * main.js
 * Main JavaScript functionality for PortGate Logistics website
 * Handles: header scroll, mobile menu, back-to-top, smooth scroll
 */

(function() {
    'use strict';

    // ==================== HEADER SCROLL EFFECT ====================
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (backToTop) {
                backToTop.classList.add('visible');
            }
        } else {
            header.classList.remove('scrolled');
            if (backToTop) {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    // Run on page load
    handleScroll();

    // ==================== MOBILE MENU TOGGLE ====================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (nav.classList.contains('mobile-open')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('mobile-open');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#" or doesn't exist
            if (href === '#' || href.length <= 1) {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== BACK TO TOP BUTTON ====================
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== ACTIVE NAV LINK ====================
    // Highlight active page in navigation based on data-page attribute
    const currentPage = document.body.getAttribute('data-page');
    if (currentPage) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            
            // Match based on page name
            if (
                (currentPage === 'home' && href === 'index.html') ||
                (currentPage === 'services' && href === 'services.html') ||
                (currentPage === 'facilities' && href === 'facilities.html') ||
                (currentPage === 'compliance' && href === 'compliance.html') ||
                (currentPage === 'contact' && href === 'contact.html')
            ) {
                link.classList.add('active');
            }
        });
    }

    // ==================== FORM VALIDATION (if contact form exists) ====================
    const contactForm = document.querySelector('form[name="contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Netlify will handle the actual submission
            // Add any custom validation here if needed
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');

            let isValid = true;

            // Basic validation
            if (name && name.value.trim() === '') {
                alert('Please enter your name');
                isValid = false;
            }

            if (email && !isValidEmail(email.value)) {
                alert('Please enter a valid email address');
                isValid = false;
            }

            if (phone && phone.value.trim() === '') {
                alert('Please enter your phone number');
                isValid = false;
            }

            if (message && message.value.trim() === '') {
                alert('Please enter your message');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ==================== CONSOLE BRANDING ====================
    console.log('%cPortGate Logistics', 'color: #d0a04f; font-size: 24px; font-weight: bold;');
    console.log('%cInside the Port of Brisbane', 'color: #ffffff; font-size: 14px;');
    console.log('%c70 Lucinda Drive, Port of Brisbane QLD 4178', 'color: rgba(255,255,255,0.65); font-size: 12px;');

})();

