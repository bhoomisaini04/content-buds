# Content Buds

Content Buds is a modern AI-powered content creation website built as part of the Web Developer + AI Intern practical assignment.

The project is designed to feel like a real early-stage creative-tech product rather than a static portfolio page. It combines a polished responsive website with an AI Content Studio that turns a user brief into generated marketing content.

## Features

- Responsive landing page
- About section
- Services section
- Work / portfolio section
- AI-powered Content Studio
- Contact form with backend validation
- Active navigation states
- Mobile navigation menu
- Loading, success, validation, empty, and error states
- Copy and regenerate actions for AI output
- Server-side API routes
- Environment-based AI configuration

## AI Studio

The AI Studio allows users to provide:

- Content brief
- Content type
- Target audience
- Tone
- Optional keywords

The application then sends the request to a secure backend API route.

The backend:

1. Validates the input
2. Builds a structured prompt
3. Sends the prompt to the configured AI model
4. Returns the generated content to the frontend
5. Handles provider failures and empty responses

The generated result can be copied, regenerated, or cleared.

## AI Provider

Local development currently uses:

- Provider: Ollama
- Model: Llama 3.2
- Default model name: `llama3.2`
- Default local endpoint: `http://127.0.0.1:11434`

Ollama runs locally, so no paid API key is required for local development.

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

### AI

- Ollama
- Llama 3.2

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
  | structured prompt
  v
Ollama
  |
  | llama3.2
  v
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
│   └── ...
└── ...
```

## API Endpoints

### `POST /api/generate`

Generates content using the configured Ollama model.

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
- Ollama connection failures
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

Create a `.env.local` file in the project root:

```env
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.2
```

A safe example is included in:

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

### 3. Install Ollama

Install Ollama from the official Ollama distribution for your operating system.

Verify the installation:

```bash
ollama --version
```

### 4. Download the model

```bash
ollama pull llama3.2
```

Check that the model is available:

```bash
ollama list
```

You should see something similar to:

```text
llama3.2:latest
```

### 5. Configure environment variables

Create `.env.local` with:

```env
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.2
```

### 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Validation

The project can be validated with:

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

The Next.js application can be deployed to platforms such as Vercel.

However, the current AI configuration uses a local Ollama server:

```text
http://127.0.0.1:11434
```

A cloud-hosted deployment cannot directly access an Ollama instance running on a developer's local computer.

For a production deployment, the AI backend must therefore use one of the following approaches:

- A remotely hosted Ollama instance
- A cloud-accessible open model endpoint
- A compatible hosted AI provider

The frontend and `/api/generate` architecture are already separated from the model configuration through environment variables, so the AI provider endpoint can be changed without rewriting the frontend.

## Current Limitations

- AI generation currently depends on a locally running Ollama instance during local development.
- Contact submissions are validated by the backend but are not currently persisted to a database or sent through an email provider.
- Authentication and generation history are not implemented because they are outside the core assignment requirements.

## Future Improvements

Possible extensions include:

- AI rewrite / shorten / expand tools
- Tone transformation
- SEO assistant
- Generation history
- User authentication
- Database-backed contact submissions
- Streaming AI responses
- Usage analytics
- Automated tests

## Repository

GitHub:

```text
https://github.com/bhoomisaini04/content-buds
```

## Author

Bhoomi Saini
