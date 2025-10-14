// Role text rotation
const roles = [" ENTREPRENEUR", "INVESTOR", "SPIRITPRENEUR"];
// const roles = ["Entrepreneur ENTREPRENEUR", "Investor", "Spiritpreneur"];

let index = 0;
const roleElement = document.getElementById("role");

function rotateRole() {
    roleElement.style.opacity = 0;
    setTimeout(() => {
        roleElement.textContent = roles[index];
        roleElement.style.opacity = 1;
        index = (index + 1) % roles.length;
    }, 500);
}
setInterval(rotateRole, 2000);

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


//   Videocode


const episodes = {
    1: {
        title: 'Episode 1',
        description: 'The beginning of the journey - Exploring new opportunities and challenges in building a global presence.',
        videoUrl: 'https://www.youtube.com/embed/eSB8IfBKp-A?autoplay=1'
    },
    2: {
        title: 'Episode 2',
        description: 'Expanding horizons - Strategic planning and execution in international markets.',
        videoUrl: 'https://www.youtube.com/embed/qIhRe0dAWG8?autoplay=1'
    },
    3: {
        title: 'Episode 3',
        description: 'Breaking barriers - Overcoming obstacles and creating lasting impact.',
        videoUrl: 'https://www.youtube.com/embed/ltrmIDwX_J4?autoplay=1'
    },
    4: {
        title: 'Episode 4',
        description: 'Global vision - Building connections and fostering growth across borders.',
        videoUrl: 'https://www.youtube.com/embed/eSB8IfBKp-A?autoplay=1'
    },
    // 5: {
    //     title: 'Episode 3',
    //     description: 'Breaking barriers - Overcoming obstacles and creating lasting impact.',
    //     videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    // },
    // 6: {
    //     title: 'Episode 3',
    //     description: 'Breaking barriers - Overcoming obstacles and creating lasting impact.',
    //     videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    // },
    // 7: {
    //     title: 'Episode 3',
    //     description: 'Breaking barriers - Overcoming obstacles and creating lasting impact.',
    //     videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    // },

};

