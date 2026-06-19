const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

async function generateEventPlan(userPrompt) {

    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const prompt = `
You are an AI Event Planner.

User Request:
${userPrompt}

Create a detailed event plan.

Rules:
- Do not use markdown
- Do not use # or *
- Use plain text only
- Keep the response clear and professional

Include:

Event Overview

Budget Suggestions

Venue Ideas

Food Suggestions

Timeline

Entertainment Ideas
`;

        const result =
            await model.generateContent(prompt);

        return result.response.text();

    } catch (error) {

        console.log("Gemini Error:", error);

        return "Unable to generate event plan.";
    }
}

module.exports = {
    generateEventPlan
};