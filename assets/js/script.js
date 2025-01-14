let clickCounter = 0;
  let usedColors = [];
  const colorList = [
      'red', 'blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'lime', 
      'brown', 'magenta', 'gold', 'silver', 'teal', 'violet', 'coral', 
      'navy', 'maroon', 'olive', 'salmon', 'plum', 'khaki', 'aqua', 'fuchsia', 
      'indigo', 'chocolate', 'orchid', 'tan', 'peru', 'crimson', 'lavender', 
      'darkgreen', 'darkblue', 'lightblue', 'lightgreen', 'peachpuff', 
      'rosybrown', 'sienna', 'slateblue', 'tomato', 'wheat', 'yellowgreen',
      'lightsalmon', 'mediumslateblue', 'slategray', 'darkorange', 'forestgreen'
  ];
  
  const originalPos = { top: 100, left: 100 }; // Save initial position
  
  function getRandomColor() {
      let newColor;
      do {
          newColor = colorList[Math.floor(Math.random() * colorList.length)];
      } while (usedColors.includes(newColor));
      usedColors.push(newColor);
      return newColor;
  }
  
  function changeColorAndMove(button) {
      if (clickCounter === 50) return;
  
      clickCounter++;
  
      const selectedColor = getRandomColor();
      button.style.backgroundColor = selectedColor;
  
      // Document size for random movement
      const docHeight = document.documentElement.scrollHeight;
      const docWidth = document.documentElement.scrollWidth;
  
      const randomX = Math.floor(Math.random() * (docWidth - 50));  // Button width
      const randomY = Math.floor(Math.random() * (docHeight - 50)); // Button height
  
      button.classList.add('hidden-btn');
  
      // Delay for repositioning and showing the button again
      setTimeout(() => {
          button.style.left = `${randomX}px`;
          button.style.top = `${randomY}px`;
          button.classList.remove('hidden-btn');
      }, 1000);
  
      if (clickCounter === 50) {
          button.classList.add('disabled-btn');
          button.style.left = `${originalPos.left}px`;
          button.style.top = `${originalPos.top}px`;
          button.innerHTML = "<i class='fas fa-dollar-sign'></i> Disabled";
      }
  }
  
  window.onload = function() {
      const button = document.querySelector('.circle-btn');
      originalPos.top = button.offsetTop;
      originalPos.left = button.offsetLeft;
  };
  ///////////////////////////////////////////////

// Accordion 
function myAccFunc() {
  var x = document.getElementById("demoAcc");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}




// Open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

/////

function showSlide(carouselId, index) {
  const carouselInner = document.querySelector(`#${carouselId} .carousel-inner`);
  const totalSlides = carouselInner.children.length;
  let currentSlide = index;

  if (index >= totalSlides) {
      currentSlide = 0;
  } else if (index < 0) {
      currentSlide = totalSlides - 1;
  }

  carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
  return currentSlide; // Return current slide index for further reference
}

function nextSlide(carouselId) {
  const currentSlide = showSlide(carouselId, getCurrentSlideIndex(carouselId) + 1);
}

function prevSlide(carouselId) {
  const currentSlide = showSlide(carouselId, getCurrentSlideIndex(carouselId) - 1);
}

function getCurrentSlideIndex(carouselId) {
  const carouselInner = document.querySelector(`#${carouselId} .carousel-inner`);
  const transformValue = getComputedStyle(carouselInner).transform;
  const matrix = new WebKitCSSMatrix(transformValue);
  return Math.abs(matrix.m41 / (carouselInner.clientWidth || 1)); // Use the client width to avoid division by zero
}

// Automatically scroll every 3 seconds for each carousel
const carousels = ['carousel1', 'carousel2', 'carousel3', 'carousel4'];
carousels.forEach(carousel => {
  setInterval(() => nextSlide(carousel), 3000);
});

////////////////////////////////////////////////////////////////////////////////
let selectedGadgets = {};
let totalPrice = 0;

function updateOrderSummary() {
    const summary = document.getElementById('order-summary');
    if (Object.keys(selectedGadgets).length === 0) {
        summary.innerHTML = 'No gadgets selected.';
        totalPrice = 0;
    } else {
        summary.innerHTML = '';
        for (const [name, details] of Object.entries(selectedGadgets)) {
            summary.innerHTML += `<span class="product-name">${name}</span> <span class="product-quantity">(Quantity: ${details.quantity})</span><br>`;
        }
    }
    document.getElementById('total-price').innerText = `Total: ₦${totalPrice}`;
}

