const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 13",
      preco: 5000,
      categoria: "Celulares",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuQCSQycJHN7FVcXhGO_bGr3SE_p361mGRUA&s",
      descricao: "Smartphone Apple",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Samsung Galaxy S21",
      preco: 3500,
      categoria: "Celulares",
      imagem: "https://images.samsung.com/africa_pt/smartphones/galaxy-s21/buy/galaxy-s21ultra-phantom-black.png",
      descricao: "Celular Samsung",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Notebook Dell",
      preco: 4000,
      categoria: "Notebooks",
      imagem: "https://m.media-amazon.com/images/I/51Fv30OdlZL.jpg",
      descricao: "Notebook para estudos",
      emEstoque: false
    },
    {
      id: 4,
      nome: "Mouse Gamer",
      preco: 200,
      categoria: "Acessórios",
      imagem: "https://images.kabum.com.br/produtos/fotos/185027/mouse-gamer-redragon-king-cobra-v2-rgb-chroma-24000dpi-sensor-optico-usb-preto-m711-fps-1_1626810327_gg.jpg",
      descricao: "Mouse RGB",
      emEstoque: true
    },
    {
      id: 5,
      nome: "Teclado Mecânico",
      preco: 300,
      categoria: "Acessórios",
      imagem: "https://m.media-amazon.com/images/I/51i08RGoXZL._AC_UF894,1000_QL80_.jpg",
      descricao: "Teclado gamer",
      emEstoque: true
    },
    {
      id: 6,
      nome: "PS5",
      preco: 4500,
      categoria: "Games",
      imagem: "https://http2.mlstatic.com/D_NQ_NP_921596-MLA100042443481_122025-O.webp",
      descricao: "Playstation 5",
      emEstoque: false
    },
    {
      id: 7,
      nome: "Xbox Series X",
      preco: 4200,
      categoria: "Games",
      imagem: "https://t.ctcdn.com.br/vIV8mcgB4lNpVZioboFqUC_kBMk=/fit-in/600x600/filters:fill(transparent):watermark(wm/prd.png,-32p,center,1,none,15)/i413842.png",
      descricao: "Xbox Series X",
      emEstoque: true
    },
    {
      id: 8,
      nome: "MacBook",
      preco: 8000,
      categoria: "Notebooks",
      imagem: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-size-unselect-202601-gallery-1_FMT_WHH?wid=690&hei=720&fmt=p-jpg&qlt=80&.v=YTFkSnBPS2tMZFdhaFNRRkx6VnJZaUd4WmthcldkemtncUgvMzhXenFEVndhQ3N1TEt4d0ZKdVZUQ3ZrNzhjK3cxNEx1QmdlVkdRQUhOMXl2K3pkY3dBb0pjWml6bllCL0Y5a1RKc2gxZjlFM2V1RWVXTHBHVzUxMVFmU1Z0Y2ZNdFgzTjZuSWt6SW96N2hDL1hWZkxR&traceId=1",
      descricao: "Notebook Apple",
      emEstoque: true
    }
  ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  const card = document.createElement("div");

  card.setAttribute("data-id", produto.id);
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = produto.imagem;

  const title = document.createElement("h3");
  title.innerText = produto.nome;

  const price = document.createElement("p");
  price.innerText = formatPrice(produto.preco);

  const category = document.createElement("p");
  category.innerText = produto.categoria;

  const btnDetails = document.createElement("button");
  btnDetails.innerText = "Ver detalhes";

  const btnHighlight = document.createElement("button");
  btnHighlight.innerText = "Destacar";

  btnDetails.addEventListener("click", () => {
    showProductDetails(produto);
  });

  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  card.append(img, title, price, category, btnDetails, btnHighlight);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(p => {
    productList.appendChild(createProductCard(p));
  });

  document.querySelectorAll(".card").forEach(card => {
    console.log(card.dataset.id);
  });
}

function renderCategories() {
  const categorias = new Set();

  data.produtos.forEach(p => categorias.add(p.categoria));

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.innerText = cat;
    categorySelect.appendChild(option);
  });
}

function filterProducts() {
  const text = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  return data.produtos.filter(p =>
    p.nome.toLowerCase().includes(text) &&
    (category === "Todas" || p.categoria === category)
  );
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <img src="${produto.imagem}" style="width:200px">
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <p>${produto.emEstoque ? "Em estoque" : "Sem estoque"}</p>
    <p>${produto.descricao}</p>
  `;
}

searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
  renderProducts(data.produtos);
});

renderCategories();
renderProducts(data.produtos);