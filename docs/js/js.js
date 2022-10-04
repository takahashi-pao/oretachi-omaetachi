var _topAnimation;
var item1;
var item2;
var item3;
var itemInterval;
const target = document.getElementById('main');

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
    itemEl.style.height = `${heightVal}%`;
    itemEl.style.left = xPosition + '%';
    itemEl.style.top = yPosition + '%';
    target.appendChild(itemEl);
    setTimeout(() => {
        itemEl.style.display = '';
    }, 500);
    setTimeout(() => {
        itemEl.remove();
    }, vanishTime);
}

var decideItem = (item1, item2, item3) => {
    var parentClassName = "characterContent";
    var itemId;
    var widthVal;
    var heightVal;
    var xPosition;
    var yPosition;
    var vanishTime;
    var divination = rand(60, 60);
    var paramDivination;

    // 表示キャラ決定
    if (divination < 60) {
        itemId = item1;

        widthVal;
        heightVal;
        xPosition;
        yPosition;
        vanishTime;
    } else if (divination >= 60 && divination < 90) {
        itemId = item2;
        widthVal = 20;
        heightVal = 28;
        xPosition = 10;
        yPosition = 50;
        vanishTime = 8000;
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

    createItem(parentClassName, itemId, widthVal, heightVal, xPosition, yPosition, vanishTime);
}

// 交差オブザーバー API（セレクタはID推奨　※classやquerySelectorだと認識しない）
const observer = new IntersectionObserver((entries) => {
    for(const e of entries) {
        if(e.isIntersecting) {
            _topAnimation = setInterval(function () { decideItem(item1, item2, item3); }, itemInterval);
        }else{
            window.clearInterval(_topAnimation);
        }
    }
});

item1 = 'aranu';
item2 = 'walking-panchan';
item3 = '';
itemInterval = 10000;
observer.observe(target);