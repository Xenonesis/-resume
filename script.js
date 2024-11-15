// Initialize previous conversations
const previousConversations = JSON.parse(localStorage.getItem('chatbot_conversations')) || [];
const botMessagesContainer = document.getElementById('botMessages');

// Load previous messages from localStorage
previousConversations.forEach(conversation => {
    addMessage(conversation.input, 'user');
    addMessage(conversation.response, 'bot');
});

// State to manage if the bot is waiting for user input for learning
let isLearningMode = false;

// Attach event listener to send button
document.getElementById('sendMessage').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;

    if (userInput.trim() === "" || isLearningMode) return; // Prevent empty input or input when in learning mode

    addMessage(userInput, 'user');
    document.getElementById('userInput').value = '';

    // Store user input in local storage for learning
    previousConversations.push({ input: userInput });
    localStorage.setItem('chatbot_conversations', JSON.stringify(previousConversations));

    // Simulate bot typing animation
    setTimeout(function() {
        addMessage('Typing...', 'bot typing');

        // Simulate response time
        setTimeout(function() {
            const typingMessage = document.querySelector('.typing');
            if (typingMessage) {
                typingMessage.remove(); // Check if the typing message exists before removing it
            }
            const botResponse = getBotResponse(userInput);
            addMessage(botResponse, 'bot');
        }, 1000);
    }, 500);
});

function addMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerText = message;
    botMessagesContainer.appendChild(messageDiv);
    botMessagesContainer.scrollTop = botMessagesContainer.scrollHeight; // Scroll to the bottom
}

