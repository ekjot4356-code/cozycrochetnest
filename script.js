let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART WITH QUANTITY
function addToCart(name, price, qty) {
  qty = parseInt(qty);

  cart.push({
    name: name,
    price: price,
    qty: qty
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
  updateCartCount();

}

// LOAD CART
function loadCart() {
  let list = document.getElementById("cartItems");
  if (!list) return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.name}</strong><br>
      ₹${item.price} × ${item.qty} = ₹${item.price * item.qty}<br>
      <button onclick="changeQty(${index}, -1)">➖</button>
      <button onclick="changeQty(${index}, 1)">➕</button>
      <button onclick="removeItem(${index})">❌</button>
    `;
    list.appendChild(li);
    total += item.price * item.qty;
  });
   updateCartCount();

  let totalLi = document.createElement("li");
  totalLi.style.fontWeight = "bold";
  totalLi.textContent = `Total: ₹${total}`;
  list.appendChild(totalLi);
  updateCartCount();

}
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();

}

// REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();

}
function toggleUPI() {
  let payment = document.querySelector('input[name="payment"]:checked').value;
  document.getElementById("upiBox").style.display =
    payment === "UPI" ? "block" : "none";
}
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;

  cart.forEach(item => {
    count += item.qty;
  });

  let badge = document.getElementById("cartCount");
  if (badge) badge.textContent = count;
}


// PLACE ORDER
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let name = document.getElementById("custName").value.trim();
  let phone = document.getElementById("custPhone").value.trim();
  let address = document.getElementById("custAddress").value.trim();
  let payment = document.querySelector('input[name="payment"]:checked').value;

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  let message = "🧶 *New Order - Cozy Crochet Nest* 🧶\n\n";
  message += `Name: ${name}\n`;
  message += `Phone: ${phone}\n`;
  message += `Address: ${address}\n\n`;
  message += "Order Items:\n";

  let total = 0;
  cart.forEach(item => {
    message += `• ${item.name} x${item.qty} = ₹${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });

  message += `\nTotal: ₹${total}\n`;
  message += `Payment Method: ${payment}`;

  let url = "https://wa.me/917889267007?text=" + encodeURIComponent(message);
 window.open(url, "_blank");
cart = [];
localStorage.removeItem("cart");
setTimeout(() => {
  window.location.href = "success.html";
}, 1000);

}

document.addEventListener("DOMContentLoaded", updateCartCount);
