<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>discord-sound-sharing-bot
</h1>
<h4 align="center">A powerful Discord bot for seamless music playback and community engagement.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="">
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="">
  <img src="https://img.shields.io/badge/Music_Sources-YouTube,_Spotify,_SoundCloud-black" alt="">
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/discord-sound-sharing-bot?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/discord-sound-sharing-bot?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/discord-sound-sharing-bot?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a project called "discord-sound-sharing-bot" that provides a comprehensive solution for music playback and social engagement on Discord. Developed using Node.js, React, and various APIs, this bot enhances user interactions through collaborative music experiences.

## 📦 Features
|    | Feature                  | Description                                                                                                            |
|----|--------------------------|------------------------------------------------------------------------------------------------------------------------|
| 🎶 | Music Playback       | Ability to play music from trusted sources like YouTube and Spotify in voice channels for shared listening experiences.|
| 📋 | Queue Management     | Users can create, view, and manage a music queue to control playback.                                                 |
| 🔊 | Volume Control       | Users can easily adjust playback volume, mute or unmute the bot during conversations.                                  |
| ⚙️ | Command System       | Intuitive commands for playback functions make the bot accessible for all users.                                     |
| 🎵 | Playlist Support     | Users can manage custom playlists and import them from various platforms for a tailored music experience.              |
| 🛠️ | Bot Moderation       | Admin commands for managing bot interactions, enhancing server organization.                                          |
| 🔗 | Cross-Server Functionality | Operates across multiple Discord servers, maintaining consistent playback and control.                           |

## 📂 Structure
```plaintext
discord-sound-sharing-bot/
│
├── commands/                # Contains bot command logic
│   ├── play.js              # Play a requested song
│   ├── pause.js             # Pause currently playing music
│   ├── resume.js            # Resume paused music
│   ├── stop.js              # Stop playback and disconnect
│   ├── skip.js              # Skip to the next song in the queue
│   └── queue.js             # Manage the song queue
│
├── events/                  # Event handlers for Discord interactions
│   ├── message.js           # Handle incoming messages
│   ├── guildMemberAdd.js    # Actions on new member joining
│   └── ready.js             # Bot is ready and operational
│
├── services/                # Core logic for music playback and queues
│   ├── musicService.js      # Handles music playback
│   └── queueService.js      # Manages the music queue
│
├── models/                  # Database models for MongoDB
│   ├── userModel.js         # User metadata
│   ├── playlistModel.js     # Playlist structures
│   └── songModel.js         # Song definitions
│
├── utils/                   # Utility functions
│   ├── commandHandler.js     # Command parsing and execution
│   └── logger.js            # Logging utilities
│
├── config/                  # Configuration files
│   ├── env.config.js        # Environment variables
│   └── database.config.js   # DB connection settings
│
├── routes/                  # API route definitions
│   ├── api.js               # Main API endpoint definitions
│   └── musicRoutes.js       # Music related routes
│
├── middleware/              # Middleware functions for authentication and logging
│   ├── authentication.js     # User authentication
│   └── logging.js           # Request logging
│
├── .env                     # Environment configuration
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- Docker
  
### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/spectra-ai-codegen/discord-sound-sharing-bot.git`
2. Navigate to the project directory:
   - `cd discord-sound-sharing-bot`
3. Install dependencies:
   - `npm install`
  
## 🏗️ Usage
### 🏃‍♂️ Running the Project
1. Start the development server:
   - `npm start`
2. Open your Discord server and invite the bot using appropriate permissions.

### ⚙️ Configuration
Adjust configuration settings in '.env' for database connections and API keys.

## 🌐 Hosting
### 🚀 Deployment Instructions
You can deploy the bot using various platforms. Here’s how to do it on Heroku:

1. Install the Heroku CLI:
   - `npm install -g heroku`
2. Log in to Heroku:
   - `heroku login`
3. Create a new Heroku app:
   - `heroku create`
4. Deploy the code:
   - `git push heroku main`

### 🔑 Environment Variables
- `DB_HOST`: Database host
- `DB_USER`: Database user
- `DB_PASS`: Database password
  
## 📜 License
This project is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).

## 👥 Authors
- Drix10 - [GitHub Profile](https://github.com/Drix10)
- Spectra.codes - [Spectra.codes](https://spectra.codes)

<p align="center">
  <h1 align="center">🌐 Spectra.Codes</h1>
</p>
<p align="center">
  <em>Why only generate Code? When you can generate the whole Repository!</em>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
  <img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google_&_Microsoft_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</p>