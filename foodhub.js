/* ============================================================
   THEME TOGGLE
============================================================ */
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

/* ============================================================
   QUICK LIKE / DISLIKE BUTTONS
============================================================ */
document.getElementById("likeBtn").addEventListener("click", () => {
    alert("You liked today's meal! ❤️");
});

document.getElementById("dislikeBtn").addEventListener("click", () => {
    alert("You disliked today's meal 😢");
});

/* ============================================================
   MAIN FEEDBACK STAR RATING
============================================================ */
const starContainer = document.getElementById("stars");
const stars = starContainer.querySelectorAll("span");
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener("click", () => {
        selectedRating = star.dataset.star;

        // Reset all stars
        stars.forEach(s => s.classList.remove("selected"));

        // Highlight selected stars
        for (let i = 0; i < selectedRating; i++) {
            stars[i].classList.add("selected");
        }

        alert(`You rated today's meal ${selectedRating} ⭐`);
    });
});

/* ============================================================
   PHOTO PREVIEW
============================================================ */
document.getElementById("photoInput").addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("photoPreview");

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
});

/* ============================================================
   INDIVIDUAL MEALS → LIKE BUTTONS
============================================================ */
document.querySelectorAll(".like-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const meal = btn.parentElement.dataset.meal;
        alert(`You liked ${meal}! ❤️`);
    });
});

/* ============================================================
   INDIVIDUAL MEALS → STAR RATING
============================================================ */
document.querySelectorAll(".meal-card").forEach(card => {
    const stars = card.querySelectorAll(".rate-btn");

    stars.forEach(star => {
        star.addEventListener("click", () => {
            let rating = star.dataset.rate;

            // Remove previous selection
            stars.forEach(s => s.classList.remove("selected"));

            // Highlight selected stars
            stars.forEach(s => {
                if (s.dataset.rate <= rating) {
                    s.classList.add("selected");
                }
            });

            alert(`You rated ${card.dataset.meal} ${rating} ⭐`);
        });
    });
});

/* ============================================================
   FEEDBACK FORM SUBMIT
============================================================ */
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Feedback submitted successfully! 🎉");
});

// Meal Star Rating (kept fully separate from special meal)
document.querySelectorAll(".meal-card").forEach(card => {
    const stars = card.querySelectorAll(".rate-btn");

    stars.forEach(star => {
        star.addEventListener("click", () => {
            const rating = star.dataset.rate;

            // Reset previous stars
            stars.forEach(s => s.classList.remove("selected"));

            // Highlight correct stars
            stars.forEach(s => {
                if (s.dataset.rate <= rating) {
                    s.classList.add("selected");
                }
            });

            alert(`You rated ${card.dataset.meal} ${rating} ⭐`);
        });
    });
});

document.getElementById("daySelect").addEventListener("change", updateMenu);

function updateMenu() {
    const day = document.getElementById("daySelect").value;

    const breakfast = document.getElementById("breakfastItem");
    const lunch = document.getElementById("lunchItem");
    const dinner = document.getElementById("dinnerItem");
    const drink = document.getElementById("drinkItem");

    const banner = document.getElementById("menuHeader");
    const delayAlert = document.getElementById("delayAlert");

    // Reset
    banner.innerHTML = "";
    delayAlert.style.display = "none";

    // -----------------------------
    // DAILY MENU DATA
    // -----------------------------
    const menu = {
        Monday: {
            breakfast: "Aloo Paratha with Curd",
            lunch: "Dal Tadka + Rice + Veg Fry",
            dinner: "Roti + Chicken Curry",
            drink: "Lassi"
        },
        Tuesday: {
            breakfast: "Idli & Sambhar",
            lunch: "Rajma Chawal",
            dinner: "Roti + Paneer Masala",
            drink: "Lemon Water"
        },
        Wednesday: {
            breakfast: "Poori Bhaji",
            lunch: "Veg Biryani, Raita",
            dinner: "Dal + Roti + Mix Veg",
            drink: "Buttermilk"
        },
        Thursday: {
            breakfast: "Upma & Chutney",
            lunch: "Chole + Rice",
            dinner: "Roti + Egg Curry",
            drink: "Mango Shake"
        },
        Friday: {
            breakfast: "Masala Dosa",
            lunch: "Fish Curry + Rice",
            dinner: "Roti + Paneer Do Pyaza",
            drink: "Jaljeera"
        },
        Saturday: {
            breakfast: "Bread Omelette",
            lunch: "Fried Rice + Manchurian",
            dinner: "Khichdi + Papad",
            drink: "Cold Coffee"
        },
        Sunday: {
            breakfast: "Chole Bhature",
            lunch: "Paneer Butter Masala + Naan",
            dinner: "Veg Pulao + Raita",
            drink: "Rose Milk"
        }
    };

    // -----------------------------
    // SET MENU
    // -----------------------------
    breakfast.innerHTML = menu[day].breakfast;
    lunch.innerHTML = menu[day].lunch;
    dinner.innerHTML = menu[day].dinner;
    drink.innerHTML = menu[day].drink;

    // -----------------------------
    // SPECIAL MENU (banner)
    // -----------------------------
    if (day === "Wednesday") {
        banner.innerHTML = "🌟 Special Menu Today: Veg Biryani, Raita & Gulab Jamun";
    }

    if (day === "Sunday") {
        banner.innerHTML = "🌟 Special Menu Today: Paneer Butter Masala, Naan & Kheer";
    }

    // -----------------------------
    // FOOD DELAY ALERTS
    // -----------------------------
    if (day === "Monday") {
        delayAlert.innerHTML = "⚠️ Lunch is delayed by 15 minutes today.";
        delayAlert.style.display = "block";
    }

    if (day === "Thursday") {
        delayAlert.innerHTML = "⚠️ Dinner is delayed today due to late supplies.";
        delayAlert.style.display = "block";
    }
}

// Call once on page load
updateMenu();
