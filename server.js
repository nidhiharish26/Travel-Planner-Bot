require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

const apiKey = process.env.AZURE_API_KEY;
const resourceName = process.env.AZURE_RESOURCE_NAME;
const deploymentName = process.env.AZURE_DEPLOYMENT_NAME;
const apiVersion = process.env.AZURE_API_VERSION;

const endpoint = `https://${resourceName}.openai.azure.com/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;

app.post("/chat", async (req, res) => {
  const userPrompt = req.body.prompt;

  try {
    const response = await axios.post(
      endpoint,
      {
        messages: [
          {
            role: "system",
            content:
              "You are a helpful travel planner assistant. Always respond in valid JSON.",
          },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 2000,
        temperature: 0.2,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        timeout: 20000,
      }
    );
    const aiResponse = response.data.choices[0].message.content;
    // const structuredJson = JSON.parse(aiResponse);

    // res.json({ reply: response.data.choices[0].message.content });
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res
      .status(500)
      .json({ error: "Something went wrong with the AI request." });
  }
});

app.post("/api/travel", async (req, res) => {
  const { destination, days } = req.body;

  try {
    const userPrompt = `Plan a ${days}-day trip to ${destination}. 
    Respond ONLY in the following JSON format without any extra commentary, code blocks, or markdown:
  {
  "trip": {
    "itinerary": {
      "day_1": {
        "title": "Day 1 Title",
        "activities": [
          { "time": "9:00 AM", "activity": "Visit XYZ" },
          { "time": "2:00 PM", "activity": "Lunch at ABC" }
        ]
      },
      "day_2": {
        "title": "Day 2 Title",
        "activities": [
          { "time": "10:00 AM", "activity": "Explore LMN" }
        ]
      }
    }
  }
}

DO NOT include any code formatting like \`\`\`json or text outside the JSON. 
Just reply with raw JSON.`;

    const response = await axios.post(
      endpoint,
      {
        messages: [
          {
            role: "system",
            content: `You are a helpful travel planner assistant. Only respond in raw JSON format as requested. 
Do not include any explanations, markdown, or code blocks. 
Your output should be strictly JSON and parsable with JSON.parse().`,
          },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 2000,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      }
    );

    const rawReply = response.data.choices[0].message.content;

    // Try to safely parse the reply to check if it's valid JSON
    try {
      const parsed = JSON.parse(rawReply); // Try to parse the raw response
      res.json(parsed);
    } catch (err) {
      console.error("Failed to parse AI response as JSON:", rawReply);
      res
        .status(500)
        .json({ error: "AI response was not valid JSON.", raw: rawReply });
    }
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error generating travel plan" });
  }
});

app.post("/api/prompt", async (req, res) => {
  console.log("HIT", req.body.prompt);
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const azureResponse = await axios.post(
      endpoint, // Use the already defined endpoint here
      {
        messages: [
          {
            role: "system",
            content: `You are a helpful travel planner assistant. 
            If the user gives a vague destination like 'Europe', assume popular cities like Paris, Rome, and Barcelona and other major or high rated tourist places in that region.
            Respond ONLY with raw JSON (no markdown, explanation, or preamble). 
Return an object like this:
{
  "trip": {
    "itinerary": {
      "day_1": [
        {
          "name": "Tokyo Tower Visit",
          "location": "Tokyo Tower",
          "description": "Enjoy the view from the observation deck."
        },
        {
          "name": "Sushi Lunch",
          "location": "Tsukiji Market",
          "description": "Try local sushi delicacies."
        }
      ],
      "day_2": [
        ...
      ]
    }
  }
}
Each day should be a key like "day_1", and its value should be an array of 2-5 activities. Ensure valid JSON.
If the user doesn't mention a city, ask them to specify one. Do not assume or generate a destination.`,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 2000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey, // Use apiKey
        },
      }
    );

    const reply = azureResponse.data.choices[0]?.message?.content;
    res.json({ reply });
  } catch (err) {
    console.error("Error from /api/prompt:", err.message);
    res.status(500).json({ error: "Failed to generate travel plan" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
