const inputFields = document.querySelectorAll("input");

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || email === "")
    return { isCorret: false, message: "O campo de email é obrigatório." };

  if (!emailPattern.test(email))
    return { isCorret: false, message: "Por favor, insira um email válido." };

  return { isCorret: true, message: "" };
}

function validarPassword(password) {
  if (!password || password === "")
    return { isCorret: false, message: "O campo de senha é obrigatório." };

  if (password.length < 6)
    return {
      isCorret: false,
      message: "A senha deve ter pelo menos 6 caracteres.",
    };
  return { isCorret: true, message: "" };
}

function validateCampo(campo) {

  switch (campo.id) {
    case "email":
      return validateEmail(campo.value.trim());
    case "password":
      return validarPassword(campo.value.trim());
    default:
      return { isCorret: true, message: "" };
  }
}

function escutarCampos() {
  inputFields.forEach((input) => {
    input.addEventListener("input", () => {
      const result = validateCampo(input);
      const form_group = input.closest(".form-group");
      const errorMessage = form_group.querySelector(".error-message");

      if (!result.isCorret) {
        errorMessage.textContent = result.message;
        form_group.classList.add("error");
      } else {
        form_group.classList.remove("error");
        errorMessage.textContent = "";
      }
    });
  });
}

document.getElementById("btn-login").addEventListener("click", () => {
  let formularioValido = true;
  let email = "";

  inputFields.forEach((input) => {
    const result = validateCampo(input);
    const form_group = input.closest(".form-group");
    const errorMessage = form_group.querySelector(".error-message");

    if (!result.isCorret) {
      errorMessage.textContent = result.message;
      form_group.classList.add("error");
    } else {
      form_group.classList.remove("error");
      errorMessage.textContent = "";
    }

    if (input.id === "email") {
      email = input.value.trim();
    }

    if (!result.isCorret) formularioValido = false;
  });

  if (formularioValido) {
    window.localStorage.setItem("email", email);
    window.location.href = "../index.html";
  }
});

escutarCampos();
