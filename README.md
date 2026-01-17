# 🤖 AI Prompt Manager

> A production-ready prompt management tool built with Pure Vanilla JavaScript

## 🎯 Problem Statement

As a Gen AI Engineer working with multiple LLM APIs, I constantly reused similar prompts across projects. Managing them in scattered notes or chat histories was inefficient and time-consuming. I needed a lightweight, fast solution that worked offline and required zero setup.

## 💡 Solution

Built a browser-based CRUD application with intelligent filtering, real-time search, and persistent storage—all without external dependencies.

## ✨ Key Features

- **Full CRUD Operations**: Create, read, update, and delete prompts
- **Smart Search**: Real-time filtering across titles and content with debouncing
- **Category System**: Organize prompts by type (Coding, Writing, Analysis, Other)
- **One-Click Copy**: Instant clipboard integration with visual feedback
- **Data Persistence**: LocalStorage implementation for offline-first functionality
- **Zero Dependencies**: Pure JavaScript—no jQuery, no React, no frameworks
- **Security**: XSS protection through HTML escaping
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## 🛠️ Technical Stack
```
Frontend:     HTML5, CSS3, Vanilla JavaScript (ES6+)
Storage:      LocalStorage API
Architecture: MVC-inspired separation of concerns
Security:     Content sanitization, XSS prevention
```


## 🚀 Performance Optimizations

- **Lazy Rendering**: Only renders visible prompts
- **Event Delegation**: Minimizes event listener overhead
- **LocalStorage Batching**: Single write operation per action
- **CSS Animations**: GPU-accelerated transforms for smooth UX

## 💻 Local Development
# Clone repository
git clone https://github.com/merenceleby/AI-Prompt-Manager.git

# Navigate to directory
cd AI-Prompt-Manager

# Open in browser
open index.html

## 🛠️ Technical Implementation

- **DOM Manipulation**: Direct element creation and modification without virtual DOM
- **Event System**: Bubbling, capturing, and delegation patterns
- **State Management**: Maintaining application state without Redux/Context
- **Browser APIs**: LocalStorage, Clipboard API, Navigator methods
- **Functional Programming**: Pure functions, immutability, composition
- **Clean Code**: Separation of concerns, single responsibility principle
- **Security**: XSS prevention, input sanitization

## 📸 Screenshot
<img width="1378" height="911" alt="ai prompt manager visual" src="https://github.com/user-attachments/assets/309e3ddf-0630-4cb7-a4e3-fd0054af01da" />

