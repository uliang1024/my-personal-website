const colorlibAside = new bootstrap.Offcanvas('#colorlib-aside');
const offcanvasBtn = document.querySelectorAll('.offcanvas-btn');

function myFunction(event) {
    if (event.matches) {
        colorlibAside.hide();
        offcanvasBtn.forEach(element => {
            element.style.display = 'block';
        });
    } else {
        colorlibAside.show();
        offcanvasBtn.forEach(element => {
            element.style.display = 'none';
        });
    }
}

const x = window.matchMedia("(max-width: 1200px)")
myFunction(x);
x.addEventListener("change", function (e) {
    myFunction(e);
});