const inputFields = document.querySelectorAll("input, select");

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || email === "")
    return { isCorret: false, message: "O campo de email é obrigatório." };

  if (!emailPattern.test(email))
    return { isCorret: false, message: "Por favor, insira um email válido." };

  return { isCorret: true, message: "" };
}

function validarFullName(fullName) {
  if (!fullName || fullName === "")
    return { isCorret: false, message: "O campo de email é obrigatório." };

  if (fullName.length < 8)
    return {
      isCorret: false,
      message: "O nome completo deve ter pelo menos 8 caracteres.",
    };

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

function validarCpf(cpf) {
  if (!cpf || cpf === "")
    return { isCorret: false, message: "O campo de CPF é obrigatório." };

  const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  if (!cpfPattern.test(cpf))
    return {
      isCorret: false,
      message: "Por favor, insira um CPF válido no formato XXX.XXX.XXX-XX.",
    };
  return { isCorret: true, message: "" };
}

function validarIdade(idade) {
  if (!idade || idade === "")
    return { isCorret: false, message: "O campo de idade é obrigatório." };

  const idadeNum = parseInt(idade, 10);
  if (isNaN(idadeNum) || idadeNum <= 0)
    return {
      isCorret: false,
      message: "Por favor, insira uma idade válida.",
    };

  return { isCorret: true, message: "" };
}

function validarCheckbox(checked) {
  if (!checked)
    return {
      isCorret: false,
      message: "Você deve aceitar os termos para continuar.",
    };

  return { isCorret: true, message: "" };
}

function validarGenero(genero) {
  if (!genero || genero === "")
    return { isCorret: false, message: "O campo de gênero é obrigatório." };

  return { isCorret: true, message: "" };
}

function validateCampo(campo) {

  switch (campo.id) {
    case "email":
      return validateEmail(campo.value.trim());
    case "fullName":
      return validarFullName(campo.value.trim());
    case "password":
      return validarPassword(campo.value.trim());
    case "cpf":
      return validarCpf(campo.value.trim());
    case "gender":
      return validarGenero(campo.value.trim());
    case "age":
      return validarIdade(campo.value.trim());
    case "terms":
      return validarCheckbox(campo.checked);
    default:
      return { isCorret: true, message: "" };
  }
}

function escutarCampos() {
  inputFields.forEach((input) => {
    const evento =
      input.tagName === "SELECT" || input.type === "checkbox"
        ? "change"
        : "input";

    input.addEventListener(evento, () => {
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

document.getElementById("btn").addEventListener("click", (e) => {
  let formularioValido = true;

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

    if (!result.isCorret) formularioValido = false;
  });

  if (formularioValido) {
    window.location.href = "/frontend/pages/login.html";
  }
});

escutarCampos();
