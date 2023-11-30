// Creating an XMLHttpRequest object for making asynchronous requests
var httpRequest = new XMLHttpRequest();

// Getting references to HTML elements
var sendBtn = document.getElementById('sendBtn');
var textBox = document.getElementById('textBox');
var chatContainer = document.getElementById('chatContainer');

// Function to handle displaying chatbot's response
function chatbotSendMessage(messageText) {
    // Checking if the request is done and the status is OK (200)
    if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200) {
        // Parsing the JSON response from the server
        var result = JSON.parse(httpRequest.responseText);

        // Creating a new message element for the chatbot's response
        var messageElement = document.createElement('div');
        messageElement.classList.add('w-50');
        messageElement.classList.add('chat');
        messageElement.classList.add('float-left');
        messageElement.classList.add('shadow-sm');
        messageElement.style.margin = "10px";
        messageElement.style.padding = "5px";

        // Setting the content of the message element with the chatbot's response
        messageElement.innerHTML = "<span>Chat: </span><span style='margin-top:10px; padding:10px;'>" + result.response_message + "</span>";

        // Applying animation to the message element
        messageElement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 2000 });

        // Appending the message element to the chat container
        chatContainer.appendChild(messageElement);
    } else {
        // Handling the case where there was a problem with the request
        // You may want to provide more specific error handling here
        // alert("There was a problem with the request");
    }
}

// Function to send user's message and initiate the chatbot response
function sendMessage(messageText) {
    // Creating a new message element for the user's message
    var messageElement = document.createElement('div');
    messageElement.classList.add('w-50');
    messageElement.classList.add('chat');
    messageElement.style.alignSelf = "flex-end";
    messageElement.classList.add('shadow-sm');
    messageElement.style.margin = "10px";
    messageElement.style.padding = "5px";

    // Setting the content of the message element with the user's message
    messageElement.innerHTML = "<span>You: </span>" + "<span style=" + "margin-top:10px; padding:10px;" + ">" + messageText + "</span>";

    // Applying animation to the message element
    messageElement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 1000 });

    // Appending the message element to the chat container
    chatContainer.appendChild(messageElement);

    // Initiating the chatbot response by making a request to the server
    makeRequest(messageText);
}

// Function to make an Ajax request to the server
function makeRequest(messageText) {
    // Opening a GET request to 'chatbot.php' with the user's message as a parameter
    httpRequest.open('GET', 'chatbot.php?message=' + messageText, true);
    // Sending the request
    httpRequest.send();
    // Setting the callback function to handle the chatbot's response
    httpRequest.onreadystatechange = chatbotSendMessage;
}

// Event listener for the send button
sendBtn.addEventListener('click', function (e) {
    // Checking if the text box is not empty
    if (textBox.value == "") {
        // You may want to add additional handling for an empty message
    } else {
        // Getting the user's message from the text box
        let messageText = textBox.value;
        // Sending the user's message and initiating the chatbot response
        sendMessage(messageText);
        // Clearing the text box after sending the message
        textBox.value = "";
    }
});
