# AI Travel Planner ✈️

This is an AI-powered Travel Planner web app that allows users to generate personalized travel itineraries using OpenAI. It supports two modes:

- **Structured Mode** – Plan trips based on number of days and specific cities.
- **Prompt Mode** – Plan trips using a natural language travel prompt.

Built using React for the frontend and Node.js with Express for the backend, and integrated with **Azure OpenAI API** for intelligent itinerary generation.

---

## Features

- Supports both natural language input and structured planning
- Dynamic UI with pastel yellow theme (fully responsive)
- Displays one day per card using clean formatting
- Handles vague prompts with friendly error messages
- Fully integrated with Azure OpenAI (via GPT-4o)
- JSON-based output parsing with error handling

---

## Project Structure

```
/AZURE
├── frontend/
│   ├── public/
│   └── src/
│       ├── pages/
│       │   ├── promptPlanner.js         # Prompt-based planner component
│       │   └── travelPlanner.js         # Structured planner component
│       ├── App.js                       # Route toggler between modes
│       ├── App.css
│       ├── index.js
│       └── index.css                    # Tailwind + custom styles
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── server.js                            # Express backend server
├── .env                                 # Azure API config
├── package.json                         # Root-level server dependencies
└── README.md
```

---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **AI Integration:** Azure OpenAI (GPT-4o)
- **Styling:** Pastel yellow theme, centered layout, Tailwind utilities

---

## Environment Variables

In the project root (`.env` file):

```env
AZURE_API_KEY=your_azure_openai_key
AZURE_RESOURCE_NAME=your_resource_name
AZURE_DEPLOYMENT_NAME=gpt-4o
AZURE_API_VERSION=2024-12-01-preview
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/travel planner bot.git
cd travel planner bot
```

### 2. Install Frontend

```bash
cd frontend
npm install
```

### 3. Install Backend

```bash
cd ..
npm install
```

### 4. Start Backend

```bash
node server.js
```

Runs on `http://localhost:3000`

### 5. Start Frontend

```bash
cd frontend
npm start
```

Runs on `http://localhost:3001`

---

## API Endpoints

### POST `/api/travel` (Structured Mode)

**Request:**
```json
{
  "days": 5,
  "cities": ["Paris", "Rome"]
}
```

**Response:**
```json
{
  "trip": {
    "itinerary": {
      "day_1": "...",
      "day_2": "..."
    }
  }
}
```

---

### POST `/api/prompt` (Prompt Mode)

**Request:**
```json
{
  "prompt": "Plan a 4-day trip to Goa with food, beaches and nightlife"
}
```

**Response:**
```json
{
  "trip": {
    "itinerary": {
      "day_1": "...",
      "day_2": "..."
    }
  }
}
```

If the prompt is vague (e.g., just "Europe"), you'll receive:
```json
{
  "error": "Please specify a city or cities in Europe..."
}
```

This is displayed to the user in the frontend.

---

## Usage Notes

- Prompt mode requires city names for best results.
- Both modes return a clean `trip.itinerary` object.
- Uses GPT-4o via Azure's hosted endpoint.
- Responsive layout with centered headings and buttons.
- Cards dynamically render per day of plan.

---

## Future Enhancements

- Save/download trip plans
- Add auth + user profiles
- Export to PDF
- View trips on map
- Hotel/restaurant recommendations via APIs

---

## License

This project is open-source under the [MIT License](LICENSE).

