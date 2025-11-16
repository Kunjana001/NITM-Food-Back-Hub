// login.js
(function () {
  const userType = document.getElementById("userType");
  const studentInput = document.getElementById("studentInput");
  const staffInput = document.getElementById("staffInput");
  const adminInput = document.getElementById("adminInput");
  const loginBtn = document.getElementById("loginBtn");
  const msg = document.getElementById("message");

  userType.addEventListener("change", () => {
    studentInput.classList.add("hidden");
    staffInput.classList.add("hidden");
    adminInput.classList.add("hidden");
    msg.textContent = "";

    if (userType.value === "student") studentInput.classList.remove("hidden");
    else if (userType.value === "staff") staffInput.classList.remove("hidden");
    else if (userType.value === "admin") adminInput.classList.remove("hidden");
  });

  loginBtn.addEventListener("click", () => {
    const type = userType.value;
    msg.textContent = "";

    if (!type) {
      msg.textContent = "Please select user type.";
      return;
    }

    if (type === "student") {
      const roll = document.getElementById("rollInput").value.trim();
      if (!roll) {
        msg.textContent = "Please enter roll number.";
        return;
      }
      sessionStorage.setItem("userType", "student");
      sessionStorage.setItem("userId", roll);
      window.location.href = "foodhub.html";
    }

    else if (type === "staff") {
      const name = document.getElementById("nameInput").value.trim();
      if (!name) {
        msg.textContent = "Please enter name.";
        return;
      }
      sessionStorage.setItem("userType", "staff");
      sessionStorage.setItem("userId", name);
      window.location.href = "foodhub.html";
    }

    else if (type === "admin") {
      const pass = document.getElementById("adminPassword").value.trim();
      if (!pass) {
        msg.textContent = "Please enter any password.";
        return;
      }

      // Allow ANY admin password
      sessionStorage.setItem("userType", "admin");
      sessionStorage.setItem("userId", "admin");

      window.location.href = "admin.html";  // your admin page
    }
  });
})();
