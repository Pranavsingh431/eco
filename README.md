# EcoAssess AI

An AI-driven web application for sustainability analysis of infrastructure projects. Built with Next.js, Google Gemini AI, and Firebase Genkit.

## 🌟 Features

- **AI-Powered Sustainability Analysis**: Get instant sustainability scores and ratings for your infrastructure projects
- **Smart Recommendations**: Receive actionable suggestions to improve project sustainability
- **Project History**: Track and review all your previous project evaluations
- **Beautiful UI**: Modern, responsive interface built with Tailwind CSS and Radix UI
- **Real-time Analysis**: Fast AI evaluation powered by Google Gemini

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ecoo-main
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:9002](http://localhost:9002) in your browser

## 📦 Deployment on Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ecoo-main)

### Manual Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. **IMPORTANT**: Set up the environment variable in Vercel:
   - Go to your project settings in Vercel Dashboard
   - Navigate to "Settings" → "Environment Variables"
   - Add: `GEMINI_API_KEY` with your actual API key
   - Make sure to select all environments (Production, Preview, Development)

5. Redeploy after setting the environment variable:
```bash
vercel --prod
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server on port 9002
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit development UI
- `npm run genkit:watch` - Start Genkit with file watching

## 🏗️ Project Structure

```
ecoo-main/
├── src/
│   ├── ai/                    # AI/Genkit configuration
│   │   ├── genkit.ts         # Genkit setup
│   │   ├── dev.ts            # Development entry point
│   │   └── flows/            # AI flows
│   │       ├── evaluate-project-sustainability.ts
│   │       └── suggest-sustainability-improvements.ts
│   ├── app/                  # Next.js app directory
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── header.tsx
│   │   ├── project-form.tsx
│   │   ├── project-history.tsx
│   │   ├── sustainability-report.tsx
│   │   └── ui/              # Shadcn UI components
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions and types
├── public/                  # Static assets
├── .env.example            # Environment variables template
├── .env.local             # Local environment variables (gitignored)
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

### Gemini Model

The app uses `gemini-2.0-flash-exp` by default. You can change this in `src/ai/genkit.ts`:

```typescript
export const ai = genkit({
  // ...
  model: 'googleai/gemini-2.0-flash-exp', // Change this
  // ...
});
```

Available models:
- `googleai/gemini-2.0-flash-exp` - Fast, experimental
- `googleai/gemini-1.5-pro` - More capable, slower
- `googleai/gemini-1.5-flash` - Balanced

## 🎨 Customization

### Theming

The app uses Tailwind CSS with custom color schemes. Edit `src/app/globals.css` to customize colors:

```css
:root {
  --primary: 122 39% 49%;    /* Primary color (green) */
  --accent: 16 15% 57%;      /* Accent color */
  /* ... other colors */
}
```

### Fonts

The app uses:
- **Body**: PT Sans
- **Headlines**: Playfair Display

Change fonts in `src/app/layout.tsx` and `tailwind.config.ts`.

## 🐛 Troubleshooting

### API Key Issues

If you get API errors:
1. Verify your API key is correct in `.env.local`
2. Check that the API key has billing enabled (if required)
3. Ensure the API key has Gemini API access enabled

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Port Already in Use

If port 9002 is busy, change it in `package.json`:
```json
{
  "scripts": {
    "dev": "next dev --turbopack -p 3000"
  }
}
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js, Google Gemini AI, and Firebase Genkit
