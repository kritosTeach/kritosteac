// KritosTeach Website JavaScript
// This script enhances the user experience with animations, interactivity, and functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features when DOM is loaded
    initThemeToggle();
    initMobileNavigation();
    initScrollAnimations();
    initContactForm();
    initNewsletterForm();
    initTabs();
    initSmoothScrolling();
    initBackToTop();
    initImageLazyLoading();
    initTestimonialSlider();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    updateThemeIcon(themeToggle, currentTheme);

    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-mode');
        const theme = isDark ? 'dark' : 'light';

        localStorage.setItem('theme', theme);
        updateThemeIcon(this, theme);

        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(button, theme) {
    const icon = button.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        button.setAttribute('aria-label', 'Switch to light mode');
    } else {
        icon.className = 'fas fa-moon';
        button.setAttribute('aria-label', 'Switch to dark mode');
    }
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.value-card, .course-card, .testimonial-card, .blog-card, .team-member, .faq-item');
    animateElements.forEach(element => {
        element.classList.add('fade-in-up');
        observer.observe(element);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous messages
        clearFormMessages(contactForm);

        // Validate form
        if (!validateContactForm(contactForm)) {
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showFormMessage(contactForm, 'Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

function validateContactForm(form) {
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value;
    const message = form.querySelector('#message').value.trim();

    let isValid = true;

    if (name.length < 2) {
        showFieldError(form.querySelector('#name'), 'Name must be at least 2 characters');
        isValid = false;
    }

    if (!isValidEmail(email)) {
        showFieldError(form.querySelector('#email'), 'Please enter a valid email address');
        isValid = false;
    }

    if (!subject) {
        showFieldError(form.querySelector('#subject'), 'Please select a subject');
        isValid = false;
    }

    if (message.length < 10) {
        showFieldError(form.querySelector('#message'), 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

// Newsletter Form Handling
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        // Clear previous messages
        clearFormMessages(newsletterForm);

        if (!isValidEmail(email)) {
            showFormMessage(newsletterForm, 'Please enter a valid email address', 'error');
            return;
        }

        // Simulate subscription
        const submitButton = newsletterForm.querySelector('button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;

        setTimeout(() => {
            showFormMessage(newsletterForm, 'Successfully subscribed! Check your email for confirmation.', 'success');
            emailInput.value = '';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Tab Functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Image Lazy Loading
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver(function(entries) {
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

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length <= 3) return;

    let currentIndex = 0;
    const testimonialsContainer = document.querySelector('.testimonials-grid');

    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';

    for (let i = 0; i < Math.ceil(testimonials.length / 3); i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    document.querySelector('.testimonials').appendChild(dotsContainer);

    function goToSlide(index) {
        currentIndex = index;
        const translateX = -index * 100;
        testimonialsContainer.style.transform = `translateX(${translateX}%)`;

        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Auto slide
    setInterval(() => {
        currentIndex = (currentIndex + 1) % Math.ceil(testimonials.length / 3);
        goToSlide(currentIndex);
    }, 5000);
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;

    field.parentNode.appendChild(errorElement);
    field.classList.add('error');

    setTimeout(() => {
        errorElement.remove();
        field.classList.remove('error');
    }, 3000);
}

function showFormMessage(form, message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    form.appendChild(messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

function clearFormMessages(form) {
    const messages = form.querySelectorAll('.form-message, .field-error');
    messages.forEach(message => message.remove());
}

// Add loading animation for page transitions
window.addEventListener('beforeunload', function() {
    document.body.classList.add('page-transition');
});

// Add some CSS for the new elements
const additionalStyles = `
<style>
.back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.field-error {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.form-message {
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
    font-weight: 500;
}

.form-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.form-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.fade-in-up.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.page-transition {
    opacity: 0.5;
}

.testimonial-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
    transition: background 0.3s ease;
}

.dot.active {
    background: #667eea;
}

input.error, select.error, textarea.error {
    border-color: #e74c3c !important;
}

.nav-menu.active {
    display: flex !important;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 1rem 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

body.dark-mode .nav-menu.active {
    background: rgba(18, 18, 18, 0.95);
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

.hamburger span {
    transition: all 0.3s ease;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Add some interactive hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.course-card, .blog-card, .testimonial-card')) {
        e.target.closest('.course-card, .blog-card, .testimonial-card').style.transform = 'translateY(-5px) scale(1.02)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.course-card, .blog-card, .testimonial-card')) {
        e.target.closest('.course-card, .blog-card, .testimonial-card').style.transform = '';
    }
});

// Add typing effect for hero text
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid #667eea';

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 500);
        }
    }, 100);
}

// Initialize typing effect after a short delay
setTimeout(initTypingEffect, 1000);

// Add particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        hero.appendChild(particle);
    }
}

createParticles();

// Add CSS for particles
const particleStyles = `
<style>
.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(102, 126, 234, 0.3);
    border-radius: 50%;
    pointer-events: none;
    animation: float 20s infinite linear;
    top: -10px;
}

@keyframes float {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', particleStyles);

// Add loading screen
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h2>KritosTeach</h2>
            <p>Loading amazing learning experience...</p>
        </div>
    `;
    document.body.appendChild(loadingScreen);

    // Hide loading screen after content loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

showLoadingScreen();

// Add CSS for loading screen
const loadingStyles = `
<style>
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

.loading-content {
    text-align: center;
    color: white;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-content h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.loading-content p {
    opacity: 0.8;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', loadingStyles);

// Add search functionality
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search courses, blogs...';
    searchInput.className = 'search-input';

    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        navActions.insertBefore(searchInput, navActions.firstChild);
    }

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const courseCards = document.querySelectorAll('.course-card');
        const blogCards = document.querySelectorAll('.blog-card');

        // Search courses
        courseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const shouldShow = title.includes(query) || description.includes(query);
            card.style.display = shouldShow || query === '' ? 'block' : 'none';
        });

        // Search blogs
        blogCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const shouldShow = title.includes(query) || description.includes(query);
            card.style.display = shouldShow || query === '' ? 'block' : 'none';
        });
    });
}

initSearch();

// Add CSS for search
const searchStyles = `
<style>
.search-input {
    padding: 0.5rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    width: 200px;
    margin-right: 1rem;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #667eea;
}

@media (max-width: 768px) {
    .search-input {
        width: 150px;
        margin-right: 0.5rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', searchStyles);

// Add notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS for notifications
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 0.5rem;
    padding: 1rem 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    border-left: 4px solid #28a745;
}

.notification.error {
    border-left: 4px solid #dc3545;
}

.notification.info {
    border-left: 4px solid #17a2b8;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0;
    margin-left: 1rem;
}

.notification-close:hover {
    color: #333;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);

// Show welcome notification
setTimeout(() => {
    showNotification('Welcome to KritosTeach! Explore our courses and start learning today.', 'info');
}, 3000);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Add performance monitoring
function initPerformanceMonitoring() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.fetchStart;

            console.log(`Page load time: ${loadTime}ms`);

            if (loadTime > 3000) {
                showNotification('Page is taking longer to load. Please check your internet connection.', 'info');
            }
        }, 0);
    });
}

initPerformanceMonitoring();

// Add accessibility improvements
function initAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add focus styles for keyboard navigation
    const focusStyles = `
    <style>
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #667eea;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s ease;
    }

    .skip-link:focus {
        top: 6px;
    }

    *:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }

    button:focus,
    input:focus,
    select:focus,
    textarea:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
    </style>
    `;

    document.head.insertAdjacentHTML('beforeend', focusStyles);

    // Add ARIA labels where missing
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
}

initAccessibility();

// Add PWA-like features (basic offline detection)
function initOfflineDetection() {
    window.addEventListener('online', function() {
        showNotification('You are back online!', 'success');
    });

    window.addEventListener('offline', function() {
        showNotification('You are currently offline. Some features may not work.', 'error');
    });
}

initOfflineDetection();

// Final initialization message
console.log('🚀 KritosTeach JavaScript loaded successfully!');
console.log('Features initialized: Theme toggle, Mobile nav, Forms, Animations, Search, Notifications, Accessibility');