function getBotResponse(input) {
    const lowerInput = input.toLowerCase();

    // Check if a similar question has been asked before
    const previousResponse = checkPreviousConversations(lowerInput);
    if (previousResponse) {
        return previousResponse; // Return a learned response
    }

    const responses = {
  // Existing keywords
  hello: 'Hi there 👋 How can I assist you today?',
  hi: 'Hello 😊 What’s on your mind?',
  hy: 'Hanji😁',
  hyy: 'Hanji😁',
  hey: 'Hey there 🙌 How’s it going?',
  greetings: 'Greetings 🎉 What can I do for you?',
  hellothere: 'Hi 😊 How are you doing today?',
  hithere: 'Hello 👋 What brings you here?',
  heythere: 'Hey 🤗 How can I help you?',
  greetingsfriend: 'Hello, friend 🌟 What’s new with you?',
  howto: 'Here’s a guide on how to do that: 📚 Let me know if you need more details!',
  tips: 'Here are some tips for you: 💡 Hope you find them helpful!',
  guide: 'Check out this comprehensive guide: 📖 It should answer all your questions.',
  website: 'You can find more information on our website: 🌐 Here’s the link: https://example.com',
  contactus: 'Feel free to contact us for more information: ✉️ We’re here to help',
  buy: 'You can purchase this product here: 🛒 Follow the link for more details.',
  order: 'To place an order, follow these steps: 📝 Let me know if you need assistance.',
  digitalmarketing: 'Here’s information on digital marketing: 🌐 It includes SEO, PPC, and more.',
  onlinemarketing: 'Online marketing is a broad field: 📊 It covers social media, email marketing, and more.',
  internetmarketing: 'Internet marketing involves various strategies: 📈 From SEO to content marketing.',
  competitoranalysis: 'Analyzing competitors can help you find new keywords: 🔍 See what they’re ranking for and adjust your strategy.',
  competitorkeywords: 'Check out the keywords your competitors are using: 📊 This can give you new ideas for your own campaign.',
  productfeatures: 'Here are some features of our product: 🛠️ Let me know if you have any questions.',
  servicebenefits: 'Our service offers several benefits: 🌟 Here are a few key ones.',
  productattributes: 'Here are some attributes of our product: 📊 From size to color, we’ve got you covered.',
  serviceattributes: 'Our service has several key attributes: 🌐 Here’s what you need to know.',
  howtogroomadogathome: 'Here’s a guide on how to groom a dog at home: 🐶 Step-by-step instructions inside.',
  bestdogroomingproducts: 'Here are the best dog grooming products: 🛒 Check out our recommendations.',
  doggroomingtipsforbeginners: 'Here are some dog grooming tips for beginners: 🐾 Start with these basics.',
  doggroomingtechniques: 'Here are some advanced dog grooming techniques: 🐶 For the pros and those looking to improve.',
  keywordperformance: 'Keep an eye on your keyword performance: 📊 Adjust your strategy based on the data.',
  searchtrends: 'Stay updated with the latest search trends: 🌐 This will help you refine your keyword list.',
  keywordadjustment: 'Adjust your keyword strategy regularly: 🔧 This ensures you stay competitive and relevant.',
  happy: 'That’s great 😄 What’s making you happy?',
  sad: 'I’m sorry to hear that. 😔 If you’d like to talk, I’m here for you.',
  skills: 'Here are some of my skills: 💻 Web Development, Cybersecurity, Ethical Hacking, Data Analysis.',
  projects: 'Check out my projects on GitHub: 👨‍💻 https://github.com/Xenonesis.',
  contact: 'Feel free to email me at: ✉️ ffjawed@gmail.com.',
  thank: 'You’re welcome 😊 I’m glad I could help.',
  thanks: 'No problem Happy to assist 🙌',
  help: 'I’m here to help 🤔 What do you need assistance with?',
  bye: 'Goodbye 👋 Have a wonderful day!',
  goodbye: 'See you later 🌟',
  weather: 'I can’t check the weather, but you can look it up online ☀️🌧️',
  joke: 'Why don’t scientists trust atoms? Because they make up everything 😄',
  love: 'Love is a beautiful thing 💖 What about it?',
  work: 'What do you do for work? 🤔',
  favorite: 'I love chatting with you 🌈 What’s your favorite topic?',
  movie: 'I enjoy movies 🎬 What’s your favorite one?',
  music: 'Music is great 🎵 What’s your favorite song or artist?',

  cybersecurity: 'I am passionate about cybersecurity 🔒 I have experience with vulnerability assessments, security measures, and incident response.',
  universitylife: 'Life at Sushant University is great 🌟 I’m learning a lot and enjoying the campus life.',
  techinterests: 'I’m really into tech and innovation 🚀 What about you? Do you have any favorite tech topics?',
  communityservice: 'I believe in giving back to the community 🤝 I’m involved in several community service activities.',
  favoriteclass: 'My favorite class is probably computer science 📚 I find it really interesting and challenging.',
  projectideas: 'I have several project ideas in mind 📋 From web development to AI, I’m excited to explore different areas.',
 careeradvice: 'If you need career advice, I’m here to help 🤔 Just let me know what you’re looking for.',
  name: 'My Name is Aditya.',
    character: 'He is very good boy.',

  //  Keywords from the PDF
  cybersecurity: 'I am passionate about cybersecurity 🔒 I have experience with vulnerability assessments, security measures, and incident response.',
  vulnerabilityassessments: 'I can help you understand your vulnerabilities 🔍 I can conduct assessments and recommend security improvements.',
  securitymeasures: 'I know about implementing security measures to protect your systems 🛡️ I can help you choose the right ones.',
  networktraffic: 'I can analyze network traffic to identify potential threats 🕵️‍♀️ I can also help you monitor your network for suspicious activity.',
  incidentresponse: 'I can assist in incident response to minimize damage 🚨 I can help you contain, investigate, and recover from security incidents.',
  remotework: 'I am comfortable working remotely 💻 I can work effectively from anywhere with a reliable internet connection.',
  internship: 'I recently completed a cybersecurity internship 💼 I gained valuable experience in practical security concepts.',
  universitysportsleader: 'I was a university sports leader 🏆 I have experience in organizing events and motivating others.',
  nssleader: 'I am an NSS leader 🤝 I am committed to community service and social responsibility.',
  googletechnicalsupport: 'I have learned technical support fundamentals from Google 📚 I have a strong understanding of troubleshooting and documentation.',
  ciscotraining: 'I have completed Cisco training courses 🎓 I have knowledge of network security, ethical hacking, and endpoint security.',
  osforensics: 'I am certified in OSForensics 💻 I have experience with digital investigations and forensic analysis.',
  promptengineering: 'I am learning about prompt engineering for generative AI 🧠 I am interested in the intersection of AI and language.',
  cybersecurityforeveryone: 'I have a certificate in cybersecurity for everyone 🔐 I am interested in educating others about cybersecurity best practices.',
  excel: 'I am proficient in Excel 📊 I can use it for data analysis, visualization, and automation.',
  datamapping: 'I understand how to map data effectively 🗺️ I can help you organize and structure your data.',
  datavisualization: 'I can visualize data to make it easier to understand 📈 I can create charts, graphs, and dashboards.',
  conditionalformatting: 'I am skilled in using conditional formatting in Excel 🎨 I can highlight important information and make spreadsheets more readable.',
  linux: 'I have experience working with Linux 🐧 I am familiar with its command line interface and common tools.',
  github: 'I use GitHub to manage my projects 💻 I am comfortable with version control and collaborating with others.',
  flappybird: 'I built a Flappy Bird game using HTML, CSS, and JavaScript 🎮 You can find it on GitHub: https://github.com/Xenonesis/NS-Flappy-Bird.git',
  moviewebsite: 'I developed a movie website called Cinesphere 🎬 You can check it out here: https://thecinesphere.netlify.app/',
  ecommercewebsite: 'I built a modern e-commerce website called Innova 🛒 You can find it on GitHub: https://github.com/Xenonesis/Innova.git',
  html: 'I am proficient in HTML 🌐 I can create web pages and structure content.',
  css: 'I have experience with CSS 🎨 I can style web pages and create visually appealing designs.',
  javascript: 'I am learning JavaScript 💻 I can use it to add interactivity and functionality to web pages.',
  python: 'I am proficient in Python 🐍 I can use it for data analysis, web development, and automation.',
  sql: 'I have experience working with SQL databases 🗃️ I can query and manage data.',
  firebase: 'I am familiar with Firebase 🔥 I can use it for real-time databases, authentication, and more.',
  vmware: 'I have experience using VMware 💻 I can create and manage virtual machines.',
  apachecloudstack: 'I am familiar with Apache CloudStack ☁️ I can use it for cloud computing and infrastructure management.',
  databasemanagement: 'I have experience with database management systems 🗃️ I can design, implement, and manage databases.',
  datastructures: 'I understand data structures 💻 I can use them to efficiently organize and store data.',
  git: 'I am familiar with Git 💻 I can use it for version control and collaboration.',
  golang: 'I am learning Go 💻 I am interested in its efficiency and concurrency.',
  mssqlserver: 'I am proficient in MS SQL Server 💻 I can use it for database management.',
  msoffice: 'I am proficient in MS Office 💻 I can use it for productivity and collaboration.',
  microsoftvisualstudio: 'I have experience using Microsoft Visual Studio 💻 I can use it for software development.',
  mongodb: 'I am familiar with MongoDB 💻 I can use it for NoSQL database management.',
  artificialintelligence: 'I am interested in artificial intelligence 🧠 I am learning about its applications and ethical considerations.',
  networksecurity: 'I have knowledge of network security 🔒 I can help you protect your network from attacks.',
  additionaldetails: 'I have experience in volunteering and leadership roles 🤝 I am a motivated and dedicated individual.',
  nss: 'I am a member of the NSS 🤝 I am committed to community service and social responsibility.',
  blaze: 'I participated in Blaze VII and Blaze VIII 🏆 I have experience in event organization and leadership.',
  marchpast: 'I led the march past in Blaze VII and Blaze VIII 🏆 I have experience in leading teams and coordinating activities.',
  goldmedal: 'I received a gold medal for the march past in Blaze VII and Blaze VIII 🏆 I am a dedicated and hard-working individual.'
};
    // Check for responses in the dictionary
    for (let key in responses) {
        if (lowerInput.includes(key)) {
            return responses[key];
        }
    }

    // If nothing matches, return a request for learning and learn from the user's response
    return learnFromUser(input);
}

