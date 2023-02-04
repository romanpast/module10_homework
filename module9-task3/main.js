const btnLocation = document.querySelector(".btn-location");
const messageBox = document.querySelector(".messenger");
const messageInput = document.querySelector(".text_input");
const form = document.querySelector(".client_input");
const socket = new WebSocket("wss://echo-ws-service.herokuapp.com");

socket.addEventListener("open", () => {
  console.log("Connected to the echo server.");
});

socket.addEventListener("message", event => {
  const message = document.createElement("div");
  message.innerText = event.data;
  message.classList.add("ws_message");
  messageBox.appendChild(message);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from the echo server.");
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const sentMessage = document.createElement("div");
  sentMessage.innerText = messageInput.value;
  sentMessage.classList.add("client_message");
  messageBox.appendChild(sentMessage);
  socket.send(messageInput.value);
  messageInput.value = "";
});

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = `${latitude},${longitude}`;
      const apiKey = "03e081d9f3a64dd29e322f85098ab85b";
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const flagName = data.results[0].components.country_code;
          const country = data.results[0].components.country;
          const city = data.results[0].components.town || data.results[0].components.city || data.results[0].components.state_district;
          const message = document.createElement("div");
          const flag = document.createElement("img");
          flag.setAttribute("src", `https://flagcdn.com/16x12/${flagName}.png`);
          message.innerHTML = `I am in ${city}, ${country} `;
          message.classList.add("client_message");
          message.appendChild(flag);
          messageBox.appendChild(message);
        });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

btnLocation.addEventListener("click", e => {
  getLocation();
  e.preventDefault();
});
