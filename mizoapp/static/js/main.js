
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      navbar.classList.add("bg-visible");
    } else {
      navbar.classList.remove("bg-visible");
    }
  });


function validateLogin(event) {
  event.preventDefault(); // Prevent default form submission for custom validation

  const email = document.getElementById('log-mail').value.trim();
  const password = document.getElementById('pass').value.trim();
  const checker = document.getElementById('checker').checked;

  if (!email && !password && !checker) {
    alert("Please fill all fields and check the box.");
    return false;
  }

  if (!email) {
    alert("Please enter your email.");
    return false;
  }

  if (!password) {
    alert("Please enter your password.");
    return false;
  }

  if (!checker) {
    alert("Please check the Remember box.");
    return false;
  }

  // If all fields are valid
  alert("Login successful!");
  return true;
}

document.querySelector('.newletter').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('news-mail').value.trim();
  
  if (!email) {
    alert("Please enter your email");
    return false;
  }
  
  if (!email.includes('@') || !email.includes('.')) {
    alert("Please enter a valid email");
    return false;
  }
  
  alert("Subscribed successfully!");
  this.reset(); // Clear the form
  return true;
});
 // Initialize AOS
  document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      easing: 'ease-in-out', // Easing type
      once: false, // Whether animation should happen only once
      mirror: true, // Whether elements should animate out while scrolling past them
      offset: 120, // Offset (in px) from the original trigger point
      delay: 100, // Delay between animations (in ms)
    });
    
  });
  

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
