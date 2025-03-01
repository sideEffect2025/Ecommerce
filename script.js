document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Laptop", price: 899.99, image: "laptop.jpg" },
        { id: 2, name: "Smartphone", price: 599.99, image: "phone.jpg" },
        { id: 3, name: "Headphones", price: 199.99, image: "headphones.jpg" }
    ];

    const productList = document.getElementById("product-list");
    const cartModal = document.getElementById("cart-modal");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const checkoutBtn = document.getElementById("checkout-btn");

    let cart = [];

    // Display products
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });

    // Add to Cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            cart.push(product);
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)}
                            <button class="remove" data-index="${index}">X</button>`;
            cartItems.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;

        document.querySelectorAll(".remove").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = parseInt(e.target.getAttribute("data-index"));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Show/Hide Cart Modal
    document.getElementById("cart-link").addEventListener("click", () => {
        cartModal.classList.add("show");
    });

    document.getElementById("close-cart").addEventListener("click", () => {
        cartModal.classList.remove("show");
    });

    // Checkout (Dummy)
    checkoutBtn.addEventListener("click", () => {
        alert("Checkout feature coming soon!");
        cart = [];
        updateCart();
        cartModal.classList.remove("show");
    });
});
