/* ==========================================================================
   INITIALISATION DES VARIABLES GLOBALES
   ========================================================================== */

// Variables du carousel principal
let currentSlide = 0;
let currentSlide2 = 0;
let currentSlide3 = 0;
let currentSlide4 = 0;
let autoplayInterval;
let autoplayInterval2;
let autoplayInterval3;
let autoplayInterval4;

// Variables pour le support tactile
let startX = 0;
let currentX = 0;
let isDragging = false;

// Configuration du carousel
const SLIDE_WIDTH = 320; // largeur d'un article + gap
const AUTOPLAY_DELAY = 5000;
const TOUCH_THRESHOLD = 50;

/* ==========================================================================
   STYLES DYNAMIQUES
   ========================================================================== */

function initializeStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .header {
            transition: all 0.3s ease;
        }
        
        .header.scrolled {
            padding: 10px 0;
        }
        
        .header.scrolled .header-main {
            padding: 10px 0;
        }
        
        .header-top {
            transition: all 0.3s ease;
        }
        
        .header-main img {
            transition: width 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

/* ==========================================================================
   ANIMATIONS AU SCROLL
   ========================================================================== */

function initializeScrollAnimations() {
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const header = document.querySelector('.header');
    const headerTop = document.querySelector('.header-top');
    const logo = document.querySelector('.header-main img');
    const scrollY = window.scrollY;
    
    // Animation à partir de 50px de scroll
    if (scrollY > 50) {
        applyScrolledStyles(header, headerTop, logo);
    } else {
        removeScrolledStyles(header, headerTop, logo);
    }
    
    // Changement de couleur du header-top à 85px
    if (scrollY > 85) {
        headerTop.style.background = '#fff';
    } else {
        headerTop.style.background = '#000';
    }
}

function applyScrolledStyles(header, headerTop, logo) {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    header.classList.add('scrolled');
    
    // Masquer le header-top et réduire le logo
    headerTop.style.height = '0px';
    headerTop.style.transition = 'height 0.3s ease';
    
    if (logo) {
        logo.style.width = '120px';
        logo.style.transition = 'width 0.3s ease';
    }
}

function removeScrolledStyles(header, headerTop, logo) {
    header.style.boxShadow = 'none';
    header.classList.remove('scrolled');
    
    // Afficher le header-top et remettre la taille normale du logo
    headerTop.style.height = '39px';
    headerTop.style.transition = 'height 0.3s ease';
    
    if (logo) {
        logo.style.width = '200px';
        logo.style.transition = 'width 0.3s ease';
    }
}

/* ==========================================================================
   ANIMATIONS DES CARTES
   ========================================================================== */

function initializeCardAnimations() {
    const cards = document.querySelectorAll('.article-card, .featured-article');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(255, 255, 255, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

/* ==========================================================================
   ANIMATIONS DES NUMÉROS DE TENDANCES
   ========================================================================== */

function initializeTrendingAnimations() {
    const trendingNumbers = document.querySelectorAll('.trending-number');
    
    trendingNumbers.forEach((number, index) => {
        number.style.animationDelay = `${index * 0.1}s`;
        number.style.animation = 'pulse 2s infinite';
    });
}

/* ==========================================================================
   CAROUSEL PRINCIPAL
   ========================================================================== */

function initializeCarousel() {
    const carousel = document.getElementById('carousel');
    const articles = document.querySelectorAll('.article-card');
    const totalSlides = Math.ceil(articles.length / 3);
    const dotsContainer = document.getElementById('dots');
    
    if (!carousel || !dotsContainer) return;
    
    // Créer les points de navigation
    createCarouselDots(dotsContainer, totalSlides, 'carousel-dot', goToSlide);
    
    // Initialiser l'autoplay
    startAutoplay();
    
    // Ajouter les événements de survol
    addCarouselHoverEvents(carousel, 1);
    
    // Ajouter le support tactile
    addTouchSupport(carousel, moveCarousel);
}

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    carousel.style.transform = `translateX(-${currentSlide * SLIDE_WIDTH * 3}px)`;
    
    // Mettre à jour les dots
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function moveCarousel(direction) {
    const articles = document.querySelectorAll('.article-card');
    const totalSlides = Math.ceil(articles.length / 3);
    
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    updateCarousel();
}

function goToSlide(slide) {
    currentSlide = slide;
    updateCarousel();
}

/* ==========================================================================
   CAROUSEL SECONDAIRE
   ========================================================================== */

function initializeCarousel2() {
    const carousel2 = document.getElementById('carousel-2');
    const articles2 = document.querySelectorAll('.article-card-2');
    const totalSlides2 = Math.ceil(articles2.length / 3);
    const dotsContainer2 = document.getElementById('dots-2');
    
    if (!carousel2 || !dotsContainer2) return;
    
    // Créer les points de navigation
    createCarouselDots(dotsContainer2, totalSlides2, 'carousel-dot2', goToSlide2);
    
    // Initialiser l'autoplay
    startAutoplay2();
    
    // Ajouter les événements de survol
    addCarouselHoverEvents(carousel2, 2);
    
    // Ajouter le support tactile
    addTouchSupport(carousel2, moveCarousel2);
}

function updateCarousel2() {
    const carousel2 = document.getElementById('carousel-2');
    if (!carousel2) return;
    
    carousel2.style.transform = `translateX(-${currentSlide2 * SLIDE_WIDTH * 3}px)`;
    
    // Mettre à jour les dots
    document.querySelectorAll('.carousel-dot2').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide2);
    });
}

