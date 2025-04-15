// Initialize default rates and date
let rates = {
    gold22k: 0,
    gold24k: 0,
    silver: 0,
    lastUpdated: new Date().toLocaleDateString()
};

function loadRates() {
    fetch("https://script.google.com/macros/s/AKfycbx5psVeDoeuWjiK5NJ0hWHgm9h1Y4cgE_QPmIHfuWdFE_I82gIhcqrCoiu2Ct8EHinq/exec")
        .then(res => res.json())
        .then(data => {
            rates = data;
            updateDisplayedRates();
        })
        .catch(err => {
            console.error("Failed to load rates:", err);
        });
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
    const new24kRate = parseFloat(document.getElementById('new24kRate').value);
    const newSilverRate = parseFloat(document.getElementById('newSilverRate').value);
  
    if (!updateDate || isNaN(new22kRate) || isNaN(new24kRate) || isNaN(newSilverRate)) {
      alert('Please enter valid inputs');
      return;
    }
  
    const formData = new URLSearchParams();
    formData.append("gold22k", new22kRate);
    formData.append("gold24k", new24kRate);
    formData.append("silver", newSilverRate);
    formData.append("lastUpdated", new Date(updateDate).toLocaleDateString());
  
    console.log(formData.toString());  // Check if the data is being sent properly

    fetch("https://script.google.com/macros/s/AKfycbx5psVeDoeuWjiK5NJ0hWHgm9h1Y4cgE_QPmIHfuWdFE_I82gIhcqrCoiu2Ct8EHinq/exec", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      
      
      .then(res => res.text())
      .then(() => {
        alert("Rates updated successfully!");
        window.location.href = "index.html";
      })
      .catch(err => {
        console.error("Error updating:", err);
        alert("Failed to update rates.");
      });
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