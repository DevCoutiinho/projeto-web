function listaProdutos(data) {
  const produtosContainer = document.getElementById("products-list");

  data.forEach((produto) => {
    const productCard = document.createElement("a");
    productCard.href = "#";
    productCard.className = "product-card";

    const productImage = document.createElement("img");
    productImage.src = produto.img;
    productImage.alt = produto.name;
    productImage.className = "product-image";

    const productInfo = document.createElement("div");
    productInfo.className = "product-card-info";

    const productName = document.createElement("h3");
    productName.className = "product-name";
    productName.textContent = produto.name;

    const productPrice = document.createElement("div");
    productPrice.className = "product-price";

    const oldPrice = document.createElement("span");
    oldPrice.className = "old-price";
    oldPrice.textContent = produto.old_price;

    const newPrice = document.createElement("span");
    newPrice.className = "new-price";
    newPrice.textContent = produto.price;

    const buyButton = document.createElement("button");
    buyButton.className = "buy-button";
    buyButton.textContent = "Comprar";

    productPrice.append(oldPrice, newPrice);
    productInfo.append(productName, productPrice, buyButton);
    productCard.append(productImage, productInfo);

    produtosContainer.appendChild(productCard);
  });
}

async function getTabelaProdutos() {
  let url = "./public/utils/tabela-produtos.json";
  let response = await fetch(url);
  let data = await response.json();
 
  listaProdutos(data);
}
getTabelaProdutos();


document.addEventListener("DOMContentLoaded", () => {
  const openMenuBtn = document.getElementById("open-menu-btn");
  const closeMenuBtn = document.getElementById("sidebar-close-btn");
  const sidebar = document.getElementById("nav-sidebar");
  const overlay = document.getElementById("overlay");

  const openSidebar = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  };

  const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  };

  // Event listeners
  openMenuBtn.addEventListener("click", openSidebar);
  closeMenuBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
});
