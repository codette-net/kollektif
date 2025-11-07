const browser = (() => {
  const t = {
    name: null,
    version: null,
    os: null,
    osVersion: null,
    touch: null,
    mobile: null,
    canUse: (feature) => {
      const style = document.documentElement.style;
      const prefixedFeature =
        feature.charAt(0).toUpperCase() + feature.slice(1);
      return (
        feature in style ||
        `Moz${prefixedFeature}` in style ||
        `Webkit${prefixedFeature}` in style ||
        `O${prefixedFeature}` in style ||
        `ms${prefixedFeature}` in style
      );
    },
    init: () => {
      const ua = navigator.userAgent;
      let browserName = "other";
      let browserVersion = 0;
      const browserMatchers = [
        ["firefox", /Firefox\/([0-9.]+)/],
        ["bb", /BlackBerry.+Version\/([0-9.]+)/],
        ["bb", /BB[0-9]+.+Version\/([0-9.]+)/],
        ["opera", /OPR\/([0-9.]+)/],
        ["opera", /Opera\/([0-9.]+)/],
        ["edge", /Edge\/([0-9.]+)/],
        ["safari", /Version\/([0-9.]+).+Safari/],
        ["chrome", /Chrome\/([0-9.]+)/],
        ["ie", /MSIE ([0-9]+)/],
        ["ie", /Trident\/.+rv:([0-9]+)/],
      ];

      for (const [name, regex] of browserMatchers) {
        const match = ua.match(regex);
        if (match) {
          browserName = name;
          browserVersion = parseFloat(match[1]);
          break;
        }
      }

      t.name = browserName;
      t.version = browserVersion;

      // OS detection logic remains the same
      // ...

      t.touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      t.mobile = ["wp", "android", "ios", "bb"].includes(t.os);
    },
  };

  t.init();
  return t;
})();

// Function to handle screen size and touch capability
const handleScreenSizeAndTouch = () => {
  browser.init(); // Re-run browser detection

  const width = window.innerWidth;
  const height = window.innerHeight;
  const orientation = window.orientation || "unknown"; // Orientation in degrees (landscape or portrait)
  const aspectRatio = width / height; // Aspect ratio
  const pixelRatio = window.devicePixelRatio || 1; // Device pixel ratio

  // Log additional information
  console.log(`Screen Width: ${width}`);
  console.log(`Screen Height: ${height}`);
  console.log(`Orientation: ${orientation}`);
  console.log(`Aspect Ratio: ${aspectRatio}`);
  console.log(`Device Pixel Ratio: ${pixelRatio}`);

  // Check screen size and orientation
  switch (true) {
    case (orientation !== "unknown") && (width <= 769 || height <= 768):
      // console.log("Small screen size detected, likely a mobile device.");
      // console.log(`Orientation: ${orientation} `);
      // Set touch and mobile to true
      browser.mobile = true;
      browser.touch = true;
      // Log the orientation
      break;
    case orientation === 0 || orientation === 180:
      // console.log("Portrait orientation detected.");
      // browser.mobile = true;
      browser.touch = true;
      // Your code for portrait orientation
      break;
    // case orientation === 90 || orientation === -90:
      console.log("Landscape orientation detected.");
      browser.mobile = true;
      // browser.touch = true;
      // Your code for landscape orientation
      break;
    case (orientation === "unknown")&& (width <= 769 || height <= 768) :
      // console.log("unknown orientation and small screen");
      browser.mobile = true;
      browser.touch = true;
      break;

    default:
      // console.log(" or large screen size detected.");
      // Your code for unknown orientation or large screens
      browser.mobile = false;
      browser.touch = false;
      break;
  }
};

handleScreenSizeAndTouch();

// Listen for resize and orientation change events
window.addEventListener("resize", handleScreenSizeAndTouch);
window.addEventListener("orientationchange", handleScreenSizeAndTouch);

// if (typeof define === 'function' && define.amd) {
//   define([], () => browser);
// } else if (typeof exports === 'object') {
//   module.exports = browser;
// } else {
//   window.browser = browser;
// }
