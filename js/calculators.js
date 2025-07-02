// js/calculators.js

document.addEventListener('DOMContentLoaded', () => {
    const calculatorModal = document.getElementById('calculatorModal');
    if (calculatorModal) {
        calculatorModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            const calculatorType = button.getAttribute('data-calculator-type');
            const modalTitle = calculatorModal.querySelector('#calculatorModalLabel');
            const modalBody = calculatorModal.querySelector('#calculatorModalBody');

            modalBody.innerHTML = ''; // Clear previous content

            switch (calculatorType) {
                case 'sip':
                    modalTitle.textContent = 'SIP Calculator';
                    modalBody.innerHTML = `
                        <form id="sipCalculatorForm" class="space-y-4 p-4 bg-gray-50 rounded-lg shadow-inner">
                            <div>
                                <label for="sipMonthlyInvestment" class="block text-gray-700 text-sm font-semibold mb-2">Monthly Investment (₹)</label>
                                <input type="number" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2" id="sipMonthlyInvestment" value="5000" min="1" required>
                            </div>
                            <div>
                                <label for="sipExpectedReturn" class="block text-gray-700 text-sm font-semibold mb-2">Expected Annual Return (%)</label>
                                <input type="number" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2" id="sipExpectedReturn" value="12" min="0.01" step="0.01" required>
                            </div>
                            <div>
                                <label for="sipTimePeriod" class="block text-gray-700 text-sm font-semibold mb-2">Time Period (Years)</label>
                                <input type="number" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2" id="sipTimePeriod" value="10" min="1" required>
                            </div>
                            <div>
                                <label for="sipFrequency" class="block text-gray-700 text-sm font-semibold mb-2">SIP Frequency per Year</label>
                                <input type="number" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2" id="sipFrequency" value="12" min="1" required>
                            </div>
                            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">Calculate SIP</button>
                            <div class="mt-6 p-4 bg-blue-100 rounded-lg shadow-md text-blue-800">
                                <h6 class="text-lg font-bold mb-2">Results:</h6>
                                <p class="text-base"><span class="font-semibold">Invested Amount:</span> <span id="sipInvestedAmount" class="font-normal"></span></p>
                                <p class="text-base"><span class="font-semibold">Estimated Returns:</span> <span id="sipEstimatedReturns" class="font-normal"></span></p>
                                <p class="text-base"><span class="font-semibold">Total Value:</span> <span id="sipTotalValue" class="font-normal"></span></p>
                            </div>
                        </form>
                    `;
                    document.getElementById('sipCalculatorForm').addEventListener('submit', calculateSIP);
                    break;
                case 'lumpsum':
                    modalTitle.textContent = 'Lumpsum Calculator';
                    modalBody.innerHTML = `
                        <form id="lumpsumCalculatorForm" class="space-y-4 p-4 bg-gray-50 rounded-lg shadow-inner">
                            <div>
                                <label for="lumpsumInvestment" class="block text-gray-700 text-sm font-semibold mb-2">Lumpsum Investment (₹)</label>
                                <input type="number" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2" id="lumpsumInvestment" value="100000" min="1" required>
                            </div>
                            <div>
                                <label for="lumpsumExpectedReturn" class="block text-gray-700 text-sm font-semibold mb-2">Expected Annual Return (%)</label>
                                <input type="number" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2" id="lumpsumExpectedReturn" value="12" min="0.01" step="0.01" required>
                            </div>
                            <div>
                                <label for="lumpsumTimePeriod" class="block text-gray-700 text-sm font-semibold mb-2">Time Period (Years)</label>
                                <input type="number" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2" id="lumpsumTimePeriod" value="10" min="1" required>
                            </div>
                            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">Calculate Lumpsum</button>
                            <div class="mt-6 p-4 bg-blue-100 rounded-lg shadow-md text-blue-800">
                                <h6 class="text-lg font-bold mb-2">Results:</h6>
                                <p class="text-base"><span class="font-semibold">Invested Amount:</span> <span id="lumpsumInvestedAmount" class="font-normal"></span></p>
                                <p class="text-base"><span class="font-semibold">Estimated Returns:</span> <span id="lumpsumEstimatedReturns" class="font-normal"></span></p>
                                <p class="text-base"><span class="font-semibold">Total Value:</span> <span id="lumpsumTotalValue" class="font-normal"></span></p>
                            </div>
                        </form>
                    `;
                    document.getElementById('lumpsumCalculatorForm').addEventListener('submit', calculateLumpsum);
                    break;
                case 'risk-profiler':
                    modalTitle.textContent = 'Risk Profiler';
                    modalBody.innerHTML = `
                        <form id="riskProfilerForm" class="space-y-4 p-4 bg-gray-50 rounded-lg shadow-inner">
                            <div class="space-y-2">
                                <label class="block text-gray-700 text-sm font-semibold mb-2">1. What is your primary investment goal?</label>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q1" id="q1a" value="1" required>
                                    <label class="ml-2 text-gray-700" for="q1a">Capital preservation and steady income</label>
                                </div>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q1" id="q1b" value="3">
                                    <label class="ml-2 text-gray-700" for="q1b">Balanced growth and income</label>
                                </div>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q1" id="q1c" value="5">
                                    <label class="ml-2 text-gray-700" for="q1c">Aggressive growth</label>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="block text-gray-700 text-sm font-semibold mb-2">2. How would you react to a 20% drop in your investment portfolio?</label>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q2" id="q2a" value="1" required>
                                    <label class="ml-2 text-gray-700" for="q2a">Sell immediately to prevent further losses</label>
                                </div>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q2" id="q2b" value="3">
                                    <label class="ml-2 text-gray-700" for="q2b">Re-evaluate my investments and consider selling some</label>
                                </div>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q2" id="q2c" value="5">
                                    <label class="ml-2 text-gray-700" for="q2c">See it as a buying opportunity and invest more</label>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="block text-gray-700 text-sm font-semibold mb-2">3. What is your investment horizon?</label>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q3" id="q3a" value="1" required>
                                    <label class="ml-2 text-gray-700" for="q3a">Less than 1 year</label>
                                </div>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q3" id="q3b" value="3">
                                    <label class="ml-2 text-gray-700" for="q3b">1-5 years</label>
                                </div>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q3" id="q3c" value="5">
                                    <label class="ml-2 text-gray-700" for="q3c">More than 5 years</label>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="block text-gray-700 text-sm font-semibold mb-2">4. How much investment knowledge do you possess?</label>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q4" id="q4a" value="1" required>
                                    <label class="ml-2 text-gray-700" for="q4a">Limited</label>
                                </div>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q4" id="q4b" value="3">
                                    <label class="ml-2 text-gray-700" for="q4b">Moderate</label>
                                </div>
                                <div class="flex items-center">
                                    <input class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="radio" name="q4" id="q4c" value="5">
                                    <label class="ml-2 text-gray-700" for="q4c">Extensive</label>
                                </div>
                            </div>
                            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">Get My Risk Profile</button>
                            <div class="mt-6 p-4 bg-blue-100 rounded-lg shadow-md text-blue-800 hidden" id="riskProfilerResult"></div>
                        </form>
                    `;
                    document.getElementById('riskProfilerForm').addEventListener('submit', calculateRiskProfile);
                    break;
                case 'goal-planning':
                    modalTitle.textContent = 'Goal Planning';
                    modalBody.innerHTML = `
                        <form id="goalPlanningForm" class="space-y-4 p-4 bg-gray-50 rounded-lg shadow-inner">
                            <div>
                                <label for="goalName" class="block text-gray-700 text-sm font-semibold mb-2">Goal Name</label>
                                <input type="text" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2" id="goalName" placeholder="e.g., Retirement, Child's Education" required>
                            </div>
                            <div>
                                <label for="goalAmount" class="block text-gray-700 text-sm font-semibold mb-2">Target Amount (₹)</label>
                                <input type="number" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2" id="goalAmount" value="1000000" min="1" required>
                            </div>
                            <div>
                                <label for="goalTimePeriod" class="block text-gray-700 text-sm font-semibold mb-2">Time to Goal (Years)</label>
                                <input type="number" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2" id="goalTimePeriod" value="10" min="1" required>
                            </div>
                            <div>
                                <label for="goalExpectedReturn" class="block text-gray-700 text-sm font-semibold mb-2">Expected Annual Return (%)</label>
                                <input type="number" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2" id="goalExpectedReturn" value="10" min="0.01" step="0.01" required>
                            </div>
                            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">Calculate Required Investment</button>
                            <div class="mt-6 p-4 bg-blue-100 rounded-lg shadow-md text-blue-800 hidden" id="goalPlanningResult"></div>
                        </form>
                    `;
                    document.getElementById('goalPlanningForm').addEventListener('submit', calculateGoalPlanning);
                    break;
                default:
                    modalTitle.textContent = 'Calculator';
                    modalBody.innerHTML = '<p>Select a calculator from the main page.</p>';
            }
        });
    }
});

