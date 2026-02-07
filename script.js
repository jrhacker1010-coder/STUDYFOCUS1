// Motivational Quotes Database
const quotes = [
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
    { text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett" }
];

// Application State
let subjects = [];
let currentQuoteIndex = 0;
let selectedSubjectIcon = 'fa-laptop-code';
let selectedTopicIcon = 'fa-play-circle';

// DOM Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const addSubjectBtn = document.getElementById('add-subject-btn');
const subjectsContainer = document.getElementById('subjects-container');
const subjectModal = document.getElementById('subject-modal');
const topicModal = document.getElementById('topic-modal');
const subjectForm = document.getElementById('subject-form');
const topicForm = document.getElementById('topic-form');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    initializeQuotes();
    initializeEventListeners();
    renderSubjects();
});

// Initialize Quotes
function initializeQuotes() {
    displayQuote();
    newQuoteBtn.addEventListener('click', displayQuote);
}

function displayQuote() {
    const quote = quotes[currentQuoteIndex];
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `- ${quote.author}`;
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Modal controls
    addSubjectBtn.addEventListener('click', () => openModal(subjectModal));
    
    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Form submissions
    subjectForm.addEventListener('submit', handleSubjectSubmit);
    topicForm.addEventListener('submit', handleTopicSubmit);
    
    // Icon selection
    document.querySelectorAll('#subject-modal .icon-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectIcon(this, '#subject-modal .icon-btn');
            selectedSubjectIcon = this.dataset.icon;
        });
    });
    
    document.querySelectorAll('#topic-modal .icon-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectIcon(this, '#topic-modal .icon-btn');
            selectedTopicIcon = this.dataset.icon;
        });
    });
}

// Icon Selection
function selectIcon(selectedBtn, selector) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.classList.remove('selected');
    });
    selectedBtn.classList.add('selected');
}

// Modal Functions
function openModal(modal) {
    modal.style.display = 'block';
    // Reset forms
    if (modal === subjectModal) {
        subjectForm.reset();
        document.querySelector('#subject-modal .icon-btn').click();
    } else if (modal === topicModal) {
        topicForm.reset();
        document.querySelector('#topic-modal .icon-btn').click();
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Subject Management
function handleSubjectSubmit(e) {
    e.preventDefault();
    
    const subjectName = document.getElementById('subject-name').value.trim();
    
    if (!subjectName) return;
    
    const newSubject = {
        id: Date.now().toString(),
        name: subjectName,
        icon: selectedSubjectIcon,
        topics: []
    };
    
    subjects.push(newSubject);
    saveToLocalStorage();
    renderSubjects();
    closeModal(subjectModal);
}

function deleteSubject(subjectId) {
    if (confirm('Are you sure you want to delete this subject and all its topics?')) {
        subjects = subjects.filter(subject => subject.id !== subjectId);
        saveToLocalStorage();
        renderSubjects();
    }
}

// Topic Management
function openTopicModal(subjectId) {
    document.getElementById('subject-id').value = subjectId;
    openModal(topicModal);
}

function handleTopicSubmit(e) {
    e.preventDefault();
    
    const subjectId = document.getElementById('subject-id').value;
    const topicName = document.getElementById('topic-name').value.trim();
    const youtubeUrl = document.getElementById('youtube-url').value.trim();
    
    if (!topicName || !youtubeUrl) return;
    
    const videoId = extractYouTubeVideoId(youtubeUrl);
    if (!videoId) {
        alert('Please enter a valid YouTube URL');
        return;
    }
    
    const newTopic = {
        id: Date.now().toString(),
        name: topicName,
        youtubeUrl: youtubeUrl,
        videoId: videoId,
        icon: selectedTopicIcon
    };
    
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
        subject.topics.push(newTopic);
        saveToLocalStorage();
        renderSubjects();
        closeModal(topicModal);
    }
}

function deleteTopic(subjectId, topicId) {
    if (confirm('Are you sure you want to delete this topic?')) {
        const subject = subjects.find(s => s.id === subjectId);
        if (subject) {
            subject.topics = subject.topics.filter(topic => topic.id !== topicId);
            saveToLocalStorage();
            renderSubjects();
        }
    }
}

// YouTube URL Processing
function extractYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Rendering Functions
function renderSubjects() {
    if (subjects.length === 0) {
        subjectsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>No Subjects Yet</h3>
                <p>Start by adding your first subject to organize your study materials.</p>
            </div>
        `;
        return;
    }
    
    subjectsContainer.innerHTML = subjects.map(subject => `
        <div class="subject-card">
            <div class="subject-header">
                <div class="subject-info">
                    <i class="fas ${subject.icon} subject-icon"></i>
                    <h3 class="subject-name">${subject.name}</h3>
                </div>
                <div class="subject-actions">
                    <button class="action-btn" onclick="openTopicModal('${subject.id}')" title="Add Topic">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteSubject('${subject.id}')" title="Delete Subject">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="topics-list">
                ${subject.topics.length === 0 ? 
                    '<p style="text-align: center; color: #a0aec0; padding: 1rem;">No topics yet. Click the + button to add your first topic.</p>' :
                    subject.topics.map(topic => `
                        <div class="topic-item">
                            <div class="topic-header">
                                <div class="topic-info">
                                    <i class="fas ${topic.icon} topic-icon"></i>
                                    <span class="topic-name">${topic.name}</span>
                                </div>
                                <button class="action-btn delete" onclick="deleteTopic('${subject.id}', '${topic.id}')" title="Delete Topic">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                            <iframe 
                                class="youtube-player"
                                src="https://www.youtube.com/embed/${topic.videoId}"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                        </div>
                    `).join('')
                }
            </div>
        </div>
    `).join('');
}

// Local Storage Functions
function saveToLocalStorage() {
    localStorage.setItem('studyPlaylistSubjects', JSON.stringify(subjects));
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem('studyPlaylistSubjects');
    if (stored) {
        try {
            subjects = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading data from localStorage:', e);
            subjects = [];
        }
    }
}

// Utility Functions
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}
