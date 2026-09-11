"use strict";

/* UTILITY HELPERS */
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function on(element, event, callback, options) {
    if (!element) return;
    element.addEventListener(event, callback, options);
}

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

const state = {
    activePopup: null,
    letterOpened: false,
    periodIndex: 0,
    motivationIndex: 0,
    currentTrackIndex: 0
};

/* DOM LOAD INITIALIZATION */
document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializeHeroButton();
    initializeComfortPopup();
    initializePeriodComfort();
    initializeChocolate();
    initializeLoveLetter();
    initializeComfortMachine();
    initializeEnhancedMusicPlayer(); // Upgraded Music Player
    initializeAffirmationsSection();  // New Feature
    initializeLoveCoupons();          // New Feature
    initializeFinalSurprise();
    initializeBackgroundHearts();
    initializeScrollReveal();
    initializeMemoryInteractions();
    initializeKeyboardControls();
    initializeRelationshipTimer();
});

/* NAVIGATION */
function initializeNavigation() {
    $$("[data-scroll]").forEach(button => {
        on(button, "click", () => {
            const targetId = button.dataset.scroll;
            const target = document.getElementById(targetId);
            if (!target) return;

            const navbar = $(".navbar");
            const navbarHeight = navbar ? navbar.offsetHeight + 35 : 30;
            const position = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

            window.scrollTo({
                top: Math.max(0, position),
                behavior: "smooth"
            });
        });
    });

    const navHeart = $("#navHeart");
    on(navHeart, "click", event => {
        createHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 20);
    });
}

/* HERO BUTTON */
function initializeHeroButton() {
    const enterButton = $("#enterButton");
    on(enterButton, "click", event => {
        const comfortSection = $("#comfort");
        if (comfortSection) {
            comfortSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        createHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 18);
    });
}

/* COMFORT POPUP SYSTEM */
function initializeComfortPopup() {
    const popup = $("#comfortPopup");
    if (!popup) return;

    const closeButton = $("#comfortClose");
    const contentMap = {
        hugCard: "hugContent",
        kittyCard: "kittyContent",
        miniChocolateCard: "miniChocolateContent",
        restCard: "restContent",
        musicCard: "musicContent",
        motivationCard: "motivationContent"
    };

    function openComfort(contentId) {
        $$(".popup-content", popup).forEach(content => content.classList.remove("active"));
        const selectedContent = document.getElementById(contentId);
        if (selectedContent) selectedContent.classList.add("active");

        popup.classList.add("show");
        state.activePopup = contentId;
        document.body.style.overflow = "hidden";
    }

    function closeComfort() {
        popup.classList.remove("show");
        state.activePopup = null;
        document.body.style.overflow = "";
    }

    Object.entries(contentMap).forEach(([cardId, contentId]) => {
        const card = document.getElementById(cardId);
        on(card, "click", event => {
            openComfort(contentId);
            createHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 12);

            if (cardId === "kittyCard") showRandomKitty();
            if (cardId === "miniChocolateCard") createChocolateRain(14);
        });
    });

    on(closeButton, "click", closeComfort);
    on(popup, "click", event => {
        if (event.target === popup) closeComfort();
    });

    on($("#hugAgain"), "click", event => {
        createHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 30);
        const hugAgain = $("#hugAgain");
        if (!hugAgain) return;
        const originalText = hugAgain.textContent;
        hugAgain.textContent = "🫂 Biggest hug sent! 💗";
        setTimeout(() => { hugAgain.textContent = originalText; }, 1800);
    });

    on($("#moreKitty"), "click", event => {
        showRandomKitty();
        createHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 10);
    });

    on($("#moreChocolate"), "click", () => createChocolateRain(25));

    on($("#restAgain"), "click", event => {
        const restAgain = $("#restAgain");
        if (!restAgain) return;
        const originalText = restAgain.textContent;
        restAgain.textContent = "💗 Good. Rest mode activated.";
        createHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 12);
        setTimeout(() => { restAgain.textContent = originalText; }, 2000);
    });

    on($("#musicGo"), "click", () => {
        closeComfort();
        setTimeout(() => {
            const musicSection = $("#music");
            if (musicSection) musicSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 250);
    });

    const motivations = [
        "You don't need to have everything figured out today. 💗",
        "You are doing better than you think, Babuuu. 🌷",
        "Take things one small step at a time. 🧸",
        "You deserve kindness, especially from yourself. 💕",
        "A difficult day does not mean a bad life. 🎀",
        "Motuu is very proud of you. Always. 💗",
        "You are allowed to rest without feeling guilty. 🌸"
    ];

    on($("#newMotivation"), "click", () => {
        const motivationText = $("#motivationText");
        if (!motivationText) return;
        motivationText.style.opacity = "0";
        setTimeout(() => {
            motivationText.textContent = motivations[state.motivationIndex % motivations.length];
            state.motivationIndex++;
            motivationText.style.opacity = "1";
        }, 180);
    });
}

