/* $(document).ready(function(){
    			
}); */
const html = document.querySelector('html');
html.setAttribute('data-bs-theme', 'dark');

document.addEventListener('DOMContentLoaded', () => {
  // --- Create LightBox
  const galleryGrid = document.querySelector(".gallery-grid");
  const links = galleryGrid.querySelectorAll("a");
  const imgs = galleryGrid.querySelectorAll("img");
  const lightboxModal = document.getElementById("lightbox-modal");
  const bsModal = new bootstrap.Modal(lightboxModal);
  const modalBody = lightboxModal.querySelector(".lightbox-content");

  function createCaption (caption) {
    return `<div class="carousel-caption d-none d-md-block">
        <h4 class="m-0">${caption}</h4>
      </div>`;
  }

  function createIndicators (img) {
    let markup = "", i, len;

    const countSlides = links.length;
    const parentCol = img.closest('.col');
    const curIndex = [...parentCol.parentElement.children].indexOf(parentCol);

    for (i = 0, len = countSlides; i < len; i++) {
      markup += `
        <button type="button" data-bs-target="#lightboxCarousel"
          data-bs-slide-to="${i}"
          ${i === curIndex ? 'class="active" aria-current="true"' : ''}
          aria-label="Slide ${i + 1}">
        </button>`;
    }

    return markup;
  }

  function createSlides (img) {
    let markup = "";
    const currentImgSrc = img.closest('.gallery-item').getAttribute("href");

    for (const img of imgs) {
      const imgSrc = img.closest('.gallery-item').getAttribute("href");
      const imgAlt = img.getAttribute("alt");

      markup += `
        <div class="carousel-item${currentImgSrc === imgSrc ? " active" : ""}">
          <img class="d-block img-fluid w-100" src=${imgSrc} alt="${imgAlt}">
          ${imgAlt ? createCaption(imgAlt) : ""}
        </div>`;
    }

    return markup;
  }

  function createCarousel (img) {
    const markup = `
      <!-- Lightbox Carousel -->
      <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="true">
        <!-- Indicators/dots -->
        <div class="carousel-indicators">
          ${createIndicators(img)}
        </div>
        <!-- Wrapper for Slides -->
        <div class="carousel-inner justify-content-center mx-auto">
          ${createSlides(img)}
        </div>
        <!-- Controls/icons -->
        <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      `;

    modalBody.innerHTML = markup;
  }

  for (const link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const currentImg = link.querySelector("img");
      const lightboxCarousel = document.getElementById("lightboxCarousel");

      if (lightboxCarousel) {
        const parentCol = link.closest('.col');
        const index = [...parentCol.parentElement.children].indexOf(parentCol);

        const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
        bsCarousel.to(index);
      } else {
        createCarousel(currentImg);
      }

      bsModal.show();
    });
  }

  // --- Support Fullscreen
  const fsEnlarge = document.querySelector(".btn-fullscreen-enlarge");
  const fsExit = document.querySelector(".btn-fullscreen-exit");

  function enterFS () {
    lightboxModal.requestFullscreen().then({}).catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
    fsEnlarge.classList.toggle("d-none");
    fsExit.classList.toggle("d-none");
  }

  function exitFS () {
    document.exitFullscreen();
    fsExit.classList.toggle("d-none");
    fsEnlarge.classList.toggle("d-none");
  }

  fsEnlarge.addEventListener("click", (e) => {
    e.preventDefault();
    enterFS();
  });

  fsExit.addEventListener("click", (e) => {
    e.preventDefault();
    exitFS();
  });
})


function send_handle() {
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const num = document.getElementById("number").value;
	const msg = document.getElementById("comment").value;
  

    var url = "https://wa.me/9870971626?text=" 
    + "Name: " + name + "%0a"
    + "Email: " + email + "%0a"
    + "num: " + num  + "%0a"
    + "comment: " + msg; 

    window.open(url, '_blank');
}
	
	function sendMessage() {
		console.log("send message");
  let input = document.getElementById("userInput");
  let message = input.value.trim();

  if (message === "") return;

  addMessage(message, "user");
  input.value = "";

  setTimeout(() => {
    let reply = getBotReply(message);
    addMessage(reply, "bot");
  }, 500);
}

function addMessage(text, sender) {
	console.log("addMessage..");
  let chatBox = document.getElementById("chatBox");
  let msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(input) {
  input = input.toLowerCase();

  if (input.includes("hello") || input.includes("hi")) {
    return "Hello! How can I help you?";
  } 
  else if (input.includes("price")) {
    return "Our pricing starts from ₹199 ";
  } 
  else if (input.includes("website")) {
    return "We create professional websites for businesses.";
  } 
  else if (input.includes("contact")) {
    return "You can call us at 9870971626.";
  } 
  else if (input.includes("services")) {
    return "We offer Website, Logo & Digital Marketing services.";
  } 
  else {
    return "Sorry, I didn't understand. Can you rephrase?";
  }
}

function openChat() {
  document.getElementById("chatContainer").style.display = "flex";
}

function closeChat() {
  document.getElementById("chatContainer").style.display = "none";
}

function minimizeChat() {
  let chat = document.getElementById("chatContainer");
  chat.classList.toggle("minimized");
}

let chatBox = document.getElementById("chatBox");
let typing = document.getElementById("typing");
let sound = document.getElementById("msgSound");

// Load chat history
window.onload = () => {
  let history = localStorage.getItem("chat");
  if (history) chatBox.innerHTML = history;
};

function saveChat() {
  localStorage.setItem("chat", chatBox.innerHTML);
}

function openChat() {
  document.getElementById("chatContainer").style.display = "flex";
}

function closeChat() {
  document.getElementById("chatContainer").style.display = "none";
}

function minimizeChat() {
  document.getElementById("chatContainer").classList.toggle("minimized");
}

// Send Message
function sendMessage() {
  let input = document.getElementById("userInput");
  let text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  typing.style.display = "block";

  setTimeout(() => {
    typing.style.display = "none";
    let reply = getBotReply(text);
    addMessage(reply, "bot");
    sound.play();
  }, 1000);
}

function addMessage(text, sender) {
  let msg = document.createElement("div");
  msg.className = "message " + sender;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  saveChat();
}

// Smart Reply
function getBotReply(input) {
  input = input.toLowerCase();

  if (input.includes("hi") || input.includes("hello")) {
    return "Hello! 👋 How can I help you?";
  }
  if (input.includes("price")) {
    return "Our services start from ₹999.";
  }
  if (input.includes("website")) {
    return "We build professional websites.";
  }
  if (input.includes("seo")) {
    return "We provide SEO to rank your business on Google.";
  }
  if (input.includes("contact")) {
    return "Call us at 9870971626.";
  }

  return "Sorry, I didn’t understand that.";
}

/* Drag Feature */
let chat = document.getElementById("chatContainer");
let header = document.getElementById("chatHeader");

let offsetX, offsetY, isDragging = false;

header.onmousedown = function(e) {
  isDragging = true;
  offsetX = e.clientX - chat.offsetLeft;
  offsetY = e.clientY - chat.offsetTop;
};

document.onmousemove = function(e) {
  if (isDragging) {
    chat.style.left = (e.clientX - offsetX) + "px";
    chat.style.top = (e.clientY - offsetY) + "px";
    chat.style.bottom = "auto";
    chat.style.right = "auto";
  }
};

document.onmouseup = function() {
  isDragging = false;
};
	
	


