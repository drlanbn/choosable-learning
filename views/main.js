const media = document.querySelector('video');
const buttons = document.querySelector('#buttons');
const results = document.querySelector('#results');

let button = document.querySelectorAll('.buton');
let visible = true;
let doNotPlay = true;
let answers = [];

const bDetails = JSON.parse(`{
    "12": [
        {
            "id": "1",
            "name": "Göndereni kontrol etmeliyim",
            "time": "16"
        },
        {
            "id": "2",
            "name": "Şifre değiştirme linkine tıklamalıyım",
            "time": "20"
        }
    ],
    "18": [
        {
            "id": "3",
            "name": "Güvenilir olduğunu düşünüyorum",
            "time": "20"
        },
        {
            "id": "4",
            "name": "Bence güvenilir değil",
            "time": "35"
        }
    ],
    "22": [
        {
            "id": "5",
            "name": "Siteyi kontrol etmeliyim",
            "time": "291"
        },
        {
            "id": "6",
            "name": "Hemen şifremi değiştirmeliyim",
            "time": "291"
        }
    ]
    
  }`);
console.log(bDetails);
console.log(Object.keys(bDetails));

const pauseVideo = () => {
    media.pause();
};
const stopMedia = () => {
    media.pause();
    media.currentTime = 0;
};

media.removeAttribute('controls');
media.addEventListener('ended', stopMedia);
media.addEventListener('timeupdate', setTime);

const initButtons = () => {
    button = document.querySelectorAll('.buton');
        button.forEach((item) => {
            item.addEventListener('click', () => {
                answers.push({"time" : media.currentTime, "id" : item.dataset.id, "content" : item.innerHTML});
                media.pause();
                media.currentTime = parseFloat(item.dataset.time);
                media.play();
                buttons.style.height = '0vh';
                setTimeout(() => { 
                    buttons.innerHTML = "";    
                }, 500);
                doNotPlay = false;
            });
        });
};

initButtons();

function setTime() {
    let currentTime = Math.floor(media.currentTime);
    console.log(currentTime);

    if(media.ended){
        doNotPlay = true;
        results.innerHTML = '<ul>';
        answers.forEach((item) => {
            results.innerHTML += '<li>' + item.content + '</li>';
        });
        results.innerHTML += '</ul>';
        results.style.display = "block";
    }
    if(Object.keys(bDetails).includes(currentTime.toString())){
        doNotPlay = true;
        buttons.style.height = '0vh';
        setTimeout(() => {
            media.pause();
            buttons.innerHTML = "";
            bDetails[currentTime].forEach((item) => {
                buttons.innerHTML += '<button class="buton" data-id="' + item.id + '" data-time="' + item.time + '">' + item.name + '</button>';
            });
            buttons.style.height = '100vh';
            initButtons();
        }, 800);
        
    }
    
}


var vis = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();




vis(function(){
    document.title = vis() ? 'Choosable Learning' : 'Pencereyi kapatmayınız!';
    if(!vis()){
        media.pause();
        visible = false;
    } else if (!doNotPlay && !visible && media.paused){
        media.play();   
        visible = true;     
    }
  });