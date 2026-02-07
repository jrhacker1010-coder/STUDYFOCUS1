# Study Playlist Web Application

A lightweight, distraction-free study tool built with HTML, CSS, and JavaScript that helps students organize their learning materials with motivational quotes and YouTube video playlists.

## Features

- 🎯 **Motivational Quotes**: Start your study session with inspiring quotes that rotate dynamically
- 📚 **Subject Management**: Add and organize different study subjects (e.g., Operating System, Computer Networks)
- 🎥 **Topic Management**: Add topics under each subject with embedded YouTube videos
- 🎨 **Modern UI/UX**: Clean, responsive design that works on desktop and mobile
- 💾 **Local Storage**: Your data is saved locally and persists across sessions
- 🚀 **Easy Deployment**: Ready for deployment on Vercel, Netlify, or any static hosting

## Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **Start studying!** Add your first subject and topics

## How to Use

### Adding Subjects
1. Click the "Add New Subject" button
2. Enter a subject name (e.g., "Operating System")
3. Choose an icon for visual identification
4. Click "Add Subject"

### Adding Topics
1. Within any subject card, click the + button
2. Enter a topic name (e.g., "Process Management")
3. Paste a YouTube video URL
4. Choose an icon for the topic
5. Click "Add Topic"

### Managing Content
- **Delete Subject**: Click the trash icon in the subject header
- **Delete Topic**: Click the trash icon next to any topic
- **New Quote**: Click "New Quote" to see a different motivational quote

## Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: No frameworks required - pure JS for all functionality
- **Font Awesome**: Beautiful icons for subjects and topics
- **Google Fonts**: Inter font for clean typography

## Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Deployment

### Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `echo "No build needed"`
4. Set publish directory: `.`

### Manual Deployment
Simply upload all files to any static web hosting service.

## File Structure

```
studybasic/
├── index.html          # Main HTML file
├── styles.css          # Complete styling
├── script.js           # All JavaScript functionality
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## Features in Detail

### Motivational Quotes
- 15+ curated motivational quotes
- Automatic rotation with "New Quote" button
- Beautiful typography and styling

### Subject Management
- Dynamic subject creation
- Icon selection for visual organization
- Delete functionality with confirmation
- Clean card-based layout

### Topic Management
- YouTube video embedding
- Automatic video ID extraction
- Responsive video players
- Individual topic deletion

### Data Persistence
- LocalStorage integration
- Automatic save on any change
- Data survives browser restarts
- No backend required

## Future Enhancements

- [ ] Custom quote addition
- [ ] Study session timer
- [ ] Progress tracking
- [ ] Topic completion status
- [ ] Export/import functionality
- [ ] Dark mode toggle
- [ ] Study statistics

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for learning and development.

---

**Happy Studying! 📚✨**
