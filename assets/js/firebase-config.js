// Firebase Configuration
// Set FIREBASE_CONFIGURED = true and add your config when ready
const FIREBASE_CONFIGURED = false;

let firebaseApp = null;
let database = null;

// Firebase Service - Handles all data operations
class FirebaseService {
    constructor() {
        this.refs = null;
    }

    // Initialize Firebase connection
    init() {
        if (!FIREBASE_CONFIGURED) return;
        
        try {
            firebaseApp = firebase.initializeApp(firebaseConfig);
            database = firebase.database();
            this.refs = {
                categories: database.ref('categories'),
                extras: database.ref('extras'),
                yachts: database.ref('yachts'),
                reviews: database.ref('reviews'),
                questions: database.ref('questions'),
                settings: database.ref('settings')
            };
        } catch (error) {
            console.log('Firebase not available');
        }
    }

    // ============ CATEGORIES ============
    async getCategories() {
        if (!FIREBASE_CONFIGURED || !this.refs) return [];
        try {
            const snapshot = await this.refs.categories.once('value');
            const data = snapshot.val();
            return data ? Object.values(data).filter(c => c.active !== false) : [];
        } catch (error) {
            return [];
        }
    }

    async saveCategories(categories) {
        if (!FIREBASE_CONFIGURED || !this.refs) return false;
        try {
            await this.refs.categories.set(categories);
            return true;
        } catch (error) {
            return false;
        }
    }

    onCategoriesChange(callback) {
        if (!FIREBASE_CONFIGURED || !this.refs) return;
        this.refs.categories.on('value', snapshot => {
            const data = snapshot.val();
            callback(data ? Object.values(data).filter(c => c.active !== false) : []);
        });
    }

    // ============ EXTRAS ============
    async getExtras() {
        if (!FIREBASE_CONFIGURED || !this.refs) return [];
        try {
            const snapshot = await this.refs.extras.once('value');
            const data = snapshot.val();
            return data ? Object.values(data).filter(e => e.active !== false) : [];
        } catch (error) {
            return [];
        }
    }

    async saveExtras(extras) {
        if (!FIREBASE_CONFIGURED || !this.refs) return false;
        try {
            await this.refs.extras.set(extras);
            return true;
        } catch (error) {
            return false;
        }
    }

    onExtrasChange(callback) {
        if (!FIREBASE_CONFIGURED || !this.refs) return;
        this.refs.extras.on('value', snapshot => {
            const data = snapshot.val();
            callback(data ? Object.values(data).filter(e => e.active !== false) : []);
        });
    }

    // ============ YACHTS ============
    async getYachts() {
        if (!FIREBASE_CONFIGURED || !this.refs) return [];
        try {
            const snapshot = await this.refs.yachts.once('value');
            const data = snapshot.val();
            return data ? Object.values(data).filter(y => y.disabled !== true) : [];
        } catch (error) {
            return [];
        }
    }

    async saveYachts(yachts) {
        if (!FIREBASE_CONFIGURED || !this.refs) return false;
        try {
            await this.refs.yachts.set(yachts);
            return true;
        } catch (error) {
            return false;
        }
    }

    onYachtsChange(callback) {
        if (!FIREBASE_CONFIGURED || !this.refs) return;
        this.refs.yachts.on('value', snapshot => {
            const data = snapshot.val();
            callback(data ? Object.values(data).filter(y => y.disabled !== true) : []);
        });
    }

    // ============ REVIEWS ============
    async getReviews() {
        if (!FIREBASE_CONFIGURED || !this.refs) return [];
        try {
            const snapshot = await this.refs.reviews.once('value');
            const data = snapshot.val();
            return data ? Object.values(data).filter(r => r.active !== false) : [];
        } catch (error) {
            return [];
        }
    }

    async saveReviews(reviews) {
        if (!FIREBASE_CONFIGURED || !this.refs) return false;
        try {
            await this.refs.reviews.set(reviews);
            return true;
        } catch (error) {
            return false;
        }
    }

    onReviewsChange(callback) {
        if (!FIREBASE_CONFIGURED || !this.refs) return;
        this.refs.reviews.on('value', snapshot => {
            const data = snapshot.val();
            callback(data ? Object.values(data).filter(r => r.active !== false) : []);
        });
    }

    // ============ QUESTIONS ============
    async getQuestions() {
        if (!FIREBASE_CONFIGURED || !this.refs) return [];
        try {
            const snapshot = await this.refs.questions.once('value');
            const data = snapshot.val();
            return data ? Object.values(data) : [];
        } catch (error) {
            return [];
        }
    }

    async saveQuestions(questions) {
        if (!FIREBASE_CONFIGURED || !this.refs) return false;
        try {
            await this.refs.questions.set(questions);
            return true;
        } catch (error) {
            return false;
        }
    }

    onQuestionsChange(callback) {
        if (!FIREBASE_CONFIGURED || !this.refs) return;
        this.refs.questions.on('value', snapshot => {
            const data = snapshot.val();
            callback(data ? Object.values(data) : []);
        });
    }
    
    // ============ CONTACT SUBMISSIONS ============
    async saveContactSubmission(submission) {
        if (!FIREBASE_CONFIGURED || !this.refs) return false;
        try {
            const contactsRef = database.ref('contacts').push();
            await contactsRef.set({
                ...submission,
                date: new Date().toISOString()
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async getContacts() {
        if (!FIREBASE_CONFIGURED || !this.refs) return [];
        try {
            const snapshot = await this.refs.contacts.once('value');
            const data = snapshot.val();
            if (!data) return [];
            return Object.entries(data).map(([id, value]) => ({ id, ...value }));
        } catch (error) {
            return [];
        }
    }

    onContactsChange(callback) {
        if (!FIREBASE_CONFIGURED || !this.refs) return;
        database.ref('contacts').on('value', snapshot => {
            const data = snapshot.val();
            if (!data) {
                callback([]);
                return;
            }
            const contacts = Object.entries(data).map(([id, value]) => ({ id, ...value }));
            callback(contacts);
        });
    }
}

// Initialize Firebase Service
const firebaseService = new FirebaseService();
firebaseService.init();
