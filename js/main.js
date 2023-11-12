var httpRequest = new XMLHttpRequest();
var sendBtn = document.getElementById('sendBtn');

var textBox = document.getElementById('textBox');

var chatContainer = document.getElementById('chatContainer');

function chatbotSendMessage(messageText) {

    if(httpRequest.readyState== XMLHttpRequest.DONE && httpRequest.status==200){
    var result = JSON.parse(httpRequest.responseText)

    var messageElement = document.createElement('div');
    messageElement.classList.add('w-50');
    messageElement.classList.add('chat');
    messageElement.classList.add('float-left');
    messageElement.classList.add('shadow-sm');
    messageElement.style.margin="10px";
    messageElement.style.padding="5px";

    messageElement.innerHTML = "<span>Chat: </span><span style='margin-top:10px; padding:10px;'>" + result.response_message + "</span>";

    messageElement.animate([{easing:"ease-in",opacity:0.4},{opacity:1}],{duration:2000});

  
    chatContainer.appendChild(messageElement);

}
else{
    // alert("There was a problem with the request");
}


}


function sendMessage(messageText){
    var messageElement = document.createElement('div');

    messageElement.classList.add('w-50');
    messageElement.classList.add('chat');
    messageElement.style.alignSelf="flex-end";
    messageElement.classList.add('shadow-sm');
    messageElement.style.margin="10px";
    messageElement.style.padding="5px";

    messageElement.innerHTML ="<span>You: </span>"+"<span style="+"margin-top:10px; padding:10px;"+">"+messageText+"</span>";

    messageElement.animate([{easing:"ease-in",opacity:0.4},{opacity:1}],{duration:1000});

    chatContainer.appendChild(messageElement);

    makeRequest(messageText);
}


function makeRequest(messageText)
{
     // Ajax Request
      httpRequest.open('GET', 'chatbot.php?message=' +  messageText, true);
      httpRequest.send();
      httpRequest.onreadystatechange = chatbotSendMessage;

}


sendBtn.addEventListener('click', function (e) {

if(textBox.value==""){

}else{
  let messageText = textBox.value;
  sendMessage(messageText);
  textBox.value="";
}
});
