document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("appointment-form");
    const nameInput = document.getElementById("name");
    const cedulaInput = document.getElementById("cedula");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const appointmentList = document.getElementById("appointment-list");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    // --- Nueva variable para almacenar citas ---
    let appointments = []; // Array para guardar las citas

    // --- Función para cargar citas al iniciar ---
    function loadAppointments() {
        const storedAppointments = localStorage.getItem('saraPazAppointments');
        if (storedAppointments) {
            appointments = JSON.parse(storedAppointments); // Convierte el texto JSON de nuevo a un array de objetos
            renderAppointments(); // Muestra las citas cargadas
        }
    }

    // --- Función para guardar citas ---
    function saveAppointments() {
        // Convierte el array de citas a una cadena JSON y la guarda en localStorage
        localStorage.setItem('saraPazAppointments', JSON.stringify(appointments));
    }

    // --- Función para renderizar/mostrar las citas en el HTML ---
    function renderAppointments() {
        appointmentList.innerHTML = ''; // Limpia la lista actual antes de volver a renderizar
        appointments.forEach((appointment, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="appointment-name"><strong>${appointment.name}</strong></div>
                <div class="appointment-cedula">Cédula: ${appointment.cedula}</div>
                <div class="appointment-date-time">${appointment.date} - ${appointment.time}</div>
                <button class="delete-btn" data-index="${index}">Eliminar</button>
            `;
            appointmentList.appendChild(listItem);
        });

        // Vuelve a adjuntar los event listeners para los botones de eliminar
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const indexToDelete = parseInt(this.dataset.index); // Obtiene el índice del botón
                deleteAppointment(indexToDelete);
            });
        });
    }

    // --- Función para eliminar una cita ---
    function deleteAppointment(index) {
        appointments.splice(index, 1); // Elimina la cita del array
        saveAppointments(); // Guarda el array actualizado
        renderAppointments(); // Vuelve a mostrar las citas
    }

    // --- Cargar citas al inicio de la aplicación ---
    loadAppointments();


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

        // --- Crea un objeto para la nueva cita ---
        const newAppointment = {
            name: name,
            cedula: cedula,
            date: date,
            time: time
        };

        // --- Agrega la nueva cita al array ---
        appointments.push(newAppointment);
        saveAppointments(); // Guarda las citas en localStorage
        renderAppointments(); // Actualiza la lista en el HTML

        nameInput.value = "";
        cedulaInput.value = "";
        dateInput.value = "";
        timeInput.value = "";
    });

    // --- Modificación del event listener del botón Eliminar (ahora se maneja desde renderAppointments) ---
    // Este listener original ya no es necesario aquí, ya que se adjunta dinámicamente.
    // listItem.querySelector(".delete-btn").addEventListener("click", function () {
    //     listItem.remove();
    // });


    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.textContent = "Modo Claro";
        } else {
            darkModeToggle.textContent = "Modo Oscuro";
        }
        // Opcional: También podrías guardar la preferencia de modo oscuro en localStorage
        // para que persista entre sesiones
        localStorage.setItem('darkMode', document.body.classList.contains("dark-mode"));
    });

    // --- Cargar preferencia de modo oscuro al iniciar ---
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = "Modo Claro";
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.textContent = "Modo Oscuro";
    }
});
     