function calculateSIP(event) {
    event.preventDefault();
    const monthlyInvestment = parseFloat(document.getElementById('sipMonthlyInvestment').value);
    const annualReturn = parseFloat(document.getElementById('sipExpectedReturn').value);
    const timePeriod = parseFloat(document.getElementById('sipTimePeriod').value);
    const sipFrequency = parseFloat(document.getElementById('sipFrequency').value);

    if (isNaN(monthlyInvestment) || isNaN(annualReturn) || isNaN(timePeriod) || isNaN(sipFrequency) || monthlyInvestment <= 0 || annualReturn <= 0 || timePeriod <= 0 || sipFrequency <= 0) {
        alert('Please enter valid positive numbers for all fields.');
        return;
    }

    const ratePerPeriod = annualReturn / 100 / sipFrequency;
    const numberOfPeriods = timePeriod * sipFrequency;

    // Future Value of a Series (SIP) formula: FV = P * [((1 + r/f)^(n*f) - 1) / (r/f)] * (1 + r/f)
    // Where P = monthly investment, r = annual interest rate, f = frequency per year, n = number of years
    let futureValue = monthlyInvestment * (Math.pow(1 + ratePerPeriod, numberOfPeriods) - 1) / ratePerPeriod * (1 + ratePerPeriod);

    const investedAmount = monthlyInvestment * numberOfPeriods;
    const estimatedReturns = futureValue - investedAmount;

    document.getElementById('sipInvestedAmount').textContent = '₹' + investedAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    document.getElementById('sipEstimatedReturns').textContent = '₹' + estimatedReturns.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    document.getElementById('sipTotalValue').textContent = '₹' + futureValue.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

function calculateLumpsum(event) {
    event.preventDefault();
    const investment = parseFloat(document.getElementById('lumpsumInvestment').value);
    const annualReturn = parseFloat(document.getElementById('lumpsumExpectedReturn').value);
    const timePeriod = parseFloat(document.getElementById('lumpsumTimePeriod').value);

    if (isNaN(investment) || isNaN(annualReturn) || isNaN(timePeriod) || investment <= 0 || annualReturn <= 0 || timePeriod <= 0) {
        alert('Please enter valid positive numbers for all fields.');
        return;
    }

    const rate = annualReturn / 100;

    // Future Value of a Lumpsum formula: FV = P * (1 + r)^n
    // Where P = principal investment, r = annual interest rate, n = number of years
    let futureValue = investment * Math.pow(1 + rate, timePeriod);

    const investedAmount = investment;
    const estimatedReturns = futureValue - investedAmount;

    document.getElementById('lumpsumInvestedAmount').textContent = '₹' + investedAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    document.getElementById('lumpsumEstimatedReturns').textContent = '₹' + estimatedReturns.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    document.getElementById('lumpsumTotalValue').textContent = '₹' + futureValue.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

function calculateRiskProfile(event) {
    event.preventDefault();
    let score = 0;
    const form = event.target;

    // Get scores from each question
    const q1 = parseInt(form.elements['q1'].value);
    const q2 = parseInt(form.elements['q2'].value);
    const q3 = parseInt(form.elements['q3'].value);
    const q4 = parseInt(form.elements['q4'].value);

    score = q1 + q2 + q3 + q4;

    let riskProfile = '';
    let riskDescription = '';

    if (score >= 4 && score <= 8) {
        riskProfile = 'Conservative';
        riskDescription = 'You prioritize capital preservation and are comfortable with lower returns for stability.';
    } else if (score >= 9 && score <= 14) {
        riskProfile = 'Moderate';
        riskDescription = 'You seek a balance between growth and stability, willing to take some calculated risks.';
    } else if (score >= 15 && score <= 20) {
        riskProfile = 'Aggressive';
        riskDescription = 'You are comfortable with higher risks for potentially higher returns, focusing on long-term growth.';
    } else {
        riskProfile = 'Undetermined';
        riskDescription = 'Please answer all questions to determine your risk profile.';
    }

    document.getElementById('riskProfilerResult').innerHTML = `
        <div class="alert alert-info mt-3" role="alert">
            <h6>Your Risk Profile: <strong>${riskProfile}</strong></h6>
            <p>${riskDescription}</p>
        </div>
    `;
}

function calculateGoalPlanning(event) {
    event.preventDefault();
    const goalName = document.getElementById('goalName').value;
    const goalAmount = parseFloat(document.getElementById('goalAmount').value);
    const goalTimePeriod = parseFloat(document.getElementById('goalTimePeriod').value);
    const goalExpectedReturn = parseFloat(document.getElementById('goalExpectedReturn').value);

    if (isNaN(goalAmount) || isNaN(goalTimePeriod) || isNaN(goalExpectedReturn) || goalAmount <= 0 || goalTimePeriod <= 0 || goalExpectedReturn <= 0) {
        alert('Please enter valid positive numbers for all fields.');
        return;
    }

    const monthlyRate = goalExpectedReturn / 100 / 12;
    const numberOfMonths = goalTimePeriod * 12;

    // Formula for required monthly investment to reach a future value (FV of Annuity Due formula rearranged)
    // PMT = FV * r / ((1 + r)^n - 1) / (1 + r)
    let requiredMonthlyInvestment = (goalAmount * monthlyRate) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / (1 + monthlyRate);

    document.getElementById('goalPlanningResult').innerHTML = `
        <div class="alert alert-success mt-3" role="alert">
            <h6>Goal: <strong>${goalName || 'Your Goal'}</strong></h6>
            <p>To reach ₹${goalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })} in ${goalTimePeriod} years, you need to invest approximately <strong>₹${requiredMonthlyInvestment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong> per month.</p>
        </div>
    `;
}