const navLinks = document.querySelectorAll('.nav-menu .nav-link');
const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button , .overlay');

menuOpenButton.addEventListener('click', () => {
    // Toggle the 'show-mobile-menu' class on the body element
    document.body.classList.toggle("show-mobile-menu");
});

// Close the mobile menu when the close button is clicked
menuCloseButton.addEventListener('click', () => menuOpenButton.click ());

// Close the mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => menuOpenButton.click());
});

//initialize Swiper
const swiper = new Swiper('.slider-wrapper', {

  loop: false,
  spaceBetween: 25,
   grabCursor: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
   
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Breakpoints for responsive design
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 2
    }
  }
});

//api map js
 function initMap() {
    // Define the location (e.g., Ampang Point Shopping Centre)
    var location = { lat: 3.1558369, lng: 101.751956 };

    // Create the map
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: location,
    });

    // Add a marker
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Ampang Point Shopping Centre"
    });
  }

// Get the modal
var modal = document.getElementById('imageModal');

// Get all menu images and add click handlers
var menuImages = document.querySelectorAll('.menu-list .menu-image');
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

menuImages.forEach(function(img) {
  img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// Also close when clicking outside the image
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//ajax
// Fetch and display menu items dynamically from data.json
fetch('data.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(menuItems => {
    const menuList = document.querySelector('.menu-list');
    menuList.innerHTML = '';

    menuItems.forEach(item => {
      const li = document.createElement('li');
      li.className = 'menu-item';
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-image" />
        <h3 class="name">${item.name}</h3>
        <p class="description">
          ${item.description}<br />
          <span class="price">${item.price}</span>
        </p>`;
      menuList.appendChild(li);

      // Add modal click event
      li.querySelector('.menu-image').onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
      };
    });
  })
  .catch(err => {
    console.error('Failed to load menu:', err);
    document.querySelector('.menu-list').innerHTML = '<li>Error loading menu.</li>';
  });
