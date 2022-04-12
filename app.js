// Listen for form submit
document
	.querySelector('#loan-form')
	.addEventListener('submit', calculateResults);

// Calculate results
function calculateResults(e) {
	// UI Variables
	const amount = document.querySelector('#amount');
	const interest = document.querySelector('#interest');
	const years = document.querySelector('#years');
	// Results
	const monthlyPayment = document.querySelector('#monthly-payment');
	const totalPayment = document.querySelector('#total-payment');
	const totalInterest = document.querySelector('#total-interest');

	// Variables for calculation
	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// Compute monthly payments
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
	} else {
		showError('Please check input.');
	}

	e.preventDefault();
}

function showError(message) {
	// Create a div
	const errorDiv = document.createElement('div');

	// Get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// Add Bootstrap classes
	errorDiv.className = 'alert alert-danger';

	// Create text node and append to div
	errorDiv.appendChild(document.createTextNode(message));

	// Insert error above heading
	card.insertBefore(errorDiv, heading);

	// Clear error after 3 seconds
	setTimeout(clearError, 3000);
}

function clearError() {
	document.querySelector('.alert').remove();
}
