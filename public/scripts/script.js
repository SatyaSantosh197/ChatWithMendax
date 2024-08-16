function sendMessage() {
  // Get the input element where the user types their message
  const input = document.getElementById('input-message');
  
  // Get the value of the input field and remove any extra spaces
  const message = input.value.trim();
  
  // If the message is empty, do nothing and return
  if (message === ''){
    return;
  } 
  
  // Get the element that holds all the chat messages
  const chatMessages = document.getElementById('chat-messages');

  // Create a new div element for the user's message
  const userMessage = document.createElement('div');
  
  // Add a class to the div for styling purposes
  userMessage.classList.add('user-message');
  
  // Set the text content of the div to include the user's message
  userMessage.textContent = 'You: ' + message;
  
  // Add the user's message to the chat messages container
  chatMessages.appendChild(userMessage);
  
  // Clear the input field after the message is sent
  input.value = '';
  
  // Send the user's message to the server using the fetch API
  fetch(`/ask?q=${encodeURIComponent(message)}`)
    .then(response => response.json())  // Parse the response as JSON
    .then(data => {
      // Create a new div element for the chatbot's response
      const botMessage = document.createElement('div');
      
      // Add a class to the div for styling purposes
      botMessage.classList.add('bot-message');
      
      // Set the text content of the div to include the chatbot's response
      botMessage.textContent = 'Mendax: ' + data.answer;
      
      // Add the chatbot's response to the chat messages container
      chatMessages.appendChild(botMessage);
      
      // Scroll the chat to the bottom to show the latest message
      chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(error => {
      // Log any errors that occur during the fetch request
      console.error('Error:', error);
    });
}
