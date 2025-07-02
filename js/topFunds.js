// js/topFunds.js

function fetchTopFunds() {
    const contentDiv = document.getElementById('top-funds-container');
    const skeletonDiv = document.getElementById('top-funds-skeleton');

    if (contentDiv && skeletonDiv) {
        contentDiv.classList.add('hidden');
        skeletonDiv.classList.remove('hidden');
    }

    fetch(`${API_BASE_URL}/top-funds`)
        .then(response => response.json())
        .then(data => {
            if (contentDiv) {
                let html = '';
                data.forEach(fund => {
                    html += `
                        <div class="bg-white rounded-xl shadow-lg p-6 text-center h-full flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <h5 class="text-xl font-semibold mb-2 text-blue-800">${fund['Fund Name']}</h5>
                            <p class="text-gray-700 mb-1"><strong>Category:</strong> ${fund.Category}</p>
                            <p class="text-gray-700 mb-1"><strong>1Y Return:</strong> <span class="font-bold ${parseFloat(fund['1Y Return']) >= 0 ? 'text-green-600' : 'text-red-600'}">${fund['1Y Return']}</span></p>
                        </div>
                    `;
                });
                contentDiv.innerHTML = html;
            }
            if (contentDiv && skeletonDiv) {
                contentDiv.classList.remove('hidden');
                skeletonDiv.classList.add('hidden');
            }
        })
        .catch(error => {
            console.error('Error fetching top funds:', error);
            if (contentDiv && skeletonDiv) {
                contentDiv.classList.remove('hidden');
                skeletonDiv.classList.add('hidden');
                contentDiv.innerHTML = '<p class="text-red-500 text-center">Failed to load top funds data. Please try again later.</p>';
            }
        });
}