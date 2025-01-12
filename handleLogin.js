const wrapper = document.querySelector(".wrapper"),
  signupHeader = document.querySelector(".signup header"),
  loginHeader = document.querySelector(".login header"),
  signupForm = document.querySelector("#signup-form"),
  loginForm = document.querySelector("#login-form");

loginHeader.addEventListener("click", () => {
  wrapper.classList.add("active");
});

signupHeader.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = signupForm.querySelector('input[placeholder="Full name"]').value.trim();
  const email = signupForm.querySelector('input[placeholder="Email address"]').value.toLowerCase().trim();
  const password = signupForm.querySelector('input[placeholder="Password"]').value.trim();


  if (!fullName || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];


  if (users.find(user => user.email === email)) {
    alert("User already exists with this email.");
    return;
  }


  users.push({ fullName, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
  signupForm.reset();
});


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[placeholder="Email address"]').value.toLowerCase().trim();
  const password = loginForm.querySelector('input[placeholder="Password"]').value.trim();

  
  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    window.location.href = "home/home.html"; 
  } else {
    alert("Invalid credentials.");
    //loginForm.querySelector('input[placeholder="Password"]').value = ""; 
  }
});
