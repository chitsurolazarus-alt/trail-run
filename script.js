// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const quoteForm = document.getElementById('quoteForm');
const successModal = document.getElementById('successModal');
const closeModalButtons = document.querySelectorAll('.close-modal, .close-modal-btn');
const currentYearSpan = document.getElementById('currentYear');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Theme Toggle Functionality
function initializeTheme() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('lc-webcraft-theme') || 'light';
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
    
    // Update toggle button state
    updateThemeToggle(savedTheme);
}

function toggleTheme() {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('lc-webcraft-theme', 'light');
        updateThemeToggle('light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('lc-webcraft-theme', 'dark');
        updateThemeToggle('dark');
    }
}

function updateThemeToggle(theme) {
    // This is handled by CSS classes, but we can add additional JS if needed
    console.log(`Theme changed to: ${theme}`);
    
    // You could add analytics tracking here
    if (theme === 'dark') {
        console.log('Dark theme activated for L.C WebCraft Studios');
    } else {
        console.log('Light theme activated for L.C WebCraft Studios');
    }
}

// Initialize theme on page load
initializeTheme();

// Add event listener to theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// Form Submission
quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || 'Not provided',
        business: document.getElementById('business').value,
        service: document.getElementById('service').value,
        budget: document.getElementById('budget').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString(),
        theme: body.classList.contains('dark-theme') ? 'dark' : 'light'
    };
    
    // In a real application, you would send this data to a server
    // For now, we'll simulate sending an email and show the success modal
    
    // Simulate sending email (in reality, use a backend service)
    console.log('Quote request submitted to L.C WebCraft Studios:', formData);
    console.log('Email would be sent to: chitsuroSnet@outlook.com');
    console.log('Email content:', `
        New Quote Request from L.C WebCraft Studios Website:
        
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Business/Project: ${formData.business}
        Service Needed: ${formData.service}
        Budget Range: ${formData.budget}
        User Theme Preference: ${formData.theme}
        
        Project Details:
        ${formData.message}
        
        Submitted: ${new Date().toLocaleString()}
    `);
    
    // Show success modal
    successModal.style.display = 'flex';
    
    // Reset form
    quoteForm.reset();
});

// Modal Controls
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        successModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate header height for offset
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add WhatsApp click tracking
document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('WhatsApp link clicked for L.C WebCraft Studios');
        // You could add analytics here
        // Example: trackThemeEvent('whatsapp_click', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
});

// Form validation on blur
const formInputs = quoteForm.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = 'var(--medium-gray)';
        }
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .purpose-card, .portfolio-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.service-card, .purpose-card, .portfolio-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Trigger once on load
window.addEventListener('load', animateOnScroll);

// Theme analytics (optional)
function trackThemeEvent(eventName, theme) {
    // This is where you would integrate with analytics services
    // For now, just log to console
    console.log(`L.C WebCraft Studios Analytics: ${eventName} - Theme: ${theme}`);
}

// Track theme changes
const originalToggleTheme = toggleTheme;
toggleTheme = function() {
    const oldTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    originalToggleTheme();
    const newTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    
    trackThemeEvent('theme_toggle', newTheme);
    console.log(`Theme changed from ${oldTheme} to ${newTheme} for L.C WebCraft Studios`);
};

// Add keyboard shortcut for theme toggle (Alt+T)
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 't') {
        toggleTheme();
        console.log('Theme toggled using keyboard shortcut Alt+T');
    }
});

// Add loading animation for better UX
window.addEventListener('load', () => {
    // Remove any loading animation if needed
    console.log('L.C WebCraft Studios website fully loaded');
});