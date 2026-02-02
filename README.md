# ONE MORE MOVE - Strategic Puzzle Game

A minimalist strategy puzzle game about making perfect decisions. Every move matters. Can you find the optimal path?

## 🎮 Game Features

- **Three Difficulty Levels**: Easy (30 winning patterns), Medium (20 patterns), Hard (5 patterns)
- **Strategic Gameplay**: Navigate a 5×5 grid with exactly 10 moves
- **Score Optimization**: Find the perfect path to maximize your score
- **Post-Game Analysis**: See the optimal score and identify your critical mistakes
- **Replay Function**: Replay from the move before your biggest mistake
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Keyboard Support**: Use arrow keys or WASD for movement

## 📁 File Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styling
├── game.js             # Game logic and mechanics
└── README.md           # This file
```

## 🚀 How to Deploy

### Option 1: Simple Hosting (GitHub Pages, Netlify, Vercel)

1. Upload all files to your hosting service
2. Set `index.html` as the entry point
3. Your game is live!

### Option 2: Traditional Web Server

1. Upload all files to your web server via FTP
2. Make sure all files are in the same directory
3. Access via your domain: `yourdomain.com/index.html`

### Option 3: Local Testing

1. Open `index.html` directly in any web browser
2. No server needed for testing!

## 🎯 How to Play

1. **Select Difficulty**: Choose Easy, Medium, or Hard
2. **Starting Position**: You begin in the center of a 5×5 grid with 100 points
3. **Make Moves**: Use arrow buttons or keyboard (↑↓←→ or WASD) to move
4. **Collect Points**: Each tile has a value (positive or negative) that adds to your score
5. **Limited Moves**: You have exactly 10 moves to maximize your score
6. **Game End**: After 10 moves, see how you did vs. the optimal path
7. **Replay**: Learn from mistakes and replay from before your worst move!

## 🎨 Customization

### Changing Colors

Edit `styles.css` and modify the CSS variables in the `:root` section:

```css
:root {
    --bg-main: #0f172a;           /* Main background */
    --primary-blue: #3b82f6;      /* Primary accent color */
    --accent-green: #10b981;      /* Success color */
    --accent-red: #ef4444;        /* Error color */
    /* ... more colors ... */
}
```

### Adjusting Difficulty

Edit `game.js` and modify the `DIFFICULTY_SETTINGS` object:

```javascript
const DIFFICULTY_SETTINGS = {
    easy: {
        targetWinPaths: 30,    // Number of optimal paths
        positiveRatio: 0.65,   // Percentage of positive tiles
        minValue: -30,         // Minimum negative value
        maxValue: 45           // Maximum positive value
    },
    // ... medium and hard ...
};
```

## 🔧 Technical Details

- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Mobile First**: Responsive design using CSS clamp() and flexbox/grid
- **Smooth Animations**: CSS animations for better UX
- **Seeded Random**: Consistent grid generation for replays
- **Optimal Path Algorithm**: Recursive pathfinding to calculate best score

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This game is open source. Feel free to modify and use for your projects!

## 🎯 SEO Optimization Tips

1. Add meta tags to `index.html`:
```html
<meta name="keywords" content="puzzle game, strategy game, brain game, one more move">
<meta property="og:title" content="ONE MORE MOVE - Strategic Puzzle Game">
<meta property="og:description" content="A minimalist strategy game about perfect decisions">
```

2. Consider adding Google Analytics for tracking
3. Submit your sitemap to Google Search Console
4. Share on social media with the built-in share feature

## 🤝 Contributing

Found a bug? Have a feature suggestion? Feel free to improve the game!

## 📞 Support

For issues or questions, create an issue in your repository or contact your support email.

---

**Enjoy the game and challenge yourself to find the perfect path!** 🎮