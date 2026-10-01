const modal = document.getElementById("memoryModal");
const memoryBox = document.getElementById("memoryBox");
const track = document.getElementById("galleryTrack");
const cards = [...document.querySelectorAll(".photo-card")];
let galleryIndex = 1;

function openWish() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    celebrate(false);
}

function closeWish() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeWish();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeWish();
});

document.querySelectorAll(".balloon").forEach(balloon => {
    balloon.addEventListener("click", () => {
        memoryBox.textContent = balloon.dataset.memory;
        memoryBox.style.transform = "scale(1.03)";
        setTimeout(() => memoryBox.style.transform = "scale(1)", 220);

        balloon.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(1.16) rotate(6deg)" },
                { transform: "scale(.92)" },
                { transform: "scale(1)" }
            ],
            { duration: 500, easing: "ease-out" }
        );
    });
});

function updateGallery() {
    cards.forEach((card, i) => card.classList.toggle("active", i === galleryIndex));

    if (window.innerWidth <= 700) {
        const cardWidth = cards[0].offsetWidth + 22;
        track.style.transform = `translateX(${-galleryIndex * cardWidth + 18}px)`;
    } else {
        track.style.transform = `translateX(${(1 - galleryIndex) * 145}px)`;
    }
}

function moveGallery(direction) {
    galleryIndex += direction;
    if (galleryIndex < 0) galleryIndex = cards.length - 1;
    if (galleryIndex >= cards.length) galleryIndex = 0;
    updateGallery();
}

window.addEventListener("resize", updateGallery);
updateGallery();

// Touch / mouse drag for the gallery
let startX = null;

track.addEventListener("pointerdown", e => {
    startX = e.clientX;
    track.setPointerCapture?.(e.pointerId);
});

track.addEventListener("pointerup", e => {
    if (startX === null) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 45) moveGallery(diff < 0 ? 1 : -1);
    startX = null;
});

function celebrate(showMessage = true) {
    const finalMessage = document.getElementById("final-message");
    if (showMessage) {
        finalMessage.textContent = "✨ Wish made! May your dreams come true. ✨";
    }

    const container = document.getElementById("confetti");
    for (let i = 0; i < 90; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.animationDelay = Math.random() * .7 + "s";
        piece.style.animationDuration = 2.2 + Math.random() * 2 + "s";
        piece.style.background = [
            "#f5c6cf", "#e7a3b0", "#fff0d9", "#c87c8d", "#8f354d"
        ][Math.floor(Math.random() * 5)];
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 4500);
    }
}
