const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const navbar = document.getElementById("navbar");

let scrollPosition = 0;

function lockScroll() {
  scrollPosition = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
}

function unlockScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollPosition);
}

hamburger.addEventListener("click", () => {
    const navbarRect = navbar.getBoundingClientRect();
    const distanceFromTop = navbarRect.bottom;

    sideMenu.style.top = `${distanceFromTop}px`;
    sideMenu.style.height = `calc(100vh - ${distanceFromTop}px)`;

    // document.body.classList.toggle("no-scroll");
    sideMenu.classList.toggle("activo");

    if(sideMenu.classList.toggle('active')) {
        lockScroll();
    } else {
      unlockScroll();
    }

});