/* KITTY SYSTEM */
function showRandomKitty() {
    const kittyImage = $("#popupKittyImage");
    const kittyCaption = $("#kittyCaption");
    const images = ["images/kitty1.jpg", "images/kitty2.jpg", "images/images.jpeg"];
    const captions = [
        "Tiny kitty has arrived. 🐱🎀",
        "Maximum comfort kitty delivery. 🧸",
        "This kitty came specially for Babuuu. 💗",
        "Emergency cuteness has been deployed. 🐱",
        "Motuu ordered another tiny baby. 🥺"
    ];

    if (kittyImage) kittyImage.src = randomItem(images);
    if (kittyCaption) kittyCaption.textContent = randomItem(captions);
}

/* PERIOD COMFORT CENTER */
function initializePeriodComfort() {
    const periodButton = $("#periodComfortButton");
    const result = $("#periodResult");
    if (!periodButton) return;

    const messages = [
        "You deserve a soft and gentle day. 🧸💗",
        "Take things slowly today. Rest is completely allowed. 🌷",
        "A little warmth, water and comfort can make the day feel softer. 💕",
        "You don't have to be productive every minute. 🫂",
        "Be extra kind to yourself today, Babuuu. 🌸",
        "Your comfort matters. Take care of yourself. 💗",
        "Motuu is sending maximum comfort energy. 🧸✨"
    ];

    on(periodButton, "click", event => {
        if (result) {
            result.style.opacity = "0";
            setTimeout(() => {
                result.textContent = messages[state.periodIndex % messages.length];
                state.periodIndex++;
                result.classList.add("show");
                result.style.opacity = "1";
            }, 150);
        }
        createHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 15);
    });
}

/* CHOCOLATE SECTION */
function initializeChocolate() {
    const chocolateButton = $("#chocolateButton");
    const result = $("#chocolateResult");
    if (!chocolateButton) return;

    const messages = [
        "🍫 Chocolate delivery successful! 💗",
        "Emergency happiness supply activated. 🍫✨",
        "One chocolate break coming right up! 🥺🍫",
        "Chocolate department says: approved. 💕",
        "Bournville Fruit & Nut has been officially reserved. 🍫"
    ];

    on(chocolateButton, "click", event => {
        if (result) {
            result.textContent = randomItem(messages);
            result.style.opacity = "1";
        }
        createChocolateRain(22);
        createHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 14);
    });
}

