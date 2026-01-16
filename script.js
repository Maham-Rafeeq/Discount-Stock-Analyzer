const products = [
    { id: 1, name: "Shoes", price: 1000, category: "Footwear", stock: 10 },
    { id: 2, name: "Bag", price: 2000, category: "Accessories", stock: 0 },
    { id: 3, name: "Shirt", price: 800, category: "Clothing", stock: 5 },
    { id: 4, name: "Socks", price: 200, category: "Footwear", stock: 20 },
    { id: 5, name: "Hat", price: 500, category: "Accessories", stock: 3 }
  ];

  // Function to display products
  function displayProducts(arr) {
    const list = document.getElementById("productList");
    list.innerHTML = arr.map(p => `
      <li class="product ${p.stock === 0 ? 'out-of-stock' : ''}">
        <span>${p.name} (${p.category}) - ₹${p.price}</span>
        <span>Stock: ${p.stock}</span>
      </li>
    `).join("");
    document.getElementById("totalDisplay").textContent = "";
  }

  // Initial display
  displayProducts(products);

  // Show all products
  document.getElementById("showAll").addEventListener("click", () => displayProducts(products));

  // Show in-stock products
  document.getElementById("showStock").addEventListener("click", () => {
    const inStock = products.filter(p => p.stock > 0);
    displayProducts(inStock);
  });

  // Calculate total inventory value
  document.getElementById("calcTotal").addEventListener("click", () => {
    try {
      const total = products.reduce((acc, p) => {
        if (p.price == null || p.stock == null)  throw new Error(`Missing data for ${p.name}`);
        return acc + p.price * p.stock;
      }, 0);
      document.getElementById("totalDisplay").textContent = `Total Inventory Value: ₹${total}`;
    } catch(err) {
      console.error("Error calculating total:", err.message);
      alert(err.message);
    }
  });

  // Calculate total with discount
  document.getElementById("calcDiscounted").addEventListener("click", () => {
    try {
      const discountedTotal = products
        .map(p => (
            { ...p, price: p.price * 0.9 }
        )) // 10% discount
        .reduce((acc, p) => acc + p.price * p.stock, 0);
      document.getElementById("totalDisplay").textContent = `Total Inventory with 10% Discount: ₹${discountedTotal}`;
    } catch(err) {
      console.error("Error calculating discounted total:", err.message);
      alert(err.message);
    }
  });