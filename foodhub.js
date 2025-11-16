//--------------------------------------
// MENU DATA
//--------------------------------------
const menu = {
    Monday: {
        breakfast: "Aloo Paratha + Curd",
        lunch: "Rice, Dal, Mix Veg",
        dinner: "Roti, Egg Curry",
        drink: "Lassi",
        special: ""
    },
    Tuesday: {
        breakfast: "Poha",
        lunch: "Fried Rice + Manchurian",
        dinner: "Khichdi + Papad",
        drink: "Lemon Water",
        special: ""
    },
    Wednesday: {
        breakfast: "Idli Sambhar",
        lunch: "Veg Biryani",
        dinner: "Paneer Masala",
        drink: "Butter Milk",
        special: "🔥 Special Meal Today!"
    },
    Thursday: {
        breakfast: "Dosa",
        lunch: "Rajma Chawal",
        dinner: "Chicken Curry",
        drink: "Juice",
        special: ""
    },
    Friday: {
        breakfast: "Upma",
        lunch: "Mixed Dal Fry",
        dinner: "Roti + Veg Korma",
        drink: "Tea",
        special: ""
    },
    Saturday: {
        breakfast: "Bread Omelette",
        lunch: "Chole Bhature",
        dinner: "Jeera Rice + Veg Curry",
        drink: "Buttermilk",
        special: ""
    },
    Sunday: {
        breakfast: "Poori Sabzi",
        lunch: "Chicken Biryani",
        dinner: "Paneer Tikka",
        drink: "Mocktail",
        special: "🎉 Sunday Special Feast!"
    }
};

//--------------------------------------
// DISPLAY MENU
//--------------------------------------
const daySelect = document.getElementById("daySelect");

function updateMenu() {
    const day = daySelect.value;
    const data = menu[day];

    document.getElementById("breakfastItem").innerText = data.breakfast;
    document.getElementById("lunchItem").innerText = data.lunch;
    document.getElementById("dinnerItem").innerText = data.dinner;
    document.getElementById("drinkItem").innerText = data.drink;

    document.getElementById("menuHeader").innerText = data.special;
}
daySelect.addEventListener("change", updateMenu);
updateMenu();

//--------------------------------------
// DELAY ALERT (Monday lunch & Thursday dinner)
//--------------------------------------
function checkDelay() {
    const day = daySelect.value;
    const alertBox = document.getElementById("delayAlert");

    if (day === "Monday") {
        alertBox.innerText = "⚠️ Lunch may be delayed today!";
        alertBox.style.display = "block";
    } else if (day === "Thursday") {
        alertBox.innerText = "⚠️ Dinner may be delayed today!";
        alertBox.style.display = "block";
    } else {
        alertBox.style.display = "none";
    }
}
daySelect.addEventListener("change", checkDelay);
checkDelay();

//--------------------------------------
// THEME TOGGLE
//--------------------------------------
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

//--------------------------------------
// FEEDBACK FORM
//--------------------------------------
let selectedStars = 0;
let quickRating = "";

// STAR RATING
document.querySelectorAll("#stars span").forEach(star => {
    star.addEventListener("click", () => {
        selectedStars = parseInt(star.dataset.star);

        document.querySelectorAll("#stars span").forEach(s => {
            s.classList.remove("selected");
        });

        for (let i = 0; i < selectedStars; i++) {
            document.querySelectorAll("#stars span")[i].classList.add("selected");
        }
    });
});

// QUICK LIKE / DISLIKE
document.getElementById("likeBtn").onclick = () => quickRating = "Liked";
document.getElementById("dislikeBtn").onclick = () => quickRating = "Disliked";

//--------------------------------------
// PHOTO UPLOAD PREVIEW
//--------------------------------------
document.getElementById("photoInput").addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("photoPreview");

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
});

//--------------------------------------
// SUBMIT FEEDBACK
//--------------------------------------
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const text = document.getElementById("feedbackText").value;
    const day = daySelect.value;
    const time = new Date().toLocaleString();

    let photo = "";
    const file = document.getElementById("photoInput").files[0];
    if (file) photo = URL.createObjectURL(file);

    const feedbackWall = document.getElementById("feedbackWall");

    feedbackWall.innerHTML += `
      <div class="feedback-card">
          <div class="feedback-text">
            <p><strong>${day}</strong> | ⭐ ${selectedStars} | ${quickRating}</p>
            <p>${text}</p>
            <small class="feedback-time">${time}</small>
          </div>

          ${photo ? `<img src="${photo}" class="feedback-photo">` : ""}
      </div>
    `;

    this.reset();
    document.getElementById("photoPreview").style.display = "none";
});

//--------------------------------------
// SUMMARY GENERATION
//--------------------------------------
function generateSummary() {
    const avg = selectedStars || 0;
    document.getElementById("summaryOutput").innerText =
        `⭐ Average Rating Today: ${avg}\n👍 Quick Rating: ${quickRating}`;
}

//--------------------------------------
// MEAL LIKE + RATING SYSTEM
//--------------------------------------
let likedMeals = JSON.parse(localStorage.getItem("likedMeals") || "[]");
let mealRatings = JSON.parse(localStorage.getItem("mealRatings") || "{}");

document.querySelectorAll(".meal-card").forEach(card => {
    const mealName = card.dataset.meal;

    // LIKE MEAL
    card.querySelector(".like-btn").addEventListener("click", () => {
        if (!likedMeals.includes(mealName)) likedMeals.push(mealName);
        localStorage.setItem("likedMeals", JSON.stringify(likedMeals));
        updateStats();
    });

    // RATE MEAL
    card.querySelectorAll(".rate-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const rating = parseInt(btn.dataset.rate);
            mealRatings[mealName] = rating;
            localStorage.setItem("mealRatings", JSON.stringify(mealRatings));
            updateStats();
        });
    });
});

//--------------------------------------
// UPDATE PERSONAL STATS
//--------------------------------------
function updateStats() {
    document.getElementById("likedCount").innerText = likedMeals.length;

    // Average rating
    let total = 0, count = 0;
    for (let meal in mealRatings) {
        total += mealRatings[meal];
        count++;
    }
    const avg = count ? (total / count).toFixed(1) : 0;
    document.getElementById("avgRating").innerText = avg;

    // Favorite meals list
    const favList = document.getElementById("favoriteMeals");
    favList.innerHTML = "";
    likedMeals.forEach(meal => {
        favList.innerHTML += `<li>❤️ ${meal}</li>`;
    });
}

updateStats();

