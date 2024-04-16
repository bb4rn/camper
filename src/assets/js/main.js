// import utils
import { log, get, getAll } from "./utils.js";

// import npm packages
import "add-to-calendar-button";
import Glide from "@glidejs/glide";
import "leaflet";
import "leaflet-active-area";
import mobile from "is-mobile";
import Swup from "swup";
import "netlify-identity-widget";

const swup = new Swup({
  // options
  plugins: [],
});

// new Glide('.glide').mount({
// 	// options
// })

document.addEventListener("DOMContentLoaded", function () {
  // update footer credits with current year
  let footerCopy = get("#footerCopy");
  footerCopy.innerHTML =
    "© " + new Date().getFullYear() + footerCopy.innerHTML.split("©")[1];
});

// decap cms
const netlifyIdentity = () => {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user) => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
};

// netlify identity widget
netlifyIdentity();
