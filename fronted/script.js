const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const typing = document.getElementById("typing");
const modeSelect = document.getElementById("mode");


// Add Message
const API_URL = "https://ai-chatbot-wnpk.onrender.com/chat";

function addMessage(message, sender) {

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    if (sender === "bot") {

        messageDiv.innerHTML = `
            <div class="avatar">
                <i class="fa-solid fa-robot"></i>
            </div>

            <div class="text">
                ${message}
            </div>
        `;

    } else {

        messageDiv.innerHTML = `
            <div class="text">
                ${message}
            </div>

            <div class="avatar">
                <i class="fa-solid fa-user"></i>
            </div>
        `;

    }

    chatContainer.appendChild(messageDiv);

    chatContainer.scrollTop = chatContainer.scrollHeight;

}



// Send Message

async function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    addMessage(message, "user");

    userInput.value = "";

    typing.style.display = "flex";



    try {

        // Change this URL later after creating FastAPI

        const response = await fetch(API_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        message: message,
        mode: modeSelect.value
    })
});

        const data = await response.json();

        typing.style.display = "none";

        addMessage(data.response, "bot");

    }

    catch (error) {

        typing.style.display = "none";

        addMessage("⚠ Unable to connect to backend.", "bot");

        console.error(error);

    }

}



// Button Click

sendBtn.addEventListener("click", sendMessage);



// Enter Key

userInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});



// Focus Input

window.onload = () => {

    userInput.focus();

};