// --- HOME PAGE TILES LOGIC ---
const batteryTile = document.querySelector(".batteries");
const accessoryTile = document.querySelector(".accessories");

const batteryImages = ["epower3.jpg", "prius.jpg", "lexus3.jpg"];
const accessoryImages = ["rotor1.jpg", "pump2.jpg", "abs3.jpg"];

let b = 0;
let a = 0;

const updateHomeSlides = () => {
    if (batteryTile) {
        batteryTile.style.backgroundImage = `url(${batteryImages[b]})`;
        b = (b + 1) % batteryImages.length;
    }
    if (accessoryTile) {
        accessoryTile.style.backgroundImage = `url(${accessoryImages[a]})`;
        a = (a + 1) % accessoryImages.length;
    }
};

// Immediate call to remove delay
if (batteryTile || accessoryTile) {
    updateHomeSlides();
    setInterval(updateHomeSlides, 3000);
}

// --- BATTERIES PAGE SLIDER LOGIC ---
const sliders = document.querySelectorAll(".slider");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const slider = entry.target;
        const images = slider.querySelectorAll("img");
        let currentIndex = 0;

        if (entry.isIntersecting) {
            // Start the slideshow
            slider.dataset.intervalId = setInterval(() => {
                images[currentIndex].style.display = "none";
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].style.display = "block";
            }, 3000);
        } else {
            // Stop when out of view
            clearInterval(slider.dataset.intervalId);
        }
    });
}, { threshold: 0.5 });

sliders.forEach(slider => observer.observe(slider));

// --- CART AND CHECKOUT LOGIC ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const count = document.getElementById("count");

if (count) {
    count.innerText = cart.length;
}

document.querySelectorAll(".cart").forEach(btn => {
    btn.onclick = () => {
        let name = btn.closest(".card").dataset.name;

        cart.push(name);

        localStorage.setItem("cart", JSON.stringify(cart));

        document.getElementById("count").innerText = cart.length;
    };
});

const checkoutBtn = document.getElementById("checkout");
if (checkoutBtn) {
    checkoutBtn.onclick = () => {
        let msg = "Hello Mombasa Hybrid Battery Point, I want to buy:\n";
        cart.forEach((item, i) => { msg += (i + 1) + ". " + item + "\n"; });
        let url = "https://wa.me/254748124484?text=" + encodeURIComponent(msg);
        window.open(url, "_blank");
    };
}
document.querySelectorAll(".remove").forEach(btn => {
    btn.onclick = () => {
        let name = btn.closest(".card").dataset.name; 

        let index = cart.lastIndexOf(name);

        if (index !== -1) {
            cart.splice(index, 1);
            document.getElementById("count").innerText = cart.length;
        }
    };
});

document.querySelectorAll(".read").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        const more = card.querySelector(".more");

        if (!more) return;

        more.classList.toggle("hidden");

        btn.textContent = more.classList.contains("hidden")
            ? "Read More"
            : "Show Less";
    });
});