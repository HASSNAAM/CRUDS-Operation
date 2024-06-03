document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex = /^.{8,12}$/;
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password. Please enter valid credentials.");
    }
  });

document
  .getElementById("forgetPasswordLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("password").value = "";
  });
