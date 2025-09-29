# 🤖 EventBuddy - AI-Powered Discord Event Management Bot

<div align="center">

![EventBuddy Logo](https://img.shields.io/badge/EventBuddy-AI%20Event%20Bot-blue?style=for-the-badge&logo=discord)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Discord.js](https://img.shields.io/badge/Discord.js-v14-7289da?style=for-the-badge&logo=discord)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

**Transform Discord servers into intelligent event management hubs with AI-powered conversations and automated networking.**

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🎯 Features](#-features) • [🛠️ Setup](#️-setup) • [📊 Demo](#-demo)

</div>

---

## 📖 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Technology Stack](#️-technology-stack)
- [📋 Prerequisites](#-prerequisites)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🎮 Usage Guide](#-usage-guide)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🚀 Deployment](#-deployment)
- [📊 API Reference](#-api-reference)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🆘 Support](#-support)

---

## 🎯 Overview

**EventBuddy** is an intelligent Discord bot that revolutionizes event management through AI-powered conversations and automated community building. Designed for event organizers, conference hosts, and community managers, it transforms static Discord servers into dynamic, engaging event hubs.

### 🎪 What Makes EventBuddy Special?

- **🧠 AI-Powered Intelligence**: Uses Sensay Replica AI for natural, human-like conversations
- **📊 Smart Analytics**: Real-time insights into attendee engagement and community growth
- **🔄 Automated Workflows**: Seamless CSV import, channel creation, and networking facilitation
- **🛡️ Privacy-First Design**: All admin operations work in private channels/DMs
- **⚡ Zero-Config Setup**: Works out of the box with minimal configuration

---

## ✨ Key Features

### 🎯 For Event Organizers

| Feature | Description | Benefit |
|---------|-------------|---------|
| **📥 CSV Import** | Import attendee data from Luma, Eventbrite, or any CSV export | No complex integrations needed |
| **🔒 Privacy-First Admin** | All management commands work in private channels/DMs | Secure event management |
| **🏷️ Smart Tagging** | Choose between @everyone or individual mentions | Flexible communication options |
| **📈 Real-Time Analytics** | Get engagement reports delivered privately | Data-driven event optimization |
| **🎪 Multi-Event Support** | Manage multiple events per Discord server | Scale your event management |
| **🤖 AI Event Assistant** | Natural language event management | Intuitive user experience |

### 👥 For Attendees

| Feature | Description | Benefit |
|---------|-------------|---------|
| **💬 Natural AI Conversations** | Bot responds like a helpful human community manager | Engaging, human-like interactions |
| **🔗 Intelligent Networking** | AI suggests relevant connections through @mentions | Meaningful professional connections |
| **🚫 Spam-Free Environment** | Advanced filtering keeps discussions meaningful | Quality conversations only |
| **🎯 Seamless Experience** | No special commands needed, just chat naturally | Zero learning curve |
| **📱 Mobile-Friendly** | Works perfectly on Discord mobile app | Access anywhere, anytime |

---

## 🚀 Quick Start

### 1️⃣ Add EventBuddy to Your Discord Server

[![Add to Discord](https://img.shields.io/badge/Add%20to%20Discord-7289da?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands)

### 2️⃣ Set Up Your First Event

```bash
# 1. Import your attendee list
/import_event event_name: "Tech Conference 2025" csv_file: [upload your CSV]

# 2. Let AI handle attendee questions
# Just chat naturally - the bot will respond intelligently

# 3. Get analytics
/analytics event_name: "Tech Conference 2025"
```

> ⚠️ **Security Note**: Before using in production, ensure you've moved all hardcoded credentials to environment variables. See the [Security Audit Report](SECURITY_AUDIT_REPORT_UPDATED.md) for details.

### 3️⃣ Watch the Magic Happen

- ✅ Attendees get personalized welcome messages
- ✅ AI facilitates networking conversations
- ✅ Post-event channels created automatically
- ✅ Real-time engagement analytics

## 📊 Demo

### 🎬 See EventBuddy in Action

```bash
# 1. Import attendees from CSV
/import_event event_name: "Tech Conference 2025" csv_file: [upload CSV]

# 2. AI handles attendee questions naturally
User: "What time does the keynote start?"
Bot: "The keynote starts at 9:00 AM in the main auditorium. I'll send you a reminder 30 minutes before!"

# 3. AI facilitates networking
User: "I'm looking to connect with other developers"
Bot: "Great! I'd recommend connecting with @JaneSmith who's also a developer and @MikeJohnson who works in your field. They're both attending the conference!"

# 4. Get real-time analytics
/analytics event_name: "Tech Conference 2025"
# Returns: Engagement rates, popular topics, networking connections, etc.
```

### 🎯 Key Demo Features

| Feature | What You'll See |
|---------|----------------|
| **Smart CSV Import** | Instant attendee data processing and welcome messages |
| **Natural AI Conversations** | Human-like responses to event questions |
| **Intelligent Networking** | AI suggests relevant connections based on profiles |
| **Real-time Analytics** | Live engagement metrics and insights |
| **Automated Channel Management** | Post-event networking channels created automatically |

---

## 🛠️ Technology Stack

### 🎨 Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **State Management**: TanStack Query
- **Build Tool**: Vite

### ⚙️ Backend
- **Bot Framework**: Discord.js v14
- **API**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **AI**: Google Gemini API
- **Authentication**: Supabase Auth

### 🚀 Deployment
- **Platforms**: Render, Railway, Vercel, Docker
- **Database**: Supabase (PostgreSQL)
- **CDN**: Vercel/Netlify (for frontend)
- **Monitoring**: Built-in analytics + logging

---

## 📋 Prerequisites

Before setting up EventBuddy, ensure you have:

### 🛠️ Required Tools
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** package manager ([Install](https://pnpm.io/installation))
- **Git** ([Download](https://git-scm.com/))

### 🔑 Required Accounts
- **Discord Developer Account** ([Sign up](https://discord.com/developers/applications))
- **Supabase Account** ([Sign up](https://supabase.com))
- **Google AI Studio Account** ([Sign up](https://aistudio.google.com/))

### 💻 System Requirements
- **RAM**: 2GB minimum, 4GB recommended
- **Storage**: 1GB free space
- **Network**: Stable internet connection
- **OS**: Windows 10+, macOS 10.15+, or Linux

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/eventbuddy.git
cd eventbuddy
```

### 2️⃣ Install Dependencies

```bash
pnpm install
```

### 3️⃣ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Discord Configuration
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/discord-callback

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key

# AI Configuration
GEMINI_API_KEY=your_gemini_api_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:5173
VITE_DISCORD_CLIENT_ID=your_discord_client_id
VITE_SUPABASE_URL=your_supabase_url
VITE_API_URL=http://localhost:3000

# Security (Optional)
BOT_ADMIN_TOKEN=your_secure_random_token
```

### 4️⃣ Database Setup

1. **Create Supabase Project**:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Create a new project
   - Copy the project URL and service role key

2. **Run Database Schema**:
   ```bash
   # The schema is automatically applied via Supabase migrations
   # Check supabase/migrations/ for the latest schema
   ```

### 5️⃣ Discord Bot Setup

1. **Create Discord Application**:
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Click "New Application"
   - Name it "EventBuddy"

2. **Create Bot**:
   - Go to "Bot" section
   - Click "Add Bot"
   - Copy the bot token
   - Enable "Message Content Intent"

3. **Set Permissions**:
   - Go to "OAuth2" → "URL Generator"
   - Select scopes: `bot`, `applications.commands`
   - Select permissions: `Send Messages`, `Use Slash Commands`, `Manage Channels`, `Read Message History`

### 6️⃣ AI Setup (Sensay)

1. **Create Sensay API Key & Organization ID**:
   - Go to the Sensay Dashboard (`https://sensay.io`) and sign in.
   - In the dashboard, create an API key (Organization or Service key) and copy it.
   - Note your Organization ID from the account settings.

2. **Configure environment variables** (create a `.env.local` at project root):

```env
# Sensay
SENSAY_API_KEY_SECRET=your_sensay_api_key_here
SENSAY_ORGANIZATION_ID=your_organization_id_here

# Discord
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_client_id

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
```

3. **Replica behavior & function-calling**:
   - The integration will attempt to create or reuse a Sensay Replica for the bot automatically. You can pre-create a Replica in Sensay Studio and set its slug/uuid in `src/constants/sensay-auth.ts` if you prefer.
   - This repo supports simple prompt-driven function-calling where Sensay can indicate a function invocation using the `FUNCTION_CALL:<name>:<json>` pattern; the bot parses and executes local functions (e.g. `get_active_events`) and sends the results back to the model for a final reply.

4. **Notes & recommendations**:
   - Keep your Sensay key private and never commit it to git.
   - For production, pre-create and configure a Replica (set the slug/uuid) to avoid on-the-fly creation and permission issues.

---

## 🎮 Usage Guide

### 🤖 Bot Commands

#### Basic Commands
| Command | Description | Example |
|---------|-------------|---------|
| `/help` | Show available commands | `/help` |
| `/input <message>` | Send message to AI | `/input What time is the keynote?` |

#### Admin Commands (Require Manage Server permission)
| Command | Description | Example |
|---------|-------------|---------|
| `/import_event <name> <csv>` | Import attendee data | `/import_event "Tech Conf 2025" [upload CSV]` |
| `/end_event` | End current event | `/end_event` |
| `/analytics [event]` | Get event analytics | `/analytics "Tech Conf 2025"` |

### 📊 CSV Import Format

Your CSV file should have these columns:

```csv
Name,Email,Discord Handle,RSVP Status
John Doe,john@example.com,JohnDoe#1234,Confirmed
Jane Smith,jane@example.com,JaneSmith,Confirmed
Bob Wilson,bob@example.com,BobWilson#5678,Pending
```

### 🎯 Natural Language Interactions

EventBuddy understands natural language - no need to memorize commands:

```
User: "What time does the conference start?"
Bot: "The Tech Conference 2025 starts at 9:00 AM. I'll send you a reminder 30 minutes before!"

User: "Can you help me find someone who works in marketing?"
Bot: "I'd be happy to help! Let me connect you with @JaneSmith who works in marketing at TechCorp. She's also attending the conference!"

User: "Create a channel for networking after the event"
Bot: "I'll create a post-event networking channel for you! This will help attendees continue conversations after the main event."
```

---

## 📁 Project Structure

```
eventbuddy/
├── 📁 public/                     # Static assets
│   ├── favicon.ico
│   └── placeholder.svg
├── 📁 src/
│   ├── 📁 components/             # React components
│   │   └── 📁 ui/                # Reusable UI components
│   ├── 📁 hooks/                 # Custom React hooks
│   ├── 📁 integrations/          # External service integrations
│   │   └── 📁 supabase/          # Supabase client & types
│   ├── 📁 lib/                   # Core business logic
│   │   ├── discord-bot.ts        # Main Discord bot implementation
│   │   ├── bot-manager.ts        # Bot lifecycle management
│   │   ├── ai-integration.ts     # AI service integration
│   │   ├── database-schema.sql   # Database schema
│   │   └── 📁 ai-rate-limiter/   # Rate limiting system
│   ├── 📁 pages/                 # Next.js pages & API routes
│   │   ├── 📁 api/               # API endpoints
│   │   │   ├── 📁 auth/          # Authentication routes
│   │   │   ├── 📁 bot/           # Bot management routes
│   │   │   └── 📁 discord/       # Discord-specific routes
│   │   ├── Index.tsx             # Landing page
│   │   └── dashboard.tsx         # Admin dashboard
│   ├── 📁 prompts/               # AI prompt templates
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # App entry point
├── 📁 supabase/                  # Supabase configuration
│   ├── 📁 functions/             # Edge functions
│   └── 📁 migrations/            # Database migrations
├── 📄 package.json               # Dependencies & scripts
├── 📄 tailwind.config.ts         # Tailwind CSS configuration
├── 📄 vite.config.ts             # Vite configuration
└── 📄 README.md                  # This file
```

---

## 🔧 Configuration

### 🎛️ Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DISCORD_BOT_TOKEN` | Discord bot token | ✅ | - |
| `DISCORD_CLIENT_ID` | Discord application ID | ✅ | - |
| `DISCORD_CLIENT_SECRET` | Discord client secret | ✅ | - |
| `DISCORD_REDIRECT_URI` | OAuth redirect URI | ✅ | - |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ | - |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ | - |
| `GEMINI_API_KEY` | Google Gemini API key | ✅ | - |
| `NEXT_PUBLIC_APP_URL` | Frontend URL | ✅ | - |
| `BOT_ADMIN_TOKEN` | Admin token for bot control | ❌ | - |

### ⚙️ Bot Configuration

The bot can be configured through environment variables:

```env
# AI Rate Limiting
AI_MAX_CONCURRENT=3
AI_REQUESTS_PER_MINUTE=60
AI_MAX_RETRIES=4

# Token Bucket Configuration
GUILD_RATE_BURST=3
GUILD_RATE_PER_SECOND=1
USER_RATE_BURST=2
USER_RATE_PER_SECOND=0.5

# Circuit Breaker
CIRCUIT_FAILURE_THRESHOLD=5
CIRCUIT_RECOVERY_TIMEOUT=30000
```

---

## 🚀 Deployment

### 🌐 Production Deployment Options

#### Option 1: Render (Recommended)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set environment variables
4. Deploy automatically

#### Option 2: Railway
1. Connect your GitHub repository to Railway
2. Railway auto-detects the project type
3. Set environment variables
4. Deploy with one click

#### Option 3: Vercel + Supabase
1. Deploy frontend to Vercel
2. Deploy API to Vercel
3. Use Supabase for database
4. Configure environment variables

### 🔧 Local Development

```bash
# Start the development servers
pnpm dev              # Start Vite frontend (port 5173)
pnpm api:dev          # Start Next.js API (port 3000)

# Start the Discord bot
pnpm bot:start:local  # Start bot via API

# Test Discord connection
pnpm test:discord     # Test bot connection

# Clear and register commands
pnpm clear:commands   # Reset Discord commands
```

### 📊 Production Operations

```bash
# Start bot
curl -X POST https://your-backend.onrender.com/api/bot/start

# Stop bot
curl -X POST https://your-backend.onrender.com/api/bot/stop

# Check status
curl https://your-backend.onrender.com/api/bot/status
```

---

## 📊 API Reference

### 🤖 Bot Management Endpoints

| Endpoint | Method | Description | Headers |
|----------|--------|-------------|---------|
| `/api/bot/start` | POST | Start the Discord bot | `x-bot-admin: <token>` |
| `/api/bot/stop` | POST | Stop the Discord bot | `x-bot-admin: <token>` |
| `/api/bot/status` | GET | Get bot status | - |

### 🔐 Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/discord-callback` | GET | Discord OAuth callback |
| `/api/discord/bot-invite` | GET | Generate bot invite URL |

### 📊 Health Check

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | API health status |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
1. Check existing issues first
2. Create a new issue with detailed description
3. Include steps to reproduce
4. Add relevant logs/screenshots

### 💡 Feature Requests
1. Check existing feature requests
2. Create a new issue with "enhancement" label
3. Describe the feature and its benefits
4. Provide mockups or examples if possible

### 🔧 Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### 📋 Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow the existing code style
- Ensure all checks pass

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔒 Security Notice

**Important**: This repository contains some hardcoded credentials that need to be moved to environment variables for production use. See the [Security Audit Report](SECURITY_AUDIT_REPORT_UPDATED.md) for details.

### 🛡️ Security Best Practices
- Always use environment variables for sensitive data
- Never commit `.env.local` or `.env` files
- Rotate API keys and tokens regularly
- Use HTTPS in production
- Implement proper access controls

## 🆘 Support

### 📚 Documentation
- [Discord.js Documentation](https://discord.js.org/#/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### 🆘 Getting Help
- **Discord Issues**: Check [Discord.js documentation](https://discord.js.org/#/docs)
- **Database Issues**: Check [Supabase documentation](https://supabase.com/docs)
- **General Support**: Open an issue on GitHub
- **Community**: Join our Discord server (coming soon!)

### 🐛 Troubleshooting

#### Common Issues

**Bot not responding:**
- Check if bot token is correct
- Verify bot has necessary permissions
- Ensure bot is online in Discord
- Check if bot has "Message Content Intent" enabled

**CSV import failing:**
- Check CSV format matches requirements (Name, Email, Discord Handle, RSVP Status)
- Verify you have admin permissions
- Check file size (max 10MB)
- Ensure CSV is properly formatted (no extra spaces, correct headers)

**AI not working:**
- Verify Gemini API key is valid
- Check API quotas and limits
- Review error logs in console
- Test with simple commands first

**Database connection issues:**
- Verify Supabase URL and keys are correct
- Check if database schema is applied
- Ensure service role key has proper permissions
- Check Supabase project status

**OAuth redirect errors:**
- Verify redirect URI matches exactly in Discord Developer Portal
- Check if using HTTPS in production
- Ensure client ID and secret are correct
- Clear browser cache and try again

#### Debug Commands

```bash
# Test Discord bot connection
pnpm test:discord

# Check bot status
pnpm bot:status:local

# Clear and re-register commands
pnpm clear:commands

# View detailed logs
DEBUG_LOGGING=true pnpm dev
```

#### Getting More Help

1. **Check the logs** - Both frontend and backend terminals show detailed error messages
2. **Verify environment variables** - Ensure all required variables are set correctly
3. **Test step by step** - Start with basic bot connection, then add features
4. **Check permissions** - Ensure bot has all required Discord permissions
5. **Review documentation** - Check Discord.js and Supabase docs for specific issues

---

## 🏆 Success Metrics

EventBuddy is designed to achieve these key performance indicators:

| Metric | Target | Description |
|--------|--------|-------------|
| **Attendee Engagement** | >60% | Post-event engagement rate |
| **Spam Filtering** | >95% | Accuracy in filtering spam |
| **Onboarding Time** | <5 minutes | Time to set up first event |
| **User Satisfaction** | 4.5+/5 | Host satisfaction score |
| **Response Quality** | Natural | Human-like AI conversations |

---

<div align="center">

## 📝 Changelog

### [1.0.0] - 2025-09-13

#### Added
- 🤖 AI-powered Discord bot for event management
- 📊 CSV import functionality for attendee data
- 🧠 Natural language processing with Google Gemini AI
- 📈 Real-time analytics and engagement tracking
- 🔗 Intelligent networking suggestions
- 🛡️ Privacy-first admin controls
- ⚡ Rate limiting and circuit breaker patterns
- 🎨 Modern React frontend with Tailwind CSS
- 🗄️ Supabase database integration
- 🚀 Multiple deployment options (Render, Railway, Vercel)

#### Security
- 🔒 Comprehensive security audit completed
- 🛡️ Environment variable configuration
- 📋 Security best practices documentation
- ⚠️ Security notices and warnings added

#### Documentation
- 📖 Complete setup and usage guides
- 🎯 Quick start instructions
- 🔧 Troubleshooting section
- 📊 API reference documentation
- 🎬 Demo examples and use cases

---

**Made with ❤️ for the event community**

[⭐ Star this repo](https://github.com/OkeyAmy/buddy-event-spark) • [🐛 Report a bug](https://github.com/OkeyAmy/buddy-event-spark/issues) • [💡 Request a feature](https://github.com/OkeyAmy/buddy-event-spark/issues)

</div>
