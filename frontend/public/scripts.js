const form = document.getElementById("contactForm");
const tableBody = document.querySelector("#contactTable tbody");
const searchInput = document.getElementById("search");

const API_URL = "http://localhost:3000";

// Load contacts when page loads
window.onload = () => {
  loadContacts();
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const contact = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    tag: document.getElementById("tag").value,
    notes: document.getElementById("notes").value,
  };

  if (!contact.name || !contact.phone || !contact.email) {
    alert("Name, phone, and email are required!");
    return;
  }

  try {
    await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    form.reset();
    loadContacts();
  } catch (err) {
    console.error(err);
  }
});

async function loadContacts() {
  const res = await fetch(`${API_URL}/contacts`);
  const contacts = await res.json();
  displayContacts(contacts);
}

function displayContacts(contacts) {
  tableBody.innerHTML = "";
  contacts.forEach((c) => {
    console.log("Row:", c); // ✅ Debug
    const row = document.createElement("tr");
    row.innerHTML = `
  <td class="class-cell">${c.name}</td>
  <td>${c.phone}</td>
  <td>${c.email}</td>
  <td>${c.tag}</td>
  <td class="notes-cell">${c.notes}</td>
`;

    const deleteCell = document.createElement("td");
    deleteCell.classList.add("delete-cell");
    deleteCell.innerHTML = `
      <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22 5a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1h5a1 1 0 0 1 1 1zM4.934 21.071 4 8h16l-.934 13.071a1 1 0 0 1-1 .929H5.931a1 1 0 0 1-.997-.929zM15 18a1 1 0 0 0 2 0v-6a1 1 0 0 0-2 0zm-4 0a1 1 0 0 0 2 0v-6a1 1 0 0 0-2 0zm-4 0a1 1 0 0 0 2 0v-6a1 1 0 0 0-2 0z"/>
      </svg>
    `;
    const icon = deleteCell.querySelector(".delete-icon");
    icon.addEventListener("click", async () => {
      if (confirm(`Delete ${c.name}?`)) {
        try {
          const res = await fetch(`${API_URL}/contacts/${c.id}`, {
            method: "DELETE",
          });

          const data = await res.json();
          console.log("Deleted:", data);
          if (res.ok) {
            loadContacts();
          } else {
            alert("Failed to delete contact.");
          }
        } catch (err) {
          console.error("Delete error:", err);
        }
      }
    });

    row.appendChild(deleteCell);
    tableBody.appendChild(row);
  });
}

searchInput.addEventListener("input", async () => {
  const q = searchInput.value.trim();
  if (q === "") {
    loadContacts();
    return;
  }
  const res = await fetch(
    `${API_URL}/contacts/search?q=${encodeURIComponent(q)}`
  );
  const contacts = await res.json();
  displayContacts(contacts);
});
