if (!localStorage.getItem("user") && !window.location.pathname.includes("login.html")) {
    window.location.href = "login.html";
}
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // check if item already exists
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    function showToast(message) {
    let toast = document.createElement("div");
    toast.innerText = message;
    toast.className = "toast";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}
    showToast(name + " added to cart!");
}
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-container");
    let total = 0;

    container.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="card">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>

                <div>
                    <button onclick="decreaseQuantity('${item.name}')">➖</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity('${item.name}')">➕</button>
                </div>

                <p>Total: ₹${item.price * item.quantity}</p>

                <button onclick="removeItem('${item.name}')">❌ Remove</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

function placeOrder() {
    localStorage.removeItem("cart");
    window.location.href = "order.html";
}
if (window.location.pathname.includes("cart.html")) {
    loadCart();
}
function increaseQuantity(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => {
        if (item.name === name) {
            item.quantity++;
        }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function decreaseQuantity(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.map(item => {
        if (item.name === name) {
            item.quantity--;
        }
        return item;
    }).filter(item => item.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item => item.name !== name);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
function searchFood() {
    let input = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll(".food-item");

    items.forEach(item => {
        let name = item.querySelector("h3").innerText.toLowerCase();

        if (name.includes(input)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}