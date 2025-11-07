// Vars
const windowObj = window;
const documentObj = document;
const body = document.body;
const html = document.documentElement;
const wrapper = document.getElementById("scroll-x-wrapper");

// Play initial animations on page load
windowObj.addEventListener("load", () => {
  setTimeout(() => {
    body.classList.remove("is-preload");
  }, 100);
});

// Settings
const settings = {
  keyboardShortcuts: {
    enabled: true,
    distance: 50,
  },
  scrollWheel: {
    enabled: true,
    factor: 1,
  },
  scrollZones: {
    enabled: true,
    speed: 15,
  },
  dragging: {
    enabled: true,
    momentum: 0.875,
    threshold: 10,
  },
  excludeSelector:
    "input:focus, select:focus, textarea:focus, audio, video, iframe",
  linkScrollSpeed: 1000,
};

// Mobile: Revert to native scrolling
if (browser.mobile) {
  // Disable all scroll-assist features

  console.log("mobiel");
  settings.keyboardShortcuts.enabled = false;
  settings.scrollWheel.enabled = false;
  settings.scrollZones.enabled = false;
  settings.dragging.enabled = false;

  // Re-enable overflow on body
  document.body.style.overflowX = "auto";
}

// Prevent keystrokes inside excluded elements from bubbling.
wrapper.addEventListener("keydown", function (event) {
  if (event.target.matches(settings.excludeSelector)) {
    event.stopPropagation();
  }
});

// Keypress event.
window.addEventListener("keydown", function (event) {
  let scrolled = false;
  const documentScrollLeft =
    document.documentElement.scrollLeft || document.body.scrollLeft;
  const windowWidth = window.innerWidth;

  switch (event.keyCode) {
    // Left arrow.
    case 37:
      window.scrollBy(-settings.keyboardShortcuts.distance, 0);
      scrolled = true;
      break;
      
      // Right arrow.
      case 39:
      console.log("left arrow");
      window.scrollBy(settings.keyboardShortcuts.distance, 0);
      scrolled = true;
      break;

    // Page Up.
    case 33:
      window.scrollBy(-(windowWidth - 100), 0);
      scrolled = true;
      break;

    // Page Down, Space.
    case 34:
    case 32:
      console.log("pdddd");
      window.scrollBy(windowWidth - 100, 0);
      scrolled = true;
      break;

    // Home.
    case 36:
      window.scrollTo(0, 0);
      scrolled = true;
      break;

    // End.
    case 35:
      window.scrollTo(document.body.scrollWidth, 0);
      scrolled = true;
      break;
  }

  // Scrolled?
  if (scrolled) {
    // Prevent default.
    event.preventDefault();
    event.stopPropagation();

    // Stop link scroll.
    // Note: This part is specific to jQuery, you might need to implement your own logic to stop ongoing scrolls if any.
  }
});

// Link scroll.
wrapper.addEventListener("mousedown", function (event) {
  if (
    event.target.tagName === "A" &&
    event.target.getAttribute("href").startsWith("#")
    ) {
    console.log(event.target);
    event.stopPropagation();
  }
});

wrapper.addEventListener("mouseup", function (event) {
  if (
    event.target.tagName === "A" &&
    event.target.getAttribute("href").startsWith("#")
  ) {
    event.stopPropagation();
  }
});
// // Mouse Scroll Event
//! changed
// wrapper.addEventListener('wheel', function(event) {
//   event.stopPropagation();
//   console.log("mouse");
 
//     window.scrollBy(event.deltaX * settings.scrollWheel.factor, event.deltaY * settings.scrollWheel.factor);
  
// });

wrapper.addEventListener('wheel', function(event) {
  event.preventDefault();
  window.scrollBy(event.deltaX * settings.scrollWheel.factor, event.deltaY * settings.scrollWheel.factor);
});


// // Variables to hold the last known mouse positions
// let lastMouseX = 0;
// let lastMouseY = 0;

// // Function to handle mouse movement
// const handleMouseMove = (event) => {
//   event.stopPropagation();

