/* ==========================================
   GOA YACHT WORLD - Main JavaScript
   ========================================== */

// Configuration
const CONFIG = {
    whatsappNumber: '918446275985',
    bookingUrl: 'https://wa.me/918446275985?text=Hi,%20I%20want%20to%20book%20a%20yacht',
    siteName: 'Goa Yacht World',
    dbName: 'GoaYachtWorldDB'
};

// Yacht data - Real boats from goayachtworld.com
const DEFAULT_YACHTS = [
    { id: 'yacht-001', name: 'Aqua Queen', type: 'Yacht', location: 'Panjim', capacity: 8, price: 15000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-2.jpg'] },
    { id: 'yacht-002', name: 'White Sea', type: 'Yacht', location: 'Panjim', capacity: 12, price: 18000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-6.jpg'] },
    { id: 'yacht-003', name: 'Amaze', type: 'Yacht', location: 'Panjim', capacity: 13, price: 20000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-1.jpg'] },
    { id: 'yacht-004', name: 'Sea Heiress', type: 'Yacht', location: 'Panjim', capacity: 8, price: 22000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-18.jpg'] },
    { id: 'yacht-005', name: 'MV Star', type: 'Yacht', location: 'Panjim', capacity: 8, price: 16000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-17.jpg'] },
    { id: 'yacht-006', name: 'SeaRay R', type: 'Yacht', location: 'Panjim', capacity: 10, price: 17000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-33.jpg'] },
    { id: 'yacht-007', name: 'Rinker', type: 'Yacht', location: 'Panjim', capacity: 6, price: 12000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-25.jpg'] },
    { id: 'yacht-008', name: 'Prawn', type: 'Yacht', location: 'Panjim', capacity: 6, price: 11000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-24.jpg'] },
    { id: 'yacht-009', name: 'Bluefin', type: 'Yacht', location: 'Panjim', capacity: 5, price: 10000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-23.jpg'] },
    { id: 'yacht-010', name: 'Manta Bay', type: 'Yacht', location: 'Panjim', capacity: 8, price: 14000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-4.jpg'] },
    { id: 'yacht-011', name: 'Priestess', type: 'Yacht', location: 'Panjim', capacity: 8, price: 13000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-5.jpg'] },
    { id: 'yacht-012', name: 'Fantasea', type: 'Yacht', location: 'Panjim', capacity: 12, price: 19000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-3.jpg'] },
    { id: 'yacht-013', name: 'Sea Whale', type: 'Yacht', location: 'Panjim', capacity: 10, price: 15000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-7.jpg'] },
    { id: 'yacht-014', name: 'Desire', type: 'Yacht', location: 'Panjim', capacity: 8, price: 14000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-16.jpg'] },
    { id: 'yacht-015', name: 'Sea Eagle', type: 'Yacht', location: 'Panjim', capacity: 14, price: 22000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-10.jpg'] },
    { id: 'yacht-016', name: 'Bay Elite', type: 'Yacht', location: 'Panjim', capacity: 10, price: 16000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-31.jpg'] },
    { id: 'yacht-017', name: 'Torpedo', type: 'Yacht', location: 'Old Goa', capacity: 10, price: 18000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-36.jpg'] },
    { id: 'yacht-018', name: 'Solaris', type: 'Yacht', location: 'Panjim', capacity: 8, price: 13000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-9.jpg'] },
    { id: 'yacht-019', name: 'White Dolphin', type: 'Yacht', location: 'Panjim', capacity: 16, price: 25000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-34.jpg'] },
    { id: 'yacht-020', name: 'Ralston II', type: 'Yacht', location: 'Panjim', capacity: 16, price: 24000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-35.jpg'] },
    { id: 'yacht-021', name: 'Pegasus', type: 'Yacht', location: 'Panjim', capacity: 20, price: 30000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-12.jpg'] },
    { id: 'yacht-022', name: 'Sailing Yacht 39', type: 'Yacht', location: 'Panjim', capacity: 15, price: 28000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-19.jpg'] },
    { id: 'yacht-023', name: 'Ciao Bella', type: 'Yacht', location: 'Panjim', capacity: 16, price: 26000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-13.jpg'] },
    { id: 'yacht-024', name: 'Majesty 56', type: 'Yacht', location: 'Panjim', capacity: 20, price: 35000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-15.jpg'] },
    { id: 'yacht-025', name: 'Squadron BD', type: 'Yacht', location: 'Panjim', capacity: 20, price: 32000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-29.jpg'] },
    { id: 'yacht-026', name: 'Ferretti 460', type: 'Yacht', location: 'Panjim', capacity: 16, price: 28000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-22.jpg'] },
    { id: 'yacht-027', name: 'Ferretti 550', type: 'Yacht', location: 'Panjim', capacity: 22, price: 45000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-14.jpg'] },
    { id: 'yacht-028', name: 'Ferretti FL', type: 'Yacht', location: 'Panjim', capacity: 25, price: 50000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-27.jpg'] },
    { id: 'yacht-029', name: 'Calypso', type: 'Yacht', location: 'Panjim', capacity: 16, price: 24000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-28.jpg'] },
    { id: 'yacht-030', name: 'Ahilo', type: 'Yacht', location: 'Panjim', capacity: 25, price: 48000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-30.jpg'] },
    { id: 'yacht-031', name: 'Zia Bella', type: 'Yacht', location: 'Panjim', capacity: 30, price: 55000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-11.jpg'] },
    { id: 'yacht-032', name: 'Sea Comfort', type: 'Yacht', location: 'Panjim', capacity: 25, price: 45000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-32.jpg'] },
    { id: 'yacht-033', name: 'Ripples Chique', type: 'Yacht', location: 'Old Goa', capacity: 50, price: 75000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-20.jpg'] },
    { id: 'yacht-034', name: 'Mi Amor', type: 'Yacht', location: 'Old Goa', capacity: 50, price: 80000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-21.jpg'] },
    { id: 'yacht-035', name: 'Lady M', type: 'Yacht', location: 'Old Goa', capacity: 22, price: 40000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-35.jpg'] }
];

// Database class
class YachtDatabase {
    constructor() {
        this.yachtsKey = 'yachts';
        this.settingsKey = 'settings';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.yachtsKey)) {
            this.seedData();
        }
        if (!localStorage.getItem(this.settingsKey)) {
            this.saveSettings({
                whatsappNumber: CONFIG.whatsappNumber,
                bookingUrl: CONFIG.bookingUrl,
                siteName: CONFIG.siteName
            });
        }
    }

    seedData() {
        localStorage.setItem(this.yachtsKey, JSON.stringify(DEFAULT_YACHTS));
    }

    getAllYachts() {
        const data = localStorage.getItem(this.yachtsKey);
        return data ? JSON.parse(data) : [];
    }

    getFeaturedYachts() {
        return this.getAllYachts().filter(y => y.featured);
    }

    saveSettings(settings) {
        localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    }

    getSettings() {
        const data = localStorage.getItem(this.settingsKey);
        return data ? JSON.parse(data) : {};
    }
}

// Initialize database
const db = new YachtDatabase();

// Format price
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

// Render yachts
function renderYachts() {
    const grid = document.getElementById('yachtsGrid');
    if (!grid) return;
    
    const yachts = db.getAllYachts();
    
    grid.innerHTML = yachts.map(yacht => `
        <div class="yacht-card">
            <div class="yacht-card-img">
                <img src="${yacht.images[0]}" alt="${yacht.name}" loading="lazy">
                ${yacht.featured ? '<span class="yacht-card-badge">Featured</span>' : ''}
            </div>
            <div class="yacht-card-body">
                <span class="yacht-card-type">${yacht.type}</span>
                <h3>${yacht.name}</h3>
                <div class="yacht-card-meta">
                    <span><i class="fas fa-users"></i> Max Capacity: ${yacht.capacity}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${yacht.location}</span>
                </div>
                <div class="yacht-card-price">
                    ${formatPrice(yacht.price)} <small>/hour</small>
                </div>
                <div class="yacht-card-actions">
                    <a href="https://wa.me/91${CONFIG.whatsappNumber}?text=Hi,%20I%20want%20to%20book%20${encodeURIComponent(yacht.name)}" target="_blank" class="btn btn-whatsapp">
                        <i class="fab fa-whatsapp"></i> Book
                    </a>
                    <a href="tel:+91${CONFIG.whatsappNumber}" class="btn btn-primary">
                        <i class="fas fa-phone"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Hero Slider with Video on Hover
function initHeroSlider() {
    const heroSection = document.querySelector('.hero-slider');
    const video = document.querySelector('.hero-video');
    
    if (heroSection && video) {
        heroSection.addEventListener('mouseenter', function() {
            video.play().catch(e => console.log('Video autoplay prevented'));
        });
        
        heroSection.addEventListener('mouseleave', function() {
            video.pause();
            video.currentTime = 0;
        });
    }
}

// WhatsApp
const WhatsApp = {
    openChat: function(message) {
        message = message || 'Hi, I want to book a yacht';
        window.open(`https://wa.me/91${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
};

// Mobile Menu
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            document.getElementById('mainNav')?.classList.remove('active');
        }
    });
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    renderYachts();
    initHeroSlider();
    initMobileMenu();
});
