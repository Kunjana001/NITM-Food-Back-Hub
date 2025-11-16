// -------------------- MENU DATA --------------------
const weeklyMenu = {
  Monday:    { breakfast: "Poori Sabji", lunch: "Dal, Rice, Aloo Fry", dinner: "Roti, Paneer Curry", drink: "Lassi" },
  Tuesday:   { breakfast: "Idli Sambhar", lunch: "Rajma Rice", dinner: "Roti, Chicken Curry", drink: "Buttermilk" },
  Wednesday: { breakfast: "Upma", lunch: "Curd Rice", dinner: "Veg Biryani", drink: "Juice" },
  Thursday:  { breakfast: "Aloo Paratha", lunch: "Dal Fry, Rice", dinner: "Roti, Egg Curry", drink: "Buttermilk" },
  Friday:    { breakfast: "Dosa", lunch: "Chole Rice", dinner: "Roti, Paneer Masala", drink: "Lime Juice" },
  Saturday:  { breakfast: "Poha", lunch: "Veg Thali", dinner: "Chicken Biryani", drink: "Milkshake" },
  Sunday:    { breakfast: "Chole Bhature", lunch: "Fried Rice", dinner: "Roti, Mixed Veg", drink: "Juice" }
};

// -------------------- LOAD MENU --------------------
function loadMenu(day) {
  const menu = weeklyMenu[day];

  document.getElementById("breakfastItem").innerText = menu.breakfast;
  document.getElementById("lunchItem").innerText = menu.lunch;
  document.getElementById("dinnerItem").innerText = menu.dinner;
  document.getElementById("drinkItem").innerText = menu.drink;

  document.getElementById("menuHeader").innerText = `${day}'s Special 🍽️`;
}

document.getElementById("daySelect").addEventListener("change", (e) => {
  loadMenu(e.target.value);
});

loadMenu("Monday");

// -------------------- THEME SWITCH (FIXED) --------------------
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  // Save theme so it stays after reload
  const mode = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("themeMode", mode);
});

// Load previous theme
if (localStorage.getItem("themeMode") === "dark") {
  document.body.classList.add("dark-theme");
}

// -------------------- STAR RATING --------------------
let selectedStars = 0;
// LIKE BUTTON POPUP
document.querySelectorAll(".like-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    let meal = btn.closest(".meal-card").dataset.meal;

    likedCount++;
    document.getElementById("likedCount").innerText = likedCount;

    alert(`❤️ You liked ${meal}!`);
  });
});

// STAR RATING POPUP
document.querySelectorAll(".rate-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    let stars = Number(btn.dataset.rate);
    let meal = btn.closest(".meal-card").dataset.meal;

    ratingSum += stars;
    ratingCount++;
    document.getElementById("avgRating").innerText = (ratingSum / ratingCount).toFixed(1);

    alert(`⭐ You rated ${meal} ${stars} star(s)!`);
  });
});



function highlightStars(count) {
  document.querySelectorAll("#stars span").forEach(star => {
    star.style.color = star.dataset.star <= count ? "gold" : "#999";
  });
}

// -------------------- PHOTO PREVIEW --------------------
document.getElementById("photoInput").addEventListener("change", function() {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById("photoPreview");
    img.src = e.target.result;
    img.style.display = "block";
  }
  reader.readAsDataURL(file);
});

// -------------------- FEEDBACK SUBMIT --------------------
document.getElementById("feedbackForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const text = document.getElementById("feedbackText").value;
  const photo = document.getElementById("photoPreview").src || "";
  const stars = selectedStars;

  const entry = {
    feedback: text,
    stars: stars,
    photo: photo,
    date: new Date().toLocaleString()
  };

  let list = JSON.parse(localStorage.getItem("feedbackList") || "[]");
  list.push(entry);

  localStorage.setItem("feedbackList", JSON.stringify(list));

  showFeedbackWall();
  showSummary();

  alert("Feedback Submitted ✔");
});

// -------------------- FEEDBACK WALL --------------------
function showFeedbackWall() {
  const wall = document.getElementById("feedbackWall");
  wall.innerHTML = "";

  const list = JSON.parse(localStorage.getItem("feedbackList") || "[]");

  list.forEach(item => {
    const box = document.createElement("div");
    box.className = "feedback-box";

    box.innerHTML = `
      <p><strong>⭐ ${item.stars}</strong></p>
      <p>${item.feedback}</p>
      ${item.photo ? `<img src="${item.photo}" class="wall-img">` : ""}
      <small>${item.date}</small>
    `;

    wall.appendChild(box);
  });
}

showFeedbackWall();

// -------------------- SUMMARY --------------------
function showSummary() {
  const list = JSON.parse(localStorage.getItem("feedbackList") || "[]");
  if (list.length === 0) return;

  let totalStars = 0;
  list.forEach(f => totalStars += Number(f.stars));

  const avg = (totalStars / list.length).toFixed(1);

  document.getElementById("summaryOutput").innerText =
    `Total Feedback: ${list.length} | Average Rating: ${avg} ⭐`;
}

showSummary();

// -------------------- LIKE + RATING BUTTONS (FULLY FIXED) --------------------
let likedCount = 0;
let ratingSum = 0;
let ratingCount = 0;

// Like button
document.querySelectorAll(".like-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    likedCount++;
    document.getElementById("likedCount").innerText = likedCount;
  });
});

// Rating buttons
document.querySelectorAll(".rate-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = Number(btn.dataset.rate);
    
    ratingSum += value;
    ratingCount++;

    const avg = (ratingSum / ratingCount).toFixed(1);
    document.getElementById("avgRating").innerText = avg;
  });
});
