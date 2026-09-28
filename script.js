const products = [
    {
        id: 1,
        name: "Hero Figurine",
        category: "Figurines",
        price: 3500,
        image: "images/figurine.png"
    },
    {
        id: 2,
        name: "Warrior Figurine",
        category: "Figurines",
        price: 4000,
        image: "images/figurine2.png"
    },
    {
        id: 3,
        name: "Plush Bunny",
        category: "Toys",
        price: 2000,
        image: "images/bunny.png"
    },
    {
        id: 4,
        name: "Building Blocks",
        category: "Toys",
        price: 2800,
        image: "images/blocks.png"
    },
    {
        id: 5,
        name: "Family Board Game",
        category: "Board Games",
        price: 4500,
        image: "images/board-game.png"
    },
    {
        id: 6,
        name: "Dice Challenge",
        category: "Board Games",
        price: 3200,
        image: "images/dice-game.png"
    },
    {
        id: 7,
        name: "Red Diecast Racer",
        category: "Diecast Cars",
        price: 2500,
        image: "images/diecast-car.png"
    },
    {
        id: 8,
        name: "Classic Model Car",
        category: "Diecast Cars",
        price: 3000,
        image: "images/toy-car.png"
    }
];
const menuButton =
    document.getElementById("menuButton");
const navLinks =
    document.querySelector(".nav-links");
if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}
const banners = [
    {
        title: "Welcome to Toy Haven!",
        text: "Your one-stop shop for all things fun and playful.",
        image: "images/toy-car.png"
    },
    {
        title: "Collect Amazing Figurines",
        text: "Discover characters for your collection.",
        image: "images/figurine.png"
    },
    {
        title: "Family Game Night",
        text: "Explore board games for everyone.",
        image: "images/board-game.png"
    },
    {
        title: "Discover Diecast Cars",
        text: "Find detailed model cars for collectors.",
        image: "images/diecast-car.png"
    }
];


const heroTitle =
    document.getElementById("heroTitle");
const heroText =
    document.getElementById("heroText");
const heroImage =
    document.getElementById("heroImage");
let currentBanner = 0;
function changeBanner() {
    currentBanner++;
    if (currentBanner >= banners.length) {
        currentBanner = 0;
    }
    heroTitle.textContent =
        banners[currentBanner].title;
    heroText.textContent =
        banners[currentBanner].text;
    heroImage.src =
        banners[currentBanner].image;
}
if (heroTitle && heroText && heroImage) {
    setInterval(changeBanner, 4000);
}
const featuredProduct =
    document.getElementById("featuredProduct");
if (featuredProduct) {
    const today =
        new Date().getDate();
    const productIndex =
        today % products.length;
    const product =
        products[productIndex];
    featuredProduct.innerHTML = `
        <img
            src="${product.image}"
            alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p>Rs. ${product.price}</p>
        <a
            href="products.html"
            class="main-button">
            View Products
        </a>
    `;
}
const newsletterForm =
    document.getElementById("newsletterForm");
if (newsletterForm) {
    newsletterForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            const email =
                document.getElementById(
                    "newsletterEmail"
                ).value;
            localStorage.setItem(
                "newsletterEmail",
                email
            );
            alert(
                "Thank you for subscribing!"
            );
            newsletterForm.reset();
        }
    );
}
const productGrid =
    document.getElementById("productGrid");
