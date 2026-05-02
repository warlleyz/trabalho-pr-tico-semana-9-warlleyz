const data = {
  produtos: [
    {   id: 1, nome: "iPhone 13", 
        preco: 5000, 
        categoria: "Celulares", 
        imagem: "", 
        descricao: "Apple", 
        emEstoque: true 
    },
    {   id: 2, nome: "Samsung S21", 
        preco: 3500, 
        categoria: "Celulares", 
        imagem: "", 
        descricao: "Samsung", 
        emEstoque: true 
    },
    {   id: 3, nome: "Notebook Dell", 
        preco: 4000, 
        categoria: "Notebooks", 
        imagem: "", 
        descricao: "Dell", 
        emEstoque: false 
    },
    {   id: 4, nome: "Mouse Gamer", 
        preco: 200, 
        categoria: "Acessórios", 
        imagem: "", 
        descricao: "Mouse RGB", 
        emEstoque: true 
    },
    {   id: 5, nome: "Teclado Mecânico", 
        preco: 300, 
        categoria: "Acessórios", 
        imagem: "", 
        descricao: "RGB", 
        emEstoque: true 
    },
    {   id: 6, nome: "PS5", 
        preco: 4500, 
        categoria: "Games", 
        imagem: "", 
        descricao: "Playstation", 
        emEstoque: false 
    },
    {   id: 7, nome: "Xbox Series X", 
        preco: 4200, 
        categoria: "Games", 
        imagem: "", 
        descricao: "Xbox", 
        emEstoque: true 
    },
    {   id: 8, nome: "MacBook", 
        preco: 8000, 
        categoria: "Notebooks", 
        imagem: "", 
        descricao: "Apple notebook", 
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

  card.style.border = "1px solid black";
  card.style.padding = "10px";
  card.style.margin = "10px";

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

  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(btnDetails);
  card.appendChild(btnHighlight);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  // querySelectorAll obrigatório
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    console.log(card.getAttribute("data-id"));
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

  return data.produtos.filter(p => {
    return (
      p.nome.toLowerCase().includes(text) &&
      (category === "Todas" || p.categoria === category)
    );
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
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