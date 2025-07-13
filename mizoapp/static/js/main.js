

// Set the minimum date in the date input field
document.querySelector('input[type="date"]').min = new Date().toISOString().split('T')[0];

// Show and hide popup
function showPopup() {
    document.getElementById("popupDiv").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function hidePopup() {
    document.getElementById("popupDiv").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Search functionality
const searchbox = document.getElementById("searchbox");
const suggestions = document.getElementById("suggestions");
const searchButton = document.getElementById("searchbutton");
const searchresult = document.getElementById("searchresult");

// Initial recent search data with correct Django route format
let recentsearches = [
    { name: "Kolkata", link: "/kolkata/" },
    { name: "Bangalore", link: "/banglore/" },   // Optional: fix spelling to "bangalore"
    { name: "Chennai", link: "/chennai/" },
    { name: "Delhi", link: "/delhi/" },
    { name: "Noida", link: "/noida/" },
    { name: "Hyderabad", link: "/hydrabad/" },   // Optional: fix spelling to "hyderabad"
    { name: "Pune", link: "/pune/" },
    { name: "Madurai", link: "/madurai/" }
];

// Show suggestions on focus
searchbox.addEventListener("focus", showSuggestions);

// Show suggestion items from the recentsearches array
function showSuggestions() {
    if (recentsearches.length > 0) {
        suggestions.innerHTML = recentsearches
            .map((search) =>
                `<a href="${search.link}" class="suggestion-item">${search.name}</a>`
            )
            .join("");
        suggestions.style.display = "block";
    }
}

// Hide suggestions when clicking outside the search box
document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-container")) {
        suggestions.style.display = "none";
    }
});

// Handle search button click
searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const query = searchbox.value.trim();

    if (query) {
        const formattedQuery = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();
        const slug = query.toLowerCase();  // lowercase for URL

        // Check if city already exists
        const exists = recentsearches.some(item => item.name === formattedQuery);
        if (!exists) {
            recentsearches.unshift({
                name: formattedQuery,
                link: `/${slug}/`
            });

            // Keep only the latest 5 recent searches
            if (recentsearches.length > 5) {
                recentsearches = recentsearches.slice(0, 5);
            }
        }

        // ✅ Redirect to the correct URL
        window.location.href = `/${slug}/`;
    } else {
        searchresult.textContent = "Please enter a search.";
    }

    // Clear input and hide suggestions
    searchbox.value = "";
    suggestions.style.display = "none";
});
