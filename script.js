document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("appointment-form");
      const nameInput = document.getElementById("name");
      const dateInput = document.getElementById("date");
      const timeInput = document.getElementById("time");
      const appointmentList = document.getElementById("appointment-list");
      const darkModeToggle = document.getElementById("dark-mode-toggle");

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const name = nameInput.value.trim();
        const date = dateInput.value;
        const time = timeInput.value;

        if (name === "" || date === "" || time === "") {
          alert("Todos los campos son obligatorios");
          return;
        }

        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <div class="appointment-name"><strong>${name}</strong></div>
          <div class="appointment-date-time">${date} - ${time}</div>
          <button class="delete-btn">Eliminar</button>
        `;

        appointmentList.appendChild(listItem);

        nameInput.value = "";
        dateInput.value = "";
        timeInput.value = "";

        listItem.querySelector(".delete-btn").addEventListener("click", function () {
          listItem.remove();
        });
      });

      darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
      });
    });SADF