function updateWhatsAppLink() {
    const baseUrl = 'https://wa.me/+2347038490327?text=';
    let message = 'I would like to inquire about the following gadgets:\n';

    for (const [name, details] of Object.entries(selectedGadgets)) {
        message += `${name} (Quantity: ${details.quantity}) - Specs: ${details.specs}\n`;
    }
    message += `Total Price: ₦${totalPrice}`;

    const whatsappLink = baseUrl + encodeURIComponent(message);
    document.getElementById('whatsapp-link').href = whatsappLink;
}

document.querySelectorAll('.select-gadget').forEach(button => {
    button.addEventListener('click', function() {
        const gadget = this.parentElement;
        const name = gadget.getAttribute('data-name');
        const specs = gadget.getAttribute('data-spec');
        const price = parseFloat(gadget.getAttribute('data-price'));

        // Check if the gadget has already been selected
        if (selectedGadgets[name]) {
            selectedGadgets[name].quantity += 1; // Increase quantity
            totalPrice += price; // Update total price
        } else {
            selectedGadgets[name] = { specs: specs, quantity: 1, price: price }; // Add new gadget
            totalPrice += price; // Update total price
        }

        // Update WhatsApp link and order summary
        updateWhatsAppLink();
        updateOrderSummary();

        // Show calculator if items are selected
        document.getElementById('calculator').style.display = 'block';
        document.getElementById('cancel-icon').style.display = 'block'; // Show cancel icon
    });
});

document.querySelectorAll('.remove-gadget').forEach(button => {
    button.addEventListener('click', function() {
        const gadget = this.parentElement;
        const name = gadget.getAttribute('data-name');
        const price = parseFloat(gadget.getAttribute('data-price'));

        if (selectedGadgets[name]) {
            selectedGadgets[name].quantity -= 1; // Decrease quantity
            totalPrice -= price; // Update total price

            // Remove gadget from selectedGadgets if quantity reaches zero
            if (selectedGadgets[name].quantity === 0) {
                delete selectedGadgets[name];
            }

            // Update WhatsApp link and order summary
            updateWhatsAppLink();
            updateOrderSummary();

            // Hide calculator if no items are selected
            if (Object.keys(selectedGadgets).length === 0) {
                document.getElementById('calculator').style.display = 'none';
                document.getElementById('cancel-icon').style.display = 'none'; // Hide cancel icon
            }
        }
    });
});

document.getElementById('cancel-icon').addEventListener('click', function() {
    selectedGadgets = {}; // Clear selected gadgets
    totalPrice = 0; // Reset total price
    updateOrderSummary(); // Update summary
    document.getElementById('calculator').style.display = 'none'; // Hide calculator
    this.style.display = 'none'; // Hide cancel icon
});

function convertToXPCode(total) {
  // Convert total to hexadecimal
  let hexCode = total.toString(16).toUpperCase();

  // Replace the hexadecimal characters with the custom characters
  hexCode = hexCode.replace(/A/g, 'i')
                   .replace(/B/g, 'T')
                   .replace(/C/g, 'e')
                   .replace(/D/g, 'c')
                   .replace(/E/g, 'h')
                   .replace(/F/g, 'X');

  return hexCode;
}

function updateWhatsAppLink() {
  const baseUrl = 'https://wa.me/+2347038490327?text=';
  let message = '*iTechx*\nI would like to inquire about the following gadgets:\n';

  for (const [name, details] of Object.entries(selectedGadgets)) {
      message += `*${name}* (Quantity: *${details.quantity}*) - Specs: ${details.specs}\n`;
  }

  const xpCode = convertToXPCode(totalPrice); // Convert total to XP code
  message += `*Total Price:* ₦${totalPrice}\n*XP Code:* ${xpCode}`; // Add XP code

  const whatsappLink = baseUrl + encodeURIComponent(message);
  document.getElementById('whatsapp-link').href = whatsappLink;
}


// Drag functionality for calculator
const calculator = document.getElementById('calculator');
let isDragging = false;
let offsetX, offsetY;

calculator.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - calculator.getBoundingClientRect().left;
    offsetY = e.clientY - calculator.getBoundingClientRect().top;
    calculator.style.cursor = 'grabbing'; // Change cursor during dragging
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        calculator.style.left = `${e.clientX - offsetX}px`;
        calculator.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    calculator.style.cursor = 'move'; // Reset cursor when not dragging
});

// Prevent default context menu on long press
calculator.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});





////////////////////////////////////////////////////////////////

