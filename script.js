/* ===================================
   MODERN PROFESSIONAL PORTFOLIO JS
   Author: Erwan Oubda
   =================================== */

'use strict';

// ===================================
// UTILITY FUNCTIONS
// ===================================

const select = (selector, parent = document) => parent.querySelector(selector);
const selectAll = (selector, parent = document) => parent.querySelectorAll(selector);

const debounce = (func, wait = 20) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ===================================
// THEME TOGGLE (DARK MODE)
// ===================================

const themeToggle = select('#themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
const updateThemeIcon = () => {
    const icon = themeToggle.querySelector('i');
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
};

updateThemeIcon();

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
        
        // Animate the transition
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// ===================================
// NAVIGATION
// ===================================

const navbar = select('#navbar');
const navMenu = select('#nav-menu');
const hamburger = select('#hamburger');
const navLinks = selectAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const handleScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, 10);

window.addEventListener('scroll', handleScroll);

// Active navigation link based on scroll position
const sections = selectAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = select(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', debounce(highlightNavigation, 10));

// Smooth scroll for anchor links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = select(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// TYPED TEXT EFFECT
// ===================================

const typedTextElement = select('.typed-text');
const cursorElement = select('.cursor');

if (typedTextElement) {
    const textArray = [
        'Développeur Web',
        'Développeur Backend',
        'Développeur Full Stack',
        'Expert Laravel & React',
        'Ingénieur Logiciel'
    ];
    
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    const type = () => {
        const currentText = textArray[textArrayIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingDelay = 2000; // Wait before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            typingDelay = 500; // Wait before typing next
        }
        
        setTimeout(type, typingDelay);
    };
    
    // Start typing effect
    setTimeout(type, 1000);
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Enhanced Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            entry.target.classList.add('fade-in-up');
            
            // Animate skill bars when skills section is visible
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const targetWidth = progressBar.getAttribute('data-progress');
                setTimeout(() => {
                    progressBar.style.width = `${targetWidth}%`;
                }, 100);
            }
            
            // Animate stats counter
            if (entry.target.classList.contains('stat-card')) {
                animateCounter(entry.target);
            }
            
            // Don't unobserve to allow repeated animations
            if (!entry.target.classList.contains('repeat-animation')) {
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = selectAll('.timeline-item, .project-card, .cert-card, .skill-category, .contact-card, .about-text, .about-stats');
animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Observe skill items separately
const skillItems = selectAll('.skill-item');
skillItems.forEach(item => observer.observe(item));

// Observe stat cards
const statCards = selectAll('.stat-card');
statCards.forEach(card => observer.observe(card));

// ===================================
// ENHANCED SCROLL REVEAL
// ===================================

const revealElements = selectAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));

// ===================================
// PARALLAX SCROLLING EFFECT
// ===================================

const parallaxElements = selectAll('.parallax-layer');
let ticking = false;

const updateParallax = () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ===================================
// MOUSE MOVE PARALLAX FOR CARDS
// ===================================

const cardParallaxElements = selectAll('.project-card, .cert-card');

cardParallaxElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// SMOOTH SCROLL WITH EASING
// ===================================

const smoothScrollTo = (target, duration = 1000) => {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
    
    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    
    requestAnimationFrame(animation);
};

// Update nav links to use smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = select(targetId);
        
        if (targetSection) {
            smoothScrollTo(targetSection, 1000);
        }
    });
});

// ===================================
// ENHANCED HOVER EFFECTS
// ===================================

// Add ripple effect on button clicks
const buttons = selectAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles
if (!select('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// MAGNETIC BUTTONS
// ===================================

const magneticButtons = selectAll('.btn-primary, .social-link');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// ===================================
// TEXT SCRAMBLE EFFECT
// ===================================

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble to hero title on hover
const heroTitle = select('.hero-title .gradient-text');
if (heroTitle) {
    const scramble = new TextScramble(heroTitle);
    const originalText = heroTitle.innerText;
    
    heroTitle.addEventListener('mouseenter', () => {
        scramble.setText(originalText);
    });
}

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================

const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', debounce(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }, 10));
};

createScrollProgress();

// ===================================
// LOADING ANIMATION
// ===================================

const createLoadingAnimation = () => {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <p class="loader-text">Chargement...</p>
        </div>
    `;
    
    Object.assign(loader.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'var(--light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '99999',
        transition: 'opacity 0.5s ease'
    });
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
};

// Uncomment to enable loading animation
// createLoadingAnimation();

// ===================================
// COUNTER ANIMATION
// ===================================

const animateCounter = (card) => {
    const numberElement = card.querySelector('.stat-number');
    if (!numberElement) return;
    
    const target = parseInt(numberElement.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            numberElement.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            numberElement.textContent = target;
        }
    };
    
    updateCounter();
};

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

const scrollTopBtn = select('#scrollTop');

if (scrollTopBtn) {
    const toggleScrollTopBtn = debounce(() => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 10);
    
    window.addEventListener('scroll', toggleScrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// CONTACT FORM
// ===================================

const contactForm = select('#contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Compose email
        const mailtoLink = `mailto:erwanoubda_tech@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Message préparé ! Votre client email va s\'ouvrir.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================

const showNotification = (message, type = 'info') => {
    // Remove existing notification
    const existingNotification = select('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#10b981' : '#3b82f6',
        color: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
};

// Add notification animations to document
if (!select('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// PROJECT CARDS INTERACTION
// ===================================

const projectCards = selectAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===================================
// TIMELINE ANIMATION
// ===================================

const timelineItems = selectAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, 100);
            
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach(item => timelineObserver.observe(item));

// ===================================
// CERTIFICATE CARD EFFECTS
// ===================================

const certCards = selectAll('.cert-card');

certCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const logo = this.querySelector('.cert-logo');
        if (logo) {
            logo.style.transform = 'scale(1.1) rotate(5deg)';
            logo.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const logo = this.querySelector('.cert-logo');
        if (logo) {
            logo.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ===================================
// SKILL BARS ANIMATION ON SCROLL
// ===================================

const skillsSection = select('#skills');

if (skillsSection) {
    let skillsAnimated = false;
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                const skillBars = selectAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    const targetWidth = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = `${targetWidth}%`;
                    }, index * 100);
                });
                skillsAnimated = true;
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    skillsObserver.observe(skillsSection);
}

// ===================================
// PARALLAX EFFECT
// ===================================

const heroSection = select('.hero');

if (heroSection) {
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        const heroBackground = select('.hero-background');
        
        if (heroBackground && scrolled < heroSection.offsetHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, 10));
}

// ===================================
// DYNAMIC YEAR UPDATE
// ===================================

const updateCopyrightYear = () => {
    const yearElements = selectAll('[data-year]');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
};

updateCopyrightYear();

// ===================================
// LAZY LOADING IMAGES
// ===================================

const images = selectAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// PREVENT CONTEXT MENU ON IMAGES
// ===================================

const allImages = selectAll('img');
allImages.forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});

