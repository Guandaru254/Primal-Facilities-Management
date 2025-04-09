// load.js - Updated

/**
 * Initializes header components after dynamic loading.
 * This function MUST be defined elsewhere (e.g., in fixnix.js or custom-init.js)
 * and should contain the logic to make mobile nav, etc., work.
 * @param {HTMLElement} containerElement - The parent element (#header) containing the loaded components.
 */
// declare function initializeHeaderComponents(containerElement): void; // Example declaration if using TypeScript/JSDoc

// Function to load an HTML file and insert it into a target element
function loadHTML(target, file) {
    console.log(`[load.js] Attempting to load ${file} into #${target}`); // Added log prefix
    fetch(file) // Fetch the file
        .then(response => {
            console.log(`[load.js] Response received for ${file}, ok: ${response.ok}, status: ${response.status}`); // Added log prefix
            if (!response.ok) {
                // Throw a more informative error including the status
                throw new Error(`Error loading ${file}: Server responded with status ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const targetElement = document.getElementById(target);
            if (targetElement) {
                console.log(`[load.js] Found element #${target}, inserting data.`); // Added log prefix
                targetElement.innerHTML = data; // Insert into the target div

                // *** === ADDED: Trigger component initialization === ***
                if (target === 'header') {
                    console.log(`[load.js] Header loaded, attempting to initialize components inside #${target}.`); // Added log
                    // Check if the initialization function exists before calling it
                    if (typeof initializeHeaderComponents === 'function') {
                        try {
                            // Call the specific init function, passing the #header div as the container
                            initializeHeaderComponents(targetElement);
                            console.log(`[load.js] Successfully called initializeHeaderComponents for #${target}.`); // Added success log
                        } catch (initError) {
                            // Catch errors specifically from the initialization function
                            console.error(`[load.js] Error executing initializeHeaderComponents for #${target}:`, initError);
                        }
                    } else {
                        // Warn if the function isn't defined - components won't work!
                        console.warn(`[load.js] WARN: initializeHeaderComponents function is not defined. Header components (like mobile nav) may not be interactive.`);
                    }
                }
                // *** === END ADDED CODE === ***

            } else {
                console.error(`[load.js] Error: Element with ID '${target}' not found!`); // Added log prefix
            }
        })
        .catch(error => {
            // Log the fetch error more explicitly
            console.error(`[load.js] Failed to fetch or process ${file}:`, error); // Added log prefix and context
        });
}

// When the page loads, insert the header and footer
window.onload = function() {
    console.log("[load.js] Window loaded, starting loadHTML calls."); // Added log prefix
    loadHTML('header', 'header.html'); // Load the header into <div id="header">
    loadHTML('footer', 'footer.html'); // Load the footer into <div id="footer">
};