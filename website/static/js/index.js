const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.toggle('show', entry.isIntersecting);
        }
    })
})

const header = document.querySelector('#header')
const toTop = document.querySelector('.to-top')
const scrollAnimationTop = document.querySelectorAll('.scroll-animation-top');
const scrollAnimationBottom = document.querySelectorAll('.scroll-animation-bottom');
const scrollAnimationLeft = document.querySelectorAll('.scroll-animation-left');
const scrollAnimationRight = document.querySelectorAll('.scroll-animation-right');

scrollAnimationTop.forEach((el) => observer.observe(el));
scrollAnimationBottom.forEach((el) => observer.observe(el));
scrollAnimationLeft.forEach((el) => observer.observe(el));
scrollAnimationRight.forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) {
        header.classList.add("sticky");
        header.classList.remove("p-2");
        if (window.pageYOffset > 100) {
            toTop.classList.add("active");
        }
    } else {
        header.classList.remove("sticky");
        header.classList.add("p-2");
        toTop.classList.remove("active");
    }
})

function deleteNote(noteId) {
    fetch('/delete-note', {
        method: 'POST',
        body: JSON.stringify({ noteId: noteId }),
    }).then((_res) => {
        window.location.href = "/";
    });
}