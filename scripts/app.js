console.log("E-Commerce Website Loaded");

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
  if (nav.style.display === "block") {
    nav.style.display = "none";
  } else {
    nav.style.display = "block";
  }
});

const productGrid = document.getElementById("productGrid");

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    data.forEach(product => {
      productGrid.innerHTML += `
        <div class="product-card">
          <img src="${product.image}" alt="">
          <h3>${product.title}</h3>
          <p>₹ ${product.price}</p>
          <button>Add to Cart</button>
        </div>
      `;
    });
  });
