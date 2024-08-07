// rem 前端自适应代码
(function (win) {
    let doc = win.document, docEl = doc.documentElement, timer: number = 0;
    function refreshRem() {
        //  ele.getBoundingClientRect()    返回元素的大小及其相对于视口的位置。

        let width = docEl.getBoundingClientRect().width;
        console.log(width)
        if (width > 750) { // 最大宽度,  750为设计稿的宽度
            docEl.style.fontSize = Math.round(20/1920*document.body.clientWidth)+"px"
        } else {
            // var rem = width / 19.19999;
            var rem = width / 24;
            docEl.style.fontSize = rem + 'px';
        }
    }

    win.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = Number(setTimeout(refreshRem, 300));
    }, false);

    win.addEventListener('pageshow', function (e) {
        //  e.persisted  判断是否后退进入

        if (e.persisted) {
            clearTimeout(timer);
            timer = Number(setTimeout(refreshRem, 300));
        }
    }, false);

    refreshRem();

})(window);