//   // Get the current mouse positions
//   const currentMouseX = event.clientX;
//   const currentMouseY = event.clientY;

//   // Determine the direction of mouse movement
//   const directionX = currentMouseX - lastMouseX;
//   const directionY = currentMouseY - lastMouseY;

//   // Update the last known mouse positions
//   lastMouseX = currentMouseX;
//   lastMouseY = currentMouseY;

//   // Perform scrolling based on the direction
//   if (directionX > 0 || directionY > 0) {
//     // Scroll right or down
//     wrapper.scrollBy(settings.scrollSpeed, 0);
//   } else if (directionX < 0 || directionY < 0) {
//     // Scroll left or up
//     wrapper.scrollBy(-settings.scrollSpeed, 0);
//   }
// };

// // Attach the mousemove event listener to the wrapper
// wrapper.addEventListener("mousemove", handleMouseMove);

//! Scroll Zones

const leftZone = document.querySelector(".scrollZone.left")
console.log(leftZone);
const rightZone = document.querySelector(".scrollZone.right")

const zones = [leftZone, rightZone];
console.log(zones);
let paused = false;
let intervalId = null;
let direction;

if (settings.scrollZones.enabled) {
  
  console.log("szone");



  const activate = (d) => {
    if (paused) return;

    direction = d;
    clearInterval(intervalId);

    intervalId = setInterval(() => {
      window.scrollBy(settings.scrollZones.speed * direction, 0);
    }, 25);
  };


  
  const deactivate = () => {
    paused = false;
    clearInterval(intervalId);
  };


  zones.forEach((zone) => {
    if (zone) { // Check if the zone is not null
      zone.addEventListener("mouseleave", deactivate);
      zone.addEventListener("mousedown", deactivate);
    }
  });

  if (leftZone) { // Check if leftZone is not null
    console.log("left");
    leftZone.addEventListener("mouseenter", () => activate(-1));
  }
  
  if (rightZone) { // Check if rightZone is not null
    console.log("right");
    rightZone.addEventListener("mouseenter", () => activate(1));
  }
  wrapper.addEventListener("---pauseScrollZone", () => {
    paused = true;
    setTimeout(() => {
      paused = false;
    }, 500);
  });
}

// ... (Your existing code for other features)

// wrapper.addEventListener("click", function (event) {
//   if (
//     event.target.tagName === "A" &&
//     event.target.getAttribute("href").startsWith("#")
//   ) {
//     const href = event.target.getAttribute("href");
//     let target = document.querySelector(href);
//     let x, y;
//     console.log("other");
//     // Get target.
//     if (!href || href === "#" || !target) {
//       return;
//     }
    
//     // Prevent default.
//     event.preventDefault();
//     event.stopPropagation();
    
//     console.log("other2");
//     // Calculate x, y.
//     const rect = target.getBoundingClientRect();
//     if (window.innerWidth <= 736) {
//       // Assuming 'small' breakpoint is 736px
//       x =
//         rect.top +
//         window.scrollY -
//         Math.max(0, window.innerHeight - rect.height) / 2;
//       y = { top: x, behavior: "smooth" };
//       window.scrollTo(y);
//     } else {
//       x =
//         rect.left +
//         window.scrollX -
//         Math.max(0, window.innerWidth - rect.width) / 2;
//       y = { left: x, behavior: "smooth" };
//       window.scrollTo(y);
//     }
//   }
// });
wrapper.addEventListener("click", function (event) {
  if (event.target.tagName === "A" && event.target.getAttribute("href").startsWith("#")) {
    const href = event.target.getAttribute("href");
    let target = document.querySelector(href);

    if (!href || href === "#" || !target) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const rect = target.getBoundingClientRect();
    let scrollOptions = {};

    if (wrapper.classList.contains("horizontal-scroll")) {
      // Horizontal scrolling
      let x = rect.left + window.scrollX - Math.max(0, window.innerWidth - rect.width) / 2;
      scrollOptions = { left: x, behavior: "smooth" };
    } else if (wrapper.classList.contains("vertical-scroll")) {
      // Vertical scrolling
      let y = rect.top + window.scrollY - Math.max(0, window.innerHeight - rect.height) / 2;
      scrollOptions = { top: y, behavior: "smooth" };
    }

    window.scrollTo(scrollOptions);
  }
});

