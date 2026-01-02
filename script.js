document.addEventListener('DOMContentLoaded', () => {
    // ===== SIMPLE HAMBURGER MENU =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            console.log('Menu toggled. Active:', navLinks.classList.contains('active'));
        });
    }

    // Close menu when a link is clicked
    if (navLinks) {
        const allLinks = navLinks.querySelectorAll('a');
        allLinks.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
            });
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(
        '.product-card, .feature-card, .about-content, .hero-content, .hero-image, .gallery-item, .highlight-item'
    );

    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`;
        observer.observe(el);
    });

    // ===== PARALLAX EFFECT =====
    let ticking = false;
    const parallaxElements = document.querySelectorAll('.hero-image img');

    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    parallaxElements.forEach(el => {
                        const offset = scrollY * 0.5;
                        el.style.transform = `translateY(${offset * 0.05}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        }
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        }

        lastScrollTop = scrollTop;
    });

    // ===== COUNTER ANIMATION =====
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Trigger counter animation when section is visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.why-us');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // ===== MOUSE FOLLOW EFFECT =====
    const cards = document.querySelectorAll('.product-card, .feature-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ===== DYNAMIC ANIMATIONS =====
    const style = document.createElement('style');
    style.innerHTML = `
        .appear {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes pulse-light {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.7;
            }
        }

        .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }

        .slide-down {
            animation: slideDown 0.8s ease-out forwards;
        }

        .pulse {
            animation: pulse-light 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);

    // ===== ENHANCED BUTTON INTERACTIONS =====
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.letterSpacing = '0.5px';
        });

        button.addEventListener('mouseleave', function () {
            this.style.letterSpacing = '0px';
        });

        // Ripple effect on click
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.innerHTML = `
        @keyframes rippleEffect {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ===== IMAGE LOADING OPTIMIZATION REMOVED =====
    // Browser native lazy loading is sufficient and less error-prone

    // ===== SCROLL PROGRESS INDICATOR =====
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (scrollPercent > 0) {
            const progressBar = document.querySelector('.scroll-progress');
            if (!progressBar) {
                const bar = document.createElement('div');
                bar.className = 'scroll-progress';
                bar.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 3px;
                    background: linear-gradient(90deg, var(--whatsapp-green), var(--primary-red));
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(bar);
            }

            const bar = document.querySelector('.scroll-progress');
            bar.style.width = scrollPercent + '%';
        }
    });

    // ===== ACTIVE NAVIGATION LINK =====
    const navAnchorLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        document.querySelectorAll('section, header').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navAnchorLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
                link.style.color = 'var(--dark-gold)';
            } else {
                link.style.color = 'var(--white)';
            }
        });
    });

    // ===== FORM VALIDATION (if forms exist) =====
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Add success feedback
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = '✓ Sent Successfully!';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        });
    });

    // ===== CURSOR GLOW EFFECT =====
    document.addEventListener('mousemove', (e) => {
        const interactiveElements = document.querySelectorAll('.btn, a, button');

        interactiveElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
                Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
            );

            if (distance < 100) {
                el.style.filter = 'brightness(1.1)';
            } else {
                el.style.filter = 'brightness(1)';
            }
        });
    });

    // ===== MOBILE RESPONSIVENESS FIXES =====
    const handleResize = () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };

    window.addEventListener('resize', handleResize);

    // ===== PRELOAD ANIMATIONS =====
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';

        // Animate hero content on load
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');

        if (heroContent) {
            heroContent.style.animation = 'slideInLeft 1s ease-out forwards';
        }
        if (heroImage) {
            heroImage.style.animation = 'slideInRight 1s ease-out forwards';
        }
    });

    // ===== SCROLL PROGRESS COFFEE CUP =====
    const scrollProgressContainer = document.querySelector('.scroll-progress-container');
    const scrollPercentageText = document.querySelector('.scroll-percentage');
    const scrollTea = document.querySelector('#scroll-tea');

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        if (scrollProgressContainer) {
            if (winScroll > 100) {
                scrollProgressContainer.classList.add('visible');
            } else {
                scrollProgressContainer.classList.remove('visible');
            }
        }

        if (scrollPercentageText) {
            scrollPercentageText.textContent = Math.round(scrolled) + '%';
        }

        if (scrollTea) {
            // Tea level: top: 20px is empty, top: 5px is full
            const teaTop = 20 - (scrolled * 0.15);
            scrollTea.style.top = teaTop + 'px';
        }
    });
});
