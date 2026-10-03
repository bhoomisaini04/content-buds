# Content Buds

Content Buds is a modern AI-powered content creation website built as part of the Web Developer + AI Intern practical assignment.

The project is designed to feel like a real early-stage creative-tech product rather than a static portfolio page. It combines a polished, responsive website with an AI Content Studio that turns a user brief into generated marketing content.

## Live Demo

Production deployment:

https://content-buds.vercel.app

## Features

- Responsive landing page
- About section
- Services section
- Work / portfolio section
- AI-powered Content Studio
- Real AI-generated content
- Contact form with backend validation
- Active navigation states
- Mobile navigation menu
- Loading, success, validation, empty, and error states
- Copy and regenerate actions for AI output
- Server-side API routes
- Environment-based AI provider configuration
- Production deployment on Vercel

## AI Studio

The AI Studio allows users to provide:

- Content brief
- Content type
- Target audience
- Tone
- Optional keywords

The application sends the request to a secure server-side API route.

The backend:

1. Validates the input
2. Builds a structured prompt
3. Sends the prompt to the configured AI provider
4. Returns the generated content to the frontend
5. Handles provider failures and empty responses

The generated result can be copied, regenerated, or cleared.

## AI Providers

Content Buds supports environment-based AI provider configuration.

### Production

The deployed application uses:

- Provider: Groq
- Model: `openai/gpt-oss-120b`
- Deployment: Vercel
- API key stored securely as a Vercel environment variable

The Groq API key is used only by the server-side `/api/generate` route and is never exposed to the browser.

### Local Development

Local development can use Ollama:

- Provider: Ollama
- Model: Llama 3.2
- Default model name: `llama3.2`
- Default endpoint: `http://127.0.0.1:11434`

This allows the application to be developed locally without requiring a paid API key.

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

- Next.js App Router API routes
- Server-side input validation
- REST-style JSON endpoints
- Environment-based provider selection

### AI

- Groq API
- `openai/gpt-oss-120b` for production
- Ollama
- Llama 3.2 for local development

### Deployment

- Vercel

### Tooling

- ESLint
- Git
- GitHub
- npm

## Architecture

```text
                         User
                           |
                           v
                    Next.js Frontend
                           |
                           | POST /api/generate
                           v
                    Next.js API Route
                           |
                           | validate input
                           | build structured prompt
                           v
                  AI Provider Selection
                    /             \
                   /               \
                  v                 v
          Groq (Production)    Ollama (Local)
                  |                 |
                  v                 v
       openai/gpt-oss-120b       llama3.2
                   \               /
                    \             /
                     v           v
                    Generated Content
                           |
                           v
                  Frontend Result Card
```

The contact flow follows a similar server-side pattern:

```text
Contact Form
  |
  | POST /api/contact
  v
Next.js API Route
  |
  | validate name, email, message
  v
Success / Error Response
```

## Project Structure

```text
content-buds/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts
│   │   └── generate/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   └── Work.tsx
│   ├── studio/
│   └── ui/
├── data/
├── lib/
├── public/
├── types/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

### `POST /api/generate`

Generates content using the configured AI provider.

Example request:

```json
{
  "brief": "Create a LinkedIn post announcing a new AI productivity tool.",
  "contentType": "Social Media Post",
  "audience": "Startup founders",
  "tone": "Professional",
  "keywords": "AI, productivity, automation"
}
```

Example success response:

```json
{
  "content": "Generated content..."
}
```

The endpoint validates required fields and handles:

- Invalid input
- AI provider connection failures
- Empty AI responses
- Unexpected backend errors

### `POST /api/contact`

Validates contact form submissions.

Expected input:

```json
{
  "name": "Bhoomi Saini",
  "email": "bhoomi@example.com",
  "message": "I would like help creating a content strategy for my brand."
}
```

The endpoint validates:

- Required fields
- Email format
- Minimum message length

## Environment Variables

The application uses environment variables so AI credentials and provider configuration remain outside the source code.

### Production

The Vercel production deployment uses:

```env
AI_PROVIDER=groq
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-120b
```

`GROQ_API_KEY` must be stored as a secret and should never be committed to Git.

### Local Ollama

For local development with Ollama:

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.2
```

A safe environment example is included in:

```text
.env.example
```

No private API keys or credentials are committed to the repository.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/bhoomisaini04/content-buds.git
cd content-buds
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the AI provider

The application can run locally using Ollama.

Install Ollama and verify the installation:

```bash
ollama --version
```

Download Llama 3.2:

```bash
ollama pull llama3.2
```

Check that the model is available:

```bash
ollama list
```

### 4. Configure environment variables

Create `.env.local`:

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.2
```

Alternatively, Groq can be used locally by configuring:

```env
AI_PROVIDER=groq
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-120b
```

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Validation

Run:

```bash
npm run lint
```

and:

```bash
npm run build
```

Both commands should complete successfully before deployment or submission.

## Responsive Design

The application is designed to work across:

- Mobile
- Tablet
- Desktop

The navigation switches to a hamburger menu on smaller screens, and form layouts stack vertically when required.

## Accessibility

The project includes:

- Semantic HTML
- Form labels
- Keyboard-accessible controls
- ARIA attributes for navigation states
- Readable color contrast
- Clear loading and error states

## Deployment

The application is deployed on Vercel:

https://content-buds.vercel.app

Production AI generation uses Groq rather than a locally running Ollama instance.

The production environment is configured with:

```env
AI_PROVIDER=groq
GROQ_MODEL=openai/gpt-oss-120b
```

The Groq API key is securely configured in Vercel and is not committed to the repository.

The application uses the same `/api/generate` interface regardless of the configured AI provider, allowing the frontend to remain provider-independent.

## Current Limitations

- Contact submissions are validated by the backend but are not currently persisted to a database or sent through an email provider.
- Authentication is not implemented.
- AI generation history is not persisted.
- Ollama requires a locally running Ollama instance when selected for local development.

These features are outside the core requirements of the practical assignment.

## Future Improvements

Possible extensions include:

- AI rewrite / shorten / expand tools
- Tone transformation
- SEO assistant
- Generation history
- User authentication
- Database-backed contact submissions
- Email integration
- Streaming AI responses
- Usage analytics
- Automated tests

## Repository

GitHub:

https://github.com/bhoomisaini04/content-buds

## Live Application

https://content-buds.vercel.app

## Author

Bhoomi Saini
