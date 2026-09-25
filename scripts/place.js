const currentYear = document.getElementById('currentyear');
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.getElementById('lastModified');
if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

const temperature = 48;
const windSpeed = 12;

function calculateWindChill(tempF, windSpeedMph) {
    return 35.74 + 0.6215 * tempF - 35.75 * Math.pow(windSpeedMph, 0.16) + 0.4275 * tempF * Math.pow(windSpeedMph, 0.16);
}

const windChillDisplay = document.getElementById('wind-chill');
if (windChillDisplay) {
    if (temperature <= 50 && windSpeed > 3) {
        const chill = calculateWindChill(temperature, windSpeed);
        windChillDisplay.textContent = `${Math.round(chill)}°F`;
    } else {
        windChillDisplay.textContent = 'N/A';
    }
}
