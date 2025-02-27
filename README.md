# iPad Galleries Prototype

This prototype demonstrates responsive lightbox galleries optimized for various iPad models (Mini, Air, and Pro).

## Features

- Responsive layouts for different iPad viewport sizes:
  - iPad Mini (768 × 1024)
  - iPad Air (820 × 1180)
  - Standard iPad (834 × 1194)
  - iPad Pro (1024 × 1366)
- Two lightbox components:
  - Basic Lightbox (`/` route)
  - Full Gallery Lightbox with navigation and social sharing (`/full` route)
- Dynamic ad placement that adjusts position based on device size
- Client-side rendering to prevent hydration errors
- Responsive image sizing and spacing

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ipad-galleries
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser to:
   - Basic Lightbox: http://localhost:3000
   - Full Gallery: http://localhost:3000/full

## Testing Different iPad Viewports

You can test the responsive behavior by setting your browser's device emulation to:

| Device | Dimensions |
|--------|------------|
| iPad Mini | 768 × 1024 |
| iPad Air | 820 × 1180 |
| Standard iPad | 834 × 1194 |
| iPad Pro | 1024 × 1366 |

## Implementation Details

### Responsive Design Approach

The components use a combination of:
- Viewport height detection via React hooks
- Conditional Tailwind classes based on viewport size
- Dynamic sizing for container, images, and ad placement

### Key Components

- `Lightbox.tsx`: Basic lightbox with responsive ad placement
- `LightboxFull.tsx`: Full gallery with navigation and social sharing

### Ad Placement

Ad placement is responsive and adjusts based on the device:
- iPad Mini: bottom-[50px]
- iPad Air: bottom-[370px]
- iPad Pro: bottom-[350px]

## Sharing the Prototype

As a product manager, here are several ways to share this prototype with your engineering team:

### Option 1: GitHub Repository

1. Create a new GitHub repository
2. Push your local project to the repository:
```bash
git init
git add .
git commit -m "Initial commit of iPad Galleries prototype"
git remote add origin [your-github-repo-url]
git push -u origin main
```
3. Share the repository URL with your team

### Option 2: Deploy to Vercel (Easiest)

1. Create a free account on [Vercel](https://vercel.com)
2. Install the Vercel CLI:
```bash
npm install -g vercel
```
3. Deploy from your project directory:
```bash
vercel
```
4. Follow the prompts (you can use all defaults)
5. Share the generated URL with your team (e.g., https://ipad-galleries.vercel.app)

### Option 3: Deploy to Netlify

1. Create a free account on [Netlify](https://netlify.com)
2. Install the Netlify CLI:
```bash
npm install -g netlify-cli
```
3. Deploy from your project directory:
```bash
netlify deploy
```
4. For production deployment:
```bash
netlify deploy --prod
```
5. Share the generated URL with your team

### Option 4: Create a ZIP Archive

1. Create a ZIP file of your project:
```bash
# On macOS/Linux
zip -r ipad-galleries.zip ipad-galleries -x "ipad-galleries/node_modules/*" -x "ipad-galleries/.next/*"

# On Windows (PowerShell)
Compress-Archive -Path ipad-galleries -DestinationPath ipad-galleries.zip -Force
```
2. Share the ZIP file via email, Slack, or a file-sharing service

### Option 5: Create a Video Demo

1. Record a video demonstration using screen recording software
2. Show the prototype on different iPad viewport sizes
3. Explain the key features and responsive behavior
4. Share the video along with the code via any of the methods above

### Option 6: Host a Live Demo Session

1. Schedule a meeting with your engineering team
2. Share your screen and demonstrate the prototype
3. Provide access to the code via any of the methods above
4. Answer questions and gather feedback in real-time
