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
/* ============================================================
   FEEDBACK SYSTEM – SAVE + DISPLAY + SUMMARY
============================================================ */

let allFeedback = JSON.parse(localStorage.getItem("allFeedback") || "[]");

/* -----------------------------
   SUBMIT FEEDBACK
----------------------------- */
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const feedbackText = document.getElementById("feedbackText").value;
    const rating = selectedRating;
    const fileInput = document.getElementById("photoInput");
    let photoURL = "";

    if (fileInput.files[0]) {
        photoURL = URL.createObjectURL(fileInput.files[0]);
    }

    const feedbackEntry = {
        text: feedbackText || "(No written feedback)",
        rating: rating,
        photo: photoURL,
        time: new Date().toLocaleString()
    };

    allFeedback.push(feedbackEntry);
    localStorage.setItem("allFeedback", JSON.stringify(allFeedback));

    //alert("Feedback submitted successfully! 🎉");

    displayFeedbackWall();
    generateSummary();

    document.getElementById("feedbackForm").reset();
    document.getElementById("photoPreview").style.display = "none";
    selectedRating = 0;
    stars.forEach(s => s.classList.remove("selected"));
});

/* -----------------------------
   DISPLAY FEEDBACK WALL
----------------------------- */
function displayFeedbackWall() {
    const wall = document.getElementById("feedbackWall");
    wall.innerHTML = "";

    allFeedback.forEach(item => {
        const div = document.createElement("div");
        div.className = "feedback-card";

        div.innerHTML = `
            <div class="feedback-text">
                <p><strong>Rating:</strong> ${item.rating} ⭐</p>
                <p>${item.text}</p>
                <p class="feedback-time">${item.time}</p>
            </div>
            ${item.photo ? `<img src="${item.photo}" class="feedback-photo">` : ""}
        `;

        wall.appendChild(div);
    });
}

/* -----------------------------
   SUMMARY GENERATION
----------------------------- */
function generateSummary() {
    const output = document.getElementById("summaryOutput");

    if (allFeedback.length === 0) {
        output.innerText = "No feedback submitted yet.";
        return;
    }

    const avg =
        (allFeedback.reduce((sum, f) => sum + Number(f.rating), 0) /
            allFeedback.length).toFixed(1);

    output.innerHTML = `
        <strong>Total feedback entries:</strong> ${allFeedback.length}<br>
        <strong>Average star rating:</strong> ${avg} ⭐
    `;
}

/* -----------------------------
   INITIAL LOAD
----------------------------- */
displayFeedbackWall();
generateSummary();
/* ============================================================
   PERSONAL FOOD STATS (LIKES + AVG RATING)  — FIXED
============================================================ */

let likedMeals = JSON.parse(localStorage.getItem("likedMeals") || "[]");
let mealRatings = JSON.parse(localStorage.getItem("mealRatings") || "{}");

// Attach listeners only AFTER HTML is ready
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".meal-card").forEach(card => {
        const mealName = card.dataset.meal;

        // LIKE BUTTON
        const likeBtn = card.querySelector(".like-btn");
        likeBtn.addEventListener("click", () => {
            if (!likedMeals.includes(mealName)) {
                likedMeals.push(mealName);
                localStorage.setItem("likedMeals", JSON.stringify(likedMeals));
                updateFoodStats();
            }
        });

        // STAR RATINGS
        card.querySelectorAll(".rate-btn").forEach(star => {
            star.addEventListener("click", () => {
                const rating = parseInt(star.dataset.rate);

                mealRatings[mealName] = rating;
                localStorage.setItem("mealRatings", JSON.stringify(mealRatings));

                updateFoodStats();
            });
        });
    });

    updateFoodStats();
});


/* Update “My Food Stats” section */
function updateFoodStats() {
    // Meals liked count
    document.getElementById("likedCount").innerText = likedMeals.length;

    // Average rating
    let total = 0, count = 0;
    Object.values(mealRatings).forEach(r => {
        total += r;
        count++;
    });

    document.getElementById("avgRating").innerText =
        count ? (total / count).toFixed(1) : 0;

    // Favorite meal list
    const favList = document.getElementById("favoriteMeals");
    favList.innerHTML = "";

    likedMeals.forEach(meal => {
        favList.innerHTML += `<li>❤️ ${meal}</li>`;
    });
}
