/* ==========================================
   YACHT DETAIL - JavaScript
   ========================================== */

// Get URL parameters
function getYachtFromURL() {
    const params = new URLSearchParams(window.location.search);
    const yachtId = params.get('yacht');
    return yachtId;
}

// Yacht data with full details
const YACHT_DETAILS = {
    'yacht-001': {
        name: 'Aqua Queen',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 8,
        price: 15000,
        featured: true,
        description: 'The Aqua Queen Yacht offers an unparalleled luxury experience on the waters of Goa. Perfect for intimate gatherings and celebrations, this yacht combines elegance with comfort. Experience breathtaking views and create unforgettable memories with your loved ones.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: [
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-2.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-1.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-3.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-4.jpg'
        ],
        extras: [
            { name: 'Decorations', price: 'upto ₹4,000/-' },
            { name: 'Snacks & Beverages', price: 'As per requirement' },
            { name: 'DSLR Photographer', price: 'upto ₹6,000/-' },
            { name: 'Drone Videographer', price: 'upto ₹5,000/-' }
        ]
    },
    'yacht-002': {
        name: 'Sea Princess',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 12,
        price: 18000,
        description: 'The Sea Princess Yacht is a magnificent vessel perfect for larger groups seeking luxury. With spacious decks and premium amenities, it offers the ultimate sailing experience in Goa.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck, Cockpit Area',
        images: [
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-5.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-6.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-7.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-8.jpg'
        ],
        extras: [
            { name: 'Decorations', price: 'upto ₹4,000/-' },
            { name: 'Snacks & Beverages', price: 'As per requirement' },
            { name: 'DSLR Photographer', price: 'upto ₹6,000/-' },
            { name: 'Drone Videographer', price: 'upto ₹5,000/-' }
        ]
    },
    'yacht-003': {
        name: 'Blue Horizon',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 10,
        price: 16000,
        description: 'The Blue Horizon Yacht offers a perfect blend of comfort and elegance. Ideal for sunset cruises and romantic evenings, this yacht provides stunning views of the Goan coastline.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: [
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-9.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-10.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-11.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-12.jpg'
        ],
        extras: [
            { name: 'Decorations', price: 'upto ₹4,000/-' },
            { name: 'Snacks & Beverages', price: 'As per requirement' },
            { name: 'DSLR Photographer', price: 'upto ₹6,000/-' },
            { name: 'Drone Videographer', price: 'upto ₹5,000/-' }
        ]
    },
    'yacht-004': {
        name: 'Ocean Star',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 14,
        price: 20000,
        description: 'The Ocean Star Yacht is designed for those who seek the finest things in life. With premium interiors and excellent service, it guarantees an exceptional yachting experience.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck, Kitchenette',
        images: [
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-13.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-14.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-15.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-16.jpg'
        ],
        extras: [
            { name: 'Decorations', price: 'upto ₹4,000/-' },
            { name: 'Snacks & Beverages', price: 'As per requirement' },
            { name: 'DSLR Photographer', price: 'upto ₹6,000/-' },
            { name: 'Drone Videographer', price: 'upto ₹5,000/-' }
        ]
    },
    'yacht-005': {
        name: 'Ciao Bella',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 16,
        price: 25000,
        description: 'The Ciao Bella Yacht has maximum capacity of 16 passengers, it caters to small groups, making it the perfect choice for intimate occasions or celebratory events. Whether it\'s a special gathering or a leisurely cruise with close friends, the Ciao Bella Yacht ensures an atmosphere of unparalleled luxury.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System',
        images: [
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-19.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-19a.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-19b.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-19c.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-19d.jpg'
        ],
        extras: [
            { name: 'Decorations', price: 'upto ₹4,000/-' },
            { name: 'Snacks & Beverages', price: 'As per requirement' },
            { name: 'DSLR Photographer', price: 'upto ₹6,000/-' },
            { name: 'Drone Videographer', price: 'upto ₹5,000/-' }
        ]
    },
    'yacht-006': {
        name: 'Mandovi Queen',
        type: 'Cruise',
        location: 'Goa, India',
        capacity: 20,
        price: 30000,
        description: 'The Mandovi Queen is a premium cruise yacht perfect for larger events and celebrations. With ample deck space and elegant interiors, it\'s ideal for corporate events, birthday parties, and grand celebrations.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Multiple Decks, Air Conditioning',
        images: [
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-20.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-21.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-22.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-23.jpg'
        ],
        extras: [
            { name: 'Decorations', price: 'upto ₹6,000/-' },
            { name: 'Snacks & Beverages', price: 'As per requirement' },
            { name: 'DSLR Photographer', price: 'upto ₹8,000/-' },
            { name: 'Drone Videographer', price: 'upto ₹7,000/-' }
        ]
    },
    'yacht-007': {
        name: 'Sunset Dreams',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 10,
        price: 18000,
        description: 'Experience the magical Goan sunsets aboard Sunset Dreams. This yacht is specifically designed for romantic cruises and provides the perfect setting for memorable evenings on the water.',
        amenities: 'Welcome Drink, Champagne, Ice, Premium Music System, Sun Deck, Bean Bags',
        images: [
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-24.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-25.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-26.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-27.jpg'
        ],
        extras: [
            { name: 'Decorations', price: 'upto ₹5,000/-' },
            { name: 'Candlelight Dinner', price: 'upto ₹10,000/-' },
            { name: 'DSLR Photographer', price: 'upto ₹6,000/-' },
            { name: 'Drone Videographer', price: 'upto ₹5,000/-' }
        ]
    },
    'yacht-008': {
        name: 'Royal Voyager',
        type: 'Luxury Yacht',
        location: 'Goa, India',
        capacity: 15,
        price: 35000,
        description: 'The Royal Voyager represents the pinnacle of luxury yachting in Goa. With state-of-the-art amenities, elegant furnishings, and a dedicated crew, it offers an unforgettable experience for the most discerning guests.',
        amenities: 'Welcome Drink, Premium Bar, Music System, Multiple Decks, Sun Loungers, Air Conditioning',
        images: [
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-28.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-29.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-30.jpg',
            'https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-31.jpg'
        ],
        extras: [
            { name: 'Decorations', price: 'upto ₹8,000/-' },
            { name: 'Catering Service', price: 'As per requirement' },
            { name: 'DSLR Photographer', price: 'upto ₹10,000/-' },
            { name: 'Drone Videographer', price: 'upto ₹8,000/-' }
        ]
    }
};

