let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(item) {
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(item + " added to cart!");
}

function loadCart() {
  let list = document.getElementById("cartItems");
  if (!list) return;

  list.innerHTML = "";
  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let message = "Hello! I want to order:\n" + cart.join(", ");
  let url = "https://wa.me/919698635000?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", loadCart);
