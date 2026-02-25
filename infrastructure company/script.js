/**
 * Energy Infrastructure - Corporate Website
 * Interactions, animations, analytics integration
 */

(function () {
    'use strict';

    // =========================================================================
    // Header Scroll Effect
    // =========================================================================
    const header = document.querySelector('.header');

    function updateHeader() {
        if (window.scrollY > 80) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    // =========================================================================
    // Mobile Navigation - slide-in menu (768px and below), Bootstrap above 768px
    // =========================================================================
    const MOBILE_BREAKPOINT = 1200;
    const navbarCollapse = document.querySelector('#navbarMain');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    let menuMovedToBody = false;

    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function ensureMobileMenuInBody() {
        if (!navbarCollapse) return;
        if (isMobile() && !menuMovedToBody) {
            document.body.appendChild(navbarCollapse);
            menuMovedToBody = true;
        } else if (!isMobile() && menuMovedToBody) {
            const nav = document.querySelector('.navbar');
            if (nav) {
                nav.appendChild(navbarCollapse);
                menuMovedToBody = false;
            }
        }
    }

    function closeMobileMenu() {
        if (!navbarCollapse) return;
        navbarCollapse.classList.remove('open');
        if (mobileOverlay) {
            mobileOverlay.classList.remove('active');
            mobileOverlay.removeAttribute('role');
            mobileOverlay.removeAttribute('aria-label');
            mobileOverlay.setAttribute('aria-hidden', 'true');
        }
        document.body.style.overflow = '';
        if (navbarToggler) {
            navbarToggler.setAttribute('aria-expanded', 'false');
            navbarToggler.setAttribute('aria-label', 'Open menu');
        }
    }

    function openMobileMenu() {
        if (!navbarCollapse) return;
        navbarCollapse.classList.add('open');
        if (mobileOverlay) {
            mobileOverlay.classList.add('active');
            mobileOverlay.setAttribute('aria-hidden', 'false');
            mobileOverlay.setAttribute('role', 'button');
            mobileOverlay.setAttribute('aria-label', 'Close menu');
        }
        document.body.style.overflow = 'hidden';
        if (navbarToggler) {
            navbarToggler.setAttribute('aria-expanded', 'true');
            navbarToggler.setAttribute('aria-label', 'Close menu');
        }
    }

    function toggleMobileMenu() {
        if (navbarCollapse.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    if (navbarToggler) {
        navbarToggler.addEventListener('click', function (e) {
            if (isMobile()) {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
            }
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            if (isMobile()) closeMobileMenu();
        });
    }

    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            if (isMobile()) closeMobileMenu();
        });
    }

    if (navbarCollapse) {
        navbarCollapse.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', (e) => {
                if (!isMobile()) return;
                closeMobileMenu();
            });
        });
    }

    window.addEventListener('resize', () => {
        if (!isMobile()) closeMobileMenu();
        ensureMobileMenuInBody();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMobile() && navbarCollapse?.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    ensureMobileMenuInBody();
    if (navbarCollapse) navbarCollapse.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');

    // =========================================================================
    // Animated Metrics Counters
    // =========================================================================
    function animateValue(el, start, end, duration, suffix) {
        suffix = suffix || '';
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = end + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    function initHeroStats() {
        const stats = document.querySelectorAll('.hero-stat-value[data-target]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const target = parseInt(el.getAttribute('data-target'), 10);
                        const suffix = el.getAttribute('data-suffix') || '';
                        animateValue(el, 0, target, 1500, suffix);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.2 }
        );

        stats.forEach((s) => observer.observe(s));
    }

    function initCaseStudyMetrics() {
        const metrics = document.querySelectorAll('.case-metric[data-target]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const target = parseInt(el.getAttribute('data-target'), 10);
                        const suffix = el.getAttribute('data-suffix') || '';
                        animateValue(el, 0, target, 1200, suffix);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.2 }
        );

        metrics.forEach((m) => observer.observe(m));
    }

    initHeroStats();
    initCaseStudyMetrics();

    // =========================================================================
    // Strategic Position - Scroll-triggered animations
    // =========================================================================
    function initPositioningAnimations() {
        const section = document.getElementById('positioning');
        if (!section) return;

        const header = section.querySelector('.positioning-header');
        const content = section.querySelector('.positioning-content');
        const cardWrapper = section.querySelector('.positioning-card-wrapper');
        const pillars = section.querySelectorAll('.pillar-item');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        header?.classList.add('visible');
                        content?.classList.add('visible');
                        cardWrapper?.classList.add('visible');
                        pillars.forEach((p) => p.classList.add('visible'));
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        observer.observe(section);
    }

    initPositioningAnimations();

    // =========================================================================
    // Section scroll animations (Capabilities, Case Studies, Compliance, Vision)
    // =========================================================================
    function initSectionAnimations() {
        const sections = ['capabilities', 'case-studies', 'compliance', 'vision', 'presence', 'leadership', 'contact'];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.add('animate-on-scroll');
                observer.observe(el);
            }
        });
    }

    initSectionAnimations();

    // =========================================================================
    // Smooth Scroll for Anchor Links
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // =========================================================================
    // Contact Form
    // =========================================================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Analytics: track form submission intent
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    form_name: 'partnership_inquiry',
                    inquiry_type: data.inquiry,
                });
            }

            // Placeholder: replace with actual API/backend integration
            console.log('Partnership inquiry:', data);

            // Success feedback (replace with actual submission logic)
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Inquiry Submitted';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                this.reset();
            }, 3000);
        });
    }

    // =========================================================================
    // Footer Year
    // =========================================================================
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // =========================================================================
    // Analytics Integration Placeholder
    // Add your analytics script (e.g. Google Analytics, Plausible) here
    // =========================================================================
    /*
    // Google Analytics 4 example:
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
    */

})();
