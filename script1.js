// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Load dark mode preference on page load
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
}

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }
    }
});

// Testimonial Carousel
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function updateCarousel() {
    const offset = -currentIndex * 100;
    testimonials.forEach((testimonial) => {
        testimonial.style.transform = `translateX(${offset}%)`;
    });
}

document.getElementById('prevTestimonial')?.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalTestimonials - 1;
    updateCarousel();
});

document.getElementById('nextTestimonial')?.addEventListener('click', () => {
    currentIndex = (currentIndex < totalTestimonials - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

// Popups with Auto-Display and Close Functionality
let popupInterval;
let linkedinPopupInterval;

function showPopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.add('show');
        clearInterval(popupInterval);
        popupInterval = setInterval(() => {
            popup.classList.add('show');
        }, 25000); // Show popup every 25 seconds
    }
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.remove('show');
    }
}

function showLinkedInPopup() {
    const linkedinPopup = document.getElementById('linkedinPopup');
    if (linkedinPopup) {
        linkedinPopup.classList.add('show');
        clearInterval(linkedinPopupInterval);
        linkedinPopupInterval = setInterval(() => {
            linkedinPopup.classList.add('show');
        }, 5000); // Show LinkedIn popup every 5 seconds
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showPopup, 3000); // Show popup after 3 seconds
    showLinkedInPopup();

    // Close popups when clicking outside of them
    window.addEventListener('click', (event) => {
        const popup = document.getElementById('popup');
        const linkedinPopup = document.getElementById('linkedinPopup');

        if (popup && !popup.contains(event.target)) closePopup();
        if (linkedinPopup && !linkedinPopup.contains(event.target)) {
            linkedinPopup.classList.remove('show');
        }
    });
});
