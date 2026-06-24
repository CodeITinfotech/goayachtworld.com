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

// Default yacht data
const DEFAULT_YACHTS = [
    {
        id: 'yacht-001',
        name: 'Mi Amor',
        description: 'Luxurious 50ft yacht perfect for romantic cruises and intimate celebrations. Features a spacious sun deck, air-conditioned cabins, and professional crew.',
        price: 25000,
        capacity: 10,
        type: 'Luxury Yacht',
        featured: true,
        images: ['assets/images/service-yacht-1.jpg', 'assets/images/service-yacht-2.jpg', 'assets/images/service-yacht-3.jpg']
    },
    {
        id: 'yacht-002',
        name: 'Sea Eagle',
        description: 'Premium 45ft yacht ideal for family outings and day trips. Equipped with water sports equipment, BBQ facilities, and comfortable seating areas.',
        price: 18000,
        capacity: 15,
        type: 'Family Yacht',
        featured: true,
        images: ['assets/images/service-yacht-4.jpg', 'assets/images/service-yacht-5.jpg', 'assets/images/service-yacht-6.jpg']
    },
    {
        id: 'yacht-003',
        name: 'Ocean Dream',
        description: 'Elegant 60ft yacht with stunning interiors and ample deck space. Perfect for sunset cruises, parties, and corporate events.',
        price: 35000,
        capacity: 25,
        type: 'Party Yacht',
        featured: true,
        images: ['assets/images/service-yacht-7.jpg', 'assets/images/service-yacht-9.jpg', 'assets/images/service-yacht-10.jpg']
    },
    {
        id: 'yacht-004',
        name: 'Sea Heiress',
        description: 'Classic 55ft yacht combining traditional elegance with modern amenities. Ideal for pre-wedding shoots and romantic getaways.',
        price: 28000,
        capacity: 12,
        type: 'Romantic Yacht',
        featured: false,
        images: ['assets/images/service-yacht-11.jpg', 'assets/images/service-yacht-12.jpg', 'assets/images/service-yacht-13.jpg']
    },
    {
        id: 'yacht-005',
        name: 'Calypso',
        description: 'Modern 40ft speedboat perfect for adventurous day trips. Features water toys, snorkeling equipment, and a vibrant atmosphere.',
        price: 12000,
        capacity: 8,
        type: 'Speedboat',
        featured: false,
        images: ['assets/images/service-yacht-14.jpg', 'assets/images/service-yacht-15.jpg', 'assets/images/service-yacht-16.jpg']
    },
    {
        id: 'yacht-006',
        name: 'Ferretti 550',
        description: 'Italian luxury yacht with spacious flybridge and three elegant cabins. Perfect for extended cruises and premium experiences.',
        price: 55000,
        capacity: 10,
        type: 'Luxury Yacht',
        featured: true,
        images: ['assets/images/service-yacht-17.jpg', 'assets/images/service-yacht-18.jpg', 'assets/images/service-yacht-19.jpg']
    },
    {
        id: 'yacht-007',
        name: 'Lady M',
        description: 'Stylish 48ft yacht with contemporary design and premium finishes. Great for birthdays, anniversaries, and special occasions.',
        price: 22000,
        capacity: 14,
        type: 'Party Yacht',
        featured: false,
        images: ['assets/images/service-yacht-20.jpg', 'assets/images/service-yacht-21.jpg', 'assets/images/service-yacht-22.jpg']
    },
    {
        id: 'yacht-008',
        name: 'Bay Elite',
        description: 'Sleek 42ft yacht perfect for coastal cruising and island hopping. Modern amenities and excellent maneuverability.',
        price: 15000,
        capacity: 10,
        type: 'Cruiser',
        featured: false,
        images: ['assets/images/service-yacht-23.jpg', 'assets/images/service-yacht-24.jpg', 'assets/images/service-yacht-25.jpg']
    },
    {
        id: 'yacht-009',
        name: 'Majestic Pearl',
        description: 'Grand 70ft yacht offering the ultimate luxury experience. Features multiple decks, jacuzzi, and full-service bar.',
        price: 75000,
        capacity: 30,
        type: 'Luxury Yacht',
        featured: true,
        images: ['assets/images/service-yacht-26.jpg', 'assets/images/service-yacht-27.jpg', 'assets/images/service-yacht-28.jpg']
    },
    {
        id: 'yacht-010',
        name: 'Desire',
        description: 'Intimate 38ft yacht perfect for couples seeking privacy. Features a private cabin, sun deck, and champagne service.',
        price: 15000,
        capacity: 4,
        type: 'Couples Yacht',
        featured: false,
        images: ['assets/images/service-yacht-29.jpg', 'assets/images/service-yacht-30.jpg', 'assets/images/service-yacht-31.jpg']
    },
    {
        id: 'yacht-011',
        name: 'Ocean Jewel',
        description: 'Beautiful 52ft yacht with classic lines and modern comfort. Ideal for sunset cruises and photography sessions.',
        price: 24000,
        capacity: 12,
        type: 'Sunset Yacht',
        featured: false,
        images: ['assets/images/service-yacht-32.jpg', 'assets/images/service-yacht-33.jpg', 'assets/images/service-yacht-34.jpg']
    },
    {
        id: 'yacht-012',
        name: 'Ripples Chique',
        description: 'Chic 44ft yacht perfect for young crowds and party vibes. Features a sound system, LED lighting, and open bar area.',
        price: 20000,
        capacity: 18,
        type: 'Party Yacht',
        featured: false,
        images: ['assets/images/service-yacht-35.jpg', 'assets/images/service-yacht-36.jpg', 'assets/images/hero-slide1.jpg']
    }
];

