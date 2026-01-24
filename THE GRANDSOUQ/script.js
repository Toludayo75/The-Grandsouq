fetch("items.json")
  .then(res => res.json())
  .then(items => {
    window.items = items;
  });

function calculatePrices() {
  const rates = {
    "Extra": Number(document.getElementById("rate-extra").value) || 0,
    "Super": Number(document.getElementById("rate-super").value) || 0,
    "Milan": Number(document.getElementById("rate-milan").value) || 0,
    "Marotto": Number(document.getElementById("rate-marotto").value) || 0,
    "21 Carat": Number(document.getElementById("rate-21").value) || 0,
    "22 Carat": Number(document.getElementById("rate-22").value) || 0,
    "Special": Number(document.getElementById("rate-special").value) || 0
  };

  const tbody = document.getElementById("items-body");
  tbody.innerHTML = "";

  window.items.forEach(item => {
    if (!rates[item.category]) {
        console.warn("Missing rate for:", item.category);
    }
    const rate = rates[item.category] || 0;
    const base = rate * item.gram;
    const total = base + (base * 0.045);

    const row = `
      <tr>
        <td>${item.name}</td>
        <td>${total.toFixed(2)}</td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", row);
  });
}
document.getElementById("calculate-btn").addEventListener("click", calculatePrices);