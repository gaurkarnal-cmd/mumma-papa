// Web Audio API Synthesizer (Cute Chiming Sound Effect)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playCuteChime() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, index) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.08);
    
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime + index * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + index * 0.08 + 0.4);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(audioCtx.currentTime + index * 0.08);
    osc.stop(audioCtx.currentTime + index * 0.08 + 0.4);
  });
}

// Love Level Counter
let loveLevel = 1000;
function boostLove() {
  loveLevel += 500;
  document.getElementById('progressBar').innerText = loveLevel + "% Infinite Love!";
  playCuteChime();
  spawnFloatingElements(['❤️', '💖', '🔥', '✨', '👑'], 20);
}

// Typewriter Effect for Letter
const fullLetterText = "Dear Mummaaa Jii & Papaaa Jii, thank you for making our home the happiest place on earth. Your love, patience, and warmth guide us every day. We love you more than words can express! ❤️✨";
let isTyped = false;

function typeLetter() {
  if (isTyped) return;
  isTyped = true;
  playCuteChime();
  document.getElementById('letterPlaceholder').style.display = 'none';
  const textElem = document.getElementById('typedText');
  let index = 0;
  
  const interval = setInterval(() => {
    textElem.innerText += fullLetterText[index];
    index++;
    if (index >= fullLetterText.length) {
      clearInterval(interval);
      spawnFloatingElements(['💌', '💖', '✨'], 15);
    }
  }, 35);
}

// Checklist Interaction
function handleCheck(wrapper) {
  const checkbox = wrapper.querySelector('input');
  if (checkbox.checked) {
    playCuteChime();
    spawnFloatingElements(['✨', '💖', '🌟'], 8);
  }
}

// Party Mode Toggle
let partyInterval = null;
function togglePartyMode() {
  const body = document.body;
  const btn = document.getElementById('partyBtn');
  body.classList.toggle('party-mode');
  
  if (body.classList.contains('party-mode')) {
    btn.innerText = "🎉 Party Mode: ON";
    playCuteChime();
    partyInterval = setInterval(() => {
      spawnFloatingElements(['🎉', '🥳', '✨', '💖', '🌸'], 5);
    }, 400);
  } else {
    btn.innerText = "🎉 Party Mode: OFF";
    clearInterval(partyInterval);
  }
}

// Random Cute Messages
const cuteMessages = [
  "Mummaaa Jii's cooked food is better than any top hotel! 🍲✨",
  "Papaaa Jii's advice is always 100% right! 🧠💪",
  "Thank you both for always bearing with my tantrums! 😂❤️",
  "Wishing endless health & joy for both of you forever! 🌿🌸",
  "No matter how old I grow, I'll always be your little kid! 🥰"
];

function generateMessage() {
  playCuteChime();
  const box = document.getElementById('complimentBox');
  box.innerText = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
  spawnFloatingElements(['✨', '💌', '🌸'], 8);
}

// Interactive Buttons
function sendSurprise(type) {
  playCuteChime();
  const output = document.getElementById('interactiveOutput');
  if (type === 'hug') {
    output.innerText = "🤗 Giant hug delivered to Mummaaa Jii & Papaaa Jii!";
    spawnFloatingElements(['🤗', '💖'], 15);
  } else if (type === 'tea') {
    output.innerText = "☕ Fresh Chai with extra love & biscuits served!";
    spawnFloatingElements(['☕', '🍪'], 12);
  } else if (type === 'smile') {
    output.innerText = "😊 Always keep smiling! Your smile is our biggest joy!";
    spawnFloatingElements(['😊', '✨'], 15);
  }
}

// Modals & Lightbox
function openModal(id) {
  playCuteChime();
  document.getElementById(id).style.display = 'flex';
  spawnFloatingElements(['🌸', '✨'], 10);
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function openLightbox(imgUrl, title, desc) {
  playCuteChime();
  document.getElementById('lightboxImg').src = imgUrl;
  document.getElementById('lightboxTitle').innerText = title;
  document.getElementById('lightboxDesc').innerText = desc;
  document.getElementById('lightbox').style.display = 'flex';
  spawnFloatingElements(['📸', '💖'], 10);
}
function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }

// Floating Spawner Helper
function spawnFloatingElements(icons, count) {
  for (let i = 0; i < count; i++) {
    const elem = document.createElement('div');
    elem.classList.add('floating-item');
    elem.innerText = icons[Math.floor(Math.random() * icons.length)];
    elem.style.left = Math.random() * 100 + 'vw';
    elem.style.top = (Math.random() * 20 + 80) + 'vh';
    elem.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
    document.body.appendChild(elem);
    setTimeout(() => elem.remove(), 2500);
  }
}