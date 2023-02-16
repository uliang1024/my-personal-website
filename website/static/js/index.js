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

$('#navbar').on('show.bs.collapse', function () {
    header.classList.add("show");
})

$('#navbar').on('hide.bs.collapse', function () {
    header.classList.remove("show");
})

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

// -----------------------

$.fn.timeline = function () {
    var selectors = {
        id: this,
        item: this.find(".timeline-item"),
        activeClass: "timeline-item--active",
        img: ".timeline__img"
    };
    selectors.item.eq(0).addClass(selectors.activeClass);
    selectors.id.css(
        "background-image",
        "url(" + selectors.item.first().find(selectors.img).attr("src") + ")"
    );
    var itemLength = selectors.item.length;
    $(window).scroll(function () {
        var max, min;
        var pos = $(this).scrollTop();
        selectors.item.each(function (i) {
            min = $(this).offset().top;
            max = $(this).height() + $(this).offset().top;
            if (i == itemLength - 2 && pos > min + $(this).height() / 2.5) {
                selectors.item.removeClass(selectors.activeClass);
                selectors.id.css(
                    "background-image",
                    "url(" + selectors.item.last().find(selectors.img).attr("src") + ")"
                );
                selectors.item.last().addClass(selectors.activeClass);
            } else if (pos <= max - 40 && pos >= min - 100 ) {
                selectors.id.css(
                    "background-image",
                    "url(" + $(this).find(selectors.img).attr("src") + ")"
                );
                selectors.item.removeClass(selectors.activeClass);
                $(this).addClass(selectors.activeClass);
            }
        });
    });
};

$("#timeline-1").timeline();
