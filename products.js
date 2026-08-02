import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const saveBtn = document.getElementById("saveBtn");

// --------------------
// Upload Product
// --------------------

if (saveBtn) {

    saveBtn.addEventListener("click", async () => {

        const name = document.getElementById("name").value.trim();
        const description = document.getElementById("description").value.trim();
        const price = document.getElementById("price").value.trim();
        const image = document.getElementById("image").files[0];
        const message = document.getElementById("message");

        if (!name || !description || !price || !image) {
            message.style.color = "red";
            message.textContent = "Please fill in all fields.";
            return;
        }

        try {

            message.style.color = "blue";
            message.textContent = "Uploading image...";

            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "Mombasa-hybrid");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/mlwi9tfu/image/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (!data.secure_url) {
                throw new Error("Image upload failed.");
            }

            await addDoc(collection(db, "products"), {
                name,
                description,
                price,
                imageUrl: data.secure_url,
                createdAt: Date.now()
            });

            message.style.color = "green";
            message.textContent = "Product added successfully.";

            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
            document.getElementById("price").value = "";
            document.getElementById("image").value = "";

        } catch (error) {

            console.error(error);

            message.style.color = "red";
            message.textContent = error.message;

        }

    });

}

// --------------------
// Display Products
// --------------------

const productsList = document.getElementById("productsList");

if (productsList) {

    async function loadProducts() {
    try {
        productsList.innerHTML = "Loading...";
      
      console.log("About to read Firestore...");
      
      console.log("Firestore read successful");

        let snapshot;

try {
    snapshot = await getDocs(collection(db, "products"));
    console.log("Firestore connected");
} catch (err) {
    console.error(err);
    productsList.innerHTML = "Firestore Error:<br>" + err.message;
    return;
}

        productsList.innerHTML = "";

snapshot.forEach(doc => {

    const product = doc.data();

    productsList.innerHTML += `
        <div class="product-card">

            <img src="${product.imageUrl}" class="product-image">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h2>KSh ${product.price}</h2>

                <button class="edit-btn" data-id="${doc.id}">
                    Edit
                </button>

                <button class="delete-btn" data-id="${doc.id}">
                    Delete
                </button>

            </div>

        </div>
    `;

});
      
      document.querySelectorAll(".delete-btn").forEach(button => {

    button.addEventListener("click", async () => {

        if (confirm("Delete this product?")) {

            await deleteDoc(doc(db, "products", button.dataset.id));

            loadProducts();

        }

    });

});

        if (snapshot.empty) {
            productsList.innerHTML = "No products found.";
        }

    } catch (error) {
        console.error(error);
        productsList.innerHTML = "Error: " + error.message;
    }
}
  loadProducts();
}