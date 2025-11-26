const formatCurrency = (value) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const parseCurrency = (priceString) => {
  // Se já for número, retorna ele mesmo
  if (typeof priceString === "number") return priceString;

  // Se for string, limpa e converte
  return parseFloat(
    priceString
      .replace("R$", "")
      .trim()
      .replace(/\./g, "") // Remove pontos de milhar
      .replace(",", ".")  // Troca vírgula decimal por ponto
  );
};

const getProductsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
};

// Renderiza o carrinho
const renderCart = () => {
  const cartContainer = document.getElementById("cart-items-container");
  const subtotalEl = document.getElementById("summary-subtotal");
  const totalEl = document.getElementById("summary-total");

  // Pega os dados  do LocalStorage
  const carrinho = getProductsFromLocalStorage();

  //caLcula o total geral
  let total = carrinho.reduce((total, item) => total += (parseCurrency(item.price) * item.quantidade), 0);

  cartContainer.innerHTML = "";

  if (carrinho.length === 0) {
    cartContainer.innerHTML = `
        <div class="text-center py-5">
            <i class="bi bi-cart-x display-1 text-muted"></i>
            <h3 class="mt-3 text-muted">Seu carrinho está vazio</h3>
            <a href="../index.html" class="btn btn-primary mt-3">Ir para a Loja</a>
        </div>`;
    subtotalEl.innerText = formatCurrency(0);
    totalEl.innerText = formatCurrency(0);

    return;
  }

  carrinho.forEach((item, index) => {
    const priceNumber = parseCurrency(item.price);
    const quantidade = item.quantidade || 1;

    //Calcula o total deste item 
    const itemTotal = priceNumber * quantidade;

    const cardHTML = `
        <div class="cart-item-card d-flex align-items-center">
            <img src="${item.img || item.imagem}" alt="${item.title || item.nome}" class="cart-item-img flex-shrink-0">
            
            <div class="cart-item-details ms-4 flex-grow-1">
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="fw-bold text-dark mb-1">${item.title || item.nome}</h5>
                    <button class="btn-remove-item" onclick="removeItem(${index})" title="Remover item">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                
                <p class="text-muted mb-2">Preço un: ${formatCurrency(priceNumber)}</p>

                <div class="cart-actions-row d-flex align-items-center justify-content-between mt-3">
                    
                    <div class="quantity-control-group">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="text" class="quantity-input" value="${quantidade}" readonly>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>

                    <span class="fw-bold text-primary fs-5">${formatCurrency(itemTotal)}</span>
                </div>
            </div>
        </div>
      `;
    cartContainer.innerHTML += cardHTML;
  });

  // Atualiza Resumo com o total calculado no loop
  subtotalEl.innerText = formatCurrency(total);
  totalEl.innerText = formatCurrency(total);
};


// Configuração dos eventos globais
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa a primeira renderização do carrinho
  renderCart();

  // Funções globais para os botões onclick
  window.updateQuantity = (index, change) => {
    let carrinho = getProductsFromLocalStorage();

    if (carrinho[index].quantidade + change > 0) {
      carrinho[index].quantidade += change;
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      renderCart();
    }
  };

  window.removeItem = (index) => {
    if (confirm("Deseja remover este item do carrinho?")) {
      let carrinho = getProductsFromLocalStorage();
      carrinho.splice(index, 1);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      renderCart();
    }
  };
});