function moveCarousel2(direction) {
    const articles2 = document.querySelectorAll('.article-card-2');
    const totalSlides2 = Math.ceil(articles2.length / 3);
    
    currentSlide2 += direction;
    
    if (currentSlide2 < 0) {
        currentSlide2 = totalSlides2 - 1;
    } else if (currentSlide2 >= totalSlides2) {
        currentSlide2 = 0;
    }
    
    updateCarousel2();
}

function goToSlide2(slide) {
    currentSlide2 = slide;
    updateCarousel2();
}

/* ==========================================================================
   CAROUSEL TERTIAIRE
   ========================================================================== */

function initializeCarousel3() {
    const carousel3 = document.getElementById('carousel-3');
    const articles3 = document.querySelectorAll('.article-card-3');
    const totalSlides3 = Math.ceil(articles3.length / 3);
    const dotsContainer3 = document.getElementById('dots-3');
    
    if (!carousel3 || !dotsContainer3) return;
    
    // Créer les points de navigation
    createCarouselDots(dotsContainer3, totalSlides3, 'carousel-dot3', goToSlide3);
    
    // Initialiser l'autoplay
    startAutoplay3();
    
    // Ajouter les événements de survol
    addCarouselHoverEvents(carousel3, 3);
    
    // Ajouter le support tactile
    addTouchSupport(carousel3, moveCarousel3);
}

function updateCarousel3() {
    const carousel3 = document.getElementById('carousel-3');
    if (!carousel3) return;
    
    carousel3.style.transform = `translateX(-${currentSlide3 * SLIDE_WIDTH * 3}px)`;
    
    // Mettre à jour les dots
    document.querySelectorAll('.carousel-dot3').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide3);
    });
}

function moveCarousel3(direction) {
    const articles3 = document.querySelectorAll('.article-card-3');
    const totalSlides3 = Math.ceil(articles3.length / 3);
    
    currentSlide3 += direction;
    
    if (currentSlide3 < 0) {
        currentSlide3 = totalSlides3 - 1;
    } else if (currentSlide3 >= totalSlides3) {
        currentSlide3 = 0;
    }
    
    updateCarousel3();
}

function goToSlide3(slide) {
    currentSlide3 = slide;
    updateCarousel3();
}

/* ==========================================================================
   CAROUSEL 4
   ========================================================================== */

