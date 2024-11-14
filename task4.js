(function () {
    const fetchDataButton = document.getElementById('fetchData');
    const endpointSelect = document.getElementById('endpointSelect');
    const limitInput = document.getElementById('limitInput');
    const loadingIndicator = document.getElementById('loading');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const apiToken = "jSCQGKDKruKlsDPZujorsPiVxRYwEXmI";

    const clearTable = () => {
        dataTable.innerHTML = '';
    };

    const fetchData = () => {

        const endpoint = endpointSelect.value;
        let url = `https://www.ncei.noaa.gov/cdo-web/api/v2/${endpoint}`;

        const limit = limitInput.value || 25;  // Default limit to 25
        url += `?limit=${limit}`;

        loadingIndicator.style.display = 'block';

        // Fetch the data from NOAA API
        fetch(url, {
            headers: {
                'token': apiToken
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                const results = data.results || [];
                clearTable();

                results.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id || 'N/A'}</td>
                        <td>${item.name || 'N/A'}</td>
                  
                    `;
                    dataTable.appendChild(row);
                });
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Error fetching data. Check the console for details.");
            })
            .finally(() => {
                loadingIndicator.style.display = 'none';
            });
    };

    fetchDataButton.addEventListener("click", fetchData);
})();
