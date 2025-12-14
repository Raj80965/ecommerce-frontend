const productGrid = document.getElementById("productGrid");
const loadingText = document.getElementById("loading");
const cartCount = document.getElementById("cartCount");

// CART COUNT UPDATE
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  cart.forEach(item => total += item.qty);
  cartCount.innerText = total;
}

// Page load par count dikhao
updateCartCount();

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(products => {

    if (loadingText) loadingText.remove();

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.onclick = () => {
        window.location.href = "product.html?id=" + product.id;
      };

      card.innerHTML = `
        <img src="${product.image}">
        <h3>${product.title}</h3>
        <p>₹ ${product.price}</p>
      `;

      productGrid.appendChild(card);
    });
  });
