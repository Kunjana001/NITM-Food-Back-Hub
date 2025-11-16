const userType = document.getElementById("userType");
const studentInput = document.getElementById("studentInput");
const staffInput = document.getElementById("staffInput");
const loginBtn = document.getElementById("loginBtn");

userType.addEventListener("change", () => {
  studentInput.classList.add("hidden");
  staffInput.classList.add("hidden");

  if (userType.value === "student") studentInput.classList.remove("hidden");
  if (userType.value === "staff") staffInput.classList.remove("hidden");
});

loginBtn.addEventListener("click", () => {
  let valid = false;

  if (userType.value === "student") {
    const roll = document.getElementById("rollInput").value.trim();
    if (roll !== "") valid = true;
  }

  if (userType.value === "staff") {
    const name = document.getElementById("nameInput").value.trim();
    if (name !== "") valid = true;
  }

  if (!valid) return alert("Please fill in all details!");

  window.location.href = "foodhub.html";
});

