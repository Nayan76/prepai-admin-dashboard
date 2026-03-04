# PrepAI Admin Dashboard

A comprehensive, feature-rich admin dashboard for managing an AI-powered Interview Preparation Platform. Built with React, Tailwind CSS, and Recharts.

![Dashboard Preview](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🚀 Features

### 📊 Dashboard
- **Real-time Statistics**: Total users, active interviews, questions generated, success rates
- **Interactive Charts**: User growth visualization with Area charts
- **Quick Actions**: 
  - Content Moderation
  - AI Model Retraining
  - Add New Mentors
  - Broadcast Messages to users
  - Add Interview Questions

### 👥 User Management
- **Complete User Directory**: View all users with detailed profiles
- **Role Management**: User, Mentor, Admin roles with color-coded badges
- **Status Tracking**: Active/Suspended account management
- **Search & Filter**: Real-time search by name/email, filter by role
- **Pagination**: Navigate through large user lists
- **Export**: Download user data as CSV
- **Add New Users**: Modal form with validation

### 📝 Questions Database
- **Question Cards**: Visual grid layout with difficulty indicators
- **Categories**: System Design, Algorithms, Behavioral, React, JavaScript
- **Difficulty Levels**: Easy (Green), Medium (Yellow), Hard (Red)
- **Performance Metrics**: Usage count and average scores
- **Filtering**: By category and difficulty
- **Import/Export**: CSV import functionality
- **Add Questions**: Modal form with category selection

### 🤖 AI Performance Monitoring
- **Live Metrics**: Response accuracy, latency, satisfaction scores
- **Performance Charts**: Line charts tracking accuracy and latency over time
- **Model Management**:
  - Switch between AI models (GPT-4-Turbo, GPT-4, GPT-3.5, Claude)
  - Model training controls
  - Temperature adjustment (Precision vs Creativity)
- **Interaction Logs**: Recent AI interview sessions with confidence scores

### 📈 Analytics
- **User Growth Chart**: Area chart showing platform growth
- **Category Distribution**: Pie chart of interview question types
- **Top Questions**: Bar chart comparing usage and scores
- **Performance Tracking**: Visual data representation

### ⚙️ Settings
- **Platform Configuration**: Name, email, branding settings
- **Security Controls**: 
  - Two-Factor Authentication toggle
  - API Key management
  - Maintenance mode switch
- **Danger Zone**: Data reset and account deletion (with confirmations)

### 🎨 UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Sidebar**: Modern navigation with collapsible menu
- **Interactive Elements**: Hover effects, transitions, loading states
- **Modal System**: Clean popup dialogs for all actions
- **Toast Notifications**: Success/error feedback

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2+
- **Build Tool**: Vite 5.0+
- **Styling**: Tailwind CSS 3.4+
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Hooks (useState, useEffect)

## 📦 Installation

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/prepai-admin-dashboard.git
   cd prepai-admin-dashboard
   npm install @google/generative-ai
