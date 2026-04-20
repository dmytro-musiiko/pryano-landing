/* ============================================
   PRYANO — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- HEADER SCROLL ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    // --- MOBILE MENU ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('open');
            document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
        });

        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // --- SHOWCASE HORIZONTAL SCROLL ---
    const showcaseScroll = document.getElementById('showcase-scroll');
    if (showcaseScroll) {
        const step = 324; // card width + gap
        document.querySelectorAll('.showcase__btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const dir = btn.getAttribute('data-scroll') === 'prev' ? -1 : 1;
                showcaseScroll.scrollBy({ left: step * dir, behavior: 'smooth' });
            });
        });
    }

    // --- CATALOG ACCORDION ---
    const openCatalogBlock = (block) => {
        if (!block || !block.classList.contains('catalog__block')) return;
        block.classList.add('is-open');
        const head = block.querySelector('.catalog__head');
        if (head) head.setAttribute('aria-expanded', 'true');
    };

    document.querySelectorAll('.catalog__block').forEach(block => {
        const head = block.querySelector('.catalog__head');
        if (!head) return;
        head.addEventListener('click', () => {
            const isOpen = block.classList.toggle('is-open');
            head.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                if (target.classList && target.classList.contains('catalog__block')) {
                    openCatalogBlock(target);
                }
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Open matching catalog block if page loaded with hash like #cat-mixes
    if (window.location.hash) {
        const initial = document.querySelector(window.location.hash);
        if (initial && initial.classList && initial.classList.contains('catalog__block')) {
            openCatalogBlock(initial);
        }
    }

    // --- REVEAL ON SCROLL ---
    const revealTargets = document.querySelectorAll(`
        .section-label, .section-title, .section-subtitle,
        .about__desc, .about__stats, .about__image, .about__badge,
        .category-card, .pack-card, .advantage-card,
        .feature-strip__item, .cta__content, .cta__pepper,
        .contact__item, .contact__form, .hero__feature,
        .catalog__block, .catalog__note
    `);

    revealTargets.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => io.observe(el));

    // --- NAV ACTIVE LINK ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${id}`;
                    link.style.color = isActive ? 'var(--red)' : '';
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => navObserver.observe(s));

    // --- FORM SUBMIT STUB ---
    const form = document.querySelector('.contact__form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.textContent = 'Дякуємо! Ми зв’яжемося з вами';
            btn.disabled = true;
            btn.style.background = 'var(--green)';
            setTimeout(() => {
                form.reset();
                btn.textContent = original;
                btn.disabled = false;
                btn.style.background = '';
            }, 2800);
        });
    }
});
