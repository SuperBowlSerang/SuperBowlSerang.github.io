// Start JS for navbar customization
var menuItems = document.querySelectorAll(".navbar-nav .nav-link");

menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", function (event) {
        event.preventDefault();
        var targetId = menuItem.getAttribute("href");
        var targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({
            behavior: "smooth"
        });
        menuItems.forEach(function (item) {
            item.classList.remove("active");
        });

        menuItem.classList.add("active");
        menuItems.forEach(function (item) {
            if (!item.classList.contains("active")) {
                item.style.opacity = "0.6";
            }
        });

        menuItem.style.opacity = "1";
    });
});

var sections = document.querySelectorAll("section"); 

window.addEventListener("scroll", function () {
    var current = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 2) {
            current = section.getAttribute("id");
        }
    });

    menuItems.forEach(function (item) {
        item.classList.remove("active");
    });

    var activeMenuItem = document.querySelector(".navbar-nav .nav-link[href='#" + current + "']");
    if (activeMenuItem) {
        activeMenuItem.classList.add("active");
    }
});

var menuItems = document.querySelectorAll(".navbar-nav .nav-link");

function removeActiveClass() {
    menuItems.forEach(function (item) {
        item.classList.remove("active");
    });
}

function setActiveMenuItem() {
    var scrollPosition = window.scrollY;

    menuItems.forEach(function (item) {
        var targetId = item.getAttribute("data-target");
        var targetElement = document.querySelector(targetId);

        if (targetElement) {
            var targetPosition = targetElement.offsetTop;
            var targetHeight = targetElement.offsetHeight;

            if (scrollPosition >= targetPosition && scrollPosition < targetPosition + targetHeight) {
                removeActiveClass();
                item.classList.add("active");
            }
        }
    });
}

menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", function (event) {
        event.preventDefault();

        var targetId = menuItem.getAttribute("data-target");
        var targetElement = document.querySelector(targetId);

        if (targetElement) {
            var targetPosition = targetElement.offsetTop;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            removeActiveClass();
            menuItem.classList.add("active");
        }
    });
});

window.addEventListener("scroll", function () {
    setActiveMenuItem();
});

setActiveMenuItem();
// End JS for navbar customization

// Start JS for Card section "Kenangan Kita"
function toggleText(elementId, btnId) {
    var element = document.getElementById(elementId);
    var button = document.getElementById(btnId);
    var shortDescription = element.getAttribute("data-short-description");
    var fullDescription = element.getAttribute("data-full-description");

    if (button.innerHTML === "Read More") {
        element.innerHTML = fullDescription;
        button.innerHTML = "Show Less";
    } else {
        element.innerHTML = shortDescription;
        button.innerHTML = "Read More";
    }
}

// Panggil fungsi dengan parameter yang sesuai untuk masing-masing elemen
document.getElementById("myBtn").addEventListener("click", function () {
    toggleText("more", "myBtn");
});

document.getElementById("myBtn2").addEventListener("click", function () {
    toggleText("more2", "myBtn2");
});
// End JS for Card section "Kenangan Kita"

// JS For Form Pesan
const scriptURL =
  'https://script.google.com/macros/s/AKfycbzmro6D-ZGV6QXD-l_Hl4JNztmEtkIWlgxckEKxUJ-l5BoVMUBu3PrYypwq-8Wqf1QGGA/exec';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.forms['form-pesan'];
  const alertBoxPesanKosong = form.querySelector('.alert-pesan-kosong');
  const alertBoxPesanTerkirim = form.querySelector('.alert-pesan-terkirim');
  const btnKirim = form.querySelector('.btn-kirim');
  const btnLoading = form.querySelector('.btn-loading');
  const textarea = form.querySelector("textarea[name='pesan']");

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const pesan = textarea.value.trim();
    if (pesan === '') {
      alertBoxPesanKosong.classList.remove('d-none');
      alertBoxPesanTerkirim.classList.add('d-none');

      setTimeout(() => {
        alertBoxPesanKosong.classList.add('d-none');
      }, 3000); // Sembunyikan pesan kosong setelah 3 detik
    } else {
      alertBoxPesanKosong.classList.add('d-none');
      alertBoxPesanTerkirim.classList.remove('d-none');
      btnKirim.classList.add('d-none');
      btnLoading.classList.remove('d-none');

      fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then((data) => {
          console.log('Success!', data);
          textarea.value = '';
        })
        .catch((error) => {
          console.error('Error!', error.message);
        })
        .finally(() => {
          setTimeout(() => {
            alertBoxPesanTerkirim.classList.add('d-none');
            btnKirim.classList.remove('d-none');
            btnLoading.classList.add('d-none');
          }, 2000); // Sembunyikan pesan terkirim setelah 2 detik
        });
    }
  });
});
// End JS For Form Pesan


