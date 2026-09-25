/* =========================================================
   FOODIE - JAVASCRIPT
   ========================================================= */


/* =========================================================
   FOOD DATABASE
   ========================================================= */

const foods = [

    {
        id: 1,
        name: "Chicken Biryani",
        restaurant: "Malabar Spice",
        category: "Biryani",
        price: 180,
        rating: 4.8,
        time: "25-30 min",

        image:
            "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 2,
        name: "Cheese Burger",
        restaurant: "Burger House",
        category: "Burgers",
        price: 149,
        rating: 4.6,
        time: "20-25 min",

        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 3,
        name: "Margherita Pizza",
        restaurant: "Pizza Corner",
        category: "Pizza",
        price: 249,
        rating: 4.7,
        time: "25-30 min",

        image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 4,
        name: "Masala Dosa",
        restaurant: "South Indian Kitchen",
        category: "South Indian",
        price: 90,
        rating: 4.8,
        time: "15-20 min",

        image:
            "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 5,
        name: "Creamy Pasta",
        restaurant: "Pasta Palace",
        category: "Pasta",
        price: 199,
        rating: 4.5,
        time: "20-25 min",

        image:
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 6,
        name: "Butter Chicken",
        restaurant: "Delhi Darbar",
        category: "Indian",
        price: 220,
        rating: 4.7,
        time: "25-30 min",

        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 7,
        name: "Samosa",
        restaurant: "Chai & Snacks",
        category: "Snacks",
        price: 60,
        rating: 4.6,
        time: "10-15 min",

        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 8,
        name: "Idli",
        restaurant: "South Indian Kitchen",
        category: "South Indian",
        price: 70,
        rating: 4.5,
        time: "10-15 min",

        image:
            "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85"
    }

];



/* =========================================================
   CART
   ========================================================= */

let cart =
    JSON.parse(
        localStorage.getItem("foodieCart")
    ) || [];



/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart() {

    localStorage.setItem(
        "foodieCart",
        JSON.stringify(cart)
    );

}



/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document
        .querySelectorAll(".cart-count")
        .forEach(element => {

            element.textContent = count;

        });

}



/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(id) {

    const food =
        foods.find(
            item => item.id === id
        );


    if (!food) return;


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...food,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    showNotification(
        `${food.name} added to cart!`
    );

}



/* =========================================================
   REMOVE FROM CART
   ========================================================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    updateCartCount();

    renderCart();

}



/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQuantity(
    id,
    change
) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    saveCart();

    updateCartCount();

    renderCart();

}



/* =========================================================
   DISPLAY FOOD CARDS
   ========================================================= */

function renderFoods(
    foodList = foods
) {

    const container =
        document.getElementById(
            "foodGrid"
        );


    if (!container) return;


    if (foodList.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🍽️
                </div>

                <h3>
                    No food found
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        foodList.map(food => `

            <article class="food-card">


                <!-- REAL FOOD IMAGE -->

                <div class="food-image">

                    <img
                        src="${food.image}"
                        alt="${food.name}"
                        loading="lazy"
                        onerror="this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85'"
                    >


                    <span class="rating">

                        ★ ${food.rating}

                    </span>

                </div>



                <!-- FOOD DETAILS -->

                <div class="food-info">


                    <div class="food-category">

                        ${food.category}

                    </div>


                    <h3>

                        ${food.name}

                    </h3>


                    <p class="restaurant">

                        ${food.restaurant}

                    </p>


                    <div class="food-meta">

                        <span>

                            🕒 ${food.time}

                        </span>


                        <span class="price">

                            ₹${food.price}

                        </span>

                    </div>


                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${food.id})">

                        Add to Cart

                    </button>


                </div>


            </article>

        `).join("");

}



/* =========================================================
   SEARCH
   ========================================================= */

function searchFood() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) return;


    const search =
        input.value
            .toLowerCase()
            .trim();


    const filtered =
        foods.filter(food =>

            food.name
                .toLowerCase()
                .includes(search)

            ||

            food.restaurant
                .toLowerCase()
                .includes(search)

            ||

            food.category
                .toLowerCase()
                .includes(search)

        );


    renderFoods(filtered);

}



/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function setCategory(
    category,
    button
) {

    document
        .querySelectorAll(
            ".category-btn"
        )
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    }


    if (category === "All") {

        renderFoods(foods);

        return;

    }


    const filtered =
        foods.filter(
            food =>
                food.category ===
                category
        );


    renderFoods(filtered);

}



/* =========================================================
   SORT
   ========================================================= */

