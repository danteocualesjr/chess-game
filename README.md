# Chess Game with AI Opponent

A beautiful, modern chess game where you can play against an AI opponent powered by OpenAI's language models. Adjust the difficulty level and enable teaching mode to learn chess strategies.

## Features

- 🎮 **Play Against AI**: Challenge yourself against an AI opponent with adjustable difficulty levels
- 🎓 **Teaching Mode**: Get explanations for AI moves to improve your chess skills
- 🎨 **Premium UI**: Beautiful, modern interface with smooth animations
- 📊 **Move History**: Track all moves made during the game
- ⚡ **Real-time Feedback**: Visual indicators for valid moves, checks, and game status

## Difficulty Levels

- **Beginner**: Simple moves, perfect for learning the basics
- **Intermediate**: Balanced play with tactical awareness
- **Advanced**: Strong play with deep calculation

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chess-game
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## How to Play

1. **Select Difficulty**: Choose your preferred difficulty level (Beginner, Intermediate, or Advanced)
2. **Toggle Teaching Mode**: Enable teaching mode to get explanations for AI moves
3. **Make Moves**: Click on a piece to select it, then click on a highlighted square to move
4. **Drag and Drop**: Alternatively, drag pieces to move them
5. **New Game**: Click "New Game" to start a fresh game

## Project Structure

```
chess-game/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API and game engine services
│   ├── styles/         # Global styles and theme
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Chess.js** - Chess game logic
- **OpenAI API** - AI opponent

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT

# chess-game
