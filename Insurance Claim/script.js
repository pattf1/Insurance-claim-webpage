const claims = [];
let claimCounter = 1;

function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

document.getElementById('claimSubmissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const policyNumber = document.getElementById('policyNumber').value;
    const incidentDate = document.getElementById('incidentDate').value;
    const incidentDescription = document.getElementById('incidentDescription').value;
    
    claims.push({
        id: `CLM00${claimCounter++}`,
        policyNumber,
        incidentDate,
        description: incidentDescription,
        status: "In Review",
        dateSubmitted: new Date().toLocaleDateString()
    });

    document.getElementById('submissionMessage').textContent = "Claim submitted successfully!";
    document.getElementById('submissionMessage').classList.remove('hidden');
    this.reset();
    displayClaims();
});

function displayClaims() {
    const claimsBody = document.getElementById('claimsBody');
    claimsBody.innerHTML = '';

    claims.forEach(claim => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${claim.id}</td>
            <td>${claim.status}</td>
            <td>${claim.dateSubmitted}</td>
        `;
        claimsBody.appendChild(row);
    });
}

function handleChat(event) {
    if (event.key === 'Enter') {
        const userInput = document.getElementById('userInput').value;
        const response = getChatbotResponse(userInput);
        document.getElementById('chatResponse').innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
        document.getElementById('chatResponse').innerHTML += `<div><strong>Bot:</strong> ${response}</div>`;
        document.getElementById('userInput').value = '';
    }
}

function getChatbotResponse(input) {
    // Simulated chatbot responses
    if (input.toLowerCase().includes("file a claim")) {
        return "Please click on the 'Submit a Claim' button.";
    } else if (input.toLowerCase().includes("claim status")) {
        return "Please track your claim using the dashboard.";
    } else {
        return "I'm sorry, I didn't understand that. Please ask me another question.";
    }
}
