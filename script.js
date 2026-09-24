/* =========================================
   FOOD DATA
========================================= */

const foods = [

    {
        id: 1,
        name: "Margherita Pizza",
        restaurant: "La Pino's Kitchen",
        category: "Pizza",
        price: 249,
        rating: 4.9,
        emoji: "🍕",
        bg: "#fff0ec",
        tag: "Bestseller"
    },

    {
        id: 2,
        name: "Classic Chicken Burger",
        restaurant: "Burger Barn",
        category: "Burger",
        price: 199,
        rating: 4.8,
        emoji: "🍔",
        bg: "#fff7df",
        tag: "Popular"
    },

    {
        id: 3,
        name: "Butter Chicken",
        restaurant: "Spice Route",
        category: "Indian",
        price: 289,
        rating: 4.9,
        emoji: "🍛",
        bg: "#fff0df",
        tag: "Chef's pick"
    },

    {
        id: 4,
        name: "Veg Hakka Noodles",
        restaurant: "Wok & Roll",
        category: "Chinese",
        price: 219,
        rating: 4.7,
        emoji: "🥡",
        bg: "#edf8ff",
        tag: ""
    },

    {
        id: 5,
        name: "Paneer Tikka Bowl",
        restaurant: "Green Bowl Co.",
        category: "Healthy",
        price: 239,
        rating: 4.8,
        emoji: "🥗",
        bg: "#eef9e9",
        tag: "Healthy"
    },

    {
        id: 6,
        name: "Chocolate Lava Cake",
        restaurant: "Sweet Truth",
        category: "Dessert",
        price: 159,
        rating: 4.9,
        emoji: "🍫",
        bg: "#f7edff",
        tag: "Must try"
    },

    {
        id: 7,
        name: "Chicken Biryani",
        restaurant: "Malabar Kitchen",
        category: "Indian",
        price: 299,
        rating: 4.9,
        emoji: "🍚",
        bg: "#fff1dd",
        tag: "Top rated"
    },

    {
        id: 8,
        name: "Double Cheese Burger",
        restaurant: "Burger Barn",
        category: "Burger",
        price: 249,
        rating: 4.7,
        emoji: "🍔",
        bg: "#fff7df",
        tag: ""
    },

    {
        id: 9,
        name: "Farmhouse Pizza",
        restaurant: "La Pino's Kitchen",
        category: "Pizza",
        price: 279,
        rating: 4.8,
        emoji: "🍕",
        bg: "#fff0ec",
        tag: ""
    },

    {
        id: 10,
        name: "Mango Cheesecake",
        restaurant: "Sweet Truth",
        category: "Dessert",
        price: 189,
        rating: 4.8,
        emoji: "🍰",
        bg: "#fff2f5",
        tag: "New"
    },

    {
        id: 11,
        name: "Veg Fried Rice",
        restaurant: "Wok & Roll",
        category: "Chinese",
        price: 199,
        rating: 4.6,
        emoji: "🍜",
        bg: "#edf8ff",
        tag: ""
    },

    {
        id: 12,
        name: "Avocado Salad",
        restaurant: "Green Bowl Co.",
        category: "Healthy",
        price: 259,
        rating: 4.7,
        emoji: "🥑",
        bg: "#eef9e9",
        tag: "Fresh"
    }

];


/* =========================================
   CART
========================================= */

let cart =
    JSON.parse(
        localStorage.getItem("foodie_cart") || "[]"
    );


/* =========================================
   CURRENCY
========================================= */

const money = n =>
    "₹" +
    Math.round(n)
        .toLocaleString("en-IN");


/* =========================================
   SAVE CART
========================================= */

const saveCart = () => {

    localStorage.setItem(
        "foodie_cart",
        JSON.stringify(cart)
    );

    updateBadges();

};


/* =========================================
   CART BADGE
========================================= */

const updateBadges = () => {

    document
        .querySelectorAll(".cart-count")
        .forEach(e => {

            e.textContent =
                cart.reduce(
                    (sum, item) =>
                        sum + item.qty,
                    0
                );

        });

};


/* =========================================
   ADD TO CART
========================================= */

function addToCart(id) {

    const item =
        foods.find(
            food => food.id === id
        );


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.qty++;

    }

    else {

        cart.push({
            ...item,
            qty: 1
        });

    }


    saveCart();

    renderCart();


    /* BUTTON FEEDBACK */

    const button =
        document.querySelector(
            `[data-add="${id}"]`
        );


    if (button) {

        const oldText =
            button.textContent;

        button.textContent =
            "✓ Added";


        setTimeout(() => {

            button.textContent =
                oldText;

        }, 900);

    }

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQty(id, delta) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item)
        return;


    item.qty += delta;


    if (item.qty <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart();

    renderCart();

}


