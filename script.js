const yes = document.getElementById("yes");
const no = document.getElementById("no");
const card = document.getElementById("card");
const question = document.getElementById("question");
const sub = document.getElementById("sub");
const gif = document.getElementById("gif");
const buttons = document.getElementById("buttons");
const heartsBox = document.getElementById("hearts");

const noTexts = ["No", "Are you sure? 🥺", "Really? 😢", "Think again 💭", "Pleeease 🥹", "Try the other one 😉"];
let noCount = 0;

// Move the "No" button to a random spot anywhere on screen
function dodge(e) {
  if (e) e.preventDefault();

  if (no.parentElement !== document.body) {
    document.body.appendChild(no); // escape the card so it can roam the whole screen
    no.style.position = "fixed";
    no.style.zIndex = 5;
  }

  const pad = 10;
  const maxX = window.innerWidth - no.offsetWidth - pad;
  const maxY = window.innerHeight - no.offsetHeight - pad;
  no.style.left = pad + Math.random() * Math.max(0, maxX - pad) + "px";
  no.style.top = pad + Math.random() * Math.max(0, maxY - pad) + "px";

  noCount++;
  no.textContent = noTexts[noCount % noTexts.length];

  // Make Yes slightly bigger every time
  const scale = Math.min(1 + noCount * 0.08, 1.8);
  yes.style.transform = `scale(${scale})`;
}

// Dodge before she can click (mouse, touch, keyboard focus)
no.addEventListener("mouseover", dodge);
no.addEventListener("touchstart", dodge, { passive: false });
no.addEventListener("click", dodge);
no.addEventListener("focus", dodge);

// Keep the button visible if the window is resized
window.addEventListener("resize", () => {
  if (no.style.position === "fixed") dodge();
});

yes.addEventListener("click", () => {
  no.remove();
  buttons.remove();
  card.classList.add("celebrate");
  question.textContent = "Yaaay! I love you! 🥰💖";
  sub.textContent = "You just made me the happiest person in the world. ❤️";
  gif.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
  for (let i = 0; i < 60; i++) setTimeout(spawnHeart, i * 80);
  setInterval(spawnHeart, 250);
});

function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = ["💖", "💕", "💗", "❤️", "💘"][Math.floor(Math.random() * 5)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 16 + Math.random() * 28 + "px";
  h.style.animationDuration = 4 + Math.random() * 4 + "s";
  heartsBox.appendChild(h);
  setTimeout(() => h.remove(), 8500);
}

// Rotating love messages
const love = document.getElementById("love");
const messages = [
  "Every moment with you feels like my favorite memory. 💫",
  "You're the reason I smile at my phone like an idiot. 😊",
  "My heart found its home the day I met you. 🏡❤️",
  "You make ordinary days feel magical. ✨",
  "I want to be your person, today and always. 💍",
  "If I had a flower for every time I thought of you, I'd walk in a garden forever. 🌹",
  "With you, I'm the best version of myself. 💞",
];
let mi = 0;
function showMessage() {
  love.classList.add("fade");
  setTimeout(() => {
    love.textContent = messages[mi++ % messages.length];
    love.classList.remove("fade");
  }, 600);
}
showMessage();
const loveTimer = setInterval(showMessage, 3500);

yes.addEventListener("click", () => {
  clearInterval(loveTimer);
  love.classList.remove("fade");
  love.textContent = "You're my today, my tomorrow, and my forever. 💖";
});

// Gentle background hearts from the start
setInterval(spawnHeart, 900);
