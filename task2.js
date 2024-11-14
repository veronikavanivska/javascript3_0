(function () {
    const fetchStationsButton = document.getElementById('fetchStations');
    const loadingIndicator = document.getElementById('loading');
    const stationTable = document.getElementById('stationTable');
    const apiToken = "jSCQGKDKruKlsDPZujorsPiVxRYwEXmI";

    // Clear previous data
    const clearTable = () => {
        stationTable.innerHTML = '';
    };

    // Fetch data from NOAA API
    fetchStationsButton.addEventListener("click", function () {
        clearTable();
        loadingIndicator.style.display = 'block';

        fetch("https://www.ncei.noaa.gov/cdo-web/api/v2/stations", {
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

                data.results.forEach(station => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${station.id}</td>
                    <td>${station.name}</td>
                    <td>${station.state || 'N/A'}</td>
                    <td>${station.latitude}</td>
                    <td>${station.longitude}</td>
                `;
                    stationTable.appendChild(row);
                });
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Error fetching station data. Check the console for details.");
            })
            .finally(() => {
                loadingIndicator.style.display = 'none';
            });
    });
})();
