// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navLinksMenu = document.querySelector('.nav-links');
const contactForm = document.querySelector('.contact-form');

// Initialize Theme with localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isMobile = window.matchMedia('(max-width: 600px)').matches;

    // Default: dark on mobile, system preference on desktop
    const initialTheme = savedTheme || (isMobile ? 'dark' : (prefersDark ? 'dark' : 'light'));

    setTheme(initialTheme === 'dark');
}

// Set Theme & Persist
function setTheme(isDark) {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<span class="toggle-icon">☀️</span>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<span class="toggle-icon">🌙</span>';
        localStorage.setItem('theme', 'light');
    }
}

// Toggle Theme on Click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!isCurrentlyDark);
    });
}

// Mobile Menu Toggle
function isMobileMenu() {
    return window.innerWidth <= 900;
}

if (menuToggle && navLinksMenu) {
    menuToggle.addEventListener('click', () => {
        if (isMobileMenu()) {
            navLinksMenu.classList.toggle('open');
            // Animate hamburger to X
            menuToggle.classList.toggle('active');
        }
    });

    // Close menu when link is clicked
    navLinksMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMobileMenu()) {
                navLinksMenu.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (!isMobileMenu()) {
            navLinksMenu.classList.remove('open');
            menuToggle.classList.remove('active');
        }
    });
}

// Smooth Scroll for All Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            // Close mobile menu if open
            if (navLinksMenu && navLinksMenu.classList.contains('open')) {
                navLinksMenu.classList.remove('open');
                menuToggle?.classList.remove('active');
            }
            // Scroll smoothly
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Reveal Animation
const animatedSections = document.querySelectorAll('.section');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            revealObserver.unobserve(entry.target); // Animate only once
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

animatedSections.forEach(section => {
    revealObserver.observe(section);
});

// Contact Form Submission via WhatsApp
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const message = formData.get('message')?.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        const whatsappNumber = '2349033675852'; // Nigeria format without +
        const text = encodeURIComponent(
            `Hello Quadri, I'm contacting you from your portfolio website.%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:*%0A${message}`
        );

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

        // Open in new tab
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        // Optional: Reset form
        this.reset();
    });
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});