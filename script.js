// Navigation menu toggle for mobile devices
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Sticky header on scroll
const stickyHeader = () => {
    const header = document.querySelector('header');
    const offset = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > offset) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
};

// Smooth scrolling for anchor links
const smoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const nav = document.querySelector('.nav-links');
            if (nav.classList.contains('nav-active')) {
                const burger = document.querySelector('.burger');
                burger.click();
            }
        });
    });
};

// Animated appearance of elements on scroll
const scrollAppear = () => {
    const elements = document.querySelectorAll('.timeline-item, .hobby-card');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    
    elements.forEach(element => {
        element.classList.add('hidden');
        appearOnScroll.observe(element);
    });
};

// Form submission handling
const handleForm = () => {
    // This function is no longer needed as the form has been removed
};

// Type animation for hero section
const typeEffect = () => {
    const text = document.querySelector('.hero-content h1 .highlight');
    const fullText = text.textContent;
    text.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < fullText.length) {
            text.textContent += fullText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 150);
};

// Skill bars animation
const animateSkills = () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const skillOptions = {
        threshold: 0.5
    };
    
    const skillObserver = new IntersectionObserver((entries, skillObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.style.width = entry.target.style.width || '0%';
            entry.target.style.transition = 'width 1.5s ease-in-out';
            setTimeout(() => {
                entry.target.style.width = entry.target.getAttribute('style').split('width:')[1].trim();
            }, 200);
            skillObserver.unobserve(entry.target);
        });
    }, skillOptions);
    
    skillLevels.forEach(skill => {
        skill.style.width = '0%';
        skillObserver.observe(skill);
    });
};

// Add a class to the current active navigation link based on scroll position
const activeNavLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// Burger menu toggle animation
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('toggle');
    });
});

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    stickyHeader();
    smoothScroll();
    activeNavLink();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .hidden { opacity: 0; transform: translateY(20px); transition: all 1s ease; }
        .appear { opacity: 1; transform: translateY(0); }
        .burger.toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); }
        .burger.toggle .line2 { opacity: 0; }
        .burger.toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); }
        .sticky { box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1); }
        .nav-links li a.active { color: var(--primary-color); }
        .nav-links li a.active::after { width: 100%; }
    `;
    document.head.appendChild(style);
    
    // Run animation functions
    setTimeout(() => {
        typeEffect();
        animateSkills();
        scrollAppear();
    }, 500);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `50% ${scrollPosition * 0.5}px`;
    }
}); 