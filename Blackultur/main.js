// Animation au scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            const headerTop = document.querySelector('.header-top');
            const logo = document.querySelector('.header-main img');
            
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
                header.classList.add('scrolled');
                // Masquer le header-top et réduire le logo
                headerTop.style.height = '0px';
                headerTop.style.transition = 'height 0.3s ease';
                logo.style.width = '120px';
                logo.style.transition = 'width 0.3s ease';
            } else {
                header.style.boxShadow = 'none';
                header.classList.remove('scrolled');
                // Afficher le header-top et remettre la taille normale du logo
                headerTop.style.height = '39px';
                headerTop.style.transition = 'height 0.3s ease';
                logo.style.width = '200px';
                logo.style.transition = 'width 0.3s ease';
            }

            if (window.scrollY > 85) {
                headerTop.style.background = '#fff';
            } else {
                headerTop.style.background = '#000' ;
            }

        });

        // Effet hover sur les cartes
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

        // Animation des numéros de tendances
        const trendingNumbers = document.querySelectorAll('.trending-number');
        trendingNumbers.forEach((number, index) => {
            number.style.animationDelay = `${index * 0.1}s`;
            number.style.animation = 'pulse 2s infinite';
        });

        // Ajout de l'animation CSS
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

        let currentSlide = 0;
        let currentSlide2 = 0;
        const carousel = document.getElementById('carousel');
        const carousel2 = document.getElementById('carousel-2');
        const articles = document.querySelectorAll('.article-card');
        const articles2 = document.querySelectorAll('.article-card-2');
        const totalSlides = Math.ceil(articles.length / 3); // 3 articles visibles à la fois
        const totalSlides2 = Math.ceil(articles2.length / 3);
        const dotsContainer = document.getElementById('dots');
        const dotsContainer2 = document.getElementById('dots-2');

        // Créer les points de navigation
        for (let i = 0; i < totalSlides; i++) {
            dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        }

        for (let i = 0; i < totalSlides2; i++) {
            dot2 = document.createElement('div');
            dot2.className = 'carousel-dot2';
            if (i === 0) dot2.classList.add('active');
            dot2.onclick = () => goToSlide(i);
            dotsContainer2.appendChild(dot2);
        }

        function updateCarousel() {
            slideWidth = 320; // largeur d'un article + gap
            carousel.style.transform = `translateX(-${currentSlide * slideWidth * 3}px)`;
            
            // Mettre à jour les dots
            document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function updateCarousel2() {
            slideWidth2 = 320; // largeur d'un article + gap
            carousel2.style.transform = `translateX(-${currentSlide2 * slideWidth2 * 3}px)`;
            
            // Mettre à jour les dots
            document.querySelectorAll('.carousel-dot2').forEach((dot2, index2) => {
                dot2.classList.toggle('active', index2 === currentSlide2);
            });
        }


        function moveCarousel(direction) {
            currentSlide += direction;
            
            if (currentSlide < 0) {
                currentSlide = totalSlides - 1;
            } else if (currentSlide >= totalSlides) {
                currentSlide = 0;
            }
            
            updateCarousel();
        }


        
        function moveCarousel2(direction) {
            currentSlide2 += direction;
            
            if (currentSlide2 < 0) {
                currentSlide2 = totalSlides2 - 1;
            } else if (currentSlide2 >= totalSlides2) {
                currentSlide2 = 0;
            }
            
            updateCarousel2();
        }

        function goToSlide(slide) {
            currentSlide = slide;
            updateCarousel();
        }

        function goToSlide2(slide) {
            currentSlide2 = slide;
            updateCarousel2();
        }

        // Auto-play (optionnel)
        let autoplayInterval = setInterval(() => {
            moveCarousel(1);
        }, 5000);

        let autoplayInterval2 = setInterval(() => {
            moveCarousel2(1);
        }, 5000);

        // Pause auto-play au survol
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        carousel2.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval2);
        });

        carousel.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(() => {
                moveCarousel(1);
            }, 5000);
        });
        carousel2.addEventListener('mouseleave', () => {
            autoplayInterval2 = setInterval(() => {
                moveCarousel2(1);
            }, 5000);
        });

        // Support tactile pour mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

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
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    moveCarousel(1);
                } else {
                    moveCarousel(-1);
                }
            }
            
            isDragging = false;
        });


         carousel2.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        carousel2.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        carousel2.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const deltaX = startX - currentX;
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    moveCarousel(1);
                } else {
                    moveCarousel(-1);
                }
            }
            
            isDragging = false;
        });