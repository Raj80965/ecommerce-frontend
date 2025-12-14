const cartItemsDiv = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Cart is empty</p>";
    checkoutBtn.disabled = true;
    totalPriceEl.innerText = 0;
    return;
  }

  checkoutBtn.disabled = false;

  cart.forEach((item, index) => {
    fetch("https://fakestoreapi.com/products/" + item.id)
      .then(res => res.json())
      .then(p => {
        total += p.price * item.qty;
        totalPriceEl.innerText = total.toFixed(2);

        const div = document.createElement("div");
        div.className = "product-card";

        div.innerHTML = `
          <img src="${p.image}" height="100">
          <h4>${p.title}</h4>
          <p>₹ ${p.price}</p>

          <button onclick="decreaseQty(${index})">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${index})">+</button>

          <br><br>
          <button onclick="removeItem(${index})">Remove</button>
        `;

        cartItemsDiv.appendChild(div);
      });
  });
}

function increaseQty(index) {
  cart[index].qty++;
  saveCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
    saveCart();
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();
