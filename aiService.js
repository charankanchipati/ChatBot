const {GoogleGenerativeAI}=require("@google/generative-ai");


const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);



async function chatWithAI(history){


try{


const model =
genAI.getGenerativeModel({

model:"gemini-2.5-flash"

});




let conversation="";



history.forEach(msg=>{


conversation += `

${msg.role}:

${msg.text}

`;

});





const prompt = `


You are an AI Event Planner chatbot.


Conversation:

${conversation}



Rules:


1. Talk like a friendly human event planner.


2. Remember previous messages.


3. Do not repeat questions already answered.


4. If user says hi/hello:

Greet them and introduce yourself.


5. If user wants an event:

Understand the event.

Ask only missing details.


Need details:

Event type

Date

Guests

Budget

Location



6. When enough information is available:

Create complete event plan.


Include:

Event Overview

Budget Breakdown

Venue Suggestions

Food Suggestions

Decoration Ideas

Timeline

Entertainment Ideas



7. If user asks unrelated questions:

Reply:

"I am an AI Event Planner. Please ask questions related to event planning."



8. Do not use:

#

*

markdown



Answer naturally.


Create a professional event plan.


IMPORTANT RULES:

- Give answers only in bullet points.
- Do not write paragraphs.
- Separate every category clearly.
- Use simple human friendly language.
- Do not use markdown symbols like # or *.
- Use headings with :


Format exactly:


Event Overview:

•


Budget Suggestions:

•


Venue Ideas:

•


Food Suggestions:

•


Decoration Ideas:

•


Timeline:

•


Entertainment Ideas:

•


Additional Tips:

•


`;





const result =
await model.generateContent(prompt);



return result.response.text();



}


catch(error){


console.log(
"Gemini Error:",
error.message
);



return "AI service unavailable";


}



}



module.exports={

chatWithAI

};
// const { GoogleGenerativeAI } = require("@google/generative-ai");


// const genAI =
// new GoogleGenerativeAI(
// process.env.GEMINI_API_KEY
// );



// async function generateEventPlan(history){


// try{


// const model =
// genAI.getGenerativeModel({

// model:"gemini-1.5
// -flash"

// });



// let chat = "";


// history.forEach(message=>{


// chat += `

// ${message.role}:
// ${message.text}

// `;

// });



// const prompt = `


// You are an AI Event Planner chatbot.


// Conversation:

// ${chat}



// Your job:


// 1. Talk naturally like a human event planner.


// 2. If user only says:
// hi, hello, hey

// Reply:

// "Hello 👋 Welcome to AI Event Planner.
// How can I help you plan your event?"


// 3. If user mentions an event:

// Understand it.

// If details are missing ask only the missing details.

// Ask naturally:

// Date
// Guests
// Budget
// Location


// 4. When enough information is available:

// Generate complete event plan.


// Include:

// Event Overview

// Budget Suggestions

// Venue Ideas

// Food Suggestions

// Timeline

// Entertainment Ideas



// 5. If user asks unrelated questions:

// Reply:

// "I am an AI Event Planner. Please ask questions related to event planning."



// Rules:

// Remember previous messages.

// Do not repeat questions already answered.

// Do not use markdown.

// Do not use #.

// Do not use *.



// `;



// const result =
// await model.generateContent(prompt);



// return result.response.text();



// }


// catch(error){


// console.log(
// "Gemini Error:",
// error
// );


// return "AI service unavailable";

// }



// }



// module.exports={

// generateEventPlan

// };
// const { GoogleGenerativeAI } = require("@google/generative-ai");


// const genAI = new GoogleGenerativeAI(
//     process.env.GEMINI_API_KEY
// );



// async function generateEventPlan(userPrompt) {

//     try {


//         const model =
//         genAI.getGenerativeModel({

//             model:"gemini-2.5-flash"

//         });



// const prompt = `

// You are a professional AI Event Planner.

// Your role is ONLY event planning.

// You can help with:

// - Weddings
// - Birthday Parties
// - Corporate Events
// - Conferences
// - Engagements
// - Festivals
// - Team Outings
// - Family Gatherings

// If the user asks anything unrelated to event planning, reply:

// "I am an AI Event Planner. Please ask questions related to event planning."

// User Message:
// ${userPrompt}

// Provide a professional response.

// Do not use markdown.

// Do not use # or *.

// Use plain text.

// `;


//         const result =
//         await model.generateContent(prompt);



//         const response =
//         result.response.text();



//         return response;



//     }
//     catch(error){


//         console.log(
//             "Gemini Error:",
//             error.message
//         );


//         return `
// AI Event Planner is temporarily unavailable.

// Please try again after some time.


// `;

//     }

// }



// module.exports = {

//     generateEventPlan

// };