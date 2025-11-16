/* ============================================================
   🌙 DARK MODE TOGGLE
============================================================ */
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.getElementById("themeToggle").textContent =
        document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});


/* ============================================================
   🥗 WEEKLY MENU
============================================================ */
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


/* ============================================================
   🍽️ UPDATE MENU WHEN SELECTING DAY
============================================================ */
function updateMenu() {
    const day = document.getElementById("daySelect").value;

    document.getElementById("breakfastItem").textContent = weeklyMenu[day].breakfast;
    document.getElementById("lunchItem").textContent = weeklyMenu[day].lunch;
    document.getElementById("dinnerItem").textContent = weeklyMenu[day].dinner;
    document.getElementById("drinkItem").textContent = weeklyMenu[day].drink;

    const banner = document.getElementById("menuHeader");
    banner.style.display = "none";
    banner.className = "special-banner";

    if (d