function initializeCarousel4() {
    const carousel4 = document.getElementById('carousel-4');
    const articles4 = document.querySelectorAll('.article-card-4');
    const totalSlides4 = Math.ceil(articles4.length / 3);
    const dotsContainer4 = document.getElementById('dots-4');
    
    if (!carousel4 || !dotsContainer4) return;
    
    // Créer les points de navigation
    createCarouselDots(dotsContainer4, totalSlides4, 'carousel-dot4', goToSlide4);
    
    // Initialiser l'autoplay
    startAutoplay4();
    
    // Ajouter les événements de survol
    addCarouselHoverEvents(carousel4, 4);
    
    // Ajouter le support tactile
    addTouchSupport(carousel4, moveCarousel4);
}

function updateCarousel4() {
    const carousel4 = document.getElementById('carousel-4');
    if (!carousel4) return;
    
    carousel4.style.transform = `translateX(-${currentSlide4 * SLIDE_WIDTH * 3}px)`;
    
    // Mettre à jour les dots
    document.querySelectorAll('.carousel-dot4').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide4);
    });
}

function moveCarousel4(direction) {
    const articles4 = document.querySelectorAll('.article-card-4');
    const totalSlides4 = Math.ceil(articles4.length / 3);
    
    currentSlide4 += direction;
    
    if (currentSlide4 < 0) {
        currentSlide4 = totalSlides4 - 1;
    } else if (currentSlide4 >= totalSlides4) {
        currentSlide4 = 0;
    }
    
    updateCarousel4();
}

function goToSlide4(slide) {
    currentSlide4 = slide;
    updateCarousel4();
}

/* ==========================================================================
   FONCTIONS UTILITAIRES POUR LES CAROUSELS
   ========================================================================== */

function createCarouselDots(container, totalSlides, dotClass, clickHandler) {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = dotClass;
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => clickHandler(i);
        container.appendChild(dot);
    }
}

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        moveCarousel(1);
    }, AUTOPLAY_DELAY);
}

function startAutoplay2() {
    autoplayInterval2 = setInterval(() => {
        moveCarousel2(1);
    }, AUTOPLAY_DELAY);
}

function startAutoplay3() {
    autoplayInterval3 = setInterval(() => {
        moveCarousel3(1);
    }, AUTOPLAY_DELAY);
}

function startAutoplay4() {
    autoplayInterval4 = setInterval(() => {
        moveCarousel4(1);
    }, AUTOPLAY_DELAY)
}

function addCarouselHoverEvents(carousel, carouselNumber) {
    carousel.addEventListener('mouseenter', () => {
        if (carouselNumber === 1) {
            clearInterval(autoplayInterval);
        } else if (carouselNumber === 2) {
            clearInterval(autoplayInterval2);
        } else if (carouselNumber === 3) {
            clearInterval(autoplayInterval3);
        } else if (carouselNumber === 4) {
            clearInterval(autoplayInterval4);
        }
    });

    carousel.addEventListener('mouseleave', () => {
        if (carouselNumber === 1) {
            startAutoplay();
        } else if (carouselNumber === 2) {
            startAutoplay2();
        } else if (carouselNumber === 3) {
            startAutoplay3();
        } else if (carouselNumber === 4) {
            startAutoplay4();
        }
    });
}

function addTouchSupport(carousel, moveFunction) {
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        
        const deltaX = startX - currentX;
        if (Math.abs(deltaX) > TOUCH_THRESHOLD) {
            if (deltaX > 0) {
                moveFunction(1);
            } else {
                moveFunction(-1);
            }
        }
        
        isDragging = false;
    });
}

/* ==========================================================================
   NAVIGATION ET UTILITAIRES
   ========================================================================== */

function moveWindow(IdElement, offset = 0) {
    const element = document.getElementById(IdElement);
    if (!element) return;
    
    const position = element.offsetTop + offset;
    
    window.scrollTo({
        top: position,
        behavior: 'smooth'
    });
}

/* ==========================================================================
   INITIALISATION GÉNÉRALE
   ========================================================================== */

function initializeAll() {
    initializeStyles();
    initializeScrollAnimations();
    initializeCardAnimations();
    initializeTrendingAnimations();
    initializeCarousel();
    initializeCarousel2();
    initializeCarousel3();
    initializeCarousel4();
}

// Lancer l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initializeAll);

// Support pour les navigateurs plus anciens
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}
