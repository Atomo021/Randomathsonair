// Obtiene una referencia a los elementos HTML por su ID.
// Cada casilla de verificación representa una operación matemática.
const plusCheckbox = document.getElementById('cuadro1'); // Casilla para la suma (Plus)
const lessCheckbox = document.getElementById('cuadro2'); // Casilla para la resta (Less)
const multiCheckbox = document.getElementById('cuadro3'); // Casilla para la multiplicación (For)
const diviCheckbox = document.getElementById('cuadro4'); // Casilla para la división (Among)

// El div donde se mostrará la operación (ej: "5 + 3 =")
const opDiv = document.getElementById('op');

// El botón que, al ser clicado, generará la operación y el resultado
const talButton = document.getElementById('tal');

// El div donde se mostrará el resultado de la operación
const resultadoDiv = document.getElementById('resultado'); // Este div ahora se usará para limpiar su contenido.

// --- INICIO DE CAMBIOS PARA RANGOS DINÁMICOS ---

// Obtiene los valores de rango mínimo y máximo desde los atributos de datos del cuerpo (body) del HTML.
// Si los atributos no están definidos, se usará un rango predeterminado (0-9).
const minRange = parseInt(document.body.dataset.minRange || '0');
const maxRange = parseInt(document.body.dataset.maxRange || '9');

// Muestra en consola los rangos que se están utilizando, útil para depuración.
console.log(`Rango de números actual: ${minRange} - ${maxRange}`);

// --- FIN DE CAMBIOS PARA RANGOS DINÁMICOS ---


/**
 * Función para generar un número entero aleatorio dentro de un rango específico.
 * Ahora utiliza los valores `minRange` y `maxRange` obtenidos del HTML.
 * @param {number} min - El valor mínimo inclusivo del rango.
 * @param {number} max - El valor máximo inclusivo del rango.
 * @returns {number} Un número entero aleatorio.
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Añade un "escuchador de eventos" al botón 'Let's Go!'
// Cuando el botón es clicado, se ejecuta la función anónima.
talButton.addEventListener('click', () => {
    // Array para almacenar las operaciones que están activas (marcadas por el usuario).
    const activeOperations = [];

    // Comprueba qué casillas de verificación están marcadas y añade su tipo de operación al array.
    if (plusCheckbox.checked) {
        activeOperations.push('suma');
    }
    if (lessCheckbox.checked) {
        activeOperations.push('resta');
    }
    if (multiCheckbox.checked) {
        activeOperations.push('multi');
    }
    if (diviCheckbox.checked) {
        activeOperations.push('divi');
    }

    // Si no se ha seleccionado ninguna operación, muestra un mensaje y termina la ejecución.
    if (activeOperations.length === 0) {
        opDiv.textContent = 'Por favor, selecciona al menos una operación.';
        resultadoDiv.textContent = ''; // Limpia el resultado anterior.
        return;
    }

    // Selecciona una operación aleatoria de las que están activas.
    const chosenOperation = activeOperations[Math.floor(Math.random() * activeOperations.length)];

    // Ahora `num1` y `num2` usan los rangos `minRange` y `maxRange` configurados en el HTML.
    let num1 = getRandomNumber(minRange, maxRange);
    let num2 = getRandomNumber(minRange, maxRange);
    let operationSymbol = ''; // Símbolo de la operación (+, -, *, /)
    let result; // Variable para almacenar el resultado de la operación (aunque no se muestre)

    // Usa una estructura 'switch' para realizar la operación basada en la opción elegida.
    switch (chosenOperation) {
        case 'suma':
            operationSymbol = '+';
            result = num1 + num2; // Calculamos el resultado, pero no lo mostraremos
            break;
        case 'resta':
            operationSymbol = '-';
            result = num1 - num2; // Calculamos el resultado, pero no lo mostraremos
            break;
        case 'multi':
            operationSymbol = '*';
            result = num1 * num2; // Calculamos el resultado, pero no lo mostraremos
            break;
        case 'divi':
            // Para la división, nos aseguramos de que el segundo número (denominador) no sea cero.
            // Si es cero, generamos un nuevo número hasta que sea diferente de cero.
            // Aseguramos que el rango mínimo para num2 sea 1 en este caso.
            while (num2 === 0) {
                num2 = getRandomNumber(1, maxRange); // Genera un número diferente de cero.
            }
            operationSymbol = '/';
            result = num1 / num2; // Calculamos el resultado, pero no lo mostraremos
            // Si el resultado no es un número entero, lo redondeamos a dos decimales
            // para una mejor visualización en casos de división no exacta.
            if (result % 1 !== 0) {
                result = result.toFixed(2);
            }
            break;
        default:
            // En caso de que se seleccione una operación no reconocida (esto no debería pasar).
            opDiv.textContent = 'Operación no reconocida.';
            resultadoDiv.textContent = ''; // Limpia el resultado anterior.
            return;
    }

    // Muestra la operación completa en el div 'opDiv'.
    // Por ejemplo: "5 + 3 ="
    opDiv.textContent = `${num1} ${operationSymbol} ${num2} =`;

    // Limpia el contenido del div 'resultadoDiv' para no mostrar el resultado.
    resultadoDiv.textContent = '';
});
