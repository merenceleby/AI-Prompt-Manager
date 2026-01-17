// DOM Elements
const titleInput = document.getElementById('promptTitle');
const textInput = document.getElementById('promptText');
const categorySelect = document.getElementById('promptCategory');
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelBtn');
const searchBox = document.getElementById('searchBox');
const listArea = document.getElementById('promptList');
const filterBtns = document.querySelectorAll('.filter-btn');

// State
let prompts = [];
let editingId = null;
let currentFilter = 'all';
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderPrompts();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    addBtn.addEventListener('click', handleAddOrUpdate);
    cancelBtn.addEventListener('click', cancelEdit);
    searchBox.addEventListener('input', handleSearch);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
}

// Load from LocalStorage
function loadFromLocalStorage() {
    const stored = localStorage.getItem('aiPrompts');
    if (stored) {
        prompts = JSON.parse(stored);
    }
}

// Save to LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('aiPrompts', JSON.stringify(prompts));
}

// Add or Update Prompt
function handleAddOrUpdate() {
    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    const category = categorySelect.value;

    if (!title || !text || !category) {
        alert('Please fill in all fields!');
        return;
    }

    if (editingId) {
        // Update existing
        const index = prompts.findIndex(p => p.id === editingId);
        prompts[index] = {
            ...prompts[index],
            title,
            text,
            category
        };
        editingId = null;
        addBtn.textContent = 'Add Prompt';
        cancelBtn.classList.add('hidden');
    } else {
        // Add new
        const newPrompt = {
            id: Date.now(),
            title,
            text,
            category,
            createdAt: new Date().toISOString()
        };
        prompts.unshift(newPrompt);
    }

    saveToLocalStorage();
    renderPrompts();
    clearForm();
}

// Edit Prompt
function editPrompt(id) {
    const prompt = prompts.find(p => p.id === id);
    if (!prompt) return;

    titleInput.value = prompt.title;
    textInput.value = prompt.text;
    categorySelect.value = prompt.category;
    
    editingId = id;
    addBtn.textContent = 'Update Prompt';
    cancelBtn.classList.remove('hidden');
    
    // Scroll to form
    titleInput.scrollIntoView({ behavior: 'smooth' });
    titleInput.focus();
}

// Cancel Edit
function cancelEdit() {
    editingId = null;
    addBtn.textContent = 'Add Prompt';
    cancelBtn.classList.add('hidden');
    clearForm();
}

// Delete Prompt
function deletePrompt(id) {
    if (confirm('Are you sure you want to delete this prompt?')) {
        prompts = prompts.filter(p => p.id !== id);
        saveToLocalStorage();
        renderPrompts();
    }
}

// Copy to Clipboard
function copyPrompt(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.style.background = '#229954';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy. Please try again.');
    });
}

// Search
function handleSearch(e) {
    searchQuery = e.target.value.toLowerCase();
    renderPrompts();
}

// Filter
function handleFilter(e) {
    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    currentFilter = e.target.dataset.category;
    renderPrompts();
}

// Render Prompts
function renderPrompts() {
    // Filter prompts
    let filtered = prompts;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(searchQuery) ||
            p.text.toLowerCase().includes(searchQuery)
        );
    }
    
    // Clear list
    listArea.innerHTML = '';
    
    // Show message if empty
    if (filtered.length === 0) {
        listArea.innerHTML = '<p class="no-prompts">No prompts found. Try a different search or filter. 🔍</p>';
        return;
    }
    
    // Render cards
    filtered.forEach(prompt => {
        const card = createPromptCard(prompt);
        listArea.appendChild(card);
    });
}

// Create Prompt Card
function createPromptCard(prompt) {
    const card = document.createElement('div');
    card.classList.add('prompt-card', prompt.category);
    
    const categoryLabels = {
        coding: '💻 Coding',
        writing: '✍️ Writing',
        analysis: '📊 Analysis',
        other: '🔧 Other'
    };
    
    card.innerHTML = `
        <div class="prompt-header">
            <h3>${escapeHtml(prompt.title)}</h3>
            <span class="category-badge ${prompt.category}">
                ${categoryLabels[prompt.category]}
            </span>
        </div>
        <p>${escapeHtml(prompt.text)}</p>
        <div class="action-buttons">
            <button class="copy-btn" onclick="copyPrompt(\`${escapeHtml(prompt.text)}\`)">
                📋 Copy
            </button>
            <button class="edit-btn" onclick="editPrompt(${prompt.id})">
                ✏️ Edit
            </button>
            <button class="delete-btn" onclick="deletePrompt(${prompt.id})">
                🗑️ Delete
            </button>
        </div>
    `;
    
    return card;
}

// Clear Form
function clearForm() {
    titleInput.value = '';
    textInput.value = '';
    categorySelect.value = '';
}

// Escape HTML (security)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions global for onclick
window.copyPrompt = copyPrompt;
window.editPrompt = editPrompt;
window.deletePrompt = deletePrompt;