// Database class using localStorage
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

    getYachtById(id) {
        const yachts = this.getAllYachts();
        return yachts.find(y => y.id === id);
    }

    saveYacht(yacht) {
        const yachts = this.getAllYachts();
        const index = yachts.findIndex(y => y.id === yacht.id);
        if (index >= 0) {
            yachts[index] = yacht;
        } else {
            yacht.id = 'yacht-' + Date.now();
            yachts.push(yacht);
        }
        localStorage.setItem(this.yachtsKey, JSON.stringify(yachts));
        return yacht;
    }

    deleteYacht(id) {
        const yachts = this.getAllYachts().filter(y => y.id !== id);
        localStorage.setItem(this.yachtsKey, JSON.stringify(yachts));
    }

    getSettings() {
        const data = localStorage.getItem(this.settingsKey);
        return data ? JSON.parse(data) : {};
    }

    saveSettings(settings) {
        localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    }

    resetToDefaults() {
        this.seedData();
    }
}

// Initialize database
const db = new YachtDatabase();

// WhatsApp utilities
const WhatsApp = {
    open(phone, message = '') {
        const number = phone.replace(/\D/g, '');
        const url = `https://wa.me/${number}${message ? '?text=' + encodeURIComponent(message) : ''}`;
        window.open(url, '_blank');
    },
    
    openChat(yachtName) {
        const settings = db.getSettings();
        const message = `Hi, I'm interested in booking ${yachtName || 'a yacht'} from ${settings.siteName || 'Goa Yacht World'}. Can you please share more details?`;
        this.open(settings.whatsappNumber, message);
    },
    
    openBooking(yachtName) {
        const settings = db.getSettings();
        const message = `Hi, I want to book ${yachtName || 'a yacht'} from ${settings.siteName || 'Goa Yacht World'}. Please help me with the booking process.`;
        this.open(settings.whatsappNumber, message);
    }
};

// Format price
function formatPrice(price) {
    return '₹' + Number(price).toLocaleString('en-IN');
}

