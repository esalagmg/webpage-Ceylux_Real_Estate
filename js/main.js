// main.js - Core functionality for Ceylux Real Estate

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. Sticky Navbar with Background Change on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark/95', 'backdrop-blur-md', 'border-b', 'border-gray-800', 'shadow-lg');
            navbar.classList.remove('bg-transparent', 'py-6');
            navbar.classList.add('py-4');
        } else {
            navbar.classList.remove('bg-dark/95', 'backdrop-blur-md', 'border-b', 'border-gray-800', 'shadow-lg');
            navbar.classList.add('bg-transparent', 'py-6');
            navbar.classList.remove('py-4');
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Contact Form Submission Handling (Visual only, no backend)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'SENDING...';
            btn.classList.add('opacity-70', 'cursor-not-allowed');
            
            setTimeout(() => {
                btn.innerText = 'INQUIRY SENT';
                btn.classList.remove('bg-gold', 'text-dark');
                btn.classList.add('bg-green-600', 'text-white', 'border-green-600');
                
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerText = originalText;
                    btn.classList.add('bg-gold', 'text-dark');
                    btn.classList.remove('bg-green-600', 'text-white', 'border-green-600', 'opacity-70', 'cursor-not-allowed');
                }, 3000);
            }, 1500);
        });
    }
});
