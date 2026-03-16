/* ===== VALKOVA AUTHENTHIC — Interactive Effects ===== */

document.addEventListener('DOMContentLoaded', () => {

    // === Preloader ===
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            triggerHeroReveal();
        }, 2200);
    });

    // === Custom Cursor ===
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (window.innerWidth > 768) {
        let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
        function animateCursor() { rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animateCursor); }
        animateCursor();
        document.querySelectorAll('a, button, .collection-card, .service-card').forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
        });
    }

    // === Navbar Scroll ===
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    });

    // === Mobile Nav Toggle ===
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

    // === Hero Particles ===
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (6 + Math.random() * 8) + 's';
        p.style.animationDelay = Math.random() * 8 + 's';
        p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
        particlesContainer.appendChild(p);
    }

    // === Hero Reveal ===
    function triggerHeroReveal() {
        const reveals = document.querySelectorAll('#hero .reveal-text');
        reveals.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 200);
        });
    }

    // === Scroll Reveal (IntersectionObserver) ===
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue('--delay')) || 0;
                setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

    // === Counter Animation ===
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const duration = 2000;
                const start = performance.now();
                function update(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target).toLocaleString();
                    if (progress < 1) requestAnimationFrame(update);
                    else el.textContent = target.toLocaleString() + '+';
                }
                requestAnimationFrame(update);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

    // === Testimonials Slider ===
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    function goToSlide(index) {
        slides.forEach(s => { s.classList.remove('active'); s.style.transform = 'translateX(50px)'; });
        dots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        slides[index].style.transform = 'translateX(0)';
        dots[index].classList.add('active');
        currentSlide = index;
    }
    dots.forEach(d => d.addEventListener('click', () => goToSlide(parseInt(d.dataset.index))));
    setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);

    // === Contact Form ===
    document.getElementById('contact-form').addEventListener('submit', e => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.innerHTML = '<span>¡Enviado! ✓</span>';
        btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        setTimeout(() => {
            btn.innerHTML = '<span>Enviar Mensaje</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>';
            btn.style.background = '';
            e.target.reset();
        }, 3000);
    });

    // === Parallax on Scroll ===
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroImg = document.querySelector('.hero-img');
        if (heroImg && scrollY < window.innerHeight) {
            heroImg.style.transform = `scale(${1.1 + scrollY * 0.0002}) translateY(${scrollY * 0.3}px)`;
        }
    });

    // === Tilt Effect on Service Cards ===
    if (window.innerWidth > 768) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `translateY(-8px) perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    // === Collection Modal ===
    const collectionData = {
        'noir-elegance': {
            season: 'Otoño / Invierno 2026',
            title: 'Noir Élégance',
            desc: 'Prendas sofisticadas en tonos oscuros con detalles dorados que evocan la elegancia atemporal.',
            heroImg: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1400&h=800&fit=crop',
            longDesc: 'La colección Noir Élégance representa la esencia más sofisticada de VALKOVA AUTHENTHIC. Cada pieza ha sido cuidadosamente confeccionada con telas importadas de Italia y Francia, combinando estructuras clásicas con acabados contemporáneos. Los tonos negros profundos se complementan con sutiles detalles en hilo de oro, creando prendas que son verdaderas obras de arte de la confección.',
            specs: [
                { label: 'Piezas', value: '24 Diseños' },
                { label: 'Materiales', value: 'Seda, Lana Merino' },
                { label: 'Temporada', value: 'Otoño/Invierno' },
                { label: 'Disponibilidad', value: 'Edición Limitada' }
            ],
            gallery: [
                { img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=700&fit=crop', name: 'Vestido Noche Imperial', price: 'Desde $2,800' },
                { img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=700&fit=crop', name: 'Blazer Ónix', price: 'Desde $1,450' },
                { img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&h=700&fit=crop', name: 'Falda Ébano Dorada', price: 'Desde $980' },
                { img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=700&fit=crop', name: 'Abrigo Midnight', price: 'Desde $3,200' },
                { img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=700&fit=crop', name: 'Top Obsidiana', price: 'Desde $750' },
                { img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=700&fit=crop', name: 'Pantalón Noir Classic', price: 'Desde $890' }
            ]
        },
        'lumiere-doree': {
            season: 'Primavera / Verano 2026',
            title: 'Lumière Dorée',
            desc: 'Tejidos ligeros con hilos de oro que capturan la luz y evocan la calidez del amanecer.',
            heroImg: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&h=800&fit=crop',
            longDesc: 'Lumière Dorée celebra la luminosidad y la fluidez. Inspirada en los dorados tonos del amanecer mediterráneo, esta colección presenta prendas etéreas confeccionadas con sedas y organzas de la más alta calidad. Los hilos de oro se entrelazan con delicadeza para crear texturas que juegan con la luz, transformando cada movimiento en un espectáculo visual.',
            specs: [
                { label: 'Piezas', value: '18 Diseños' },
                { label: 'Materiales', value: 'Seda, Organza' },
                { label: 'Temporada', value: 'Primavera/Verano' },
                { label: 'Disponibilidad', value: 'Pre-orden' }
            ],
            gallery: [
                { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=700&fit=crop', name: 'Vestido Soleil', price: 'Desde $2,100' },
                { img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=700&fit=crop', name: 'Blusa Aurora Dorada', price: 'Desde $890' },
                { img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=700&fit=crop', name: 'Falda Lumière', price: 'Desde $1,050' },
                { img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=700&fit=crop', name: 'Conjunto Riviera', price: 'Desde $2,600' },
                { img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&h=700&fit=crop', name: 'Capa Dorada Etérea', price: 'Desde $1,800' },
                { img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=700&fit=crop', name: 'Pantalón Palazzo Oro', price: 'Desde $780' }
            ]
        },
        'avant-garde': {
            season: 'Colección Especial',
            title: 'Avant-Garde',
            desc: 'Diseños vanguardistas que desafían las convenciones y redefinen la moda contemporánea.',
            heroImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&h=800&fit=crop',
            longDesc: 'Avant-Garde es nuestra declaración más audaz. Esta colección experimental fusiona técnicas de confección tradicional con siluetas deconstruidas y materiales innovadores. Cada pieza desafía las normas establecidas, creando una narrativa visual que cuestiona los límites entre arte y moda. Dirigida a quienes buscan expresar su individualidad sin compromisos.',
            specs: [
                { label: 'Piezas', value: '12 Diseños' },
                { label: 'Materiales', value: 'Neopreno, Tul Técnico' },
                { label: 'Temporada', value: 'Atemporal' },
                { label: 'Disponibilidad', value: 'Piezas Únicas' }
            ],
            gallery: [
                { img: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&h=700&fit=crop', name: 'Estructura Deconstructa', price: 'Desde $3,500' },
                { img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=700&fit=crop', name: 'Vestido Geométrico', price: 'Desde $2,900' },
                { img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=700&fit=crop', name: 'Capa Arquitectónica', price: 'Desde $4,100' },
                { img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=700&fit=crop', name: 'Top Asimétrico', price: 'Desde $1,200' },
                { img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=700&fit=crop', name: 'Pantalón Escultural', price: 'Desde $1,650' },
                { img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=700&fit=crop', name: 'Conjunto Futurista', price: 'Desde $3,800' }
            ]
        },
        'esencia-pura': {
            season: 'Línea Exclusiva',
            title: 'Esencia Pura',
            desc: 'Minimalismo refinado y materiales excepcionales para quienes aprecian la perfección silenciosa.',
            heroImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=800&fit=crop',
            longDesc: 'Esencia Pura encarna la filosofía del lujo silencioso. Líneas limpias, paletas neutras enriquecidas con detalles dorados y una obsesión por el ajuste perfecto definen esta línea exclusiva. Cada prenda está confeccionada con algodón egipcio de 800 hilos, cachemira premium y sedas naturales, garantizando una experiencia sensorial sin igual.',
            specs: [
                { label: 'Piezas', value: '16 Diseños' },
                { label: 'Materiales', value: 'Cachemira, Algodón Egipcio' },
                { label: 'Temporada', value: 'Todo el Año' },
                { label: 'Disponibilidad', value: 'Por Encargo' }
            ],
            gallery: [
                { img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&h=700&fit=crop', name: 'Camisa Esencial Marfil', price: 'Desde $680' },
                { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=700&fit=crop', name: 'Vestido Línea Pura', price: 'Desde $1,950' },
                { img: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&h=700&fit=crop', name: 'Abrigo Cachemira', price: 'Desde $4,500' },
                { img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=700&fit=crop', name: 'Blusa Seda Natural', price: 'Desde $920' },
                { img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=700&fit=crop', name: 'Pantalón Clásico Ivory', price: 'Desde $1,100' },
                { img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=700&fit=crop', name: 'Conjunto Minimalista', price: 'Desde $2,300' }
            ]
        }
    };

    const modal = document.getElementById('collection-modal');
    const modalClose = document.getElementById('cmodal-close');
    const modalBackBtn = document.getElementById('cmodal-back-btn');
    const modalContactBtn = document.getElementById('cmodal-contact-btn');

    function openCollectionModal(collectionId) {
        const data = collectionData[collectionId];
        if (!data) return;

        document.getElementById('cmodal-hero-img').src = data.heroImg;
        document.getElementById('cmodal-hero-img').alt = data.title;
        document.getElementById('cmodal-season').textContent = data.season;
        document.getElementById('cmodal-title').textContent = data.title;
        document.getElementById('cmodal-desc').textContent = data.desc;
        document.getElementById('cmodal-long-desc').textContent = data.longDesc;

        // Specs
        const specsEl = document.getElementById('cmodal-specs');
        specsEl.innerHTML = data.specs.map(s => `
            <div class="cmodal-spec">
                <div><div class="cmodal-spec-label">${s.label}</div><div class="cmodal-spec-value">${s.value}</div></div>
            </div>
        `).join('');

        // Gallery
        const galleryEl = document.getElementById('cmodal-gallery');
        galleryEl.innerHTML = data.gallery.map(item => `
            <div class="cmodal-gallery-item">
                <img src="${item.img}" alt="${item.name}" loading="lazy">
                <div class="cmodal-gallery-item-overlay">
                    <div class="cmodal-gallery-item-name">${item.name}</div>
                    <div class="cmodal-gallery-item-price">${item.price}</div>
                </div>
            </div>
        `).join('');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modal.querySelector('.cmodal-container').scrollTop = 0;
    }

    function closeCollectionModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-collection]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            openCollectionModal(btn.dataset.collection);
        });
    });

    modalClose.addEventListener('click', closeCollectionModal);
    modalBackBtn.addEventListener('click', closeCollectionModal);
    modal.querySelector('.cmodal-backdrop').addEventListener('click', closeCollectionModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('active')) closeCollectionModal(); });

    modalContactBtn.addEventListener('click', e => {
        e.preventDefault();
        closeCollectionModal();
        setTimeout(() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
    });

    // === Smooth anchor scroll ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