function checkPreviousConversations(input) {
    for (let conversation of previousConversations) {
        if (conversation.input.toLowerCase() === input) {
            return conversation.response; // Return the stored response
        }
    }
    return null;
}

function learnFromUser(input) {
    // Ask user for the correct response
    const botResponse = `I don't know the answer to "${input}" yet. What should I say? 😁`;

    // Show the bot's question to the user
    addMessage(botResponse, 'bot');
    
    // Set learning mode to true
    isLearningMode = true;

    // Wait for the user's correct response
    const userResponseHandler = (event) => {
        if (event.key === 'Enter') {
            const userCorrectResponse = event.target.value;
            addMessage(userCorrectResponse, 'user');
            event.target.value = ''; // Clear input field

            // Store the learned response
            previousConversations.push({ input: input, response: userCorrectResponse });
            localStorage.setItem('chatbot_conversations', JSON.stringify(previousConversations));

            // Thank user for teaching
            addMessage(`Thanks! I'll remember that: "${userCorrectResponse}" 👍`, 'bot');

            // Remove event listener after getting the response
            document.removeEventListener('keydown', userResponseHandler);
            isLearningMode = false; // Reset learning mode
        }
    };

    // Attach event listener for user's response
    document.addEventListener('keydown', userResponseHandler);

    return ''; // Return an empty string to avoid duplicate messages
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('navbar-scrolled');
    } else {
        header.classList.remove('navbar-scrolled');
    }
});

