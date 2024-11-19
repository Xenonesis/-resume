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
    if (window.scrollY > 50) {
        header.classList.add('navbar-scrolled');
    } else {
        header.classList.remove('navbar-scrolled');
    }
});

// Skills Progress Bar Animation
const skillSections = document.querySelectorAll('.skill-category');
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar-fill');
            progressBars.forEach(bar => {
                bar.style.width = bar.getAttribute('style').split(':')[1].trim();
            });
        }
    });
}, { threshold: 0.5 });

skillSections.forEach(section => skillObserver.observe(section));

// Testimonial Carousel
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function updateCarousel() {
    testimonials.forEach((testimonial, index) => {
        testimonial.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
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

// Scroll-Based Fade-In Animation
const fadeInElements = document.querySelectorAll('.fade-in');
const fadeInObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

fadeInElements.forEach(element => fadeInObserver.observe(element));

// Contact Form Animation
const contactSection = document.getElementById('contact');
const contactObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        contactSection.classList.add('visible');
    }
}, { threshold: 0.5 });

contactObserver.observe(contactSection);

// Pop-up Animation
function showPopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
        }, 10000); // Popup stays for 10 seconds
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showPopup, 3000); // Show popup after 3 seconds
});

// Close pop-ups when clicking outside of them
window.addEventListener('click', (event) => {
    const popup = document.getElementById('popup');
    if (popup && !popup.contains(event.target)) closePopup();
});

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.remove('show');
    }
}

// Bot Chatbox Functionality
const botContainer = document.getElementById('botContainer');
const botMessages = document.getElementById('botMessages');
const userInput = document.getElementById('userInput');
const sendMessageButton = document.getElementById('sendMessage');

sendMessageButton?.addEventListener('click', sendMessage);
userInput?.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.textContent = message;
    botMessages.appendChild(userMessage);

    setTimeout(() => {
        const botReply = document.createElement('div');
        botReply.classList.add('message', 'bot');
        botReply.textContent = generateBotReply(message);
        botMessages.appendChild(botReply);
        botMessages.scrollTop = botMessages.scrollHeight;
    }, 500);

    userInput.value = '';
}

function generateBotReply(userMessage) {
    const replies = [
        "Thank you for reaching out! How can I assist you today?",
        "I'm here to help with any questions you have.",
        "Could you please provide more details?",
        "Let's get started! What would you like to discuss?"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
}
