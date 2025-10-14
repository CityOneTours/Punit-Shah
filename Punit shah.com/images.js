// Dark/Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
let darkMode = false;

themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    body.classList.toggle("dark");
    themeToggle.innerHTML = darkMode
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
});

// Mobile Menu Toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});
document.querySelectorAll('section[id]').forEach(s => s.style.scrollMarginTop = '80px');


// Get elements
const fullModal = document.getElementById('fullscreenModal');
const fullImg = document.getElementById('fullscreenImg');
const closeBtn = document.getElementById('closeFullscreen');
const allPhotoItems = document.querySelectorAll('.photo-item');

// Image click to fullscreen
allPhotoItems.forEach(function (item) {
    item.onclick = function () {
        const imgSrc = this.getAttribute('data-img');
        fullImg.src = imgSrc;
        fullModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
});

// Close fullscreen
closeBtn.onclick = function () {
    fullModal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

// Close on background click
fullModal.onclick = function (e) {
    if (e.target === fullModal) {
        fullModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

// Close with ESC key
document.onkeydown = function (e) {
    if (e.key === 'Escape') {
        fullModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};
