function navegateToProductDetail(produto) {
  const produtoDetalhe = encodeURIComponent(JSON.stringify(produto));
  window.localStorage.setItem("detalhes-produto", produto);
  window.location.href = `./pages/product-detail.html?produto=${produtoDetalhe}`;
  
}

function listaProdutos(data) {
  const produtosContainer = document.getElementById("products-list");
  if (!produtosContainer) {
    console.error("Container principal 'products-list' não encontrado.");
    return;
  }
  produtosContainer.innerHTML = "";

  Object.entries(data).forEach(([chave, produtos]) => {
    const categoriesSection = document.createElement("h2");
    categoriesSection.className = "category-title";
    categoriesSection.textContent =
      chave.charAt(0).toUpperCase() + chave.slice(1);
    produtosContainer.appendChild(categoriesSection);

    const swiperContainer = document.createElement("div");
    swiperContainer.className = "swiper category-swiper-container";

    const swiperWrapper = document.createElement("div");
    swiperWrapper.className = "swiper-wrapper";

    produtos.forEach((produto) => {
      // CADA PRODUTO AGORA É UM SLIDE
      const swiperSlide = document.createElement("div");
      swiperSlide.className = "swiper-slide";

      // Cria o card de produto
      const productCard = document.createElement("a");
      productCard.href = "#";
      productCard.className = "product-card";

      const productImage = document.createElement("img");
      productImage.src = produto.img;
      productImage.alt = produto.title;
      productImage.className = "product-image";

      const productInfo = document.createElement("div");
      productInfo.className = "product-card-info";

      const productName = document.createElement("h3");
      productName.className = "product-name";
      productName.textContent = produto.title;

      const productPrice = document.createElement("div");
      productPrice.className = "product-price";

      const oldPrice = document.createElement("span");
      oldPrice.className = "old-price";
      oldPrice.textContent = produto.old_price;

      const newPrice = document.createElement("span");
      newPrice.className = "new-price";
      newPrice.textContent = produto.price;

      const detailButton = document.createElement("button");
      detailButton.className = "detail-button";
      detailButton.textContent = "Ver detalhes";

      // Monta o card
      productPrice.append(oldPrice, newPrice);
      productInfo.append(productName, productPrice, detailButton);
      productCard.append(productImage, productInfo);

      detailButton.addEventListener("click", (e) => {
        e.preventDefault();
        navegateToProductDetail(produto);
      });

      // Adiciona o card ao slide
      swiperSlide.appendChild(productCard);

      // Adiciona o slide ao wrapper
      swiperWrapper.appendChild(swiperSlide);
    });

    //  Adiciona o wrapper e os botões de navegação ao container do Swiper
    swiperContainer.appendChild(swiperWrapper);

    // Adiciona botões e paginação
    const nextButton = document.createElement("div");
    nextButton.className = "swiper-button-next";

    const prevButton = document.createElement("div");
    prevButton.className = "swiper-button-prev";

    const pagination = document.createElement("div");
    pagination.className = "swiper-pagination";

    swiperContainer.append(nextButton, prevButton, pagination);

    // Adiciona o carrossel completo da categoria ao container principal
    produtosContainer.appendChild(swiperContainer);
  });
}

function initializeCategorySwipers() {
  const allSwipers = document.querySelectorAll(".category-swiper-container");

  allSwipers.forEach((swiperEl) => {
    new Swiper(swiperEl, {
      direction: "horizontal",
      loop: true,
      spaceBetween: 24,

      slidesPerView: 1, // 1 slide em telas pequenas (mobile)

      // Breakpoints para telas maiores
      breakpoints: {
        // >= 640px (mostra 2)
        640: {
          slidesPerView: 2,
        },
        // >= 768px (mostra 3)
        768: {
          slidesPerView: 3,
        },
        // >= 1024px (mostra 4)
        1024: {
          slidesPerView: 4,
        },
        // >= 1280px (mostra 5, igual sua imagem!)
        1280: {
          slidesPerView: 5,
        },
      },

      // Espaço entre os cards (1.5rem = 24px)
      spaceBetween: 24,

      pagination: {
        el: swiperEl.querySelector(".swiper-pagination"),
        clickable: true,
      },
      navigation: {
        nextEl: swiperEl.querySelector(".swiper-button-next"),
        prevEl: swiperEl.querySelector(".swiper-button-prev"),
      },
    });
  });
}

async function getTabelaProdutos() {
  try {
    let url = "./public/utils/tabela-produtos.json";
    let response = await fetch(url);
    let data = await response.json();

    listaProdutos(data);

    initializeCategorySwipers();
  } catch (error) {
    console.error("Falha ao buscar ou processar produtos:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const userDropdown = document.getElementById("user-dropdown");
  const userDropdownGreeting = document.getElementById(
    "user-dropdown-greeting"
  );
  const emailUser = window.localStorage.getItem("email");
  const userNameDisplay = document.getElementById("user-greeting");

  if (emailUser) {
    if (loginLink) {
      loginLink.style.display = "none !important";
      loginLink.style.visibility = "hidden";
    }
    if (userDropdown) {
      userDropdown.style.display = "flex !important";
    }
    if (userDropdownGreeting) {
      userDropdownGreeting.innerHTML = `Olá,<br /><b>${emailUser}</b>`;
    }

    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.localStorage.removeItem("email");
        window.location.reload(); // Recarrega para mostrar o link de login novamente
      });
    }
  } else {
    
    if (loginLink) {
     
      loginLink.style.display = "flex !important";
    }
    if (userDropdown) {
      userDropdown.style.display = "none !important";
      userDropdown.style.visibility = "hidden";
    }
    if (userNameDisplay) {
      userNameDisplay.innerHTML = `Entre ou<br /><b>Cadastre-se</b>`;
    }
  }
  const openMenuBtn = document.getElementById("open-menu-btn");
  const closeMenuBtn = document.getElementById("sidebar-close-btn");
  const sidebar = document.getElementById("nav-sidebar");
  const overlay = document.getElementById("overlay");

  if (openMenuBtn && closeMenuBtn && sidebar && overlay) {
    const openSidebar = () => {
      sidebar.classList.add("active");
      overlay.classList.add("active");
    };
    const closeSidebar = () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    };

    openMenuBtn.addEventListener("click", openSidebar);
    closeMenuBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);
  }

  getTabelaProdutos();
});
