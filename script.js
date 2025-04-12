// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize category tabs functionality
    initCategoryTabs();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize property gallery hover effects
    initPropertyGallery();
    
    // Initialize video functionality
    initVideo();
    
    // Initialize popup menu
    initPopupMenu();
});

// Function to initialize animations for elements as they come into view
function initAnimations() {
    // Elements to animate when they come into view
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .about-image, .features-content, .features-gallery, .feature-item');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in view
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe each element
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
    
    // Add parallax effect to hero image
    window.addEventListener('scroll', function() {
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            const scrollPosition = window.scrollY;
            heroImage.style.transform = `translateY(${scrollPosition * 0.15}px)`;
        }
    });
}

// Function to initialize smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Category tabs functionality with content switching
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tabs a');
    const propertyGallery = document.querySelector('.property-gallery');
    
    // Property images for each category
    const categoryImages = {
        'real-estate': [
            'images/property1.jpg',
            'images/property2.jpg',
            'images/property3.jpg'
        ],
        'homes': [
            'images/home1.jpg',
            'images/home2.jpg',
            'images/home3.jpg'
        ],
        'new-places': [
            'images/new1.jpg',
            'images/new2.jpg',
            'images/new3.jpg'
        ],
        'apartments': [
            'images/apartment1.jpg',
            'images/apartment2.jpg',
            'images/apartment3.jpg'
        ],
        'office': [
            'images/office1.jpg',
            'images/office2.jpg',
            'images/office3.jpg'
        ]
    };
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Fade out current content
            propertyGallery.classList.add('fade');
            
            // After fade out, update content and fade in
            setTimeout(() => {
                const category = this.getAttribute('data-category');
                const images = categoryImages[category];
                
                // Update gallery images
                const cards = propertyGallery.querySelectorAll('.property-card img');
                cards.forEach((card, index) => {
                    if (images && images[index]) {
                        card.src = images[index];
                    }
                });
                
                // Fade in new content
                propertyGallery.classList.remove('fade');
            }, 400);
        });
    });
}

// Search functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    let isSearchOpen = false;
    
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isSearchOpen = !isSearchOpen;
        
        if (isSearchOpen) {
            searchInput.classList.add('active');
            searchInput.focus();
        } else {
            searchInput.classList.remove('active');
            searchInput.value = '';
        }
    });
    
    // Close search on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container') && isSearchOpen) {
            isSearchOpen = false;
            searchInput.classList.remove('active');
            searchInput.value = '';
        }
    });
    
    // Handle search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // Handle search functionality here
            console.log('Searching for:', searchInput.value);
            // You can implement the actual search functionality here
        }
    });
}

// Add hover effect on property cards
const propertyCards = document.querySelectorAll('.property-card');
propertyCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        
        // Scale the image slightly
        const image = this.querySelector('img');
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
        
        // Reset image scale
        const image = this.querySelector('img');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Add animation to the "SEE MORE" button
const seeMoreBtn = document.querySelector('.btn-primary');
if (seeMoreBtn) {
    seeMoreBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    
    seeMoreBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.backgroundColor = 'transparent';
    });
}

// Add a subtle scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    let visible = true;
    
    // Detect when user scrolls and hide the indicator
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100 && visible) {
            scrollIndicator.style.opacity = '0';
            visible = false;
        } else if (window.scrollY <= 100 && !visible) {
            scrollIndicator.style.opacity = '1';
            visible = true;
        }
    });
}

// Initialize property gallery hover effects
function initPropertyGallery() {
    // Get all property cards
    const propertyCards = document.querySelectorAll('.property-card');
    
    // Add hover effects
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
}

// Initialize video functionality
function initVideo() {
    const video = document.querySelector('.hero-video video');
    const playBtn = document.querySelector('.play-btn');
    const volumeBtn = document.querySelector('.volume-btn');
    const videoContainer = document.querySelector('.hero-video');
    
    if (playBtn && video && volumeBtn) {
        // Set video attributes
        video.autoplay = true;
        video.muted = true; // Start muted by default
        video.loop = true;
        videoContainer.classList.add('playing');
        volumeBtn.classList.add('muted');

        // Toggle play/pause on button click
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleVideo();
        });
        
        // Toggle play/pause on video click
        video.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleVideo();
        });
        
        // Show/hide play button on hover
        videoContainer.addEventListener('mouseenter', () => {
            playBtn.style.opacity = '1';
            volumeBtn.style.opacity = '1';
        });
        
        videoContainer.addEventListener('mouseleave', () => {
            playBtn.style.opacity = '0';
            volumeBtn.style.opacity = '0';
        });

        // Volume control
        volumeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleVolume();
        });

        // Function to toggle video play/pause
        function toggleVideo() {
            if (video.paused) {
                video.play();
                videoContainer.classList.add('playing');
            } else {
                video.pause();
                videoContainer.classList.remove('playing');
            }
        }

        // Function to toggle volume
        function toggleVolume() {
            if (video.muted) {
                video.muted = false;
                volumeBtn.classList.remove('muted');
            } else {
                video.muted = true;
                volumeBtn.classList.add('muted');
            }
        }

        // Update play button icon based on video state
        video.addEventListener('play', () => {
            videoContainer.classList.add('playing');
        });

        video.addEventListener('pause', () => {
            videoContainer.classList.remove('playing');
        });

        video.addEventListener('ended', () => {
            if (!video.loop) {
                videoContainer.classList.remove('playing');
                video.currentTime = 0;
            }
        });
    }
}

// Initialize popup menu
function initPopupMenu() {
    const popupMenu = document.querySelector('.popup-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const menuTrigger = document.querySelector('.menu-trigger');
    const themeToggle = document.querySelector('.theme-toggle');
    const languageToggle = document.querySelector('.language-toggle');
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const socialIcons = document.querySelector('.footer-right .social-icons');

    // Toggle popup menu
    menuTrigger.addEventListener('click', () => {
        popupMenu.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', () => {
        popupMenu.classList.remove('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.popup-menu') && !e.target.closest('.menu-trigger') && popupMenu.classList.contains('active')) {
            popupMenu.classList.remove('active');
        }
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
    });

    // Language toggle
    languageToggle.addEventListener('click', () => {
        const text = languageToggle.querySelector('span');
        if (text.textContent === 'العربية') {
            text.textContent = 'English';
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
        } else {
            text.textContent = 'العربية';
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
        }
    });

    // Search functionality
    searchBtn.addEventListener('click', () => {
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
            socialIcons.style.marginRight = '220px';
        } else {
            socialIcons.style.marginRight = '0';
        }
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container') && searchInput.classList.contains('active')) {
            searchInput.classList.remove('active');
            socialIcons.style.marginRight = '0';
        }
    });
} 