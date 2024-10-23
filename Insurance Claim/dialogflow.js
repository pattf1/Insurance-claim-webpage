// dialogflow.js

const PROJECT_ID = 'YOUR_PROJECT_ID'; // Replace with your Dialogflow project ID
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Replace with your Dialogflow access token
const DIALOGFLOW_URL = `https://api.dialogflow.com/v1/query?v=20150910`;

// Function to send a message to Dialogflow
async function sendToDialogflow(userInput) {
    try {
        const response = await fetch(DIALOGFLOW_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: userInput,
                lang: 'en',
                sessionId: '12345' // Unique session ID for each conversation
            })
        });

        if (!response.ok) {
            console.error('Error connecting to Dialogflow:', response.statusText);
            return "Sorry, I'm having trouble right now.";
        }

        const data = await response.json();
        return data.result.fulfillment.speech || "Sorry, I didn't understand that.";
    } catch (error) {
        console.error('Error:', error);
        return "An unexpected error occurred. Please try again.";
    }
}

// Event listener for user input in the chatbot
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const userInput = this.value;
        document.getElementById('chatResponse').innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
        this.value = '';

        // Send the user input to Dialogflow
        sendToDialogflow(userInput)
            .then(response => {
                document.getElementById('chatResponse').innerHTML += `<div><strong>Bot:</strong> ${response}</div>`;
            });
    }
});
