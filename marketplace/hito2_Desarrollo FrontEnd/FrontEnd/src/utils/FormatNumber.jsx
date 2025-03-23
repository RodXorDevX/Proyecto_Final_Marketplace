// Utils/formatNumber.js

/**
 * Formatea un número con separadores de miles y sin decimales.
 * 
 * @param {number} number - El número que se va a formatear.
 * @param {string} [locale='en-US'] - El locale a usar para el formateo (opcional).
 * @returns {string} El número formateado con separadores de miles, sin decimales.
 */
export function formatNumber(number, locale = 'es-CL') {
    if (isNaN(number)) {
        return ''; // Si no es un número válido, retornamos una cadena vacía.
    }

    return Math.floor(number).toLocaleString(locale); // Redondear hacia abajo y formatear
}