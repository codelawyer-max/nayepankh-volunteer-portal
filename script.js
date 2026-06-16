document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. DARK / LIGHT MODE ENGINE
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fa-solid fa-moon';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.className = 'fa-solid fa-sun';
        }
    });

    // ==========================================================================
    // 2. MOBILE HAMBURGER MENU INTERACTION
    // ==========================================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    // ==========================================================================
    // 3. STATS COUNT-UP ANIMATION
    // ==========================================================================
    const stats = document.querySelectorAll('.stat-number');
    const animationDuration = 2000;

    const animateCounters = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const startTime = performance.now();

            const updateNumber = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / animationDuration, 1);
                const currentValue = Math.floor(progress * target);
                
                stat.innerText = currentValue.toLocaleString() + '+';

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.innerText = target.toLocaleString() + '+';
                }
            };

            requestAnimationFrame(updateNumber);
        });
    };

    animateCounters();

    // ==========================================================================
    // 4. FORM VALIDATION PIPELINES
    // ==========================================================================
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const inputs = [
                { id: 'vol-name', msg: 'Full name is required.' },
                { id: 'vol-email', msg: 'Please enter a valid email.', reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
                { id: 'vol-phone', msg: 'Please enter a valid 10-digit number.', reg: /^\d{10}$/ },
                { id: 'vol-event', msg: 'Please select an area of interest.' }
            ];

            inputs.forEach(input => {
                const element = document.getElementById(input.id);
                if (element) {
                    const errorSpan = element.nextElementSibling;
                    if (!element.value.trim() || (input.reg && !input.reg.test(element.value.trim()))) {
                        if (errorSpan) errorSpan.innerText = input.msg;
                        element.style.borderColor = '#ef4444';
                        isValid = false;
                    } else {
                        if (errorSpan) errorSpan.innerText = '';
                        element.style.borderColor = 'var(--border)';
                    }
                }
            });

            if (isValid) {
                alert('Thank you for joining NayePankh! Your application has been submitted successfully.');
                volunteerForm.reset();
            }
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const  inputs = [
                { id: 'con-name', msg: 'Name is required.' },
                { id: 'con-email', msg: 'Please enter a valid email.', reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
                { id: 'con-msg', msg: 'Message cannot be empty.' }
            ];

            inputs.forEach(input => {
                const element = document.getElementById(input.id);
                if (element) {
                    const errorSpan = element.nextElementSibling;
                    if (!element.value.trim() || (input.reg && !input.reg.test(element.value.trim()))) {
                        if (errorSpan) errorSpan.innerText = input.msg;
                        element.style.borderColor = '#ef4444';
                        isValid = false;
                    } else {
                        if (errorSpan) errorSpan.innerText = '';
                        element.style.borderColor = 'var(--border)';
                    }
                }
            });

            if (isValid) {
                alert('Inquiry sent successfully! We will get back to you shortly.');
                contactForm.reset();
            }
        });
    }
});
