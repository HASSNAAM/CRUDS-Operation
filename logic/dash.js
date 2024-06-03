// Convert Content with Link
const homeLink = document.getElementById("home-link");
const studentsLink = document.getElementById("students-link");
const paymentLink = document.getElementById("payment-link");
const homeContent = document.querySelector(".home");
const studentsContent = document.querySelector(".students");
const paymentContent = document.querySelector(".payments");

paymentLink.addEventListener("click", function () {
  paymentContent.style.display = "block";
  studentsContent.style.display = "none";
  homeContent.style.display = "none";
});

homeLink.addEventListener("click", function () {
  homeContent.style.display = "block";
  studentsContent.style.display = "none";
  paymentContent.style.display = "none";
});

studentsLink.addEventListener("click", function () {
  studentsContent.style.display = "block";
  homeContent.style.display = "none";
  paymentContent.style.display = "none";
});

// Make Active Link
const links = document.querySelectorAll("li");

links.forEach((link) => {
  link.addEventListener("click", function () {
    links.forEach((l) => l.classList.remove("active-link"));
    this.classList.add("active-link");
  });
});

// Create New Student
const addStudentButton = document.getElementById("addStudentButton");
const studentsTable = document.getElementById("studentsTable");

addStudentButton.addEventListener("click", function () {
  const nameInput = document.querySelector('.data input[type="text"]');
  const emailInput = document.querySelector('.data input[type="email"]');
  const phoneInput = document.querySelector('.data input[type="tel"]');
  const enrollNumberInput = document.querySelector(
    '.data input[type="number"]'
  );
  const admissionDateInput = document.querySelector(
    '.data input[type="text"].admission'
  );

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const enrollNumber = enrollNumberInput.value.trim();
  const admissionDate = admissionDateInput.value.trim();
  // Check Inputs Values
  if (
    name === "" ||
    email === "" ||
    phone === "" ||
    enrollNumber === "" ||
    admissionDate === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  const phoneRegex = /^\d{11}$/;
  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid 11-digit phone number.");
    return;
  }
  const enrollNumberRegex = /^\d{16}$/;
  if (!enrollNumberRegex.test(enrollNumber)) {
    alert("Please enter a valid 16-digit enrollment number.");
    return;
  }
  // Add New Table Row
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
            <td><img src="../imges/profileImage.img.jpg" alt="Image"></td>
            <td contenteditable="true">${name}</td>
            <td contenteditable="true">${email}</td>
            <td contenteditable="true">${phone}</td>
            <td contenteditable="true">${enrollNumber}</td>
            <td contenteditable="true">${admissionDate}</td>
            <td>
                <i class="fas fa-pen edit-icon"></i>
                <i class="fas fa-trash delete-icon"></i>
                <i class="fas fa-check-double save-icon" style="display: none;"></i>
            </td>
        `;
  studentsTable.querySelector("tbody").appendChild(newRow);

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  enrollNumberInput.value = "";
  admissionDateInput.value = "";

  // Add event delete for icon
  const deleteIcon = newRow.querySelector(".delete-icon");
  deleteIcon.addEventListener("click", function () {
    deleteRow(newRow);
  });
  // Save data to local storage
  saveTableData();
});

// Function delete
function deleteRow(row) {
  row.remove();
  saveTableData();
}

// Function Updata
function saveUpdatedData(row) {
  const cells = row.querySelectorAll("td:not(:last-child)");
  cells.forEach((cell) => {
    cell.removeAttribute("contenteditable");
  });

  alert("New Data Save");
  saveTableData();
}

const rows = studentsTable.querySelectorAll("tbody tr");
rows.forEach((row) => {
  const cells = row.querySelectorAll("td:not(:last-child)");
  cells.forEach((cell) => {
    cell.setAttribute("contenteditable", "false");
  });

  const deleteIcon = row.querySelector(".delete-icon");
  deleteIcon.addEventListener("click", function () {
    deleteRow(row);
  });
});

studentsTable.addEventListener("click", function (event) {
  const targetRow = event.target.closest("tr");
  if (!targetRow) return;

  const editIcon = targetRow.querySelector(".edit-icon");
  const saveIcon = targetRow.querySelector(".save-icon");

  if (event.target.classList.contains("edit-icon")) {
    const cells = targetRow.querySelectorAll("td");
    cells.forEach((cell) => {
      if (cell.getAttribute("contenteditable") !== "true") {
        cell.setAttribute("contenteditable", "true");
      }
    });

    editIcon.style.display = "none";
    saveIcon.style.display = "inline-block";

    const otherRows = studentsTable.querySelectorAll("tr:not(:first-child)");
    otherRows.forEach((row) => {
      if (row !== targetRow) {
        const otherCells = row.querySelectorAll("td");
        otherCells.forEach((cell) => {
          cell.setAttribute("contenteditable", "false");
        });
        const otherEditIcon = row.querySelector(".edit-icon");
        const otherSaveIcon = row.querySelector(".save-icon");
        otherEditIcon.style.display = "inline-block";
        otherSaveIcon.style.display = "none";
      }
    });
  } else if (event.target.classList.contains("save-icon")) {
    saveUpdatedData(targetRow);

    saveIcon.style.display = "none";
    editIcon.style.display = "inline-block";

    const cells = targetRow.querySelectorAll("td:not(:last-child)");
    cells.forEach((cell) => {
      cell.setAttribute("contenteditable", "false");
    });
  }
});

// Function Search
const searchInput = document.querySelector('.search-bar input[type="search"]');

searchInput.addEventListener("input", function () {
  const searchQuery = this.value.trim().toLowerCase();

  const rows = studentsTable.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    const name = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
    const email = row
      .querySelector("td:nth-child(3)")
      .textContent.toLowerCase();
    const phone = row
      .querySelector("td:nth-child(4)")
      .textContent.toLowerCase();
    const enrollNumber = row
      .querySelector("td:nth-child(5)")
      .textContent.toLowerCase();
    const admissionDate = row
      .querySelector("td:nth-child(6)")
      .textContent.toLowerCase();

    if (
      name.includes(searchQuery) ||
      email.includes(searchQuery) ||
      phone.includes(searchQuery) ||
      enrollNumber.includes(searchQuery) ||
      admissionDate.includes(searchQuery)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// Save Data in Local Storage
function saveTableData() {
  const tableRows = studentsTable.querySelectorAll("tbody tr");
  const tableData = [];

  tableRows.forEach((row) => {
    const rowData = {
      name: row.querySelector("td:nth-child(2)").textContent,
      email: row.querySelector("td:nth-child(3)").textContent,
      phone: row.querySelector("td:nth-child(4)").textContent,
      enrollNumber: row.querySelector("td:nth-child(5)").textContent,
      admissionDate: row.querySelector("td:nth-child(6)").textContent,
    };
    tableData.push(rowData);
  });

  localStorage.setItem("studentsData", JSON.stringify(tableData));
}

function loadTableData() {
  const savedData = localStorage.getItem("studentsData");
  if (savedData) {
    const tableData = JSON.parse(savedData);
    tableData.forEach((data) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
                        <td><img src="../imges/profileImage.img.jpg" alt="Image"></td>
                        <td contenteditable="true">${data.name}</td>
                        <td contenteditable="true">${data.email}</td>
                        <td contenteditable="true">${data.phone}</td>
                        <td contenteditable="true">${data.enrollNumber}</td>
                        <td contenteditable="true">${data.admissionDate}</td>
                        <td>
                            <i class="fas fa-pen edit-icon"></i>
                            <i class="fas fa-trash delete-icon"></i>
                            <i class="fas fa-check-double save-icon" style="display: none;"></i>
                        </td>
                    `;
      studentsTable.querySelector("tbody").appendChild(newRow);

      const deleteIcon = newRow.querySelector(".delete-icon");
      deleteIcon.addEventListener("click", function () {
        deleteRow(newRow);
      });
    });
  }
}

function handleTableChanges() {
  studentsTable.addEventListener("input", saveTableData);
}

loadTableData();
handleTableChanges();
