const modelContainer = document.getElementById('model_container');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const modelName = document.querySelector('.model-name');

let current = 1;

rightBtn.onclick = () => {

    if(current < 10) {
        modelContainer.style.transform = 'translateX(-'+ current +'00vw)';
        
        if(current == 1) {
            modelName.firstChild.data = 'SUN';
        }else if(current == 2) {
            modelName.firstChild.data = 'MERCURY';
        }else if(current == 3) {
            modelName.firstChild.data = 'VENUS';
        }else if(current == 4) {
            modelName.firstChild.data = 'EARTH';
        }else if(current == 5) {
            modelName.firstChild.data = 'MARS';
        }else if(current == 6) {
            modelName.firstChild.data = 'JUPITER';
        }else if(current == 7) {
            modelName.firstChild.data = 'SATURN';
        }else if(current == 8) {
            modelName.firstChild.data = 'URANUS';
        }else if(current == 9) {
            modelName.firstChild.data = 'NEPTUNE';
        }
        current++;
    }   
}

leftBtn.onclick = () => {

    if(current > 1) {
        modelContainer.style.transform = 'translateX(-'+ (current - 2) +'00vw)';

        if(current == 2) {
            modelName.firstChild.data = 'MILKY WAY';
        }else if(current == 3) {
            modelName.firstChild.data = 'SUN';
        }else if(current == 4) {
            modelName.firstChild.data = 'MERCURY';
        }else if(current == 5) {
            modelName.firstChild.data = 'VENUS';
        }else if(current == 6) {
            modelName.firstChild.data = 'EARTH';
        }else if(current == 7) {
            modelName.firstChild.data = 'MARS';
        }else if(current == 8) {
            modelName.firstChild.data = 'JUPITER';
        }else if(current == 9) {
            modelName.firstChild.data = 'SATERN';
        }else if(current == 10) {
            modelName.firstChild.data = 'URANUS';
        }
        current--;
    }
}