// ===================================
// KEYBOARD NAVIGATION
// ===================================

document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// LOADING COMPLETE
// ===================================

window.addEventListener('load', () => {
    // Remove any loading overlays
    const loader = select('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Log portfolio loaded
    console.log('%c✨ Portfolio Loaded Successfully! ✨', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
    console.log('%cDeveloped by Erwan Oubda', 'color: #8b5cf6; font-size: 14px;');
    console.log('%cContact: erwanoubda_tech@icloud.com', 'color: #64748b; font-size: 12px;');
});

// ===================================
// DOWNLOAD CV TRACKING
// ===================================

const cvDownloadLinks = selectAll('a[href*="CV Erwan OUBDA"]');

cvDownloadLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('CV Downloaded');
        showNotification('Téléchargement du CV en cours...', 'success');
    });
});

// ===================================
// SOCIAL LINKS TRACKING
// ===================================

const socialLinks = selectAll('.social-link, .contact-social a');

socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const platform = link.href.includes('github') ? 'GitHub' : 
                        link.href.includes('linkedin') ? 'LinkedIn' : 
                        link.href.includes('mailto') ? 'Email' : 'Social';
        console.log(`${platform} link clicked`);
    });
});

// ===================================
// SECTION VISIBILITY TRACKING
// ===================================

const trackSectionVisibility = () => {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                console.log(`Section viewed: ${sectionId}`);
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => sectionObserver.observe(section));
};

trackSectionVisibility();

// ===================================
// CURSOR CUSTOM EFFECT (DESKTOP ONLY)
// ===================================

if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    Object.assign(cursor.style, {
        width: '20px',
        height: '20px',
        border: '2px solid #3b82f6',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'transform 0.15s ease',
        display: 'none'
    });
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = `${e.clientX - 10}px`;
        cursor.style.top = `${e.clientY - 10}px`;
    });
    
    // Scale cursor on interactive elements
    const interactiveElements = selectAll('a, button, .project-card, .cert-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#8b5cf6';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#3b82f6';
        });
    });
}

// ===================================
// RANDOM BACKGROUND PATTERN
// ===================================

const createBackgroundPattern = () => {
    const heroGrid = select('.hero-grid');
    if (!heroGrid) return;
    
    // Add subtle animation to grid
    let opacity = 0.05;
    let increasing = true;
    
    setInterval(() => {
        if (increasing) {
            opacity += 0.001;
            if (opacity >= 0.08) increasing = false;
        } else {
            opacity -= 0.001;
            if (opacity <= 0.05) increasing = true;
        }
        
        heroGrid.style.backgroundImage = `
            linear-gradient(rgba(59, 130, 246, ${opacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, ${opacity}) 1px, transparent 1px)
        `;
    }, 50);
};

createBackgroundPattern();

// ===================================
// INTERSECTION OBSERVER POLYFILL CHECK
// ===================================

if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported. Loading polyfill...');
    // In production, load polyfill here
    // For now, elements will just appear without animation
    const allAnimatedElements = selectAll('.timeline-item, .project-card, .cert-card');
    allAnimatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// ===================================
// CONSOLE EASTER EGG
// ===================================

console.log(`
    ███████╗██████╗ ██╗    ██╗ █████╗ ███╗   ██╗
    ██╔════╝██╔══██╗██║    ██║██╔══██╗████╗  ██║
    █████╗  ██████╔╝██║ █╗ ██║███████║██╔██╗ ██║
    ██╔══╝  ██╔══██╗██║███╗██║██╔══██║██║╚██╗██║
    ███████╗██║  ██║╚███╔███╔╝██║  ██║██║ ╚████║
    ╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
    
    👨‍💻 Ingénieur Informatique | Développeur Full Stack
    📧 erwanoubda_tech@icloud.com
    🌍 Ouagadougou, Burkina Faso
    
    Besoin d'un développeur ? Contactez-moi ! 🚀
`);