// This script should be placed before the closing </body> tag
document.querySelectorAll('.play-audio').forEach(button => {
  button.addEventListener('click', function() {
      var audioSrc = this.getAttribute('data-audio-src');
      var audioFrame = document.getElementById('audioFrame');

      audioFrame.src = audioSrc;

      // Stop the audio after 1 second
      setTimeout(function() {
          audioFrame.src = ""; // Reset the src to stop the audio
      }, 1000); // 1000 milliseconds = 1 second
  });
});



///////////////////////////////////////////////////////
emailjs.init("rOP2YP5jcGMsPXc9y");

        const btn = document.getElementById('button');

        /////////////////////////////////////////////
// Function to update the hidden input field whenever the visitor count changes
function updateVisitorCount() {
    const visitorCount = document.getElementById('visitor-count').innerText;
    document.getElementById('visitor-count-hidden').value = visitorCount;
}

// Call the function every time there's a change or at a set interval
setInterval(updateVisitorCount, 1000); // Updates every second



        //////////////////////////////////////////////////////
        document.getElementById('form').addEventListener('submit', function(event) {
            event.preventDefault();
        
            // Change the button text to indicate sending
            const btn = document.getElementById('button');
            btn.value = 'Sending...';
        
            // Get the visitor count from the div
            const visitorCount = document.getElementById('visitor-count').innerText;
        
            // Set the visitor count into the hidden input field
            document.getElementById('visitor-count-hidden').value = visitorCount;
        
            // Define EmailJS service and template IDs
            const serviceID = 'service_07x00a5';
            const templateID = 'template_hjmiuwm';
        
            // Send form with EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // Reset button text after success
                    btn.value = 'Register';
                    alert('Form submitted successfully!');
        
                    // Automatically click the reset button
                    document.getElementById('reset-btn').click();
                }, (err) => {
                    // Reset button text after failure
                    btn.value = 'Register';
                    alert('Failed to submit form: ' + JSON.stringify(err));
                });
        });
        
        ////////////////////////////////////////////

        // Function to show the form and overlay
        function showForm() {
            document.getElementById('form').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }

        // Function to hide the form and overlay
        function hideForm() {
            document.getElementById('form').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }

        // Function to show stored data section
        function showStoredData() {
            const formData = JSON.parse(localStorage.getItem('formData'));

            if (formData) {
                document.getElementById('stored-name').innerHTML = `<b>Name:</b> ${formData.name}`;
                document.getElementById('stored-email').innerHTML = `<b>Email:</b> ${formData.email}`;
                document.getElementById('stored-phone').innerHTML = `<b>Phone:</b> ${formData.phone}`;
                document.getElementById('stored-isubz').innerHTML = `<b>iSubz Wallet ID:</b> ${formData.isubz}`;
                document.getElementById('stored-account').innerHTML = `<b>iSubz ACC NO:</b> ${formData.account}`;
                document.getElementById('stored-visit-count').innerHTML = `Visits: ${formData.visitCount}`;
                document.getElementById('stored-points').innerHTML = `Points: ${formData.points}`;
            } else {
                document.getElementById('stored-name').innerText = 'No data found!';
                document.getElementById('stored-email').innerText = '';
                document.getElementById('stored-phone').innerText = '';
                document.getElementById('stored-isubz').innerText = '';
                document.getElementById('stored-account').innerText = '';
                document.getElementById('stored-visit-count').innerText = '';
                document.getElementById('stored-points').innerText = '';
            }

            document.getElementById('stored-data').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }

        // Function to hide stored data section
        function hideStoredData() {
            document.getElementById('stored-data').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }

        // Submit form data and store in localStorage
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const isubz = document.getElementById('isubz').value;
            const account = document.getElementById('account').value;

            const formData = {
                name: name,
                email: email,
                phone: phone,
                isubz: isubz,
                account: account,
                visitCount: localStorage.getItem('visitCount') || 1,
                points: 100 // Assuming some default points value
            };

            localStorage.setItem('formData', JSON.stringify(formData));

            hideForm();
        });

        // Track visitor count
       ///////////////////////////////////////////////////////////////////

       window.addEventListener('load', function () {
        let visitCount = parseFloat(localStorage.getItem('visitCount')) || 0;
    
        // Increment visit count by 3.2 on page load
        visitCount += 3.2;
        localStorage.setItem('visitCount', visitCount);
        document.querySelectorAll('.visitor-count').forEach(element => {
            element.innerHTML = `<b>Bonus Point:</b> ${visitCount.toFixed(2)}`;
        });
    
        // Set up timer for incrementing by 0.0625 every second
        let timeSpent = 0;
        let interval = setInterval(function () {
            visitCount += 0.0625;
            localStorage.setItem('visitCount', visitCount);
            document.querySelectorAll('.visitor-count').forEach(element => {
                element.innerHTML = `<b>Bonus Point:</b> ${visitCount.toFixed(2)}`;
            });
            timeSpent++;
        }, 1000);  // increments every second
    
        // Increase count by 1.015 on any click event
        document.querySelectorAll('.ad-link').forEach(function(ad) {
            ad.addEventListener('click', function () {
                visitCount += 1.015; // Increment the points
                localStorage.setItem('visitCount', visitCount); // Save to localStorage
                document.querySelectorAll('.visitor-count').forEach(element => {
                    element.innerHTML = `<b>Bonus Point:</b> ${visitCount.toFixed(2)}`;
                });
            });
        });
    
        // Handle the user leaving before 15 seconds
        window.addEventListener('beforeunload', function () {
            if (timeSpent < 15) {
                visitCount -= 11.12; // Subtract 11.12 if user stays less than 15 seconds
                localStorage.setItem('visitCount', visitCount);
            }
        });
    
        // Reset visit count to 0 when secret button is clicked
        document.getElementById('reset-btn').addEventListener('click', function () {
            visitCount = 0;
            localStorage.setItem('visitCount', visitCount);
            document.querySelectorAll('.visitor-count').forEach(element => {
                element.innerHTML = `<b>Bonus Point:</b> ${visitCount.toFixed(2)}`;
            });
        });
    
        // Reveal the secret button when 'Ctrl + Shift + U' is pressed (for desktop users)
        document.addEventListener('keydown', function (event) {
            if (event.ctrlKey && event.shiftKey && event.key === 'U') {
                document.getElementById('reset-btn').style.display = 'block';
            }
        });
    
        ///////////////////////////////////////////////////
        let resultValue = visitCount;
        localStorage.setItem('sharedResult', resultValue);
    
        window.sharedResult = resultValue;
        //////////////////////////////////////////////////
    
        // Long press functionality for touchscreen devices
        let pressTimer;
        document.addEventListener('touchstart', function (event) {
            pressTimer = setTimeout(function () {
                document.getElementById('reset-btn').style.display = 'block';
            }, 5000);  // 5-second long press reveals the button
        });
    
        document.addEventListener('touchend', function (event) {
            clearTimeout(pressTimer);  // Clear timer if the user doesn't press long enough
        });
    });
    
        ///////////////////////////////////////////////////////////////////////
         
        ///////////////////////////////////////////////////////////////////////
        document.getElementById('form').addEventListener('submit', function(e) {
            // Prevent the form from submitting instantly
            e.preventDefault();
        
            // Get the visitor count from the div
            const visitorCount = document.getElementById('visitor-count').innerText;
            
            // Set the visitor count into the hidden input field
            document.getElementById('visitor-count-hidden').value = visitorCount;
        
            // Now submit the form through EmailJS or however you’re handling form submission
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    console.log('SUCCESS!');
                }, function(error) {
                    console.log('FAILED...', error);
                });
        });
        

        /////////////////////////////////////////////////////////////////

        function toggleSidebar() {
          const sidebar = document.getElementById('mySidebar');
          sidebar.classList.toggle('open');
        }
      
        function toggleSubMenu(element) {
          element.classList.toggle('open');
        }

        /////////////////////////////////////////////////
        let slideIndex = 0;
  showSlides();

  function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
  }
  //////////////////////////////////////////////////////////////
  // Wait for the DOM content to fully load before running the slideshow
  document.addEventListener('DOMContentLoaded', function () {
    function productSlideshow() {
        // Get all the product slideshow containers
        const slideshows = document.querySelectorAll('.product-slideshow');
        
        slideshows.forEach(function (slideshow) {
            // Get the two images inside each slideshow
            const images = slideshow.querySelectorAll('.slideshow-image');
            
            let currentImageIndex = 0;
            
            // Set an interval to alternate the images every 5 seconds
            setInterval(function () {
                // Hide both images
                images[0].style.display = 'none';
                images[1].style.display = 'none';
                
                // Show the next image in the sequence
                currentImageIndex = (currentImageIndex + 1) % images.length;
                images[currentImageIndex].style.display = 'block';
            }, 5000);
        });
    }

    // Call the product slideshow function
    productSlideshow();
});

// Start the slideshow when the page loads
window.onload = productSlideshow;


/////////////////////////////////////////////////


//////////////////////////////
function myFunction5() {
  alert("Subscribed");
}

/////////////////////////////////////
function toggleDarkMode() {
  // Toggle dark mode class on body
  document.body.classList.toggle("dark-mode");

  // Change the icon from moon to sun and vice versa
  var icon = document.getElementById("darkModeToggle");
  if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
  } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
  }
}

///////////////