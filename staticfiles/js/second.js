
       // Get all toggle buttons and their corresponding more-details sections
       const toggleBtns = document.querySelectorAll('.toggle-btn');
       const moreDetailsSections = document.querySelectorAll('.more-details');
       
       // Add click event to each toggle button
       toggleBtns.forEach((btn, index) => {
           btn.addEventListener('click', () => {
               const details = moreDetailsSections[index];
               
               if (details.style.maxHeight) {
                   // Collapse
                   details.style.maxHeight = null;
                   btn.textContent = 'View More';
               } else {
                   // Expand
                   details.style.maxHeight = details.scrollHeight + 'px';
                   btn.textContent = 'View Less';
               }
           });
       });
       
       
               function openPanel() {
                   document.getElementById("sidePanel").classList.add("open");
               }
       
               function closePanel() {
                   document.getElementById("sidePanel").classList.remove("open");
               }

  //              //booking//
               document.addEventListener('DOMContentLoaded', function() {
                // Handle all book buttons
                document.querySelectorAll('.book').forEach(button => {
                    button.addEventListener('click', function() {
                        // Find parent container (works for all box variations)
                        const hotelContainer = this.closest('[class^="box"]');
                        
                        // Debug: Log the container to verify
                        console.log("Hotel container:", hotelContainer);
                        
                        // Extract hotel details with null checks
                        const getText = (selector) => 
                            hotelContainer.querySelector(selector)?.textContent?.trim() || 'Not specified';
                        
                        const hotelDetails = {
                            name: getText('.details h3'),
                            location: getText('.text-info'),
                            price: getText('.pri'),
                            taxes: getText('.tax'),
                            image: hotelContainer.querySelector('.pic')?.src || 'default.jpg',
                            rating: getText('.revbtn')
                        };
                        
                        console.log("Extracted details:", hotelDetails);
                        
                        // Store and redirect
                        try {
                            sessionStorage.setItem('selectedHotel', JSON.stringify(hotelDetails));
                            window.location.href = '/booking/';
                        } catch (e) {
                            console.error("Storage error:", e);
                            alert("Booking system is currently unavailable. Please try again later.");
                        }
                    });
                });
            });
  // Sample hotel data if none in sessionStorage
  const defaultHotel = {
    name: "Grand Luxury Hotel & Spa",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: "4.8",
    price: "₹8,500",
    taxes: "₹1,200"
  };

  const hotel = JSON.parse(sessionStorage.getItem('selectedHotel')) || defaultHotel;

  // Populate hotel details
  document.querySelector('.hotel-name').textContent = hotel.name;
  document.querySelector('.text-info').textContent = hotel.location;
  document.querySelector('.pic').src = hotel.image;
  document.querySelector('.revbtn').innerHTML = `<i class="fas fa-star"></i> ${hotel.rating}`;
  document.querySelector('.pri').textContent = hotel.price;
  document.querySelector('.tax').textContent = hotel.taxes;

  // Helper function to extract numbers from text
  const extractNumber = (text) => parseInt(text.replace(/[^0-9]/g, '')) || 0;

  // Calculate and update total price
  const updateTotal = () => {
    const pricePerNight = extractNumber(document.querySelector('.pri').textContent);
    const tax = extractNumber(document.querySelector('.tax').textContent);
    const serviceCharge = 250;
    
    // Calculate nights based on dates
    const checkIn = new Date(document.querySelector('input[type="date"]').value);
    const checkOut = new Date(document.querySelectorAll('input[type="date"]')[1].value);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) || 1;
    
    const total = (pricePerNight * nights) + tax + serviceCharge;
    document.querySelectorAll('.totalPrice').forEach(el => {
      el.textContent = total.toLocaleString('en-IN');
    });
  };

  // Set default dates (today + 2 days)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 3);
  
  document.querySelectorAll('input[type="date"]')[0].valueAsDate = tomorrow;
  document.querySelectorAll('input[type="date"]')[1].valueAsDate = nextWeek;
  
  // Format dates for display
  const formatDate = (date) => date.toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]')[0].value = formatDate(tomorrow);
  document.querySelectorAll('input[type="date"]')[1].value = formatDate(nextWeek);

  // Event listeners
  document.querySelectorAll('input[type="date"], select').forEach(el => {
    el.addEventListener('change', updateTotal);
  });
  
  updateTotal();

  // Form submission
  document.querySelector('.bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.querySelector('.username').value;
    
    // Show confirmation modal
    const modalHtml = `
      <div class="modal fade" id="bookingModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title text-success"><i class="fas fa-check-circle me-2"></i>Booking Confirmed!</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center py-4">
              <i class="fas fa-check-circle text-success mb-3" style="font-size: 3rem;"></i>
              <h4>Thank you, ${name}!</h4>
              <p class="mb-0">Your booking at ${hotel.name} has been confirmed.</p>
              <p>A confirmation email has been sent to your registered address.</p>
              <div class="alert alert-info mt-3">
                <strong>Booking Reference:</strong> LUX-${Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>
            <div class="modal-footer border-0 justify-content-center">
              <button type="button" class="btn btn-success" data-bs-dismiss="modal">Continue</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    modal.show();
    
    // Remove modal after close
    document.getElementById('bookingModal').addEventListener('hidden.bs.modal', function() {
      this.remove();
    });
  });




//   document.addEventListener('DOMContentLoaded', function () {
//   console.log("JS loaded for hotel listing page");

//   document.querySelectorAll('.book').forEach(button => {
//     button.addEventListener('click', function () {
//       console.log("Book Now button clicked");
//       const hotelContainer = this.closest('[class^="box"]');
//       if (!hotelContainer) return;

//       const getText = (selector) =>
//         hotelContainer.querySelector(selector)?.textContent.trim() || 'Not specified';

//       const hotelDetails = {
//         name: getText('.details h3'),
//         location: getText('.text-info'),
//         price: getText('.pri'),
//         taxes: getText('.tax'),
//         image: hotelContainer.querySelector('.pic')?.src || 'default.jpg',
//         rating: getText('.revbtn')
//       };

//       console.log("Extracted hotel details:", hotelDetails);

//       try {
//         sessionStorage.setItem('selectedHotel', JSON.stringify(hotelDetails));
//         window.location.href = '/booking/';
//       } catch (e) {
//         console.error("Error saving to sessionStorage:", e);
//         alert("Booking failed. Try again.");
//       }
//     });
//   });
// });
// document.addEventListener('DOMContentLoaded', function () {
//   console.log("JS loaded for booking page");

//   const defaultHotel = {
//     name: "Grand Luxury Hotel & Spa",
//     location: "Mumbai, India",
//     image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
//     rating: "4.8",
//     price: "₹8,500",
//     taxes: "₹1,200"
//   };

//   const hotel = JSON.parse(sessionStorage.getItem('selectedHotel')) || defaultHotel;

//   document.querySelector('.hotel-name').textContent = hotel.name;
//   document.querySelector('.text-info').textContent = hotel.location;
//   document.querySelector('.pic').src = hotel.image;
//   document.querySelector('.revbtn').innerHTML = `<i class="fas fa-star"></i> ${hotel.rating}`;
//   document.querySelector('.pri').textContent = hotel.price;
//   document.querySelector('.tax').textContent = hotel.taxes;

//   const extractNumber = (text) => parseInt(text.replace(/[^0-9]/g, '')) || 0;

//   const updateTotal = () => {
//     const pricePerNight = extractNumber(document.querySelector('.pri').textContent);
//     const tax = extractNumber(document.querySelector('.tax').textContent);
//     const serviceCharge = 250;

//     const checkIn = new Date(document.querySelector('input[name="checkin"]').value);
//     const checkOut = new Date(document.querySelector('input[name="checkout"]').value);
//     const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));

//     const total = (pricePerNight * nights) + tax + serviceCharge;
//     document.querySelectorAll('.totalPrice').forEach(el => {
//       el.textContent = total.toLocaleString('en-IN');
//     });
//   };

//   // Set default dates (tomorrow and day after)
//   const today = new Date();
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);

//   const nextDay = new Date(today);
//   nextDay.setDate(today.getDate() + 2);

//   const formatDate = (date) => date.toISOString().split('T')[0];
//   document.querySelector('input[name="checkin"]').value = formatDate(tomorrow);
//   document.querySelector('input[name="checkout"]').value = formatDate(nextDay);

//   document.querySelectorAll('input[type="date"], select').forEach(el => {
//     el.addEventListener('change', updateTotal);
//   });

//   updateTotal();

//   document.querySelector('.bookingForm')?.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const name = document.querySelector('.username').value;

//     const modalHtml = `
//       <div class="modal fade" id="bookingModal" tabindex="-1" aria-hidden="true">
//         <div class="modal-dialog modal-dialog-centered">
//           <div class="modal-content">
//             <div class="modal-header border-0">
//               <h5 class="modal-title text-success"><i class="fas fa-check-circle me-2"></i>Booking Confirmed!</h5>
//               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body text-center py-4">
//               <i class="fas fa-check-circle text-success mb-3" style="font-size: 3rem;"></i>
//               <h4>Thank you, ${name}!</h4>
//               <p>Your booking at <strong>${hotel.name}</strong> is confirmed.</p>
//               <p>A confirmation email has been sent to your email address.</p>
//               <div class="alert alert-info mt-3">
//                 <strong>Booking Reference:</strong> LUX-${Math.floor(100000 + Math.random() * 900000)}
//               </div>
//             </div>
//             <div class="modal-footer border-0 justify-content-center">
//               <button type="button" class="btn btn-success" data-bs-dismiss="modal">Continue</button>
//             </div>
//           </div>
//         </div>
//       </div>`;

//     document.body.insertAdjacentHTML('beforeend', modalHtml);
//     const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
//     modal.show();

//     document.getElementById('bookingModal').addEventListener('hidden.bs.modal', function () {
//       this.remove();
//     });
//   });
// });
