// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
let darkMode = false;
function setTheme(dark) {
    if (dark) {
        root.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        root.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    }
    darkMode = dark;
}
// Default to dark mode on mobile
const isMobile = window.matchMedia('(max-width: 600px)').matches;
if (isMobile) {
    setTheme(true);
} else {
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
}
themeToggle.addEventListener('click', () => setTheme(!darkMode));
// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// Animated transitions on scroll
const animatedSections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.2 });
animatedSections.forEach(section => {
    section.style.animationPlayState = 'paused';
    observer.observe(section);
});
// Contact form basic validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        const whatsappNumber = '2349033675852';
        const text = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
        window.open(whatsappUrl, '_blank');
    });
}
// Show/hide gallery and website list sections
document.querySelectorAll('.portfolio-list .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#ict-gallery' || href === '#website-list') {
            e.preventDefault();
            document.querySelectorAll('.gallery-section, .website-list-section').forEach(sec => sec.style.display = 'none');
            document.querySelector(href).style.display = 'block';
            document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
        }
    });
});