// Format price
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

// Load yacht details
function loadYachtDetails() {
    const yachtId = getYachtFromURL();
    const yacht = YACHT_DETAILS[yachtId] || YACHT_DETAILS['yacht-005']; // Default to Ciao Bella
    
    // Update page title
    document.getElementById('pageTitle').textContent = yacht.name + ' | Goa Yacht World';
    document.getElementById('pageDesc').content = 'Book ' + yacht.name + ' yacht in Goa. ' + yacht.capacity + ' guests capacity. ' + yacht.amenities + '.';
    
    // Main info
    document.getElementById('yachtName').textContent = yacht.name;
    document.getElementById('yachtLocation').textContent = yacht.location;
    document.getElementById('yachtDescription').textContent = yacht.description;
    document.getElementById('yachtType').textContent = yacht.type;
    document.getElementById('yachtCapacity').textContent = yacht.capacity;
    document.getElementById('yachtPrice').innerHTML = formatPrice(yacht.price) + ' <small>/hour</small>';
    document.getElementById('yachtAmenities').textContent = yacht.amenities;
    
    // Book now button
    document.getElementById('bookNowBtn').href = 'https://wa.me/918446275985?text=Hi,%20I%20want%20to%20book%20' + encodeURIComponent(yacht.name);
    
    // Extras
    document.getElementById('yachtExtras').innerHTML = yacht.extras.map(e => 
        '<li>' + e.name + ': <strong>' + e.price + '</strong></li>'
    ).join('');
    
    // Main image
    document.getElementById('mainImage').src = yacht.images[0];
    document.getElementById('mainImage').alt = yacht.name;
    
    // Thumbnails
    const thumbnailsContainer = document.getElementById('thumbnails');
    thumbnailsContainer.innerHTML = yacht.images.map((img, index) => 
        '<div class="yacht-thumbnail' + (index === 0 ? ' active' : '') + '" data-src="' + img + '">' +
            '<img src="' + img + '" alt="' + yacht.name + ' ' + (index + 1) + '">' +
        '</div>'
    ).join('');
    
    // Thumbnail click handler
    document.querySelectorAll('.yacht-thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
            document.getElementById('mainImage').src = thumb.dataset.src;
            document.querySelectorAll('.yacht-thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
}

// FAQ accordion
function initFAQ() {
    document.querySelectorAll('.faq-item h3').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadYachtDetails();
    initFAQ();
});
