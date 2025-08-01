# AI Travel Planner ✈️

This is an AI-powered Travel Planner web app that allows users to generate personalized travel itineraries using OpenAI. It supports two modes:

- **Structured Mode** – Plan trips based on number of days and specific cities.
- **Prompt Mode** – Plan trips using a natural language travel prompt.

Built using React for the frontend and Node.js with Express for the backend, and integrated with **Azure OpenAI API** for intelligent itinerary generation.

---

## Features

- Structured mode with day/city input
- Prompt mode with free-form travel text
- Center-aligned, responsive UI with a pastel yellow theme
- Travel plan displayed in formatted cards (one per day)
- Error handling for vague inputs
- Loading indicator for smoother UX
- Uses Azure OpenAI GPT model (`gpt-4o`)
- Backend returns clean JSON structure
- Toggle between Structured and Prompt modes

---

## Getting Started

### Prerequisites

- Node.js and npm
- Azure OpenAI access (API key + deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ai-travel-planner.git
   cd ai-travel-planner
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd server
   npm install

   cd ../client
   npm install
   ```

3. Create `.env` file in the `/server` folder with the following values:

   ```env
   AZURE_API_KEY=your_azure_openai_api_key
   AZURE_RESOURCE_NAME=your_resource_name
   AZURE_DEPLOYMENT_NAME=gpt-4o
   AZURE_API_VERSION=2024-12-01-preview
   ```

4. Start the backend:

   ```bash
   cd server
   node server.js
   ```

5. Start the frontend:

   ```bash
   cd ../client
   npm start
   ```

The app will run at `http://localhost:3000` and connect to the backend on `http://localhost:5000`.

---

## API Routes

### POST `/api/travel` (Structured Mode)
**Body:**
```json
{
  "days": 7,
  "cities": ["Paris", "Rome"]
}
```

### POST `/api/prompt` (Prompt Mode)
**Body:**
```json
{
  "prompt": "Plan a 5-day trip to Goa with adventure and food"
}
```

Both routes return a structured JSON with `trip.itinerary.day_1`, `day_2`, etc.

---

## Tech Stack

- React + Tailwind CSS
- Node.js + Express
- Axios for API calls
- Azure OpenAI GPT-4o API
- dotenv for environment variables

---

## Notes

- Prompt mode requires specific city mentions for best results.
- Vague prompts like "Europe" will return error messages handled by the UI.
- Backend includes basic error handling for OpenAI failures.

---

## Future Enhancements 

- Add export to PDF or download itinerary
- Save and manage travel plans with login
- Multi-language support
- Location-based activity suggestions

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---