function sortFoods(value) {

    let sorted =
        [...foods];


    if (value === "rating") {

        sorted.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    else if (value === "price-low") {

        sorted.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    else if (value === "price-high") {

        sorted.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    renderFoods(sorted);

}



/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-icon">
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some delicious food
                    to get started.
                </p>

                <a
                    href="menu.html"
                    class="primary-btn">

                    Browse Food

                </a>

            </div>

        `;


        updateCartSummary();

        return;

    }


    container.innerHTML =
        cart.map(item => `

            <div class="cart-item">


                <img
                    src="${item.image}"
                    alt="${item.name}"
                    onerror="this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80'"
                >


                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${item.restaurant}
                    </p>

                    <strong>
                        ₹${item.price}
                    </strong>

                </div>


                <div class="quantity-control">

                    <button
                        onclick="changeQuantity(${item.id}, -1)">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${item.id}, 1)">

                        +

                    </button>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})">

                    Remove

                </button>

            </div>

        `).join("");


    updateCartSummary();

}



/* =========================================================
   CALCULATE TOTAL
   ========================================================= */

function calculateTotals() {

    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                item.price *
                item.quantity,
            0
        );


    const delivery =
        subtotal > 0
            ? 40
            : 0;


    const tax =
        subtotal * 0.05;


    const total =
        subtotal +
        delivery +
        tax;


    return {
        subtotal,
        delivery,
        tax,
        total
    };

}



/* =========================================================
   UPDATE CART SUMMARY
   ========================================================= */

function updateCartSummary() {

    const totals =
        calculateTotals();


    const subtotal =
        document.getElementById(
            "subtotal"
        );


    const delivery =
        document.getElementById(
            "delivery"
        );


    const tax =
        document.getElementById(
            "tax"
        );


    const total =
        document.getElementById(
            "total"
        );


    if (subtotal)
        subtotal.textContent =
            `₹${totals.subtotal.toFixed(2)}`;


    if (delivery)
        delivery.textContent =
            `₹${totals.delivery.toFixed(2)}`;


    if (tax)
        tax.textContent =
            `₹${totals.tax.toFixed(2)}`;


    if (total)
        total.textContent =
            `₹${totals.total.toFixed(2)}`;

}



/* =========================================================
   COUPON
   ========================================================= */

function applyCoupon() {

    const input =
        document.getElementById(
            "couponInput"
        );


    if (!input) return;


    const code =
        input.value
            .trim()
            .toUpperCase();


    if (code === "FOODIE10") {

        showNotification(
            "10% coupon applied!"
        );

    }

    else {

        showNotification(
            "Invalid coupon code."
        );

    }

}



/* =========================================================
   GO TO CHECKOUT
   ========================================================= */

function goToCheckout() {

    if (cart.length === 0) {

        showNotification(
            "Your cart is empty!"
        );

        return;

    }


    window.location.href =
        "checkout.html";

}



/* =========================================================
   CHECKOUT SUMMARY
   ========================================================= */

function renderCheckout() {

    const container =
        document.getElementById(
            "checkoutItems"
        );


    if (!container) return;


    container.innerHTML =
        cart.map(item => `

            <div class="order-item">

                <span class="order-item-name">

                    ${item.name}
                    × ${item.quantity}

                </span>

                <span class="order-item-price">

                    ₹${(
                        item.price *
                        item.quantity
                    ).toFixed(2)}

                </span>

            </div>

        `).join("");


    const totals =
        calculateTotals();


    const subtotal =
        document.getElementById(
            "checkoutSubtotal"
        );


    const delivery =
        document.getElementById(
            "checkoutDelivery"
        );


    const tax =
        document.getElementById(
            "checkoutTax"
        );


    const total =
        document.getElementById(
            "checkoutTotal"
        );


    if (subtotal)
        subtotal.textContent =
            `₹${totals.subtotal.toFixed(2)}`;


    if (delivery)
        delivery.textContent =
            `₹${totals.delivery.toFixed(2)}`;


    if (tax)
        tax.textContent =
            `₹${totals.tax.toFixed(2)}`;


    if (total)
        total.textContent =
            `₹${totals.total.toFixed(2)}`;

}



/* =========================================================
   PLACE ORDER
   ========================================================= */

function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        showNotification(
            "Your cart is empty!"
        );

        return;

    }


    const name =
        document.getElementById(
            "customerName"
        ).value;


    const phone =
        document.getElementById(
            "customerPhone"
        ).value;


    const pin =
        document.getElementById(
            "customerPin"
        ).value;


    const address =
        document.getElementById(
            "customerAddress"
        ).value;


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    const orderNumber =
        "FD" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    const orderDetails = {

        orderNumber,

        name,

        phone,

        pin,

        address,

        payment,

        total:
            calculateTotals().total

    };


    localStorage.setItem(
        "foodieOrder",
        JSON.stringify(
            orderDetails
        )
    );


    cart = [];

    saveCart();


    window.location.href =
        "success.html";

}



/* =========================================================
   SUCCESS PAGE
   ========================================================= */

function loadSuccessPage() {

    const data =
        JSON.parse(
            localStorage.getItem(
                "foodieOrder"
            )
        );


    if (!data) return;


    const orderNumber =
        document.getElementById(
            "orderNumber"
        );


    const name =
        document.getElementById(
            "successName"
        );


    const phone =
        document.getElementById(
            "successPhone"
        );


    const address =
        document.getElementById(
            "successAddress"
        );


    if (orderNumber)
        orderNumber.textContent =
            data.orderNumber;


    if (name)
        name.textContent =
            data.name;


    if (phone)
        phone.textContent =
            data.phone;


    if (address)
        address.textContent =
            data.address;

}



/* =========================================================
   NOTIFICATION
   ========================================================= */

function showNotification(message) {

    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "foodie-notification";


    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.classList.add(
            "show"
        );

    }, 10);


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2500);

}



/* =========================================================
   INITIALIZE WEBSITE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        renderFoods();

        renderCart();

        renderCheckout();

        loadSuccessPage();


        const searchInput =
            document.getElementById(
                "searchInput"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                searchFood
            );

        }

    }
);