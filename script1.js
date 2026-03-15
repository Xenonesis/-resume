// Load dark mode preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<span>☀️</span>';
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkModeToggle.innerHTML = isDark ? '<span>☀️</span>' : '<span>◐</span>';
            localStorage.setItem('darkMode', isDark);
        });
    }
});

// Initialize skill bars animation
const observerOptions = {
    threshold: 0.5
};

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-bar-fill');
            bars.forEach(function(bar) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(function() {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(function(category) {
    skillObserver.observe(category);
});
