function getEventPlanningContext(message){


const today = new Date();


const dateRegex =
/(\d{1,2})[\/\- ](\d{1,2})?/;


const match =
message.match(dateRegex);



if(!match){

return "";

}



let eventDay =
parseInt(match[1]);



let eventDate =
new Date(
today.getFullYear(),
today.getMonth(),
eventDay
);



let diff =
Math.ceil(
(eventDate - today) /
(1000*60*60*24)
);



return `

Current date:
${today.toDateString()}


The user event date:
${eventDate.toDateString()}


Days remaining:
${diff}


Create a preparation timeline.
Give tasks before event date.
Split by days.

`;

}


module.exports={
getEventPlanningContext
};