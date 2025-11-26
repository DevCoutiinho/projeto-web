const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

const parseCurrency = (priceString) => {
  if (typeof priceString === "number") return priceString;

  return parseFloat(
    priceString
      .replace("R$", "")
      .trim()
      .replace(/\./g, "") // Remove todos os pontos de milhar
      .replace(",", ".") 
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items-container");
  const subtotalEl = document.getElementById("summary-subtotal");
  const totalEl = document.getElementById("summary-total");
  const cartCountBadge = document.getElementById("cart-count-badge");

  let cartItems = JSON.parse(localStorage.getItem("carrinho")) || [];
  console.log("carrinho loaded:", cartItems);
  
  // Renderiza o carrinho
  const renderCart = () => {
    cartContainer.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    if (cartItems.length === 0) {
      cartContainer.innerHTML = `
        <div class="text-center py-5">
            <i class="bi bi-cart-x display-1 text-muted"></i>
            <h3 class="mt-3 text-muted">Seu carrinho está vazio</h3>
            <a href="../index.html" class="btn btn-primary mt-3">Ir para a Loja</a>
        </div>`;
      subtotalEl.innerText = formatCurrency(0);
      totalEl.innerText = formatCurrency(0);
    if(cartCountBadge) cartCountBadge.innerText = 0;
      return;
    }

    cartItems.forEach((item, index) => {
     const priceNumber = parseCurrency(item.price);

      const itemTotal = priceNumber * item.quantidade;
      total += itemTotal;
      totalItems += item.quantidade;

      const cardHTML = `
        <div class="cart-item-card d-flex align-items-center">
            <img src="${item.img}" alt="${
        item.title
      }" class="cart-item-img flex-shrink-0">
            
            <div class="cart-item-details ms-4 flex-grow-1">
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="fw-bold text-dark mb-1">${item.title}</h5>
                    <button class="btn-remove-item" onclick="removeItem(${index})" title="Remover item">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                
                <p class="text-muted mb-2">Preço un: ${formatCurrency(
                  item.price
                )}</p>

                <div class="cart-actions-row d-flex align-items-center justify-content-between mt-3">
                    
                    <div class="quantity-control-group">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="text" class="quantity-input" value="${
                          item.quantidade
                        }" readonly>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>

                    <span class="fw-bold text-primary fs-5">${formatCurrency(
                      itemTotal
                    )}</span>
                </div>
            </div>
        </div>
      `;
      cartContainer.innerHTML += cardHTML;
    });

    // Atualiza Resumo
    subtotalEl.innerText = formatCurrency(total);
    totalEl.innerText = formatCurrency(total); // Frete grátis
    if(cartCountBadge) cartCountBadge.innerText = totalItems;
  };

    window.updateQuantity = (index, change) => {
      if (cartItems[index].quantidade + change > 0) {
        console.log(cartItems[index])
        cartItems[index].quantidade += change;
      }
      updateLocalStorage();
      renderCart();
    };

    window.removeItem = (index) => {
      if(confirm("Deseja remover este item do carrinho?")) {
          cartItems.splice(index, 1);
          updateLocalStorage();
          renderCart();
      }
    };

    const updateLocalStorage = () => {
      localStorage.setItem("carrinho", JSON.stringify(cartItems));
    };

    // Inicializa
    renderCart();
});
