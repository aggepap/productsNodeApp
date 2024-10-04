const form = document.getElementById("frmProduct");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const product = formData.get("product");
  const description = formData.get("description");
  const quantity = formData.get("quantity");
  const cost = formData.get("cost");

  const url = "http://localhost:3000/api/products/";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      product,
      description,
      quantity,
      cost,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      console.log(data);
      window.location.href = "../../product/find.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

if (window.location.href === "http://localhost:3000/product/find.html") {
  loadProducts();
  console.log("This is the specific page!");
}

function loadProducts() {
  document.addEventListener("DOMContentLoaded", function () {
    const url = "http://localhost:3000/api/products/";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("There was a problem in database connection");
        }
        return response.json();
      })
      .then((data) => {
        const dataContainer = document.getElementById("userTable");
        dataContainer.innerHTML = "Φόρτωση δεδομένων";
        console.log(data);
        dataContainer.innerHTML = `
         <caption>
        List of Products
      </caption>
      <thead>
        <tr>
          <th>Όνομα προιόντος</th>
          <th>Περιγραφή</th>
          <th>Κόστος</th>
          <th>Ποσότητα</th>
        </tr>
      </thead>
      <tbody id="tbody"></tbody>`;

        data.data.forEach((item) => {
          const productName = item.product;
          const description = item.description;
          const cost = item.cost;
          const quantity = item.quantity;
          const html = `
        <tr>
  <td> ${productName}</td>
  <td>${description}</td>
  <td>${cost}</td>
  <td>${quantity}</td>
<td><button class='btnUpdate btn btn-primary' value='"username"'>Τροποποίηση</button>
<button class='btnDelete btn btn-primary' value='"username"'>Διαγραφή</button></td></tr>
      `;
          dataContainer.insertAdjacentHTML("afterbegin", html);
          console.log(productName, description, cost, quantity);
        });
      })
      .catch((error) => {
        document.getElementById("dataContainer").innerText =
          "Error fetching data: " + error.message;
      });
  });
}
