// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const header = document.querySelector('header');
let mobileMenuCreated = false;

mobileMenuBtn.addEventListener('click', () => {
    if (!mobileMenuCreated) {
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');
        
        // Clone navigation and CTA button
        const navClone = document.querySelector('nav').cloneNode(true);
        const ctaClone = document.querySelector('.cta-button').cloneNode(true);
        
        mobileMenu.appendChild(navClone);
        mobileMenu.appendChild(ctaClone);
        
        // Append to header
        header.appendChild(mobileMenu);
        mobileMenuCreated = true;
        
        // Add event listeners to mobile menu links
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                toggleMobileMenuIcon(false);
            });
        });
    }
    
    // Toggle mobile menu
    const mobileMenu = document.querySelector('.mobile-menu');
    const isActive = mobileMenu.classList.contains('active');
    mobileMenu.classList.toggle('active');
    
    // Toggle hamburger icon
    toggleMobileMenuIcon(isActive);
});

// Toggle mobile menu icon
function toggleMobileMenuIcon(isActive) {
    const spans = mobileMenuBtn.querySelectorAll('span');
    
    if (!isActive) {
        // Change to X
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        // Change back to hamburger
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // If it's the home link (empty or # href), scroll to top
        if (targetId === '#' || targetId === '') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Adjust for floating header height
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const navWrapper = document.querySelector('.nav-wrapper');
    if (window.scrollY > 50) {
        navWrapper.style.background = 'rgba(255, 255, 255, 0.98)';
        navWrapper.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.12)';
    } else {
        navWrapper.style.background = 'rgba(255, 255, 255, 0.95)';
        navWrapper.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .highlights-content, .highlights-image, .app-demo-image, .app-demo-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
window.addEventListener('load', () => {
    // Set initial state for animated elements
    const elements = document.querySelectorAll('.feature-card, .highlights-content, .highlights-image, .app-demo-image, .app-demo-content');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Trigger initial animation check
    animateOnScroll();
});

// Trigger animations on scroll
window.addEventListener('scroll', animateOnScroll);