// Render yacht card
function renderYachtCard(yacht) {
    const settings = db.getSettings();
    const placeholderText = yacht.name.split(' ').map(w => w[0]).join('').substring(0, 2);
    
    return `
        <div class="yacht-card" data-yacht-id="${yacht.id}">
            <div class="yacht-image">
                ${yacht.images && yacht.images.length > 0 
                    ? `<img src="${yacht.images[0]}" alt="${yacht.name}" onerror="this.parentElement.innerHTML='<div class=\\'placeholder\\'>${placeholderText}</div>'">`
                    : `<div class="placeholder">${placeholderText}</div>`
                }
                ${yacht.featured ? '<span class="yacht-badge">Featured</span>' : ''}
            </div>
            <div class="yacht-content">
                <h3>${yacht.name}</h3>
                <p>${yacht.description}</p>
                <div class="yacht-meta">
                    <span>👥 ${yacht.capacity} Guests</span>
                    <span>🚢 ${yacht.type}</span>
                </div>
                <div class="yacht-price">
                    ${formatPrice(yacht.price)} <small>/ trip</small>
                </div>
                <div class="yacht-actions">
                    <button class="btn btn-whatsapp" onclick="WhatsApp.openChat('${yacht.name}')">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Chat Now
                    </button>
                    <button class="btn btn-primary" onclick="WhatsApp.openBooking('${yacht.name}')">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render yacht grid
function renderYachtGrid(containerId = 'yacht-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const yachts = db.getAllYachts();
    
    if (yachts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/></svg>
                <h3>No Yachts Available</h3>
                <p>Check back soon for our yacht collection!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = yachts.map(renderYachtCard).join('');
}

// Admin Panel Functions
const Admin = {
    panel: null,
    currentTab: 'yachts',
    editingYacht: null,
    
    init() {
        // Create admin panel DOM if not exists
        if (!document.getElementById('admin-panel')) {
            this.createPanel();
        }
        this.panel = document.getElementById('admin-panel');
    },
    
    createPanel() {
        const panelHTML = `
            <div class="admin-overlay" id="admin-overlay">
                <div class="admin-panel" id="admin-panel-inner">
                    <div class="admin-header">
                        <h2>🔧 Admin Panel</h2>
                        <button class="admin-close" onclick="Admin.close()">&times;</button>
                    </div>
                    
                    <div class="admin-tabs">
                        <button class="admin-tab active" data-tab="yachts">Yachts</button>
                        <button class="admin-tab" data-tab="settings">Settings</button>
                        <button class="admin-tab" data-tab="add-new">Add New Yacht</button>
                    </div>
                    
                    <div class="admin-section active" id="tab-yachts">
                        <div class="stats" id="admin-stats"></div>
                        <div class="yacht-list" id="admin-yacht-list"></div>
                    </div>
                    
                    <div class="admin-section" id="tab-settings">
                        <form id="settings-form">
                            <div class="form-group">
                                <label>WhatsApp Number (with country code)</label>
                                <input type="text" id="admin-whatsapp" placeholder="918446275985">
                            </div>
                            <div class="form-group">
                                <label>Booking URL</label>
                                <input type="url" id="admin-booking-url" placeholder="https://wa.me/...">
                            </div>
                            <div class="form-group">
                                <label>Site Name</label>
                                <input type="text" id="admin-site-name" placeholder="Goa Yacht World">
                            </div>
                            <button type="submit" class="btn btn-primary">Save Settings</button>
                            <button type="button" class="btn btn-outline" onclick="Admin.resetData()" style="margin-left:10px">Reset to Defaults</button>
                        </form>
                    </div>
                    
                    <div class="admin-section" id="tab-add-new">
                        <form id="yacht-form">
                            <input type="hidden" id="yacht-id">
                            <div class="form-group">
                                <label>Yacht Name *</label>
                                <input type="text" id="yacht-name" required>
                            </div>
                            <div class="form-group">
                                <label>Description *</label>
                                <textarea id="yacht-description" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Price per Trip (₹) *</label>
                                <input type="number" id="yacht-price" required>
                            </div>
                            <div class="form-group">
                                <label>Capacity (Guests) *</label>
                                <input type="number" id="yacht-capacity" required>
                            </div>
                            <div class="form-group">
                                <label>Type</label>
                                <select id="yacht-type">
                                    <option value="Luxury Yacht">Luxury Yacht</option>
                                    <option value="Family Yacht">Family Yacht</option>
                                    <option value="Party Yacht">Party Yacht</option>
                                    <option value="Romantic Yacht">Romantic Yacht</option>
                                    <option value="Speedboat">Speedboat</option>
                                    <option value="Cruiser">Cruiser</option>
                                    <option value="Sunset Yacht">Sunset Yacht</option>
                                    <option value="Couples Yacht">Couples Yacht</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" id="yacht-featured"> Featured Yacht
                                </label>
                            </div>
                            <div class="form-group">
                                <label>Images (up to 10)</label>
                                <div class="image-upload" id="image-upload">
                                    <input type="file" id="yacht-images" multiple accept="image/*">
                                    <p>Click or drag images here</p>
                                    <small>PNG, JPG up to 5MB each</small>
                                </div>
                                <div class="image-preview" id="image-preview"></div>
                            </div>
                            <button type="submit" class="btn btn-primary">Save Yacht</button>
                            <button type="button" class="btn btn-outline" onclick="Admin.resetForm()" style="margin-left:10px">Clear Form</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', panelHTML);
        
        // Add event listeners
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
        
        document.getElementById('settings-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettings();
        });
        
        document.getElementById('yacht-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveYacht();
        });
        
        // Image upload
        const uploadArea = document.getElementById('image-upload');
        const fileInput = document.getElementById('yacht-images');
        
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--secondary)';
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--border)';
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border)';
            this.handleImageUpload(e.dataTransfer.files);
        });
        fileInput.addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files);
        });
    },
    
    open() {
        if (!this.panel) this.init();
        this.refresh();
        this.panel.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    close() {
        this.panel.classList.remove('active');
        document.body.style.overflow = '';
        this.resetForm();
    },
    
    switchTab(tab) {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`tab-${tab}`).classList.add('active');
        
        this.currentTab = tab;
    },
    
    refresh() {
        this.loadYachtList();
        this.loadSettings();
    },
    
    loadYachtList() {
        const yachts = db.getAllYachts();
        const stats = document.getElementById('admin-stats');
        const list = document.getElementById('admin-yacht-list');
        
        stats.innerHTML = `
            <div class="stat-card">
                <div class="number">${yachts.length}</div>
                <div class="label">Total Yachts</div>
            </div>
            <div class="stat-card">
                <div class="number">${yachts.filter(y => y.featured).length}</div>
                <div class="label">Featured</div>
            </div>
            <div class="stat-card">
                <div class="number">${formatPrice(yachts.reduce((sum, y) => sum + y.price, 0))}</div>
                <div class="label">Starting Price</div>
            </div>
        `;
        
        list.innerHTML = yachts.map(yacht => `
            <div class="yacht-list-item">
                <div class="placeholder" style="width:80px;height:60px;display:flex;align-items:center;justify-content:center;background:var(--primary);color:white;border-radius:8px;font-size:1.2rem;">
                    ${yacht.name.split(' ').map(w => w[0]).join('').substring(0, 2)}
                </div>
                <div class="info">
                    <h4>${yacht.name}</h4>
                    <p>${yacht.type} • ${formatPrice(yacht.price)}</p>
                </div>
                <div class="actions">
                    <button class="btn btn-primary btn-sm" onclick="Admin.editYacht('${yacht.id}')">Edit</button>
                    <button class="btn btn-outline btn-sm" onclick="Admin.deleteYacht('${yacht.id}')" style="color:var(--error);border-color:var(--error)">Delete</button>
                </div>
            </div>
        `).join('');
    },
    
    loadSettings() {
        const settings = db.getSettings();
        document.getElementById('admin-whatsapp').value = settings.whatsappNumber || '';
        document.getElementById('admin-booking-url').value = settings.bookingUrl || '';
        document.getElementById('admin-site-name').value = settings.siteName || '';
    },
    
    saveSettings() {
        const settings = {
            whatsappNumber: document.getElementById('admin-whatsapp').value,
            bookingUrl: document.getElementById('admin-booking-url').value,
            siteName: document.getElementById('admin-site-name').value
        };
        db.saveSettings(settings);
        this.showAlert('Settings saved successfully!', 'success');
    },
    
    resetData() {
        if (confirm('Are you sure? This will reset all yachts to defaults.')) {
            db.resetToDefaults();
            this.refresh();
            this.showAlert('Data reset to defaults!', 'success');
        }
    },
    
    editYacht(id) {
        const yacht = db.getYachtById(id);
        if (!yacht) return;
        
        this.editingYacht = yacht;
        document.getElementById('yacht-id').value = yacht.id;
        document.getElementById('yacht-name').value = yacht.name;
        document.getElementById('yacht-description').value = yacht.description;
        document.getElementById('yacht-price').value = yacht.price;
        document.getElementById('yacht-capacity').value = yacht.capacity;
        document.getElementById('yacht-type').value = yacht.type;
        document.getElementById('yacht-featured').checked = yacht.featured;
        
        this.previewImages = yacht.images || [];
        this.renderImagePreview();
        
        this.switchTab('add-new');
    },
    
    previewImages: [],
    
    handleImageUpload(files) {
        const maxImages = 10;
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        Array.from(files).forEach(file => {
            if (this.previewImages.length >= maxImages) {
                this.showAlert('Maximum 10 images allowed!', 'error');
                return;
            }
            if (file.size > maxSize) {
                this.showAlert(`${file.name} is too large. Max 5MB allowed.`, 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewImages.push(e.target.result);
                this.renderImagePreview();
            };
            reader.readAsDataURL(file);
        });
    },
    
    removeImage(index) {
        this.previewImages.splice(index, 1);
        this.renderImagePreview();
    },
    
    renderImagePreview() {
        const container = document.getElementById('image-preview');
        container.innerHTML = this.previewImages.map((img, i) => `
            <div class="image-preview-item">
                <img src="${img}" alt="Preview ${i + 1}">
                <button class="remove-btn" onclick="Admin.removeImage(${i})">&times;</button>
            </div>
        `).join('');
    },
    
    saveYacht() {
        const id = document.getElementById('yacht-id').value;
        const yacht = {
            id: id || 'yacht-' + Date.now(),
            name: document.getElementById('yacht-name').value,
            description: document.getElementById('yacht-description').value,
            price: parseInt(document.getElementById('yacht-price').value),
            capacity: parseInt(document.getElementById('yacht-capacity').value),
            type: document.getElementById('yacht-type').value,
            featured: document.getElementById('yacht-featured').checked,
            images: this.previewImages
        };
        
        db.saveYacht(yacht);
        this.showAlert('Yacht saved successfully!', 'success');
        this.resetForm();
        this.refresh();
    },
    
    deleteYacht(id) {
        if (confirm('Are you sure you want to delete this yacht?')) {
            db.deleteYacht(id);
            this.refresh();
            this.showAlert('Yacht deleted!', 'success');
        }
    },
    
    resetForm() {
        document.getElementById('yacht-form').reset();
        document.getElementById('yacht-id').value = '';
        this.previewImages = [];
        this.renderImagePreview();
        this.editingYacht = null;
    },
    
    showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        const panel = document.getElementById('admin-panel-inner');
        panel.insertBefore(alert, panel.children[1]);
        
        setTimeout(() => alert.remove(), 3000);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderYachtGrid();
    
    // Check for admin mode
    if (window.location.search.includes('admin=true')) {
        Admin.open();
    }
    
    // Add admin toggle (hidden by default, shown with keyboard shortcut)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            Admin.open();
        }
    });
});

// Export for global use
window.db = db;
window.WhatsApp = WhatsApp;
window.Admin = Admin;
window.renderYachtGrid = renderYachtGrid;
window.formatPrice = formatPrice;