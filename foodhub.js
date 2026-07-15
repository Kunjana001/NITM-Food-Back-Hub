// =====================================================================
// NITM Hostel Mess Portal — student-facing script
// Reads/writes the SAME localStorage schema as admin.html so that
// menu edits, gala/delay alerts and feedback replies made in the
// admin panel actually show up here.
//   menuData    -> { Monday: {breakfast,lunch,dinner,drink,specialText,isGala,delayText,showDelay}, ... }
//   siteAlert   -> string
//   allFeedback -> [{ rating, text, photo, time, response:{admin,text,time} }]
//   likedMeals  -> [mealName, ...]           (unique)
//   mealRatings -> { mealName: { sum, count } }
// =====================================================================

const defaultMenu = {
  Monday:    { breakfast: "Poori Sabji",   lunch: "Dal, Rice, Aloo Fry",   dinner: "Roti, Paneer Curry",  drink: "Lassi",       specialText: "", isGala: false, delayText: "", showDelay: false },
  Tuesday:   { breakfast: "Idli Sambhar",  lunch: "Rajma Rice",            dinner: "Roti, Chicken Curry", drink: "Buttermilk",  specialText: "", isGala: false, delayText: "", showDelay: false },
  Wednesday: { breakfast: "Upma",          lunch: "Curd Rice",             dinner: "Veg Biryani",         drink: "Juice",       specialText: "", isGala: false, delayText: "", showDelay: false },
  Thursday:  { breakfast: "Aloo Paratha",  lunch: "Dal Fry, Rice",         dinner: "Roti, Egg Curry",     drink: "Buttermilk",  specialText: "", isGala: false, delayText: "", showDelay: false },
  Friday:    { breakfast: "Dosa",          lunch: "Chole Rice",            dinner: "Roti, Paneer Masala", drink: "Lime Juice",  specialText: "", isGala: false, delayText: "", showDelay: false },
  Saturday:  { breakfast: "Poha",          lunch: "Veg Thali",             dinner: "Chicken Biryani",     drink: "Milkshake",   specialText: "", isGala: false, delayText: "", showDelay: false },
  Sunday:    { breakfast: "Chole Bhature", lunch: "Fried Rice",            dinner: "Roti, Mixed Veg",     drink: "Juice",       specialText: "", isGala: false, delayText: "", showDelay: false }
};

function readMenu() {
  try { return { ...defaultMenu, ...JSON.parse(localStorage.getItem("menuData") || "null") }; }
  catch (e) { return defaultMenu; }
}
function readFeedback() { try { return JSON.parse(localStorage.getItem("allFeedback") || "[]"); } catch (e) { return []; } }
function writeFeedback(arr) { localStorage.setItem("allFeedback", JSON.stringify(arr)); }
function readLikedMeals() { try { return JSON.parse(localStorage.getItem("likedMeals") || "[]"); } catch (e) { return []; } }
function writeLikedMeals(arr) { localStorage.setItem("likedMeals", JSON.stringify(arr)); }
function readMealRatings() { try { return JSON.parse(localStorage.getItem("mealRatings") || "{}"); } catch (e) { return {}; } }
function writeMealRatings(obj) { localStorage.setItem("mealRatings", JSON.stringify(obj)); }
function escapeHtml(s) { return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

// -------------------- MENU + ALERTS --------------------
function loadMenu(day) {
  const menu = readMenu()[day];

  document.getElementById("breakfastItem").innerText = menu.breakfast;
  document.getElementById("lunchItem").innerText = menu.lunch;
  document.getElementById("dinnerItem").innerText = menu.dinner;
  document.getElementById("drinkItem").innerText = menu.drink;

  const header = document.getElementById("menuHeader");
  if (menu.isGala && menu.specialText) {
    header.innerText = `🎉 ${menu.specialText}`;
  } else {
    header.innerText = `${day}'s Special 🍽️`;
  }

  renderAlerts(menu);
}

function renderAlerts(menu) {
  const box = document.getElementById("delayAlert");
  const messages = [];

  if (menu && menu.showDelay && menu.delayText) messages.push(menu.delayText);

  const siteAlert = localStorage.getItem("siteAlert");
  if (siteAlert) messages.push(siteAlert);

  if (messages.length) {
    box.innerHTML = messages.map(m => escapeHtml(m)).join("<br>");
    box.style.display = "block";
  } else {
    box.style.display = "none";
    box.innerHTML = "";
  }
}

document.getElementById("daySelect").addEventListener("change", (e) => {
  loadMenu(e.target.value);
});

loadMenu(document.getElementById("daySelect").value || "Monday");

// -------------------- THEME SWITCH --------------------
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const mode = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("themeMode", mode);
});

if (localStorage.getItem("themeMode") === "dark") {
  document.body.classList.add("dark-theme");
}

// -------------------- QUICK RATING (Liked/Disliked) --------------------
let quickRating = null; // "liked" | "disliked" | null
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");

likeBtn.addEventListener("click", () => {
  quickRating = quickRating === "liked" ? null : "liked";
  likeBtn.classList.toggle("active", quickRating === "liked");
  dislikeBtn.classList.remove("active");
  if (quickRating === "liked" && selectedStars === 0) setStars(5);
});

dislikeBtn.addEventListener("click", () => {
  quickRating = quickRating === "disliked" ? null : "disliked";
  dislikeBtn.classList.toggle("active", quickRating === "disliked");
  likeBtn.classList.remove("active");
  if (quickRating === "disliked" && selectedStars === 0) setStars(2);
});

// -------------------- MAIN FEEDBACK-FORM STAR RATING --------------------
let selectedStars = 0;

