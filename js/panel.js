export function panel() {

    // --- Manejo de Navegación por Secciones ---
    const navLinks = document.querySelectorAll('header .nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Función para mostrar la sección correcta y actualizar el menú
    function showSection(sectionId) {
        // Ocultar todas las secciones
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Mostrar la sección solicitada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        } else {
            // Si no se encuentra, mostrar la de inicio por defecto
            document.getElementById('inicio').classList.add('active');
        }

        // Actualizar el estado activo en los enlaces del menú
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.classList.remove('link-secondary'); // Quitar clase de inicio
             // Asegurar que todos sean oscuros inicialmente
             link.classList.add('link-dark');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
                link.classList.remove('link-dark'); // Quitar oscuro
                link.classList.add('link-secondary'); // Poner color activo (o usa tu propia clase)
            }
        });
    }

    // Añadir event listeners a los enlaces del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento de ancla por defecto
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);

            // Opcional: Actualizar la URL sin recargar (para historial y bookmarks)
            // history.pushState(null, '', `#${sectionId}`);
        });
    });

    // Mostrar la sección inicial al cargar la página (por defecto 'inicio')
    // Podrías leer el hash de la URL si quisieras permitir enlaces directos:
    // const initialSection = window.location.hash.substring(1) || 'inicio';
    showSection('inicio'); // Muestra 'inicio' por defecto


    // --- Manejo del Formulario de Pago ---
    const paymentForm = document.getElementById('payment-form');
    const paymentResultDiv = document.getElementById('payment-result');

    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío real del formulario

            // Aquí normalmente enviarías los datos a un servidor seguro
            // para procesar el pago. Por ahora, solo simularemos éxito/error.

            // Limpiar mensajes anteriores
            paymentResultDiv.textContent = '';
            paymentResultDiv.className = 'mt-3'; // Resetear clases

            // Simulación simple (puedes añadir validación más robusta aquí)
            const cardNumber = document.getElementById('card-number').value;
            const cardHolder = document.getElementById('cardholder-name').value;
            const expiry = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;

            if (cardHolder && cardNumber && expiry && cvv) {
                 // Simular procesamiento...
                paymentResultDiv.textContent = 'Procesando pago...';
                paymentResultDiv.classList.add('alert', 'alert-info');

                setTimeout(() => {
                    // Simular resultado exitoso
                    paymentResultDiv.textContent = '¡Pago procesado con éxito!';
                    paymentResultDiv.className = 'mt-3 alert alert-success'; // Cambiar a clase de éxito
                    paymentForm.reset(); // Limpiar el formulario
                }, 1500); // Espera 1.5 segundos

            } else {
                // Si falta algún campo (validación básica de Bootstrap ya actúa)
                paymentResultDiv.textContent = 'Por favor, complete todos los campos.';
                paymentResultDiv.classList.add('alert', 'alert-danger');
            }
        });
    }
}