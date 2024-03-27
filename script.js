const images = [
    '20.png', '21.png', '22.png', '23.png', '24.png', '25.png', '26.png', '27.png', '28.png', '29.png'
];

let activeImage = 0;
const sliderPlace = document.querySelector('.slider-line');
const widthOffset = document.querySelector('.slider').clientWidth;
sliderPlace.style.width = 3*widthOffset + 'px';
sliderPlace.style.heigth = widthOffset + 'px';
sliderPlace.style.left = "-" + widthOffset + 'px';
let flag = true;
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".modal");
const titles = [ 'Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7','Заголовок 8','Заголовок 9','Заголовок 10'];

const titleElement = document.querySelector('.title h1');
const titlesMini = ['Подзаголовок 1', 'Подзаголовок 2', 'Подзаголовок 3', 'Подзаголовок 4', 'Подзаголовок 5', 'Подзаголовок 6', 'Подзаголовок 7','Подзаголовок 8','Подзаголовок 9','Подзаголовок 10'];
const titleMiniElement = document.querySelector('.titleMini h3');
const numberElement = document.querySelector('.number');

const initSlider = () => {
    const img = document.createElement('img');
    img.alt =  ' ';
    img.src = './images/' + images [activeImage];
    img.className = "active"
    img.id = "1";
    sliderPlace.append(img);
    nextImageGenerate();
    nextImageGenerate(true);
    prevImageGenerate();
    updateActiveImages()
    closeBtn.addEventListener("click", closeModal);
}

function showModal(imgSrc) {
    modal.style.display = "block";
    modalImg.src = imgSrc;
}

function closeModal() {
    modal.style.display = "none";
}

function changeTitle(index) {
    if (index >= 0 && index < titles.length) {
        titleElement.textContent = titles[index];
        titleMiniElement.textContent = titlesMini[index];
        numberElement.textContent = (index+1) + "/10"
    }
}
function updateActiveImages() {
    const sliderLine = document.querySelector('.slider-line');
    const images = sliderLine.querySelectorAll('img');
    const elements = document.querySelectorAll('[id="1"]');
    elements.forEach((slide, index) => {
        slide.addEventListener("click", () => {
            const imgSrc = slide.src;
            showModal(imgSrc);
        });
    });

images.forEach(function(image) {
    if (image.getAttribute('src') === './images/2' + activeImage + ".png") {
        image.className = 'active';
    } else {
        image.className = '';
    }
});
}

const nextImageGenerate = (x=false) => {
    let nextImage= 0;
    if (x)
    {
        nextImage = activeImage + 2;
    }
    else{
        nextImage = activeImage + 1;
    }


    if (nextImage === images.length) nextImage = 0;
    if (nextImage === images.length+1) nextImage = 1;
    const img = document.createElement('img');
    img.alt = "";
    img.src = './images/' + images [nextImage];
    img.id = "1";
    sliderPlace.append(img);
}

const prevImageGenerate = (w=false) => {
    let prevImage = activeImage - 1;
    if (prevImage < 0 ) prevImage = images.length-1;
    const img = document.createElement('img');
    img.alt = "";
    img.src = './images/' + images [prevImage];
    img.id = "1";
    if (w) img.style.width = 0;
    sliderPlace.prepend(img);
}

const nextSlide = () => {
    if(!flag) return
    flag=!flag
    activeImage++;
    console.log(activeImage)
    if (activeImage >= images.length) {
        activeImage = 0;
    }
    changeTitle(activeImage)

    nextImageGenerate(true);
    animate({
        duration: 1000,
        draw: "next",
        removeElement: document.querySelector('.slider-line img')
    })
    updateActiveImages()
}
const prevSlide = () => {
    if(!flag) return
    flag=!flag
    activeImage--;
    if (activeImage < 0) activeImage = images.length - 1;
    prevImageGenerate(true);
    changeTitle(activeImage)
    animate({
        duration: 1000,
        draw: function (progress){
            document.querySelector('.slider-line img').style.width = (widthOffset*progress+50) + "px"
        },
        removeElement: document.querySelector('.slider-line img:last-child')
    })
    updateActiveImages()
}
initSlider();

document.querySelector('.next-button').addEventListener('click', nextSlide);
document.querySelector('.prev-button').addEventListener('click', prevSlide);

const animate = ({duration, draw, removeElement}) => {
    const start = performance.now();
    const initialWidth = removeElement.offsetWidth;
    const initialMarginLeft = parseFloat(window.getComputedStyle(removeElement).marginLeft);
    const initialMarginRight = parseFloat(window.getComputedStyle(removeElement).marginRight);
    let drawFinal
    if (draw === "next")
    {
        drawFinal =  function (progress) {
            const newWidth = initialWidth * (1 - progress);
            const newMarginLeft = initialMarginLeft * (1 - progress);
            const newMarginRight = initialMarginRight * (1 - progress);

            removeElement.style.width = newWidth + "px";
            removeElement.style.marginLeft = newMarginLeft + "px";
            removeElement.style.marginRight = newMarginRight + "px";
        }
    }
    else {
        drawFinal=draw
    }
    requestAnimationFrame(function animate(time) {

        let step = (time - start) / duration;
        console.log(step)
        if (step > 1) step = 1;
        drawFinal(step);
        if (step < 1) {
            requestAnimationFrame(animate);
        } else {

                removeElement.remove();
                flag = true;

        }
    });

}

























