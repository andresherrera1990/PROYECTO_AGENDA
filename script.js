document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointment-form");
  const nameInput = document.getElementById("name");
  const cedulaInput = document.getElementById("cedula");
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");
  const appointmentList = document.getElementById("appointment-list");
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = nameInput.value.trim();
      const cedula = cedulaInput.value;
      const date = dateInput.value;
      const time = timeInput.value;

      if (name === "" || cedula === "" || date === "" || time === "") {
          alert("Todos los campos son obligatorios");
          return;
      }

      const listItem = document.createElement("li");
      listItem.innerHTML = `
          <div class="appointment-name"><strong>${name}</strong></div>
          <div class="appointment-cedula">Cédula: ${cedula}</div>
          <div class="appointment-date-time">${date} - ${time}</div>
          <button class="delete-btn">Eliminar</button>
      `;
      appointmentList.appendChild(listItem);

      nameInput.value = "";
      cedulaInput.value = "";
      dateInput.value = "";
      timeInput.value = "";

      listItem.querySelector(".delete-btn").addEventListener("click", function () {
          listItem.remove();
      });
  });

  darkModeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
          darkModeToggle.textContent = "Modo Claro";
      } else {
          darkModeToggle.textContent = "Modo Oscuro";
      }
  });
});
     