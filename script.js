// GLOBAL CART (ONLY ONE)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ---------------- ADD TO CART ---------------- */
function addToCart(name, price, qty) {
  qty = qty ? parseInt(qty) : 1;

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " added to cart!");
}

/* ---------------- LOAD CART ---------------- */
function loadCart() {
  const list = document.getElementById("cartItems");
  if (!list) return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
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

  const totalLi = document.createElement("li");
  totalLi.style.fontWeight = "bold";
  totalLi.textContent = `Total: ₹${total}`;
  list.appendChild(totalLi);

  updateCartCount();
}

/* ---------------- CHANGE QTY ---------------- */
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

/* ---------------- REMOVE ITEM ---------------- */
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

/* ---------------- CART COUNT BADGE ---------------- */
function updateCartCount() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;

  let count = 0;
  cart.forEach(item => count += item.qty);
  badge.textContent = count;
}

/* ---------------- PAYMENT UPI TOGGLE ---------------- */
function toggleUPI() {
  const payment = document.querySelector('input[name="payment"]:checked').value;
  document.getElementById("upiBox").style.display =
    payment === "UPI" ? "block" : "none";
}

/* ---------------- PLACE ORDER ---------------- */
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const payment = document.querySelector('input[name="payment"]:checked').value;

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  let message = "🧶 *New Order – Cozy Crochet Nest* 🧶\n\n";
  message += `Name: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nItems:\n`;

  let total = 0;
  cart.forEach(item => {
    message += `• ${item.name} x${item.qty} = ₹${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });

  message += `\nTotal: ₹${total}\nPayment: ${payment}`;

  window.open(
    "https://wa.me/919698635000?text=" + encodeURIComponent(message),
    "_blank"
  );

  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();

  setTimeout(() => {
    window.location.href = "success.html";
  }, 1000);
}

/* ---------------- ON LOAD ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartCount();
});
document.addEventListener("DOMContentLoaded", loadCart);
