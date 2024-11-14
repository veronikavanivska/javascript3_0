(function () {
    const fetchDataButton = document.getElementById('fetchData');
    const loadingIndicator = document.getElementById('loading');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const apiToken = "jSCQGKDKruKlsDPZujorsPiVxRYwEXmI";

    const clearTable = () => {
        dataTable.innerHTML = '';
    };

    fetchDataButton.addEventListener("click", function () {
        const url = `https://www.ncei.noaa.gov/cdo-web/api/v2/datacategories`;

        clearTable();
        loadingIndicator.style.display = 'block';

        fetch(url, {
            headers: {
                token: apiToken
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                const results = data.results || data;
                if (results && results.length > 0) {
                    results.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                                    <td>${item.id || 'N/A'}</td>
                                    <td>${item.name || 'N/A'}</td>
                                `;
                        dataTable.appendChild(row);
                    });
                } else {
                    const row = document.createElement('tr');
                    row.innerHTML = '<td colspan="3">No data available</td>';
                    dataTable.appendChild(row);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Error fetching data. Check the console for details.");
            })
            .finally(() => {
                loadingIndicator.style.display = 'none';
            });
    });
})();