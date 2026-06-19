require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { generateEventPlan } =
require("./aiService");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5002;

const sessions = {};

function createSession(userId){

    sessions[userId] = {

        step:0,

        answers:{},

        history:[]

    };

}

app.get("/", (req, res) => {
    res.send("AI Event Planner Backend Running");
});

app.post("/api/chat", async (req, res) => {

    const { userId, message } = req.body;
    if(message.toLowerCase()=="restart"){

    createSession(userId);

    return res.json({

        reply:
        "🔄 Chat restarted.\n\nWhat type of event are you planning?"

    });

}

    if(!sessions[userId]){

    createSession(userId);

}

    const session = sessions[userId];
    session.history.push({

    user:message,

    time:new Date()

}); 

    try {

        switch (session.step) {

            case 0:

                session.step = 1;

                return res.json({
                    reply:
`
👋 Welcome to AI Event Planner 🤖

I can help you plan:

🎂 Birthday Parties

💍 Weddings

🏢 Corporate Events

🎓 College Events


Please select your event type.
`
                });

            case 1:

                session.answers.eventType = message;

                session.step = 2;

                return res.json({
                    reply:
                    "How many guests are expected?"
                });

            case 2:

                session.answers.guests = message;

                session.step = 3;

                return res.json({
                    reply:
                    "What is your budget?"
                });

            case 3:

                session.answers.budget = message;

                session.step = 4;

                return res.json({
                    reply:
                    "Which city will the event take place in?"
                });

            case 4:

                session.answers.location = message;

                session.step = 5;

                return res.json({
                    reply:
                    "What is the event date?"
                });

            case 5:

                session.answers.date = message;

                const prompt = `
Event Type: ${session.answers.eventType}
Guests: ${session.answers.guests}
Budget: ${session.answers.budget}
Location: ${session.answers.location}
Date: ${session.answers.date}
`;

                const plan =
                await generateEventPlan(prompt);

                delete sessions[userId];

                return res.json({
                    reply: plan
                });

            default:

                delete sessions[userId];

                return res.json({
                    reply:
                    "Please start again."
                });
        }

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            reply:
            "Server Error"
        });
    }
});
app.get("/api/history/:userId",(req,res)=>{


    const userId =
    req.params.userId;


    if(!sessions[userId]){


        return res.json({

            history:[]

        });

    }


    res.json({

        history:
        sessions[userId].history

    });


}); 
app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );
});