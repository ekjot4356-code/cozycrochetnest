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
      ${item.name} (x${item.qty}) - ₹${item.price * item.qty}
      <button onclick="removeItem(${index})">❌</button>
    `;
    list.appendChild(li);
    total += item.price * item.qty;
  });

  let totalLi = document.createElement("li");
  totalLi.style.fontWeight = "bold";
  totalLi.textContent = `Total: ₹${total}`;
  list.appendChild(totalLi);
}

// REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// PLACE ORDER
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let message = "Hello! I want to order:\n";
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} x${item.qty} = ₹${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });

  message += `\nTotal: ₹${total}`;

  let url = "https://wa.me/919698635000?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", loadCart);
