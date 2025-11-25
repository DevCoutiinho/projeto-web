function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const itemExistente = carrinho.find(item => item.id === produto.id);

  console
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    produto.quantidade = 1;
    carrinho.push(produto);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


document.addEventListener("DOMContentLoaded", () => {

  //  Obtem o produto da URL
  const urlParams = new URLSearchParams(window.location.search);
  const produtoParam = urlParams.get("produto");

  if (!produtoParam) {
    console.error("Nenhum produto especificado na URL.");
    document.getElementById("product-name").innerText = "Produto não encontrado";
    document.getElementById("product-price").innerText = "-";
    return;
  }

  try {
    const produto = JSON.parse(decodeURIComponent(produtoParam));

    const breadcrumbName = document.getElementById("breadcrumb-name");
    const imgEl = document.getElementById("product-image");
    const nameEl = document.getElementById("product-name");
    const priceEl = document.getElementById("product-price");
    const oldPriceEl = document.getElementById("product-old-price");
    const descEl = document.getElementById("product-description");
    const quantityInput = document.getElementById("product-stock");

    document.title = `${produto.title} - ByteBuy`;

    if (breadcrumbName) breadcrumbName.innerText = produto.title;

    // Imagem (usa uma imagem padrão se não houver)
    const placeholderImg = "https://via.placeholder.com/600x600?text=Sem+Imagem";
    if (imgEl) {
      imgEl.src = produto.img || placeholderImg;
      imgEl.alt = produto.title;
    }

    if (nameEl) nameEl.innerText = produto.title;

    if (priceEl) {
      priceEl.innerText = produto.price;
    }

    // Lógica de Preço Antigo
    if (oldPriceEl) {

      if (produto.old_price && produto.old_price > produto.price) {
        oldPriceEl.innerText = produto.old_price;
        oldPriceEl.style.display = "inline";
      } else {
        oldPriceEl.style.display = "none";
      }
    }

    if (descEl) {
      descEl.innerText =
        produto.description || "Não há descrição disponível para este produto.";
    }

    if (quantityInput) {
      quantityInput.value = produto.stock || 1;
    }

    const addToCartBtn = document.getElementById("add_cart");

    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        adicionarAoCarrinho(produto)
        
      });
    }
  } catch (error) {
    console.error("Erro ao processar dados do produto:", error);
    document.getElementById("product-name").innerText = "Erro ao carregar produto";
  }
});