function openVideo(episodeNum) {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');

    const episode = episodes[episodeNum];

    videoContainer.innerHTML = `<iframe src="${episode.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    videoTitle.textContent = episode.title;
    videoDescription.textContent = episode.description;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');

    videoContainer.innerHTML = '';
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('videoModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeVideo();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeVideo();
    }
});


// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



// insights code

// Normalize function: lower-case, trim, collapse multiple spaces
const norm = s => String(s || '').toLowerCase().trim().replace(/\s+/g, ' ');

const buttons = document.querySelectorAll('.filter-buttons button');
const cards = document.querySelectorAll('.insight-card');

// initial: ensure all cards visible (in case some were hidden via display)
cards.forEach(c => { c.style.display = 'block'; c.classList.remove('hide'); });

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        // visual active state
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterRaw = btn.dataset.filter || btn.textContent;
        const filter = norm(filterRaw);

        cards.forEach(card => {
            const cat = norm(card.dataset.category);

            if (filter === 'all' || cat === filter) {
                showCard(card);
            } else {
                hideCard(card);
            }
        });
    });
});

// Utility: hide with fade then set display none
function hideCard(card) {
    // if already hidden -> skip
    if (card.classList.contains('hide') && card.style.display === 'none') return;

    // add hide class to trigger transition
    card.classList.add('hide');

    // clear previous timeout if any
    if (card._hideTimeout) clearTimeout(card._hideTimeout);

    // after transition end, set display none
    card._hideTimeout = setTimeout(() => {
        card.style.display = 'none';
        card._hideTimeout = null;
    }, 260); // matches CSS transition duration
}

// Utility: show by resetting display then removing hide class
function showCard(card) {
    // clear any pending hide timeout
    if (card._hideTimeout) { clearTimeout(card._hideTimeout); card._hideTimeout = null; }

    // if displayed already just ensure it's visible
    if (card.style.display !== 'none') {
        card.classList.remove('hide');
        return;
    }

    // make it occupy layout first, then animate in
    card.style.display = 'block';
    // force reflow then remove hide to animate
    requestAnimationFrame(() => {
        card.classList.remove('hide');
    });
}



// Theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
}

// Open modal with URL
function openModal(url, title) {
    const modal = document.getElementById('modalOverlay');
    const iframe = document.getElementById('modalIframe');
    const modalTitle = document.getElementById('modalTitle');
    const spinner = document.getElementById('loadingSpinner');

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Set title
    modalTitle.textContent = title;

    // Show loading spinner
    spinner.style.display = 'block';
    iframe.style.display = 'none';

    // Load URL in iframe
    iframe.src = url;

    // Hide spinner when loaded
    iframe.onload = function () {
        spinner.style.display = 'none';
        iframe.style.display = 'block';
    };
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modalOverlay');
    const iframe = document.getElementById('modalIframe');

    modal.classList.remove('show');
    document.body.style.overflow = 'auto';

    // Clear iframe after animation
    setTimeout(() => {
        iframe.src = '';
    }, 300);
}

// Close modal when clicking overlay (not content)
function closeModalOnOverlay(event) {
    if (event.target.id === 'modalOverlay') {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Initialize theme on load
loadTheme();

// Prevent iframe click-through issues
document.getElementById('modalIframe').addEventListener('load', function () {
    this.contentWindow.focus();
});



// awads

const awardsContainer = document.getElementById('awardsContainer');
        const scrollLeftBtn = document.getElementById('scrollLeft');
        const scrollRightBtn = document.getElementById('scrollRight');
        const currentAwardSpan = document.getElementById('currentAward');
        const totalAwardsSpan = document.getElementById('totalAwards');
        const autoScrollToggle = document.getElementById('autoScrollToggle');
        
        let autoScrollInterval = null;

        const awardData = [
            { title: "2024 TripAdvisor Excellence", description: "Certificate of Excellence for outstanding service and customer satisfaction in 2024" },
            { title: "Star Achievement Award", description: "Recognized for exceptional performance and industry leadership" },
            { title: "BNI Appreciation", description: "Honored for outstanding contribution to business networking" },
            { title: "Red Trophy", description: "Annual achievement award for business excellence" },
            { title: "BNI Retail Excellence", description: "Top retail partner recognition for exceptional service" },
            { title: "2016 TripAdvisor Excellence", description: "Certificate of Excellence for consistent high ratings" },
            { title: "Excellence Trophy", description: "Premium award for sustained business growth" },
            { title: "Gold Medal Achievement", description: "First place recognition in industry category" },
            { title: "Business Achievement Award", description: "Recognized for innovation and business development" },
            { title: "Business Excellence Award", description: "Top tier recognition for outstanding business practices" }
        ];

        // Update total awards count
        totalAwardsSpan.textContent = document.querySelectorAll('.award-card').length;

        // Scroll functionality
        function scrollAwards(direction) {
            const scrollAmount = 250;
            if (direction === 'left') {
                awardsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                awardsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }

        // Update current award number on scroll
        awardsContainer.addEventListener('scroll', () => {
            const cardWidth = 245; // 220px width + 25px gap
            const currentIndex = Math.round(awardsContainer.scrollLeft / cardWidth) + 1;
            currentAwardSpan.textContent = Math.min(currentIndex, awardData.length);
        });

        // Auto scroll functionality
        function toggleAutoScroll() {
            if (autoScrollToggle.checked) {
                startAutoScroll();
            } else {
                stopAutoScroll();
            }
        }

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                const maxScroll = awardsContainer.scrollWidth - awardsContainer.clientWidth;
                if (awardsContainer.scrollLeft >= maxScroll) {
                    awardsContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    awardsContainer.scrollBy({ left: 250, behavior: 'smooth' });
                }
            }, 3000);
        }

        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        // Modal functionality
        function openAwardModal(index) {
            const modal = document.getElementById('awardModal');
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            
            const card = document.querySelectorAll('.award-card')[index];
            const imgSrc = card.querySelector('img').src;
            
            modalImage.src = imgSrc;
            modalTitle.textContent = awardData[index].title;
            modalDescription.textContent = awardData[index].description;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeAwardModal() {
            const modal = document.getElementById('awardModal');
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        function closeModalOnClick(event) {
            if (event.target.id === 'awardModal') {
                closeAwardModal();
            }
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAwardModal();
            }
        });

        // Theme toggle
        function toggleTheme() {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        // Load theme
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark');
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                scrollAwards('left');
            } else if (e.key === 'ArrowRight') {
                scrollAwards('right');
            }
        });

        // Initialize
        loadTheme();

        // Stop auto-scroll when user manually scrolls
        awardsContainer.addEventListener('wheel', () => {
            if (autoScrollToggle.checked) {
                autoScrollToggle.checked = false;
                stopAutoScroll();
            }
        });








        // images section

        const photoItems = document.querySelectorAll('.photo-item');
const fullscreenModal = document.getElementById('fullscreenModal');
const fullscreenImg = document.getElementById('fullscreenImg');
const closeFullscreen = document.getElementById('closeFullscreen');

// Add click event to each photo item
photoItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.getAttribute('data-img');
        fullscreenImg.src = imgSrc;
        fullscreenModal.style.display = 'flex';
    });
});

// Close modal when clicking the close button
closeFullscreen.addEventListener('click', function() {
    fullscreenModal.style.display = 'none';
});

// Close modal when clicking outside the image
fullscreenModal.addEventListener('click', function(e) {
    if (e.target === fullscreenModal) {
        fullscreenModal.style.display = 'none';
    }
});


