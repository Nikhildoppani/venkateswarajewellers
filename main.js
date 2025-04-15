// Initialize default rates and date
let rates = {
    gold22k: 0,
    gold24k: 0,
    silver: 0,
    lastUpdated: new Date().toLocaleDateString()
};

// Load rates from localStorage
function loadRates() {
    const savedRates = localStorage.getItem('jewelryRates');
    if (savedRates) {
        rates = JSON.parse(savedRates);
        updateDisplayedRates();
    }
}

// Function to update displayed rates
function updateDisplayedRates() {
    const rate22kElement = document.getElementById('rate22k');
    const rate24kElement = document.getElementById('rate24k');
    const rateSilverElement = document.getElementById('rateSilver');
    const lastUpdatedElement = document.getElementById('lastUpdated');

    if (rate22kElement) rate22kElement.textContent = rates.gold22k.toFixed(2);
    if (rate24kElement) {
        const perGramRate = rates.gold24k / 10; // Calculate per gram rate
        rate24kElement.textContent = `${rates.gold24k.toFixed(2)} / 10g  and ₹${perGramRate.toFixed(2)}`;
    }
    if (rateSilverElement) rateSilverElement.textContent = rates.silver.toFixed(2);
    if (lastUpdatedElement) lastUpdatedElement.textContent = rates.lastUpdated;
}

// Function to handle rate updates
function handleRateUpdate() {
    const updateDate = document.getElementById('updateDate').value;
    const new22kRate = parseFloat(document.getElementById('new22kRate').value);
    const new24kRate = parseFloat(document.getElementById('new24kRate').value); // This is now for 10 grams
    const newSilverRate = parseFloat(document.getElementById('newSilverRate').value);

    if (!updateDate) {
        alert('Please select a date');
        return;
    }

    if (isNaN(new22kRate) || isNaN(new24kRate) || isNaN(newSilverRate)) {
        alert('Please enter valid numbers for all rates');
        return;
    }

    rates = {
        gold22k: new22kRate,
        gold24k: new24kRate, // Storing the 10-gram rate directly
        silver: newSilverRate,
        lastUpdated: new Date(updateDate).toLocaleDateString()
    };

    localStorage.setItem('jewelryRates', JSON.stringify(rates));
    updateDisplayedRates();

    document.getElementById('updateDate').value = '';
    document.getElementById('new22kRate').value = '';
    document.getElementById('new24kRate').value = '';
    document.getElementById('newSilverRate').value = '';

    alert('Rates updated successfully!');
    window.location.href = 'index.html';
}

// Function to update countdown timers
function updateCountdowns() {
    const countdowns = document.querySelectorAll('.countdown');
    countdowns.forEach(countdown => {
        let time = countdown.textContent.split(':');
        let hours = parseInt(time[0]);
        let minutes = parseInt(time[1]);
        let seconds = parseInt(time[2]);

        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        }

        countdown.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadRates();
    
    // Only add event listener if we're on the update page
    const updateButton = document.getElementById('updateRatesBtn');
    if (updateButton) {
        updateButton.addEventListener('click', handleRateUpdate);
    }

    // Start countdown timers if we're on the home page
    if (document.querySelector('.countdown')) {
        setInterval(updateCountdowns, 1000);
    }
});