# PersonaChatbot

A conversational AI chatbot that mimics the personas of Hitesh Choudhary and Piyush Garg, created using Node.js, Express, and modern web technologies.



## Features

- Chat with AI personas of Hitesh Choudhary and Piyush Garg
- Real-time conversation interface
- Built with modern JavaScript (ES6+)
- Responsive web interface
- Easy to deploy and customize

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React, Vite
- **AI**: Google Generative AI, OpenAI
- **Build Tools**: Babel, Webpack
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Google Generative AI API Key
- OpenAI API Key (if using OpenAI integration)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/PersonaChatbot.git
   cd PersonaChatbot
   ```

2. Install dependencies:
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. Create a `.env` file in the root directory and add your API keys:
   ```
   GOOGLE_GENAI_API_KEY=your_google_genai_api_key
   OPENAI_API_KEY=your_openai_api_key
   PORT=3001
   ```

## Development

### Backend

Start the development server:
```bash
npm run dev
```

### Frontend

Start the frontend development server:
```bash
cd frontend
npm run dev
```

### Building for Production

1. Build the backend:
   ```bash
   npm run build
   ```

2. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

3. Start the production server:
   ```bash
   npm start
   ```

## Project Structure

```
PersonaChatbot/
├── frontend/           # React frontend
├── src/                # Backend source code
│   ├── controllers/    # Request handlers
│   ├── routes/         # API routes
│   └── index.js        # Main server file
├── .babelrc           # Babel configuration
├── package.json       # Backend dependencies
└── README.md          # This file
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Port to run the server on | No (default: 3001) |
| `GOOGLE_GENAI_API_KEY` | Google Generative AI API key | Yes |
| `OPENAI_API_KEY` | OpenAI API key | No (if not using OpenAI features) |

## Deployment

### Netlify

1. Push your code to a GitHub repository
2. Connect the repository to Netlify
3. Set up the following build settings:
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
4. Add your environment variables in the Netlify dashboard

### Vercel

1. Import your GitHub repository to Vercel
2. Set up the build command: `npm run build`
3. Set the output directory: `frontend/dist`
4. Add your environment variables

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Hitesh Choudhary](https://hiteshchoudhary.com/)
- [Piyush Garg](https://twitter.com/piyushgarg_dev)
- [Google Generative AI](https://ai.google/)
- [OpenAI](https://openai.com/)
