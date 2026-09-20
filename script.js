/* =====================================================
   CAFE CUDDLE
   CAFE MANAGEMENT WEB APPLICATION
===================================================== */


/* ================= MENU DATA ================= */

const menu = [

    {
        id: 1,
        name: "Cafe Latte",
        price: 80,
        category: "Coffee"
    },

    {
        id: 2,
        name: "Cafe Mocha",
        price: 100,
        category: "Coffee"
    },

    {
        id: 3,
        name: "Caramel Macchiato",
        price: 150,
        category: "Coffee"
    },

    {
        id: 4,
        name: "Cafe Americano",
        price: 120,
        category: "Coffee"
    },

    {
        id: 5,
        name: "Cappuccino",
        price: 150,
        category: "Coffee"
    },

    {
        id: 6,
        name: "Double Espresso",
        price: 150,
        category: "Coffee"
    },

    {
        id: 7,
        name: "Espresso",
        price: 100,
        category: "Coffee"
    },

    {
        id: 8,
        name: "Ginger Tea",
        price: 15,
        category: "Tea"
    },

    {
        id: 9,
        name: "Masala Tea",
        price: 15,
        category: "Tea"
    },

    {
        id: 10,
        name: "Black Tea",
        price: 10,
        category: "Tea"
    },

    {
        id: 11,
        name: "Lemon Tea",
        price: 15,
        category: "Tea"
    },

    {
        id: 12,
        name: "Special Tea",
        price: 25,
        category: "Tea"
    }

];


/* ================= CART ================= */

let cart = [];


/* ================= HTML ELEMENTS ================= */

const coffeeMenu =
    document.getElementById("coffee-menu");

const teaMenu =
    document.getElementById("tea-menu");

const itemSelect =
    document.getElementById("item");

const orderForm =
    document.getElementById("order-form");

const cartItems =
    document.getElementById("cart-items");

const cartEmpty =
    document.getElementById("cart-empty");

const grandTotal =
    document.getElementById("grand-total");

const billCard =
    document.getElementById("bill-card");


/* =====================================================
   DISPLAY MENU
===================================================== */

function displayMenu() {

    coffeeMenu.innerHTML = "";

    teaMenu.innerHTML = "";

    itemSelect.innerHTML =
        `<option value="">
            -- Choose an item --
        </option>`;


    menu.forEach(function(item) {


        /* CREATE MENU ITEM */

        const menuRow =
            document.createElement("div");

        menuRow.className =
            "menu-item";


        menuRow.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <span class="price">
                    ₹${item.price}
                </span>

            </div>

            <button
                class="small-order"
                type="button"
                data-id="${item.id}"
            >
                Order
            </button>

        `;


        /* ADD TO CORRECT CATEGORY */

        if (item.category === "Coffee") {

            coffeeMenu.appendChild(menuRow);

        } else {

            teaMenu.appendChild(menuRow);

        }


        /* ADD SELECT OPTION */

        const option =
            document.createElement("option");

        option.value = item.id;

        option.textContent =
            `${item.name} - ₹${item.price}`;

        itemSelect.appendChild(option);

    });


    /* ORDER BUTTONS */

    document
        .querySelectorAll(".small-order")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    itemSelect.value =
                        button.dataset.id;

                    document
                        .getElementById("order")
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                }
            );

        });

}


/* =====================================================
   DISPLAY CART
===================================================== */

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;


    /* EMPTY CART */

    if (cart.length === 0) {

        cartEmpty.style.display = "block";

    } else {

        cartEmpty.style.display = "none";

    }


    /* DISPLAY EACH ORDER */

    cart.forEach(function(order, index) {

        const subtotal =
            order.price * order.quantity;

        total += subtotal;


        const row =
            document.createElement("div");

        row.className =
            "cart-row";


        row.innerHTML = `

            <div>

                <strong>
                    ${order.name}
                </strong>

                <br>

                <small>
                    ₹${order.price}
                    ×
                    ${order.quantity}
                </small>

            </div>

            <strong>
                ₹${subtotal.toFixed(2)}
            </strong>

            <button
                class="remove-btn"
                data-index="${index}"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(row);

    });


    /* DISPLAY TOTAL */

    grandTotal.textContent =
        `₹${total.toFixed(2)}`;


    /* REMOVE BUTTON */

    document
        .querySelectorAll(".remove-btn")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(button.dataset.index);

                    cart.splice(index, 1);

                    displayCart();

                }
            );

        });

}


/* =====================================================
   ADD ORDER
===================================================== */

orderForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const customerName =
            document
                .getElementById("customer-name")
                .value
                .trim();


        const itemId =
            Number(itemSelect.value);


        const quantity =
            Number(
                document
                    .getElementById("quantity")
                    .value
            );


        /* VALIDATION */

        if (customerName === "") {

            alert(
                "Please enter the customer name."
            );

            return;
        }


        if (!itemId) {

            alert(
                "Please select an item."
            );

            return;
        }


        if (
            !Number.isInteger(quantity) ||
            quantity < 1
        ) {

            alert(
                "Please enter a valid number of cups."
            );

            return;
        }


        /* FIND MENU ITEM */

        const selectedItem =
            menu.find(function(item) {

                return item.id === itemId;

            });


        /* CHECK EXISTING ITEM */

        const existingItem =
            cart.find(function(order) {

                return order.id === selectedItem.id;

            });


        if (existingItem) {

            existingItem.quantity += quantity;

        } else {

            cart.push({

                id: selectedItem.id,

                name: selectedItem.name,

                price: selectedItem.price,

                quantity: quantity

            });

        }


        /* UPDATE CART */

        displayCart();


        /* RESET QUANTITY */

        document
            .getElementById("quantity")
            .value = 1;

    }
);


/* =====================================================
   GENERATE BILL
===================================================== */

document
    .getElementById("generate-bill")
    .addEventListener(
        "click",
        function() {


            const customerName =
                document
                    .getElementById("customer-name")
                    .value
                    .trim();


            /* CUSTOMER VALIDATION */

            if (customerName === "") {

                alert(
                    "Please enter the customer name."
                );

                document
                    .getElementById("customer-name")
                    .focus();

                return;
            }


            /* CART VALIDATION */

            if (cart.length === 0) {

                alert(
                    "Please add at least one item."
                );

                return;
            }


            /* DATE AND TIME */

            const now =
                new Date();


            const date =
                now.toLocaleDateString("en-IN");


            const time =
                now.toLocaleTimeString(
                    "en-IN",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );


            let total = 0;


            /* CREATE TABLE ROWS */

            const rows =
                cart.map(function(order) {

                    const subtotal =
                        order.price *
                        order.quantity;


                    total += subtotal;


                    return `

                        <tr>

                            <td>
                                ${order.name}
                            </td>

                            <td>
                                ₹${order.price}
                            </td>

                            <td>
                                ${order.quantity}
                            </td>

                            <td>
                                ₹${subtotal.toFixed(2)}
                            </td>

                        </tr>

                    `;

                }).join("");


            /* CREATE BILL */

            billCard.innerHTML = `

                <div class="receipt-header">

                    <h3>
                        ☕ Cafe Cuddle
                    </h3>

                    <p>
                        Enjoy Your Sip!
                        Have a Nice Day ❤️
                    </p>

                </div>


                <div class="receipt-info">

                    <div>

                        <strong>
                            Customer:
                        </strong>

                        <br>

                        ${escapeHTML(customerName)}

                    </div>


                    <div>

                        <strong>
                            Date:
                        </strong>

                        ${date}

                        <br>

                        <strong>
                            Time:
                        </strong>

                        ${time}

                    </div>

                </div>


                <table class="receipt-table">

                    <thead>

                        <tr>

                            <th>
                                Item
                            </th>

                            <th>
                                Price
                            </th>

                            <th>
                                Cups
                            </th>

                            <th>
                                Amount
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${rows}

                    </tbody>

                </table>


                <div class="receipt-total">

                    <span>
                        Total Bill
                    </span>

                    <span>
                        ₹${total.toFixed(2)}
                    </span>

                </div>

            `;


            /* SCROLL TO BILL */

            document
                .getElementById("bill")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =====================================================
   PRINT BILL
===================================================== */

document
    .getElementById("print-bill")
    .addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                alert(
                    "Please generate a bill first."
                );

                return;
            }


            window.print();

        }
    );


/* =====================================================
   CLEAR ORDER
===================================================== */

document
    .getElementById("clear-order")
    .addEventListener(
        "click",
        function() {

            cart = [];


            document
                .getElementById("customer-name")
                .value = "";


            itemSelect.value = "";


            document
                .getElementById("quantity")
                .value = 1;


            billCard.innerHTML = `

                <div class="bill-placeholder">

                    <div class="receipt-icon">
                        🧾
                    </div>

                    <p>

                        Add an order and click

                        <b>
                            Generate Bill
                        </b>

                        to see your receipt.

                    </p>

                </div>

            `;


            displayCart();

        }
    );


/* =====================================================
   SECURITY FUNCTION
===================================================== */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

displayMenu();

displayCart();