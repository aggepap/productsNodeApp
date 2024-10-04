document.addEventListener("DOMContentLoaded", function () {
  const url = "http://localhost:3000/api/products/";

  // Fetch the data
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
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
