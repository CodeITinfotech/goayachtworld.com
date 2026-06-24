/* ==========================================
   GALLERY - JavaScript
   ========================================== */

// Gallery data
const GALLERY_ITEMS = [
    { id: 1, src: 'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-1.jpg', category: 'yachts', title: 'Luxury Yacht Experience' },
    { id: 2, src: 'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-2.jpg', category: 'yachts', title: 'Sunset Cruise' },
    { id: 3, src: 'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-3.jpg', category: 'yachts', title: 'Party on Deck' },
    { id: 4, src: 'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-4.jpg', category: 'yachts', title: 'Evening Party' },
    { id: 5, src: 'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-5.jpg', category: 'yachts', title: 'Yacht Interior' },
    { id: 6, src: 'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-6.jpg', category: 'yachts', title: 'Water Activities' },
    { id: 7, src: 'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-7.jpg', category: 'yachts', title: 'Birthday Celebration' },
    { id: 8, src: 'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-8.jpg', category: 'yachts', title: 'Corporate Event' },
    { id: 9, src: 'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-9.jpg', category: 'yachts', title: 'Romantic Cruise' }
];

let currentFilter = 'all';
let currentLightboxIndex = 0;

// Render gallery
function renderGallery(filter = 'all') {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    
    const items = filter === 'all' 
        ? GALLERY_ITEMS 
        : GALLERY_ITEMS.filter(item => item.category === filter);
    
    grid.innerHTML = items.map((item, index) => `
        <div class="gallery-item" data-index="${index}">
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="gallery-item-overlay">
                <i class="fas fa-expand"></i>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            openLightbox(filter === 'all' ? index : GALLERY_ITEMS.findIndex(i => i.src === items[index].src));
        });
    });
}

// Lightbox functions
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    
    if (lightbox && img) {
        currentLightboxIndex = index;
        img.src = GALLERY_ITEMS[index].src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_ITEMS.length;
    document.getElementById('lightboxImg').src = GALLERY_ITEMS[currentLightboxIndex].src;
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    document.getElementById('lightboxImg').src = GALLERY_ITEMS[currentLightboxIndex].src;
}

// Filter handling
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderGallery(currentFilter);
        });
    });
}

// Initialize lightbox controls
function initLightbox() {
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const lightbox = document.getElementById('lightbox');
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox?.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
}

// Mobile menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.innerHTML = nav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    renderGallery();
    initGalleryFilters();
    initLightbox();
    initMobileMenu();
});
