// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
// Replace with your Google Form's formResponse URL and entry IDs
// Instructions: See README.md for how to get these values

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScayfYui8Wkh5kALc0mf9ceF42IP-9zkX-c9OxaECZx37MWiQ/formResponse?';
// Example: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse'

const ENTRY_IDS = {
    paymentType: 'entry.374887505',  // e.g., 'entry.123456789'
    amount: 'entry.997602920',              // e.g., 'entry.987654321'
    date: 'entry.733685855'                   // e.g., 'entry.555555555'
};

// ============================================
// FORM HANDLING
// ============================================

const form = document.getElementById('paymentForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get input values
    const payments = {
        'TD VISA': parseFloat(document.getElementById('tdVisa').value) || 0,
        'MBNA': parseFloat(document.getElementById('mbna').value) || 0,
        'TD LOC': parseFloat(document.getElementById('tdLoc').value) || 0,
        'Tangerine LOC': parseFloat(document.getElementById('tangerine').value) || 0
    };
    
    // Check if at least one payment is entered
    const hasPayment = Object.values(payments).some(amount => amount > 0);
    
    if (!hasPayment) {
        showMessage('error');
        return;
    }
    
    // Get current date/time
    const now = new Date();
    const dateString = now.toLocaleString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    // Submit each non-zero payment
    const submissions = [];
    for (const [type, amount] of Object.entries(payments)) {
        if (amount > 0) {
            submissions.push(submitPayment(type, amount, dateString));
        }
    }
    
    try {
        await Promise.all(submissions);
        showMessage('success');
        form.reset();
    } catch (error) {
        console.error('Submission error:', error);
        showMessage('error');
    }
});

// ============================================
// GOOGLE FORMS SUBMISSION
// ============================================

async function submitPayment(paymentType, amount, date) {
    // Build the URL with form data
    const url = `${GOOGLE_FORM_URL}?${ENTRY_IDS.paymentType}=${encodeURIComponent(paymentType)}&${ENTRY_IDS.amount}=${amount}&${ENTRY_IDS.date}=${encodeURIComponent(date)}&submit=Submit`;
    
    // Submit to Google Forms
    await fetch(url, {
        method: 'POST',
        mode: 'no-cors' // Required for Google Forms
    });
}

// ============================================
// UI FEEDBACK
// ============================================

function showMessage(type) {
    // Hide both messages first
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    
    // Show the appropriate message
    if (type === 'success') {
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 3000);
    } else {
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 3000);
    }
}

// ============================================
// AUTO-FOCUS NEXT FIELD
// ============================================

// Add convenience: pressing Enter moves to next field
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach((input, index) => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            } else {
                form.querySelector('.submit-btn').click();
            }
        }
    });
});
