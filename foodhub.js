/* MENU DATA */
const menus = {
  Monday:   { breakfast:"Poha", lunch:"Dal + Rice", dinner:"Paneer", drink:"Tea" },
  Tuesday:  { breakfast:"Idli", lunch:"Rajma Rice", dinner:"Egg Curry", drink:"Buttermilk" },
  Wednesday:{ breakfast:"Upma", lunch:"Chole Rice", dinner:"Veg Pulao", drink:"Lassi", special:true },
  Thursday: { breakfast:"Paratha", lunch:"Dal Fry", dinner:"Paneer Kadai", drink:"Juice" },
  Friday:   { breakfast:"Sandwich", lunch:"Kadhi", dinner:"Biryani", drink:"Tea" },
  Saturday: { breakfast:"Dosa", lunch:"Manchurian", dinner:"Soya Masala", drink:"Lime Soda" },
  Sunday:   { breakfast:"Poori Chole", lunch:"Special Meal", dinner:"Khichdi", drink:"Sweet Lassi", special:true }
};

const daySelect = document.getElementById("daySelect");
const breakfastItem = document.getElementById("breakfastItem");
const lunchItem = document.getElementById("lunchItem");
const dinnerItem = document.getElementById("dinnerItem");
const drinkItem = document.getElementById("drinkItem");
const menuHeader = document.getElementById("menuHeader");
const menuBox = document.getElementById("menuDisplay"); // optional container if exists

function loadMenu() {
  const day = daySelect.value;
  const menu = menus[day];

  // Fill menu items with emojis
  breakfastItem.innerHTML = "🍳 " + menu.breakfast;
  lunchItem.innerHTML     = "🍛 " + menu.lunch;
  dinnerItem.innerHTML    = "🌙 " + menu.dinner;
  drinkItem.innerHTML     = "🥤 " + menu.drink;

  // Reset special styling
  menuHeader.style.display = "none";
  menuHeader.className = "special-banner";
  breakfastItem.classList.remove("special-item");
  lunchItem.classList.remove("special-item");
  dinnerItem.classList.remove("special-item");
  drinkItem.classList.remove("special-item");

  // Highlight special days
  if(menu.special){
    menuHeader.innerHTML = "✨ SPECIAL MENU TODAY ✨";
    menuHeader.style.display = "block";

    if(day === "Wednesday") menuHeader.classList.add("wednesday-special");
    if(day === "Sunday") menuHeader.classList.add("sunday-special");

    breakfastItem.classList.add("special-item");
    lunchItem.classList.add("special-item");
    dinnerItem.classList.add("special-item");
    drinkItem.classList.add("special-item");
  }
}

daySelect.addEventListener("change", loadMenu);
loadMenu();

/* RATING SYSTEM */
let rating = 0;
let quickRating = null;

document.getElementById("likeBtn").onclick = () => { quickRating = "Liked 👍"; };
document.getElementById("dislikeBtn").onclick = () => { quickRating = "Disliked 👎"; };

document.querySelectorAll("#stars span").forEach(star => {
  star.onclick = () => {
    rating = star.dataset.star;
    updateStars();
  };
});

function updateStars() {
  document.querySelectorAll("#stars span").forEach(s => {
    s.style.color = s.dataset.star <= rating ? "gold" : "gray";
  });
}

/* FEEDBACK SYSTEM */
const form = document.getElementById("feedbackForm");
const feedbackWall = document.getElementById("feedbackWall");
const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");

photoInput.addEventListener("change", function () {
  const file = this.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(e){
      photoPreview.src = e.target.result;
      photoPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const fb = {
    day: daySelect.value,
    quickRating,
    rating,
    text: document.getElementById("feedbackText").value,
    photo: photoPreview.style.display === "block" ? photoPreview.src : null,
    time: new Date().toLocaleString()
  };

  const list = JSON.parse(localStorage.getItem("feedbackList")) || [];
  list.unshift(fb);
  localStorage.setItem("feedbackList", JSON.stringify(list));

  loadFeedback();

  form.reset();
  rating = 0; quickRating = null;
  photoPreview.style.display = "none";
  updateStars();
});

function loadFeedback() {
  const list = JSON.parse(localStorage.getItem("feedbackList")) || [];
  feedbackWall.innerHTML = "";

  list.forEach(fb => {
    feedbackWall.innerHTML += `
      <div class="feedback-card">
        <p><strong>${fb.day}</strong> | ⭐ ${fb.rating} | ${fb.quickRating || ""}</p>
        <p>${fb.text || ""}</p>
        ${fb.photo ? `<img src="${fb.photo}" class="preview">` : ""}
        <small>${fb.time}</small>
      </div>`;
  });
}

/* AI-LIKE SUMMARY MAKER */
function generateSummary() {
  const list = JSON.parse(localStorage.getItem("feedbackList")) || [];
  if(list.length === 0){
    document.getElementById("summaryOutput").innerText = "No feedback yet.";
    return;
  }

  let text = list.map(f=>f.text.toLowerCase()).join(" ");
  const positives = ["good", "nice", "tasty", "improved", "great"];
  const negatives = ["bad", "oily", "worst", "dirty", "late", "poor"];

  let posCount = positives.filter(w=>text.includes(w)).length;
  let negCount = negatives.filter(w=>text.includes(w)).length;

  let sentiment = "😐 Neutral";
  if(posCount > negCount) sentiment = "😊 Mostly Positive";
  if(negCount > posCount) sentiment = "😞 Mostly Negative";

  let summary =
    `Sentiment: ${sentiment}\n\n` +
    `Common Issues: ${
      text.includes("oily") ? "Oily food, " : ""
    }${
      text.includes("late") ? "Late serving, " : ""
    }${
      text.includes("quantity") ? "Quantity issues, " : ""
    }`;

  document.getElementById("summaryOutput").innerText = summary;
}

/* DARK MODE */
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};