/* =========================================
   REMOVE ITEM
========================================= */

function removeItem(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    renderCart();

}


/* =========================================
   RENDER FOOD ITEMS
========================================= */

function renderFoods(list = foods) {

    const grid =
        document.getElementById(
            "foodGrid"
        );


    if (!grid)
        return;


    document
        .getElementById("emptyState")
        .classList
        .toggle(
            "hidden",
            list.length > 0
        );


    grid.innerHTML =
        list.map(food => `

        <article class="food-card-item">

            <div
                class="food-image"
                style="background:${food.bg}"
            >

                ${
                    food.tag
                    ?
                    `<span class="tag">
                        ${food.tag}
                    </span>`
                    :
                    ""
                }

                ${food.emoji}

            </div>


            <div class="food-info">

                <h3>
                    ${food.name}
                </h3>


                <div class="restaurant">
                    ${food.restaurant}
                </div>


                <div class="rating">

                    ★ ${food.rating}

                    <span style="color:#aaa">

                        · 30-40 min

                    </span>

                </div>


                <div class="food-bottom">

                    <span class="price">

                        ${money(food.price)}

                    </span>


                    <button
                        class="add-btn"
                        data-add="${food.id}"
                        onclick="addToCart(${food.id})"
                    >

                        + Add

                    </button>

                </div>

            </div>

        </article>

    `).join("");

}


/* =========================================
   MENU PAGE
========================================= */

function setupMenu() {

    if (!document.getElementById("foodGrid"))
        return;


    let current =
        "All";


    /* URL CATEGORY */

    const params =
        new URLSearchParams(
            location.search
        );


    if (params.get("category")) {

        current =
            params.get("category");

    }


    /* ACTIVE CATEGORY */

    document
        .querySelectorAll(".chip")
        .forEach(chip => {

            if (
                chip.dataset.category
                === current
            ) {

                document
                    .querySelector(".chip.active")
                    ?.classList
                    .remove("active");

                chip.classList.add(
                    "active"
                );

            }

        });


    /* APPLY FILTER */

    const apply = () => {

        let list =
            foods.filter(
                food =>
                    current === "All"
                    ||
                    food.category === current
            );


        /* SEARCH */

        const query =
            (
                document
                    .getElementById(
                        "searchInput"
                    )
                    ?.value
                || ""
            ).toLowerCase();


        if (query) {

            list =
                list.filter(food =>

                    (
                        food.name
                        + " "
                        + food.restaurant
                        + " "
                        + food.category
                    )
                    .toLowerCase()
                    .includes(query)

                );

        }


        /* SORT */

        const sort =
            document.getElementById(
                "sortSelect"
            ).value;


        if (sort === "rating") {

            list.sort(
                (a, b) =>
                    b.rating - a.rating
            );

        }


        if (sort === "price-low") {

            list.sort(
                (a, b) =>
                    a.price - b.price
            );

        }


        if (sort === "price-high") {

            list.sort(
                (a, b) =>
                    b.price - a.price
            );

        }


        renderFoods(list);

    };


    /* CATEGORY BUTTONS */

    document
        .querySelectorAll(".chip")
        .forEach(chip => {

            chip.onclick = () => {

                current =
                    chip.dataset.category;


                document
                    .querySelectorAll(".chip")
                    .forEach(
                        item =>
                            item.classList
                                .remove("active")
                    );


                chip.classList.add(
                    "active"
                );


                apply();

            };

        });


    /* SEARCH */

    document
        .getElementById(
            "searchInput"
        )
        .oninput = apply;


    /* SORT */

    document
        .getElementById(
            "sortSelect"
        )
        .onchange = apply;


    apply();

}


/* =========================================
   CALCULATE TOTALS
========================================= */

