// load.js


// Function to load an HTML file and insert it into a target element
function loadHTML(target, file) {
    fetch(file) // Fetch the file
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading ${file}`);
            }
            return response.text(); 
        })
        .then(data => {
            document.getElementById(target).innerHTML = data; // Insert into the target div
        })
        .catch(error => console.error(error)); 
}

// When the page loads, insert the header and footer
window.onload = function() {
    loadHTML('header', '/Primal-Facilities-Management-master/header.html'); // Load the header into <div id="header">
    loadHTML('footer', '/Primal-Facilities-Management-master/footer.html'); // Load the footer into <div id="footer">
};