// Gallery

// ... (Your existing code)

// Gallery
// document.querySelectorAll(".gallery").forEach((gallery) => {
//   // // Create and prepend modal
//   // const modal = document.createElement('div');
//   // modal.className = 'modal';
//   // modal.tabIndex = '-1';
//   // const inner = document.createElement('div');
//   // inner.className = 'inner';
//   // const img = document.createElement('img');
//   // inner.appendChild(img);
//   // modal.appendChild(inner);
//   // gallery.prepend(modal);

//   // // Image load event
//   // img.addEventListener('load', function () {
//   //   setTimeout(() => {
//   //     if (modal.classList.contains('visible')) {
//   //       modal.classList.add('loaded');
//   //     }
//   //   }, 275);
//   // });

//   gallery.addEventListener("click", function (event) {
//     if (event.target.tagName === "A") {
//       const a = event.target;
//       const href = a.getAttribute("href");
//       const modal = gallery.querySelector(".modal");
//       const modalImg = modal.querySelector("img");

//       // Not an image? Bail.
//       if (!href.match(/\.(jpg|gif|png|mp4)$/)) return;

//       // Prevent default.
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     // const modal = gallery.querySelector(".modal");
//     // const modalImg = modal.querySelector("img");
//   });
// });

// Gallery
const modal = document.querySelector(".modal");
const modalInner = modal.querySelector(".inner");
const modalImg = modalInner.querySelector("img");

const gallery = document.querySelector(".gallery");

// Image load event
modalImg.addEventListener('load', function () {
  setTimeout(() => {
    if (modal.classList.contains('visible')) {
      modal.classList.add('loaded');
    }
  }, 275);
});

gallery.addEventListener("click", function (event) {
  console.log(event.target);
  
  const imgTarget = event.target.parentElement;
  // const getImgFull = imgTarget.parentElement
  console.log(imgTarget);
  
  if (imgTarget.tagName === "A") {
    // Prevent default.
    event.preventDefault();
    event.stopPropagation();
    console.log("is anchor");
    const href = imgTarget.getAttribute("href");

    // Not an image? Bail.
    if (!href.match(/\.(jpg|gif|png|mp4)$/)) return;

    // Locked? Bail.
    if (modal._locked) return;

    // Lock.
    modal._locked = true;

    // Set src.
    modalImg.src = href;

    // Set visible.
    modal.classList.add("visible");

    // Focus.
    modal.focus();

    // Delay.
    setTimeout(() => {
      // Unlock.
      modal._locked = false;
    }, 600);

    ["click", "keypress"].forEach((eventType) => {
      modal.addEventListener(eventType, function (event) {
      // Locked? Bail.
      console.log((eventType == "keypress") ? event.key : "nopeeee");
      // if (modal._locked || !modal.classList.contains("visible")) return;
					if (event.which == 27 || eventType == "click") {
      
      // Stop propagation.
      event.stopPropagation();
  
      // Lock.
      modal._locked = true;
  
      // Clear visible, loaded.
      modal.classList.remove("loaded");
  
      // Delay.
      setTimeout(() => {
        modal.classList.remove("visible");
  
        setTimeout(() => {
          // Clear src.
          modalImg.src = "";
  
          // Unlock.
          modal._locked = false;
  
          // Focus.
          document.body.focus();
        }, 475);
      }, 125);

    }
    });
    
  })
  
  }
});

["mouseup", "mousedown", "mousemove"].forEach((eventType) => {
  modal.addEventListener(eventType, function (event) {
    // Stop propagation.
    event.stopPropagation();
    // if (modal.classList.contains("visible")) {
    //   modal.click()

    // }
  });
});