/* CHOCOLATE RAIN EFFECT */
function createChocolateRain(amount = 20) {
    const symbols = ["🍫", "🤎", "✨", "🍫"];
    for (let i = 0; i < amount; i++) {
        const item = document.createElement("span");
        item.className = "chocolate-rain";
        item.textContent = randomItem(symbols);
        item.style.position = "fixed";
        item.style.left = `${Math.random() * 100}vw`;
        item.style.top = "-40px";
        item.style.zIndex = "9999";
        item.style.pointerEvents = "none";
        item.style.fontSize = `${18 + Math.random() * 18}px`;
        document.body.appendChild(item);

        requestAnimationFrame(() => {
            item.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720 - 360}deg)`;
            item.style.opacity = "0";
        });

        setTimeout(() => item.remove(), 3000);
    }
}

/* LOVE LETTER */
function initializeLoveLetter() {
    const envelope = $("#envelope");
    const letter = $("#letter");
    if (!envelope || !letter) return;

    on(envelope, "click", event => {
        envelope.classList.add("open");
        createHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 24);

        setTimeout(() => {
            letter.classList.add("show");
            setTimeout(() => {
                letter.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
        }, 300);
    });
}

/* RELATIONSHIP LIVE TIMER */
function initializeRelationshipTimer() {
    const startDate = new Date("2025-08-30T00:00:00");

    function updateCounter() {
        const elMonths = $("#timeMonths");
        const elDays = $("#timeDays");
        const elHours = $("#timeHours");
        const elSeconds = $("#timeSeconds");

        if (!elMonths || !elDays || !elHours || !elSeconds) return;

        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) return;

        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(totalDays / 30.4375);
        const days = Math.floor(totalDays % 30.4375);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const seconds = Math.floor((diff / 1000) % 60);

        elMonths.textContent = months;
        elDays.textContent = days;
        elHours.textContent = hours;
        elSeconds.textContent = seconds;
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}

/* COMFORT MACHINE */
function initializeComfortMachine() {
    const button = $("#comfortButton");
    const result = $("#comfortResult");
    if (!button) return;

    const messages = [
        "Idhar aao Babuuu 🫂💗",
        "Motuu is sending you the biggest virtual hug. 🧸",
        "No pressure. One tiny step at a time. 🌷",
        "You deserve a soft, peaceful evening. 🎀",
        "Emergency kitty has been dispatched. 🐱",
        "One little smile for your Motuu? 🥺💗",
        "You are very, very loved. 💕"
    ];

    on(button, "click", event => {
        if (result) result.textContent = randomItem(messages);
        createHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 16);
    });
}

/* HIGH-END INTERACTIVE MUSIC PLAYER */
function initializeEnhancedMusicPlayer() {
    const audio = $("#audio");
    if (!audio) return;

    // DOM Elements
    const playPauseBtn = $("#playPauseBtn");
    const playIcon = $("#playIcon");
    const pauseIcon = $("#pauseIcon");
    const prevBtn = $("#prevTrackBtn");
    const nextBtn = $("#nextTrackBtn");
    const progressContainer = $("#progressContainer");
    const progressFill = $("#progressFill");
    const currentTimeEl = $("#currentTime");
    const durationEl = $("#durationTime");
    const volumeSlider = $("#volumeSlider");
    const trackTitle = $("#trackTitle");
    const trackArtist = $("#trackArtist");
    const playlistContainer = $("#playlistItems");
    const musicCard = $(".music-card");

    // Custom Playlist (Add your track paths and info here)
    const playlist = [
        { title: "Our Favorite Track", artist: "For Babuuu 💗", src: "music/song.mp3" },
        { title: "Comfort Melody", artist: "Motuu's Hug 🧸", src: "music/song.mp3" },
        { title: "Late Night Talks", artist: "Peaceful Vibe ✨", src: "music/song.mp3" }
    ];

    function renderPlaylist() {
        if (!playlistContainer) return;
        playlistContainer.innerHTML = "";

        playlist.forEach((track, index) => {
            const item = document.createElement("div");
            item.className = `playlist-item ${index === state.currentTrackIndex ? "active" : ""}`;
            item.innerHTML = `
                <span>${index + 1}. ${track.title}</span>
                <small>${track.artist}</small>
            `;
            on(item, "click", () => {
                state.currentTrackIndex = index;
                loadTrack(state.currentTrackIndex);
                audio.play().catch(() => {});
            });
            playlistContainer.appendChild(item);
        });
    }

    function loadTrack(index) {
        if (playlist[index]) {
            audio.src = playlist[index].src;
            if (trackTitle) trackTitle.textContent = playlist[index].title;
            if (trackArtist) trackArtist.textContent = playlist[index].artist;
            renderPlaylist();
        }
    }

    function togglePlay() {
        if (audio.paused) {
            audio.play().catch(() => {});
        } else {
            audio.pause();
        }
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    // Event Listeners
    on(playPauseBtn, "click", togglePlay);

    on(prevBtn, "click", () => {
        state.currentTrackIndex = (state.currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(state.currentTrackIndex);
        audio.play().catch(() => {});
    });

    on(nextBtn, "click", () => {
        state.currentTrackIndex = (state.currentTrackIndex + 1) % playlist.length;
        loadTrack(state.currentTrackIndex);
        audio.play().catch(() => {});
    });

    on(audio, "timeupdate", () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            if (progressFill) progressFill.style.width = `${percent}%`;
            if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
            if (durationEl) durationEl.textContent = formatTime(audio.duration);
        }
    });

    // Custom Bar Scrubbing
    on(progressContainer, "click", event => {
        const rect = progressContainer.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        if (audio.duration) {
            audio.currentTime = (clickX / width) * audio.duration;
        }
    });

    on(volumeSlider, "input", () => {
        audio.volume = volumeSlider.value / 100;
    });

    on(audio, "play", () => {
        if (playIcon) playIcon.classList.add("hidden");
        if (pauseIcon) pauseIcon.classList.remove("hidden");
        if (musicCard) musicCard.classList.add("playing");
    });

    on(audio, "pause", () => {
        if (playIcon) playIcon.classList.remove("hidden");
        if (pauseIcon) pauseIcon.classList.add("hidden");
        if (musicCard) musicCard.classList.remove("playing");
    });

    on(audio, "ended", () => {
        // Auto-play next track when complete
        state.currentTrackIndex = (state.currentTrackIndex + 1) % playlist.length;
        loadTrack(state.currentTrackIndex);
        audio.play().catch(() => {});
    });

    // Initial setup
    loadTrack(state.currentTrackIndex);
}

/* NEW FEATURE: DAILY AFFIRMATIONS & LOVE NOTES GENERATOR */
function initializeAffirmationsSection() {
    const generateBtn = $("#generateAffirmationBtn");
    const displayEl = $("#affirmationDisplay");
    const copyBtn = $("#copyAffirmationBtn");

    if (!generateBtn || !displayEl) return;

    const affirmations = [
        "Your smile is literally Motuu's favorite thing in the whole world. ✨",
        "You are stronger than any difficult day or heavy feeling. 💗",
        "Even on quiet days, you bring so much warmth to my life. 🌷",
        "Sending you an infinite supply of gentle hugs and comfort right now. 🧸",
        "Remember to breathe, relax your shoulders, and drink some water. 🌸",
        "No matter what happens, Motuu will always be right here cheering for you! 🫂"
    ];

    on(generateBtn, "click", event => {
        displayEl.style.opacity = "0";
        setTimeout(() => {
            displayEl.textContent = randomItem(affirmations);
            displayEl.style.opacity = "1";
        }, 200);
        createHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 12);
    });

    on(copyBtn, "click", () => {
        if (!displayEl.textContent) return;
        navigator.clipboard.writeText(displayEl.textContent).then(() => {
            const original = copyBtn.textContent;
            copyBtn.textContent = "Copied! 💗";
            setTimeout(() => { copyBtn.textContent = original; }, 1500);
        });
    });
}

/* NEW FEATURE: INTERACTIVE LOVE COUPONS */
function initializeLoveCoupons() {
    const coupons = $$(".love-coupon");
    if (!coupons.length) return;

    coupons.forEach(coupon => {
        on(coupon, "click", event => {
            if (coupon.classList.contains("redeemed")) return;

            coupon.classList.add("redeemed");
            const statusTag = $(".coupon-status", coupon);
            if (statusTag) statusTag.textContent = "REDEEMED 💖";

            createHeartBurst(event.clientX, event.clientY, 20);
        });
    });
}

/* FINAL SURPRISE */
function initializeFinalSurprise() {
    const finalButton = $("#finalButton");
    const popup = $("#finalPopup");
    const closeButton = $("#closePopup");
    if (!finalButton || !popup) return;

    function openFinalPopup() {
        popup.classList.add("show");
        document.body.style.overflow = "hidden";
        createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 45);
    }

    function closeFinalPopup() {
        popup.classList.remove("show");
        document.body.style.overflow = "";
    }

    on(finalButton, "click", openFinalPopup);
    on(closeButton, "click", closeFinalPopup);
    on(popup, "click", event => {
        if (event.target === popup) closeFinalPopup();
    });
}

/* HEART BURST EFFECT */
function createHeartBurst(x, y, amount = 15) {
    const hearts = ["💗", "💕", "💖", "💞", "♡", "✨"];

    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("span");
        heart.className = "heart-burst";
        heart.textContent = randomItem(hearts);

        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 130;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        heart.style.position = "fixed";
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.zIndex = "9999";
        heart.style.pointerEvents = "none";

        document.body.appendChild(heart);

        heart.animate([
            { transform: "translate(-50%, -50%) scale(.5)", opacity: 1 },
            { transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(1.2) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 900 + Math.random() * 500,
            easing: "cubic-bezier(.2,.8,.2,1)"
        });

        setTimeout(() => heart.remove(), 1400);
    }
}

/* BACKGROUND HEARTS */
function initializeBackgroundHearts() {
    const container = $("#backgroundHearts");
    if (!container) return;

    const symbols = ["♡", "💗", "💕", "✦", "🌸"];

    function createFloatingHeart() {
        if (document.hidden) return;
        const heart = document.createElement("span");
        heart.textContent = randomItem(symbols);
        heart.style.position = "fixed";
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.bottom = "-40px";
        heart.style.zIndex = "0";
        heart.style.pointerEvents = "none";
        heart.style.opacity = `${0.25 + Math.random() * 0.35}`;
        heart.style.fontSize = `${14 + Math.random() * 20}px`;

        container.appendChild(heart);

        requestAnimationFrame(() => {
            heart.style.transition = "transform 12s linear, opacity 12s linear";
            heart.style.transform = `translateY(-${window.innerHeight + 100}px) translateX(${Math.random() * 160 - 80}px) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = "0";
        });

        setTimeout(() => heart.remove(), 12500);
    }

    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 700);
    }
    setInterval(createFloatingHeart, 1800);
}

/* MEMORY CLICK INTERACTION */
function initializeMemoryInteractions() {
    $$(".polaroid, .memory-card, .chocolate-image").forEach(element => {
        on(element, "click", event => {
            createHeartBurst(event.clientX, event.clientY, 8);
        });
    });
}

/* SCROLL REVEAL ANIMATION */
function initializeScrollReveal() {
    const elements = $$(".section, .final-card, .comfort-box, .coupon-card");
    if (!("IntersectionObserver" in window)) return;

    elements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition = "opacity .7s ease, transform .7s ease";
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
}

/* KEYBOARD SHORTCUTS */
function initializeKeyboardControls() {
    on(document, "keydown", event => {
        if (event.key === "Escape") {
            $$(".comfort-popup.show, .popup.show").forEach(popup => popup.classList.remove("show"));
            document.body.style.overflow = "";
        }

        if (event.key.toLowerCase() === "h" && !event.ctrlKey && !event.metaKey) {
            createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 15);
        }
    });
}

/* IMAGE ERROR HANDLING */
$$("img").forEach(image => {
    on(image, "error", () => {
        image.style.background = "#fff0f6";
        image.style.minHeight = "150px";
        image.alt = "Image could not load";
    });
});