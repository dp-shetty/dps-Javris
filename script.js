// Check for browser support
if ('webkitSpeechRecognition' in window && 'speechSynthesis' in window) {
  let recognition = new webkitSpeechRecognition();
  recognition.continuous = true;// even if there is a pause in the speech (utterance) it will listen 
  recognition.interimResults = false; //false = to get  only final results not the partial
  recognition.lang = 'en-US';

  // console.log(recognition)
  // console.log(webkitSpeechRecognition)

  let startBtn = document.getElementById('start-btn');
  let outputDiv = document.getElementById('output');

  // Start listening
  startBtn.addEventListener('click', () => {
      recognition.start(); //used to start the speech recognition service
      outputDiv.innerHTML = "Listening...";
  });

  recognition.onresult = function(event) {
      let transcript = event.results[event.results.length - 1][0].transcript.trim();
      outputDiv.innerHTML = `You said: ${transcript}`;

      // Respond to user commands
      respondToCommand(transcript);//function takes the final recognized text and determines an appropriate response.
  };

  let now = new Date()
  let day = now.getDay()
  let updatedDay = ""
  console.log(day)

    switch(day){
      case 0: updatedDay="sunday";
      break;
      case 1 :updatedDay="monday";
      break;
      case 2 :updatedDay="tuesday";
      break;
      case 3:updatedDay= "wednesday";
      break;
      case 4 :updatedDay="thursday";
      break;
      case 5 :updatedDay="friday";
      break;
      case 6 :updatedDay="saturday"
      break;
      default :updatedDay="invalid day"
    }

  console.log(updatedDay)

  


  const commandResponses = {
    "hello": "Hello! How can I help you today?",
    "how are you": "I'm just a program, but I'm here to assist you!",
    "who are you": "I am Javris. Durga Prasad Shetty's Assistant",
    "what's the time now": `It is ${now.getHours()}:${now.getMinutes()}.`,
    "what's the Day Today": `${updatedDay}`,
    "what's your name": `I'm javris. Durga Prasad shetty's assistant, He created me by using Javascript.`,
    "f*** you": `Fuck you too! you shitty ass fuck off`,
    "great job": `Thanks for the appreciation.`,
    "thank you": `You're welcome!`,
    "goodbye": `Goodbye! Have a great day.`,
    "what's up": `Not much, just here to assist you.`,
    "set a timer": `Setting a timer. How long should it be?`,
    "what's on my schedule today": `Let me check your schedule.`,
    "find a place near me": `Searching for places near your location.`,
    "translate": `Sure, what would you like to translate?`,
  };

  function respondToCommand(command) {
      console.log("Received command:", command.toLowerCase());
      let response = commandResponses[command.toLowerCase()] || "Sorry, I'm not sure how to respond to that.";
      console.log(response)
      speak(response);
  }

  function speak(text) {

//speak() function is used to convert text to speech using the Web Speech API's SpeechSynthesis interface. It takes a text string as input, creates a SpeechSynthesisUtterance object with that text, and then uses the speechSynthesis.speak() method to make the browser speak the text out loud.

      let utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
  }

  recognition.onerror = function(event) {
      console.error(event.error);
      outputDiv.innerHTML = `Error: ${event.error}`;
  };

  recognition.onend = function() {
    console.log('Speech recognition ended');
    if (outputDiv.innerHTML !== "Stopped listening. Click 'Start Listening' to try again.") {
        recognition.start();
    }
};
} else {
  alert('Your browser does not support speech recognition or speech synthesis.');
}
