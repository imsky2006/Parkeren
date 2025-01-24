//functie om data op te halen
const apiURL = "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20";

async function fetchAndDisplayParkings() {
    try {
        const parkingContainer = document.getElementById("parking-data");
        const response = await fetch(apiURL);


        if (!response.ok) {
            throw new Error("Kon data niet weergeven:", response.status);
        }
        const data = await response.json();
        console.log("Mijn response:", data);
        const parkings = data.results;
        parkings.forEach(parking => {
            const { occupation, name, totalcapacity, availablecapacity, isopennow } = parking;
            const occupied = totalcapacity - availablecapacity;
            const status = isopennow ? "open" : "gesloten";
            const parkingDiv = document.createElement("div");
parkingDiv.classList.add("parking");

parkingDiv.innerHTML = `<h3>${name}</h3>
            <p><strong>max: </strong>${totalcapacity}</p>
            <p><strong>Bezet: </strong>${occupation}</p>
            <p><strong>Beschikbaar:</strong> ${availablecapacity}</p>
            <p class ="${isopennow ? 'open':'gesloten'}"> <strong>${status}</strong></p>`;

parkingContainer.appendChild(parkingDiv);


        });
    } catch (error) {
        console.error("Fout bij data fetch:", error);
    } finally {
        console.log("Fetch completed");
    }
}

fetchAndDisplayParkings();