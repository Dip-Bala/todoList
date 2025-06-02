// function showSignup() {
//   document.getElementById("choice").style.display = "none"
//   document.getElementById("signupForm").style.display = "block"

// }
// function showSignin() {
//   document.getElementById("choice").style.display = "none"
//   document.getElementById("signinForm").style.display = "block"
// }


document.getElementById('signupForm').addEventListener('submit', async function(e) {
  e.preventDefault(); 
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const name = document.getElementById("signup-name").value;

  try {
    const response = await axios.post("http://localhost:3000/signup", {
      email,
      password,
      name
    });
    alert("Signup successful!");
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Signup failed: " + JSON.stringify(err.response?.data));
  }
});
document.getElementById('signinForm').addEventListener('submit', async function(e) {
  e.preventDefault(); 
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;
  try {
    const response = await axios.post("http://localhost:3000/signin", {
      email,
      password
    });
    console.log(response)
    localStorage.setItem('token', response.data.token)
    alert("Signin successful!" + response.data.token);
    window.location.href = "/todos.html";

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Signup failed: " + JSON.stringify(err.response?.data));
  }
});
