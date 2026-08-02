import { db } from "./firebase-config.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const container = document.getElementById("productsContainer");
const searchBox = document.getElementById("searchBox");

let allProducts = [];

async function loadProducts() {

    container.innerHTML = "Loading products...";

    const snapshot = await getDocs(collection(db, "products"));

    allProducts = [];

    snapshot.forEach(doc => {
        allProducts.push({
            id: doc.id,
            ...doc.data()
        });
    });

    displayProducts(allProducts);

    document.querySelectorAll(".add-cart").forEach(btn => {

    btn.onclick = () => {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(btn.dataset.name);

        localStorage.setItem("cart", JSON.stringify(cart));

        const count = document.getElementById("count");

        if (count) {
            count.innerText = cart.length;
        }

        alert("Added to cart");

    };

});
    
}

function displayProducts(products){

    container.innerHTML="";

    if(products.length===0){
        container.innerHTML="<h3>No products found.</h3>";
        return;
    }

    products.forEach(product=>{

        container.innerHTML += `
            <div class="product-card">

                <img src="${product.imageUrl}" class="product-image">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p>${product.description}</p>

                    <h2>KSh ${product.price}</h2>

 <button class="cart add-cart"
        data-name="${product.name}">
    Add to Cart
</button>
  
                </div>

            </div>
        `;

    });

}

if(searchBox){

    searchBox.addEventListener("input",()=>{

        const text=searchBox.value.toLowerCase();

        const filtered=allProducts.filter(product=>

            product.name.toLowerCase().includes(text) ||

            product.description.toLowerCase().includes(text)

        );

        displayProducts(filtered);

    });

}

loadProducts();