// Testimonial Carousel
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function updateCarousel() {
    const offset = -currentIndex * 100;
    testimonials.forEach((testimonial) => {
        testimonial.style.transform = `translateX(${offset}%)`;
    });
}

document.getElementById('prevTestimonial').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalTestimonials - 1;
    updateCarousel();
});

document.getElementById('nextTestimonial').addEventListener('click', () => {
    currentIndex = (currentIndex < totalTestimonials - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

// Popup functionality
let popupInterval;
let linkedinPopupInterval;

function showPopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.add('show');
        clearInterval(popupInterval);
        popupInterval = setInterval(() => {
            popup.classList.add('show');
        }, 25000); // Show popup every 25 seconds
    }
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.remove('show');
    }
}

function showLinkedInPopup() {
    const linkedinPopup = document.getElementById('linkedinPopup');
    if (linkedinPopup) {
        linkedinPopup.classList.add('show');
        clearInterval(linkedinPopupInterval);
        linkedinPopupInterval = setInterval(() => {
            linkedinPopup.classList.add('show');
        }, 5000); // Show LinkedIn popup every 5 seconds
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Show previous messages from local storage on load
    previousConversations.forEach(conversation => {
        addMessage(conversation.input, 'user');
        addMessage(conversation.response, 'bot');
    });

    // Show popup after 3 seconds
    setTimeout(showPopup, 3000);

    // Show LinkedIn popup immediately
    showLinkedInPopup();

    // Close popup when clicking outside of it
    window.addEventListener('click', (event) => {
        const popup = document.getElementById('popup');
        const linkedinPopup = document.getElementById('linkedinPopup');
        if (popup && !popup.contains(event.target) && event.target !== popup) {
            closePopup();
        }
        if (linkedinPopup && !linkedinPopup.contains(event.target) && event.target !== linkedinPopup) {
            linkedinPopup.classList.remove('show');
        }
    });
});