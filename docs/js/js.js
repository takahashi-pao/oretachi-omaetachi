var _top_panchanAnimation;
var _top_aranuAnimation;
var _oretachi_panchanAnimation;
var _oretachi_aranuAnimation;
var item1;
var item2;
var item3;
var panchanInterval;
var aranuInterval;
let target_main_top = document.getElementById('main');
const target_main_oretachi_box = document.getElementById('oretachi-box');
let target_main_oretachi_aranu = document.getElementById('oretachi-aranu');
let target_main_oretachi_panchan = document.getElementById('oretachi-panchan');

/**
 * 規定値内でランダムな数値を生成する関数
 * @param {any} min 乱数生成における最小値
 * @param {any} max 乱数生成における最大値
 */
 function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createItem = (parentClassName, itemId, widthVal, heightVal, xPosition, yPosition, vanishTime) => {
    const itemEl = document.createElement('span');
    itemEl.className = `${parentClassName}`;
    itemEl.id = `${itemId}`;
    itemEl.style.width = `${widthVal}%`;
    itemEl.style.height = itemEl.style.width;
    itemEl.style.left = xPosition + '%';
    itemEl.style.top = yPosition + '%';
    if(parentClassName === "aranu"){
        itemEl.style.animationDuration = rand(3, 13) + "s";
    }
    target_main_top.appendChild(itemEl);
    setTimeout(() => {
        itemEl.style.display = '';
    }, 500);
    setTimeout(() => {
        itemEl.remove();
    }, vanishTime);
}

var panchanItem = (item) => {
    var parentClassName = "characterContent";
    var itemId;
    var widthVal;
    var heightVal;
    var xPosition;
    var yPosition;
    var vanishTime;
    var divination = rand(0, 100);

    // 表示キャラ決定
    if (divination < 60) {
        itemId = item;
        widthVal = 50;
        heightVal = 50;
        xPosition = 100;
        yPosition = 50;
        vanishTime = 8500;
    };
    // } else if (divination >= 91 && divination <= 100) {
    //     itemId = item3;
    //     minSizeVal;
    //     maxSizeVal;
    //     xPosition;
    //     yPosition;
    //     vanishTime;
    // };

    // 追加コンテンツ
    // if(divination >= 80 && divination < 90){
    //     itemId = "walking-panchan-reverse";
    //     xPosition = -30;
    // }
    // if(itemId === "aranu1"){
    //     if(divination >= 60 && divination < 64){
    //         itemId += "_1";
    //     } else if (divination >= 64 && divination < 68){
    //         itemId += "_2";
    //     }else if (divination >= 68 && divination < 70){
    //         itemId += "_3";
    //     }
    // } else if (itemId === "aranu2"){
    //     if(divination >= 70 && divination < 74){
    //         itemId += "_1";
    //     } else if (divination >= 74 && divination < 78){
    //         itemId += "_2";    
    //     }else if (divination >= 78 && divination < 80){
    //         itemId += "_3";            
    //     }
    // } else {
    //     if(divination >= 80 && divination < 84){
    //         itemId += "_1";
    //     } else if (divination >= 84 && divination < 88){
    //         itemId += "_2";    
    //     }else if (divination >= 88 && divination < 90){
    //         itemId += "_3";            
    //     }
    // }


    if((window.innerWidth > 1024) && (itemId === item2)) {
        widthVal = 40;
        heightVal = 40;
    }

    createItem(parentClassName, itemId, widthVal, heightVal, xPosition, yPosition, vanishTime);
}

var aranuItem = (item) => {
    var parentClassName = item;
    var itemId;
    var widthVal;
    var heightVal;
    var xPosition;
    var yPosition;
    var vanishTime;
    var divination = rand(0, 100);

    // 表示キャラ決定
    if (divination >= 60 && divination < 90) {
        widthVal = rand(20,100);
        heightVal = widthVal;
        xPosition = rand(-30, 80);
        yPosition = rand(-30, 85);

        if(divination >= 60 && divination < 70){
            itemId = item1+"1";
            vanishTime = 15000;
        } else if (divination >= 70 && divination < 80){
            itemId = item1+"2";
            vanishTime = 15000;
        } else {
            itemId = item1+"3";
            vanishTime = 15000;
        }
    };
    createItem(parentClassName, itemId, widthVal, heightVal, xPosition, yPosition, vanishTime);
}

// home-oretachi パンダ表示スクリプト
if(window.innerWidth > 1024)
{
    
}

// 交差オブザーバー API（セレクタはID推奨　※classやquerySelectorだと認識しない）
const observer_main_top = new IntersectionObserver((entries) => {
    for(const e of entries) {
        if(e.isIntersecting) {
            _top_panchanAnimation = setInterval(function () { panchanItem(item2); }, panchanInterval);
            _top_aranuAnimation = setInterval(function () { aranuItem(item1); }, aranuInterval);
        }else{
            window.clearInterval(_top_panchanAnimation);
            window.clearInterval(_top_aranuAnimation);
        }
    }
});


window.addEventListener("load", (event) => {  
    oretachiObserver();
  }, false);

// 見えている割合が80%以上になるとクラスが付与され、80%以下になるとクラスが剥奪される
function oretachiObserver () {
    var fadeOut_flg = 0;
    target_main_oretachi_panchan.style.animationDuration = 1.0 + 's';
    target_main_oretachi_aranu.style.animationDuration = 1.0 + 's';

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.intersectionRatio > 0.9) {                
                if(target_main_oretachi_panchan.style.animationName == 'top_oretachi-panchan ON') {
                    return;
                }
                target_main_oretachi_panchan.classList.add('ON');
                target_main_oretachi_panchan.style.animationName = 'oretachi-side-fadeIn-panchan';

                target_main_oretachi_aranu.classList.add('ON');
                target_main_oretachi_aranu.style.animationName = 'oretachi-side-fadeIn-aranu';
                console.log('on');
                fadeOut_flg = 0;
            } else {
                if(fadeOut_flg == 1) return;
                target_main_oretachi_panchan.classList.remove('ON');                
                target_main_oretachi_panchan.style.animationName = 'oretachi-side-fadeOut-panchan';

                target_main_oretachi_aranu.classList.remove('ON');
                target_main_oretachi_aranu.style.animationName = 'oretachi-side-fadeOut-aranu';
                console.log('off');
                fadeOut_flg = 1;
            }

            // target_main_oretachi_panchan.style.opacity = entry.intersectionRatio;
            // target_main_oretachi_aranu.style.opacity = entry.intersectionRatio;
            
        });
    };

    const option = {
        threshold: buildThresholdList()
    }

    const observer = new IntersectionObserver(
        callback, option
    )
    
    observer.observe(target_main_oretachi_box);
}

function buildThresholdList() {
    let thresholds = [];
    let numSteps = 5;
  
    for (let i=1.0; i<=numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
  }

item1 = 'aranu';
item2 = 'walking-panchan';
item3 = '';
panchanInterval = 8500;
aranuInterval = 10000;
observer_main_top.observe(target_main_top);

