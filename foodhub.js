/* ====== DARK MODE TOGGLE ====== */
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        document.getElementById("themeToggle").textContent = "☀️";
    } else {
        document.getElementById("themeToggle").textContent = "🌙";
    }
});

/* ====== MENU DATA ====== */
const weeklyMenu = {
    Monday: {
        breakfast: "Idli + Sambar",
        lunch: "Rice + Dal + Veg Curry",
        dinner: "Roti + Chicken Curry",
        drink: "Lassi"
    },
    Tuesday: {
        breakfast: "Poha",
        lunch: "Rajma Chawal",
        dinner: "Fried Rice + Manchurian",
        drink: "Juice"
    },
    Wednesday: {
        breakfast: "Masala Dosa ⭐",
        lunch: "Veg Biryani ⭐",
        dinner: "Paneer Tikka ⭐",
        drink: "Badam Milk"
    },
    Thursday: {
        breakfast: "Aloo Paratha",
        lunch: "Khichdi",
        dinner: "Roti + Egg Curry",
        drink: "Nimbu Pani"
    },
    Friday: {
        breakfast: "Upma",
        lunch: "Dal Tadka",
        dinner: "Pulao + Chicken Fry",
        drink: "Sweet Lassi"
    },
    Saturday: {
        breakfast: "Chole Bhature",
        lunch: "Curd Rice",
        dinner: "Veg Manchurian",
        drink: "Lemon Soda"
    },
    Sunday: {
        breakfast: "Poori Sabji ⭐",
        lunch: "Hyderabadi Biryani ⭐",
        dinner: "Paneer Butter Masala ⭐",
        drink: "Cold Coffee"
    }
};

/* ====== DISPLAY MENU ====== */
function updateMenu() {
    const day = document.getElementById("daySelect").value;

    document.getElementById("breakfastItem").textContent = weeklyMenu[day].breakfast;
    document.getElementById("lunchItem").textContent = weeklyMenu[day].lunch;
    document.getElementById("dinnerItem").textContent = weeklyMenu[day].dinner;
    document.getElementById("drinkItem").textContent = weeklyMenu[day].drink;

    const banner = document.getElementById("menuHeader");
    banner.style.display = "none";
    banner.className = "special-banner";

    if (day === "Wednesday") {
        banner.style.display = "block";
        banner.classList.add("wed-special");
        banner.textContent = "💚 Wednesday Special Menu!";
    }

    if (day === "Sunday") {
        banner.style.display = "block";
        banner.classList.add("sun-special");
        banner.textContent = "🌟 Sunday Special Menu!";
    }

    checkDelay(day);
}

document.getElementById("daySelect").addEventListener("change", updateMenu);
updateMenu();

/* ====== DELAYS ====== */
function checkDelay(day) {
    const alertBox = document.getElementById("delayAlert");

    if (day === "Monday") {
        alertBox.style.display = "block";
        alertBox.innerHTML = "⚠️ <b>Important Notice:</b> Lunch may be delayed today.";
    } 
    else if (day === "Thursday") {
        alertBox.style.display = "block";
        alertBox.innerHTML = "⚠️ <b>Important Notice:</b> Dinner may be delayed today.";
    } 
    else {
        alertBox.style.display = "none";
    }
}


/* ====== FAVORITE MEALS ====== */
let favoriteMeals = JSON.parse(localStorage.getItem("favorites")) || [];
let ratings = JSON.parse(localStorage.getItem("ratings")) || [];

/* Like a meal */
document.querySelector(".like-btn").addEventListener("click", () => {
    const mealName = document.querySelector(".meal-card").dataset.meal;

    if (!favoriteMeals.includes(mealName)) {
        favoriteMeals.push(mealName);
        localStorage.setItem("favorites", JSON.stringify(favoriteMeals));
        updateFavorites();
    }
});

/* Rating for meal */
document.querySelectorAll(".rate-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const rateValue = Number(btn.dataset.rate);
        ratings.push(rateValue);
        localStorage.setItem("ratings", JSON.stringify(ratings));
        updateStats();
    });
});

/* Update UI */
function updateFavorites() {
    const list = document.getElementById("favoriteMeals");
    list.innerHTML = "";

    favoriteMeals.forEach(meal => {
        const li = document.createElement("li");
        li.textContent = `❤️ ${meal}`;
        list.appendChild(li);
    });
}

function updateStats() {
    document.getElementById("likedCount").textContent = favoriteMeals.length;

    if (ratings.length === 0) {
        document.getElementById("avgRating").textContent = "0";
    } else {
        const avg = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
        document.getElementById("avgRating").textContent = avg;
    }
}

updateFavorites();
updateStats();
