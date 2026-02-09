💬 WhatsApp Chat Sentiment Analyzer
Python Streamlit Plotly AI

A powerful, AI-enhanced WhatsApp chat analyzer built with Streamlit

🚀 Live Demo · Report Bug · Request Feature

✨ Features
📊 Comprehensive Analytics Dashboard
Quick Stats - Total messages, words, media shared, and links at a glance
User-wise Analysis - Filter analytics by individual participants
Interactive Charts - Beautiful Plotly visualizations
💭 AI-Powered Sentiment Analysis
Real-time sentiment classification (Positive/Neutral/Negative)
Per-user sentiment breakdown
Sentiment distribution visualizations
Powered by TextBlob NLP
🤖 Integrated AI Chat Assistant
Ask questions about your chat in natural language
Powered by Groq Llama 3.3 70B - blazing fast AI responses
Botpress webchat integration for conversational experience
Context-aware responses using your actual chat data
😀 Emoji Analytics
Top emojis used across the conversation
Per-user emoji preferences
Emoji frequency charts and statistics
⏰ Activity Pattern Analysis
24-Hour Activity - See when conversations peak
Weekly Heatmap - Visualize chat patterns across days and hours
Response Time Analysis - Average response times per user
Night Owl Detection - Find out who's chatting late at night (12 AM - 5 AM)
Monthly Trends - Track conversation volume over time
🔍 Deep Dive Analytics
Word Clouds - Visual representation of most used words
Common Words - Top 20 most frequently used words
Chat Streaks - Longest consecutive days of chatting
First Message Analysis - Who initiates conversations most
🌙 Beautiful Dark Theme
Eye-friendly dark mode interface
Gradient accents and modern UI design
Responsive layout for all screen sizes
🚀 Quick Start
Prerequisites
Python 3.9 or higher
pip (Python package manager)
Installation
Clone the repository

git clone https://github.com/sagararnav07/Whatsapp_chat_sentiment_analysis.git
cd Whatsapp_chat_sentiment_analysis
Create a virtual environment (recommended)

python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
Install dependencies

pip install -r requirements.txt
Set up secrets (for AI features)

mkdir -p .streamlit
cat > .streamlit/secrets.toml << EOF
GROQ_API_KEY = "your-groq-api-key"
BOTPRESS_PAT = "your-botpress-pat"
BOTPRESS_BOT_ID = "your-bot-id"
BOTPRESS_KB_ID = "your-kb-id"
EOF
Run the app

streamlit run app.py
Open your browser Navigate to http://localhost:8501

📱 How to Export WhatsApp Chats
Android
Open the WhatsApp chat you want to analyze
Tap ⋮ (three dots) → More → Export chat
Select Without media (recommended for faster processing)
Save or share the .txt file
iPhone
Open the WhatsApp chat
Tap the contact/group name at the top
Scroll down and tap Export Chat
Select Without Media
Save the .txt file
🛠️ Tech Stack
Technology	Purpose
Streamlit	Web application framework
Pandas	Data manipulation and analysis
Plotly	Interactive visualizations
Matplotlib	Static charts and word clouds
TextBlob	Sentiment analysis NLP
Groq API	AI chat (Llama 3.3 70B)
Botpress	Conversational AI webchat
WordCloud	Visual word frequency display
📁 Project Structure
Whatsapp_chat_sentiment_analysis/
├── app.py                 # Main Streamlit application
├── preprocessor.py        # WhatsApp chat parsing logic
├── helper.py              # Analysis helper functions
├── requirements.txt       # Python dependencies
├── Procfile              # Heroku deployment config
├── setup.sh              # Server setup script
├── stop_hinglish.txt     # Custom stopwords for Hindi/English
├── .streamlit/
│   └── secrets.toml      # API keys (not in repo)
└── README.md             # This file
🔑 API Keys Setup
Groq API (for AI Chat)
Go to console.groq.com
Create an account and generate an API key
Add to .streamlit/secrets.toml:
GROQ_API_KEY = "gsk_..."
Botpress (for Webchat - Optional)
Create a bot at botpress.cloud
Get your credentials from the dashboard
Add to .streamlit/secrets.toml:
BOTPRESS_PAT = "bp_pat_..."
BOTPRESS_BOT_ID = "your-bot-id"
BOTPRESS_KB_ID = "your-kb-id"
🌐 Deployment
Streamlit Cloud (Recommended)
Push your code to GitHub
Go to share.streamlit.io
Connect your repository
Add secrets in the dashboard
Deploy!
Heroku
heroku create your-app-name
git push heroku main
heroku config:set GROQ_API_KEY=your-key
📊 Sample Analytics
📈 Click to see sample outputs
🤝 Contributing
Contributions are welcome! Here's how you can help:

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Streamlit - For the amazing framework
Groq - For lightning-fast AI inference
Botpress - For conversational AI platform
Plotly - For beautiful interactive charts
Made with ❤️ by Arnav Sagar

⭐ Star this repo if you found it helpful!

About
Webchat Analyzer that can analyze and tell about your whatsapp chats

webchatanalyzer.streamlit.app/
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 1 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Languages
Python
99.1%
 
Other
0.9%
Suggested workflows
Based on your tech stack
SLSA Generic generator logo
SLSA Generic generator
Generate SLSA3 provenance for your existing release workflows
Publish Python Package logo
Publish Python Package
Publish a Python Package to PyPI on release.
Python package logo
Python package
Create and test a Python package on multiple Python versions.
More workflows
Footer
© 2026 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status