function highlightStars(count) {
  document.querySelectorAll("#stars span").forEach(star => {
    star.classList.toggle("selected", Number(star.dataset.star) <= count);
  });
}

function setStars(n) {
  selectedStars = n;
  highlightStars(n);
}

document.querySelectorAll("#stars span").forEach(star => {
  star.addEventListener("click", () => setStars(Number(star.dataset.star)));
  star.addEventListener("mouseenter", () => highlightStars(Number(star.dataset.star)));
});
document.getElementById("stars").addEventListener("mouseleave", () => highlightStars(selectedStars));

// -------------------- PHOTO PREVIEW --------------------
document.getElementById("photoInput").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.getElementById("photoPreview");
    img.src = e.target.result;
    img.style.display = "block";
  };
  reader.readAsDataURL(file);
});

// -------------------- FEEDBACK SUBMIT --------------------
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (selectedStars === 0) {
    alert("Please pick a star rating before submitting.");
    return;
  }

  const text = document.getElementById("feedbackText").value.trim();
  const photoImg = document.getElementById("photoPreview");
  const photo = photoImg.style.display !== "none" ? photoImg.src : "";

  const entry = {
    rating: selectedStars,
    text: text,
    photo: photo,
    time: new Date().toLocaleString()
  };

  const list = readFeedback();
  list.push(entry);
  writeFeedback(list);

  // reset the form
  this.reset();
  setStars(0);
  quickRating = null;
  likeBtn.classList.remove("active");
  dislikeBtn.classList.remove("active");
  photoImg.style.display = "none";
  photoImg.src = "";

  showFeedbackWall();
  showSummary();
  alert("Feedback submitted ✔");
});

// -------------------- FEEDBACK WALL --------------------
function showFeedbackWall() {
  const wall = document.getElementById("feedbackWall");
  wall.innerHTML = "";

  const list = readFeedback();

  if (!list.length) {
    wall.innerHTML = `<p class="small muted">No feedback yet — be the first to rate today's meal.</p>`;
    return;
  }

  list.slice().reverse().forEach(item => {
    const box = document.createElement("div");
    box.className = "feedback-box";

    const stars = "★".repeat(Number(item.rating) || 0) + "☆".repeat(5 - (Number(item.rating) || 0));
    const reply = item.response
      ? `<div class="reply-tag"><strong>Mess reply:</strong> ${escapeHtml(item.response.text)}<br><small>${escapeHtml(item.response.time)}</small></div>`
      : "";

    box.innerHTML = `
      <p><strong>${stars}</strong></p>
      ${item.text ? `<p>${escapeHtml(item.text)}</p>` : ""}
      ${item.photo ? `<img src="${item.photo}" class="wall-img">` : ""}
      <small>${escapeHtml(item.time)}</small>
      ${reply}
    `;

    wall.appendChild(box);
  });
}

// -------------------- SUMMARY --------------------
function showSummary() {
  const list = readFeedback();
  const summary = document.getElementById("summaryOutput");

  if (!list.length) {
    summary.innerText = "Summary will appear here...";
    return;
  }

  const totalStars = list.reduce((sum, f) => sum + Number(f.rating || 0), 0);
  const avg = (totalStars / list.length).toFixed(1);

  summary.innerText = `Total Feedback: ${list.length} | Average Rating: ${avg} ⭐`;
}

// -------------------- MEAL LIKE + PER-MEAL STAR RATING --------------------
function refreshMealCardStates() {
  const liked = readLikedMeals();
  const ratings = readMealRatings();

  document.querySelectorAll(".meal-card").forEach(card => {
    const meal = card.dataset.meal;
    const likeButton = card.querySelector(".like-btn");
    likeButton.classList.toggle("liked", liked.includes(meal));

    const mealRating = ratings[meal];
    const avg = mealRating && mealRating.count ? Math.round(mealRating.sum / mealRating.count) : 0;
    card.querySelectorAll(".rate-btn").forEach(btn => {
      btn.classList.toggle("selected", Number(btn.dataset.rate) <= avg);
    });
  });
}

function renderStudentStats() {
  const liked = readLikedMeals();
  document.getElementById("likedCount").innerText = liked.length;

  const ratings = readMealRatings();
  let sum = 0, count = 0;
  Object.values(ratings).forEach(r => { sum += r.sum; count += r.count; });
  document.getElementById("avgRating").innerText = count ? (sum / count).toFixed(1) : "0";
}

document.querySelectorAll(".like-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const meal = btn.closest(".meal-card").dataset.meal;
    const liked = readLikedMeals();
    const idx = liked.indexOf(meal);

    if (idx === -1) liked.push(meal); else liked.splice(idx, 1);
    writeLikedMeals(liked);

    refreshMealCardStates();
    renderStudentStats();
  });
});

document.querySelectorAll(".rate-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = Number(btn.dataset.rate);
    const meal = btn.closest(".meal-card").dataset.meal;

    const ratings = readMealRatings();
    if (!ratings[meal]) ratings[meal] = { sum: 0, count: 0 };
    ratings[meal].sum += value;
    ratings[meal].count += 1;
    writeMealRatings(ratings);

    refreshMealCardStates();
    renderStudentStats();
  });
});

// -------------------- INIT --------------------
showFeedbackWall();
showSummary();
refreshMealCardStates();
renderStudentStats();

// -------------------- SYNC ACROSS TABS (e.g. admin panel open elsewhere) --------------------
window.addEventListener("storage", () => {
  loadMenu(document.getElementById("daySelect").value || "Monday");
  showFeedbackWall();
  showSummary();
  refreshMealCardStates();
  renderStudentStats();
});