function totals() {

    const subtotal =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.qty,
            0
        );


    const delivery =
        subtotal
            ? subtotal >= 499
                ? 0
                : 39
            : 0;


    const tax =
        Math.round(
            subtotal * 0.05
        );


    return {

        subtotal,

        delivery,

        tax,

        total:
            subtotal +
            delivery +
            tax

    };

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    const box =
        document.getElementById(
            "cartItems"
        );


    if (!box)
        return;


    const empty =
        document.getElementById(
            "cartEmpty"
        );


    empty.classList.toggle(
        "hidden",
        cart.length > 0
    );


    box.innerHTML =
        cart.map(item => `

        <div class="cart-line">


            <div
                class="cart-thumb"
                style="background:${item.bg}"
            >

                ${item.emoji}

            </div>


            <div>

                <h3>
                    ${item.name}
                </h3>


                <p>

                    ${item.restaurant}

                    ·

                    ${money(item.price)}
                    each

                </p>


                <button
                    class="remove"
                    onclick="removeItem(${item.id})"
                >

                    Remove

                </button>

            </div>


            <strong>

                ${money(
                    item.price *
                    item.qty
                )}

            </strong>


            <div class="qty">

                <button
                    onclick="changeQty(${item.id}, -1)"
                >
                    −
                </button>


                <b>
                    ${item.qty}
                </b>


                <button
                    onclick="changeQty(${item.id}, 1)"
                >
                    +
                </button>

            </div>

        </div>

    `).join("");


    /* ITEM COUNT */

    document
        .getElementById(
            "itemCount"
        )
        .textContent =
        `${cart.reduce(
            (sum, item) =>
                sum + item.qty,
            0
        )} items`;


    /* TOTALS */

    const t =
        totals();


    document
        .getElementById("subtotal")
        .textContent =
        money(t.subtotal);


    document
        .getElementById("delivery")
        .textContent =
        money(t.delivery);


    document
        .getElementById("tax")
        .textContent =
        money(t.tax);


    document
        .getElementById("total")
        .textContent =
        money(t.total);

}


/* =========================================
   CART PAGE
========================================= */

function setupCart() {

    if (!document.getElementById("cartItems"))
        return;


    renderCart();


    /* COUPON */

    document
        .getElementById(
            "couponBtn"
        )
        .onclick = () => {


            const code =
                document
                    .getElementById(
                        "couponInput"
                    )
                    .value
                    .trim()
                    .toUpperCase();


            if (code === "FOODIE10") {

                document
                    .getElementById(
                        "couponMsg"
                    )
                    .textContent =
                    "✓ Promo code applied!";

            }

            else if (code) {

                document
                    .getElementById(
                        "couponMsg"
                    )
                    .textContent =
                    "Try FOODIE10 for 10% off.";

            }

            else {

                document
                    .getElementById(
                        "couponMsg"
                    )
                    .textContent =
                    "";

            }

        };


    /* CHECKOUT */

    document
        .getElementById(
            "checkoutBtn"
        )
        .onclick = () => {


            if (cart.length) {

                location.href =
                    "checkout.html";

            }

            else {

                alert(
                    "Your cart is empty. Add some food first!"
                );

            }

        };

}


/* =========================================
   CHECKOUT PAGE
========================================= */

function setupCheckout() {

    if (
        !document.getElementById(
            "checkoutForm"
        )
    )
        return;


    /* EMPTY CART */

    if (!cart.length) {

        location.href =
            "menu.html";

        return;

    }


    const t =
        totals();


    document
        .getElementById(
            "checkoutTotal"
        )
        .textContent =
        money(t.total);


    document
        .getElementById(
            "checkoutTotalSide"
        )
        .textContent =
        money(t.total);


    /* ORDER ITEMS */

    document
        .getElementById(
            "checkoutItems"
        )
        .innerHTML =

        cart.map(item => `

            <div class="mini-item">

                <span>

                    ${item.emoji}

                    ${item.name}

                    × ${item.qty}

                </span>


                <b>

                    ${money(
                        item.price *
                        item.qty
                    )}

                </b>

            </div>

        `).join("");


    /* FORM */

    document
        .getElementById(
            "checkoutForm"
        )
        .onsubmit = e => {

            e.preventDefault();


            const name =
                document
                    .getElementById(
                        "name"
                    )
                    .value
                    .trim();


            const address =
                document
                    .getElementById(
                        "address"
                    )
                    .value
                    .trim();


            const city =
                document
                    .getElementById(
                        "city"
                    )
                    .value
                    .trim();


            /* SAVE ORDER */

            localStorage.setItem(

                "foodie_last_order",

                JSON.stringify({

                    name:

                        name,

                    address:

                        address
                        + ", "
                        + city,

                    number:

                        Math.floor(
                            1000 +
                            Math.random()
                            * 9000
                        )

                })

            );


            /* CLEAR CART */

            localStorage.removeItem(
                "foodie_cart"
            );


            cart = [];


            /* SUCCESS PAGE */

            location.href =
                "success.html";

        };

}


/* =========================================
   INITIALIZE
========================================= */

updateBadges();

setupMenu();

setupCart();

setupCheckout();