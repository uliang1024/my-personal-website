const header = document.querySelector('#header')
const toTop = document.querySelector('.to-top')
const scrollAnimationTop = document.querySelectorAll('.scroll-animation-top');
const scrollAnimationBottom = document.querySelectorAll('.scroll-animation-bottom');
const scrollAnimationLeft = document.querySelectorAll('.scroll-animation-left');
const scrollAnimationRight = document.querySelectorAll('.scroll-animation-right');
const filterBtn = document.querySelector('#filter-btn');
const modalBody = document.querySelector('.modal-body');
//頁面動畫

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.toggle('show', entry.isIntersecting);
        }
    })
})

scrollAnimationTop.forEach((el) => observer.observe(el));
scrollAnimationBottom.forEach((el) => observer.observe(el));
scrollAnimationLeft.forEach((el) => observer.observe(el));
scrollAnimationRight.forEach((el) => observer.observe(el));

//本地json檔讀取

let requestURL = './post.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    let superHeroes = request.response;
    showHeroes(superHeroes);
}

function showHeroes(jsonObj) {
    const heroes = jsonObj['post'];

    const images = document.querySelector('#images');

    for (i = 0; i < heroes.length; i++) {
        let div1 = document.createElement('div');
        div1.classList.add('col-lg-3', 'col-4', 'p-1', 'filter-img');
        div1.setAttribute('data-name', heroes[i].Type);

        let div2 = document.createElement('div');
        div2.classList.add('ratio', 'ratio-1x1');

        div1.appendChild(div2);

        let img = document.createElement('img');
        img.setAttribute('src', heroes[i].Url);
        img.classList.add('img-fluid', 'rounded', 'mx-auto', 'd-block', 'h-100');
        img.setAttribute('alt', heroes[i].Title);

        let url = heroes[i].Url;
        let type = heroes[i].Type;

        img.addEventListener('click', function () {
            if (type === 'video') {
                modalBody.innerHTML = '<iframe src="" class="modal-video w-100 h-100" title="YouTube video" allowfullscreen></iframe>';
                document.querySelector('.modal-video').src = url[1];
            } else {
                if (url.length > 1) {
                    modalBody.innerHTML =
                        '<div id="carouselExampleIndicators" class="carousel slide w-100 h-100" data-bs-ride="carousel" data-bs-interval="false">' +
                        '<div class="carousel-indicators"></div>' +
                        '<div class="carousel-inner h-100">' +
                        '</div>' +
                        '<button class="carousel-control-prev" type="button"' +
                        '    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">' +
                        '    <span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                        '    <span class="visually-hidden">Previous</span>' +
                        '</button>' +
                        '<button class="carousel-control-next" type="button"' +
                        '    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">' +
                        '    <span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                        '    <span class="visually-hidden">Next</span>' +
                        '</button>' +
                        '</div>';
                    for (j = 0; j < url.length; j++) {
                        document.querySelector('.carousel-inner').innerHTML += '<div class="carousel-item"><img src="" class="modal-img img-fluid mx-auto d-block" alt=""></div>'
                        document.querySelectorAll('.modal-img')[j].src = url[j];
                        document.querySelector('.carousel-indicators').innerHTML += '<button class="slide-btn" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="' + j + '" aria-label="Slide' + j + '"></button>'
                    }
                    document.querySelector('.carousel-item').classList.add('active');
                    document.querySelector('.slide-btn').classList.add('active');
                    document.querySelector('.slide-btn').setAttribute('aria-current', 'true');
                } else {
                    modalBody.innerHTML = '<img src="" class="modal-img img-fluid mx-auto d-block" alt="">';
                    document.querySelector('.modal-img').src = url;
                }
            }

            const title = img.getAttribute('alt');
            document.querySelector('.modal-title').innerHTML = title;

            const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
            myModal.show();

        });

        div2.appendChild(img);

        images.appendChild(div1);
    }
}

document.querySelector('#gallery-modal').addEventListener('hidden.bs.modal', function (event) {
    modalBody.innerHTML = '';
})

//照片篩選

window.onload = () => {

    const filterImg = document.querySelectorAll('.filter-img');

    filterBtn.onclick = (selectedItem) => {
        if (selectedItem.target.classList.contains('btn-check')) {
            let filterName = selectedItem.target.getAttribute('data-name');
            filterImg.forEach((image) => {
                let filterImg = image.getAttribute('data-name');
                if ((filterImg == filterName) || filterName == 'all') {
                    image.classList.remove('hide');
                    image.classList.add('show');
                } else {
                    image.classList.add('hide');
                    image.classList.remove('show');
                }
            })
        }
    }
}

//navbar 開關

$('#navbar').on('show.bs.collapse', function () {
    header.classList.add("show");
})

$('#navbar').on('hide.bs.collapse', function () {
    header.classList.remove("show");
})

//明暗模式




//顯示 回到最上層

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

// -----------時間流程------------

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
            } else if (pos <= max - 40 && pos >= min - 300) {
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

// -----------------------