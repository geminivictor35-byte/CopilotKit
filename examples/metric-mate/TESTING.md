# Testing MetricMate Locally

This guide provides step-by-step instructions to set up, run, and verify the **MetricMate** application on your local machine.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **Package Manager**: `pnpm`, `npm`, or `yarn`. (This guide uses `pnpm`).
- **OpenAI API Key**: You need a valid API key from [OpenAI Platform](https://platform.openai.com/).
- **Tavily API Key** (Optional): For the internet search feature, get a key from [Tavily](https://tavily.com/).

## 1. Installation

Navigate to the project directory:

```bash
cd examples/metric-mate
```

Install the dependencies:

```bash
pnpm install
```

## 2. Environment Setup

Create a `.env` file in the root of the `examples/metric-mate` directory:

```bash
touch .env
```

Add your API keys to the `.env` file:

```env
OPENAI_API_KEY=sk-proj-your-openai-api-key-here
TAVILY_API_KEY=tvly-your-tavily-api-key-here
```

## 3. Running the Application

Start the development server:

```bash
pnpm dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## 4. Test Scenarios

Once the application is running, you can test the following features to ensure everything is working correctly.

### Scenario A: Data Interaction (CopilotReadable)
The Copilot has access to the marketing data displayed on the dashboard.

1.  **Open the Chat Sidebar**: Click the chat icon or "Open Copilot" button if available.
2.  **Ask Questions**:
    *   "What is the total ad spend for this client?"
    *   "Which campaign has the highest ROAS?"
    *   "Compare the CPC between Google Ads and Facebook Ads."
    *   "Why is the ROAS for 'TechFlow SaaS' so low?" (The AI should infer from the data).

**Expected Outcome**: The AI should respond with accurate numbers that match what is displayed on the dashboard (e.g., "$4,500 spend for Q1 Lead Gen").

### Scenario B: Action Execution (CopilotAction)
The Copilot can perform actions like generating reports.

1.  **Prompt**: "Generate a weekly summary report for this client. Make it professional."
2.  **Prompt**: "Write an exciting email to the client updating them on the 'Summer Sale' campaign."

**Expected Outcome**: The AI should generate a structured text response or email draft summarizing the key metrics (Spend, Revenue, Conversions) with the requested tone.

### Scenario C: Client Switching
1.  **Action**: Use the dropdown menu in the top right to switch between "TechFlow SaaS" and "Urban Kicks".
2.  **Observation**: The charts and metrics update.
3.  **Prompt**: "What is the top performing campaign now?"

**Expected Outcome**: The AI should context-switch and answer based on the *currently selected* client's data.

### Scenario D: Internet Search (Optional)
If you provided a Tavily API key:

1.  **Prompt**: "Search for the latest trends in B2B SaaS marketing for 2024."
2.  **Observation**: The AI should trigger the `searchInternet` tool.

**Expected Outcome**: The AI should return a summary of search results relevant to the query.

## Troubleshooting

- **"OpenAI API Key missing"**: Ensure your `.env` file is named correctly and is in the `examples/metric-mate` folder, not the root of the monorepo. Restart the dev server after editing `.env`.
- **Build Errors**: If `pnpm build` fails, try deleting `.next` and `node_modules` and re-running `pnpm install`.