function displayProducts(productList) {
    if (!productGrid) {
        return;
    }
    productGrid.innerHTML = "";
    productList.forEach(function (product) {
        const card =
            document.createElement("article");
        card.classList.add("product-card");
        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>Rs. ${product.price}</p>
            <button
                class="details-btn"
                onclick="openProductModal(${product.id})">
                View Details
            </button>
            <button
                class="add-cart-btn"
                onclick="addToCart(${product.id})">
                Add to Cart
            </button>
            <button
                class="wishlist-btn"
                onclick="addToWishlist(${product.id})">
                ♡ Wishlist
            </button>
        `;
        productGrid.appendChild(card);
    });
}
if (productGrid) {
    displayProducts(products);
}
const searchInput =
    document.getElementById("searchInput");
const categoryFilter =
    document.getElementById("categoryFilter");
function filterProducts() {
    const searchText =
        searchInput.value.toLowerCase();
    const selectedCategory =
        categoryFilter.value;
    const filteredProducts =
        products.filter(function (product) {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);
            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;
            return matchesSearch &&
                   matchesCategory;
        });
    displayProducts(filteredProducts);
}
if (searchInput && categoryFilter) {
    searchInput.addEventListener(
        "input",
        filterProducts
    );
    categoryFilter.addEventListener(
        "change",
        filterProducts
    );
}
const productModal =
    document.getElementById("productModal");
const closeModal =
    document.getElementById("closeModal");
function openProductModal(productId) {
    const product =
        products.find(function (item) {
            return item.id === productId;
        });
    document.getElementById("modalImage").src =
        product.image;
    document.getElementById("modalName").textContent =
        product.name;
    document.getElementById("modalCategory").textContent =
        "Category: " + product.category;
    document.getElementById("modalPrice").textContent =
        "Price: Rs. " + product.price;
    productModal.classList.add("active");
}
if (closeModal) {
    closeModal.addEventListener(
        "click",
        function () {
            productModal.classList.remove("active");
        }
    );
}
function addToCart(productId) {
    const product =
        products.find(function (item) {
            return item.id === productId;
        });
    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];
    const existingProduct =
        cart.find(function (item) {
            return item.id === productId;
        });
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    alert(
        product.name +
        " added to cart!"
    );
}
const cartItems =
    document.getElementById("cartItems");
const cartTotal =
    document.getElementById("cartTotal");
function displayCart() {
    if (!cartItems) {
        return;
    }
    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];
    cartItems.innerHTML = "";
    let total = 0;
    if (cart.length === 0) {
        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";
    }
    cart.forEach(function (product, index) {
        const subtotal =
            product.price *
            product.quantity;
        total += subtotal;
        const item =
            document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}">
            <div class="cart-info">
                <h3>${product.name}</h3>
                <p>
                    Price:
                    Rs. ${product.price}
                </p>
                <div class="quantity-controls">
                    <button
                        onclick="decreaseQuantity(${index})">
                        -
                    </button>
                    <span>
                        ${product.quantity}
                    </span>
                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>
                </div>
                <p>
                    Subtotal:
                    Rs. ${subtotal}
                </p>
            </div>
            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;
        cartItems.appendChild(item);
    });
    if (cartTotal) {
        cartTotal.textContent = total;
    }
}
if (cartItems) {
    displayCart();
}

function increaseQuantity(index) {
    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];
    cart[index].quantity++;
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    displayCart();
}
function decreaseQuantity(index) {
    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    displayCart();
}
function removeFromCart(index) {
    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];
    cart.splice(index, 1);
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    displayCart();
}
const clearCartBtn =
    document.getElementById("clearCartBtn");
if (clearCartBtn) {
    clearCartBtn.addEventListener(
        "click",
        function () {
            localStorage.removeItem("cart");
            displayCart();
        }
    );
}
const checkoutItems =
    document.getElementById("checkoutItems");
const checkoutTotal =
    document.getElementById("checkoutTotal");
const checkoutForm =
    document.getElementById("checkoutForm");
let finalTotal = 0;
if (checkoutItems && checkoutTotal) {
    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];
    checkoutItems.innerHTML = "";
    cart.forEach(function (product) {
        const subtotal =
            product.price *
            product.quantity;
        finalTotal += subtotal;
        const item =
            document.createElement("p");
        item.textContent =
            product.name +
            " x " +
            product.quantity +
            " = Rs. " +
            subtotal;
        checkoutItems.appendChild(item);
    });
    checkoutTotal.textContent =
        finalTotal;
}
if (checkoutForm) {
    checkoutForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            const cart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];
            if (cart.length === 0) {
                alert(
                    "Your cart is empty."
                );
                return;
            }
            const name =
                document.getElementById(
                    "customerName"
                ).value.trim();
            const email =
                document.getElementById(
                    "customerEmail"
                ).value.trim();
            const address =
                document.getElementById(
                    "customerAddress"
                ).value.trim();
            const payment =
                document.getElementById(
                    "paymentMethod"
                ).value;
            if (
                name === "" ||
                email === "" ||
                address === "" ||
                payment === ""
            ) {
                alert(
                    "Please complete all fields."
                );
                return;
            }
            const order = {
                customerName: name,
                email: email,
                address: address,
                paymentMethod: payment,
                products: cart,
                total: finalTotal,
                date:
                    new Date().toLocaleString()
            };
            let orderHistory =
                JSON.parse(
                    localStorage.getItem(
                        "orderHistory"
                    )
                ) || [];
            orderHistory.push(order);
            localStorage.setItem(
                "orderHistory",
                JSON.stringify(orderHistory)
            );
            localStorage.removeItem("cart");
            const successMessage =
                document.getElementById(
                    "successMessage"
                );
            successMessage.classList.add("show");
            checkoutForm.reset();
            setTimeout(function () {
                window.location.href =
                    "index.html";
            }, 2500);

        }
    );

}
function addToWishlist(productId) {
    const product =
        products.find(function (item) {
            return item.id === productId;
        });
    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];
    const alreadySaved =
        wishlist.find(function (item) {
            return item.id === productId;
        });
    if (alreadySaved) {
        alert(
            "This product is already in your wishlist."
        );
        return;
    }
    wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        status: "Interested"
    });
    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
    alert(
        product.name +
        " added to wishlist!"
    );
}
const wishlistItems =
    document.getElementById("wishlistItems");
function displayWishlist() {
    if (!wishlistItems) {
        return;
    }
    const wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];
    wishlistItems.innerHTML = "";
    if (wishlist.length === 0) {
        wishlistItems.innerHTML =
            "<p>Your wishlist is empty.</p>";
    }
    wishlist.forEach(function (product, index) {
        const item =
            document.createElement("div");
        item.classList.add("wishlist-item");
        item.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}">
            <div class="wishlist-info">
                <h3>${product.name}</h3>
                <p>
                    Rs. ${product.price}
                </p>
                <label>
                    Collection Status:
                </label>
                <select
                    class="status-select"
                    onchange="changeWishlistStatus(
                        ${index},
                        this.value
                    )">
                    <option
                        value="Interested"
                        ${product.status === "Interested"
                            ? "selected" : ""}>
                        Interested
                    </option>
                    <option
                        value="Owned"
                        ${product.status === "Owned"
                            ? "selected" : ""}>
                        Owned
                    </option>
                    <option
                        value="Not Interested"
                        ${product.status === "Not Interested"
                            ? "selected" : ""}>
                        Not Interested
                    </option>
                </select>
            </div>
            <button
                class="remove-btn"
                onclick="removeFromWishlist(${index})">
                Remove
            </button>
        `;
        wishlistItems.appendChild(item);
    });
}
if (wishlistItems) {
    displayWishlist();
}
function changeWishlistStatus(index, status) {
    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];
    wishlist[index].status = status;
    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
}
function removeFromWishlist(index) {
    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];
    wishlist.splice(index, 1);
    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
    displayWishlist();
}
const feedbackForm =
    document.getElementById("feedbackForm");
if (feedbackForm) {
    feedbackForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            const name =
                document.getElementById(
                    "feedbackName"
                ).value.trim();
            const email =
                document.getElementById(
                    "feedbackEmail"
                ).value.trim();
            const message =
                document.getElementById(
                    "feedbackMessage"
                ).value.trim();
            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {
                alert(
                    "Please complete all feedback fields."
                );
                return;
            }
            const feedback = {
                name: name,
                email: email,
                message: message,
                date:
                    new Date().toLocaleString()
            };
            let feedbackList =
                JSON.parse(
                    localStorage.getItem(
                        "feedback"
                    )
                ) || [];
            feedbackList.push(feedback);
            localStorage.setItem(
                "feedback",
                JSON.stringify(feedbackList)
            );
            alert(
                "Thank you for your feedback!"
            );
            feedbackForm.reset();
        }
    );
}
const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );
faqQuestions.forEach(function (question) {
    question.addEventListener(
        "click",
        function () {
            const answer =
                question.nextElementSibling;
            answer.classList.toggle("active");
        }
    );
});
if ("serviceWorker" in navigator) {
    window.addEventListener(
        "load",
        function () {
            navigator.serviceWorker.register(
                "service-worker.js"
            );
        }
    );
}