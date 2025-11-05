const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

function validateCampo(campo) {
  if (!campo || campo === "") return false;
  if (campo.length < 7) return false;

  return true;
}

function validateEmail(email) {
  if (!validateCampo(email)) return false;
  if (email.indexOf("@") === -1) return false;

  return true;
}

document.getElementById("btn-login").addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!validateEmail(email) || !validateCampo(password)) {
    alert("Por favor, preencha corretamente os campos obrigatórios.");
    return;
  }

  window.localStorage.setItem("name", email);
  window.location.href = "/frontend/index.html";

  
});
