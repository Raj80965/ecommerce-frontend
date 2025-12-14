// 🌍 GLOBAL VARIABLES
let quantity = 1;
let basePrice = 0;
let id = null;

document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  id = params.get("id");

  fetch("https://fakestoreapi.com/products/" + id)
    .then(res => res.json())
    .then(p => {

      basePrice = p.price;

      document.getElementById("productDetail").innerHTML = `
        <div class="product-card">

          <img src="${p.image}" id="productImage" height="250" loading="lazy">

          <h3>${p.title}</h3>

          <p><b>₹ <span id="price">${p.price}</span></b></p>

          <p>${p.description}</p>

          <!-- QUANTITY -->
          <div>
            <button onclick="decreaseQty()">−</button>
            <span id="qty">1</span>
            <button onclick="increaseQty()">+</button>
          </div>

          <br>

          <button onclick="addToCart()">Add to Cart</button>
          <p id="msg"></p>
        </div>
      `;

      // 🔍 IMAGE ZOOM
      const img = document.getElementById("productImage");
      img.style.transition = "0.3s";
      img.onmouseenter = () => img.style.transform = "scale(1.2)";
      img.onmouseleave = () => img.style.transform = "scale(1)";
    })
    .catch(() => {
      document.getElementById("productDetail").innerText =
        "Product load nahi hua ❌";
    });
});

// ➕➖ QUANTITY FUNCTIONS
function increaseQty() {
  quantity++;
  updatePrice();
}

function decreaseQty() {
  if (quantity > 1) {
    quantity--;
    updatePrice();
  }
}

// 💰 PRICE UPDATE
function updatePrice() {
  document.getElementById("qty").innerText = quantity;
  document.getElementById("price").innerText =
    (basePrice * quantity).toFixed(2);
}

// 🛒 ADD TO CART
function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id: id,
    qty: quantity
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  document.getElementById("msg").innerText = "✅ Added to cart!";
}
