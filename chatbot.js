// State to manage if the bot is waiting for user input for learning
let isLearningMode = false;
const botMessagesContainer = document.getElementById('botMessages');

// Attach event listener to send button
document.getElementById('sendMessage').addEventListener('click', function () {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput === "" || isLearningMode) return; // Prevent empty input or input when in learning mode

    addMessage(userInput, 'user');
    document.getElementById('userInput').value = ''; // Clear the input field

    // Simulate bot typing animation
    setTimeout(function () {
        addMessage('Typing...', 'bot typing');

        // Simulate response time
        setTimeout(function () {
            const typingMessage = document.querySelector('.typing');
            if (typingMessage) typingMessage.remove();

            const botResponse = getBotResponse(userInput);
            addMessage(botResponse, 'bot');
        }, 1000);
    }, 500);
});

// Function to add messages to the chat container
function addMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerText = message;
    botMessagesContainer.appendChild(messageDiv);
    botMessagesContainer.scrollTop = botMessagesContainer.scrollHeight;
}

// Function to generate bot responses
function getBotResponse(input) {
    const lowerInput = input.toLowerCase();

    const responses = {
        hello: 'Hi there 👋 How can I assist you today?',
        hi: 'Hello 😊 What’s on your mind?',
        hey: 'Hey there 🙌 How’s it going?',
        howto: 'Here’s a guide on how to do that: 📚 Let me know if you need more details!',
        tips: 'Here are some tips for you: 💡 Hope you find them helpful!',
        website: 'You can find more information on our website: 🌐 https://example.com',
        contactus: 'Feel free to contact us for more information: ✉️ We’re here to help.',
        buy: 'You can purchase this product here: 🛒 Follow the link for more details.',
        order: 'To place an order, follow these steps: 📝 Let me know if you need assistance.',
        happy: 'That’s great 😄 What’s making you happy?',
        sad: 'I’m sorry to hear that. 😔 If you’d like to talk, I’m here for you.',
        skills: 'Here are some of my skills: 💻 Web Development, Cybersecurity, Ethical Hacking.',
        projects: 'Check out my projects on GitHub: 👨‍💻 https://github.com/Xenonesis.',
        contact: 'Feel free to email me at: ✉️ ffjawed@gmail.com.',
        thanks: 'You’re welcome 😊 I’m glad I could help.',
        help: 'I’m here to help 🤔 What do you need assistance with?',
        bye: 'Goodbye 👋 Have a wonderful day!',
        joke: 'Why don’t scientists trust atoms? Because they make up everything 😄',
        music: 'Music is great 🎵 What’s your favorite song or artist?',
        movie: 'I enjoy movies 🎬 What’s your favorite one?',
        cybersecurity: 'I am passionate about cybersecurity 🔒 Ask me anything related to it!',
        universitylife: 'Life at Sushant University is great 🌟 Learning a lot and enjoying the campus.',
        promptengineering: 'I am learning about prompt engineering 🧠 Exciting stuff with AI!',
    };

    // Check for responses in the dictionary
    for (let key in responses) {
        if (lowerInput.includes(key)) {
            return responses[key];
        }
    }

    // If no response is found, switch to learning mode
    return learnFromUser(input);
}

// Function to learn from user input if no predefined response is available
function learnFromUser(input) {
    const botResponse = `I don't know the answer to "${input}" yet. What should I say? 😁`;
    addMessage(botResponse, 'bot');
    
    isLearningMode = true;

    const userResponseHandler = (event) => {
        if (event.key === 'Enter') {
            const userCorrectResponse = event.target.value.trim();
            if (userCorrectResponse) {
                addMessage(userCorrectResponse, 'user');
                event.target.value = '';

                addMessage(`Thanks! I'll remember that: "${userCorrectResponse}" 👍`, 'bot');
                document.removeEventListener('keydown', userResponseHandler);
                isLearningMode = false;
            }
        }
    };

    document.addEventListener('keydown', userResponseHandler);
    return '';
}
