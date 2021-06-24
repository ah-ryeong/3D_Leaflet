(() => {
    // 익명함수 직접호출
    const leaflet = document.querySelector('.leaflet');
    const pageElems = document.querySelectorAll('.page');
    let pageCount = 0;

    function getTarget(elem, className) {
        while(!elem.classList.contains(className)) {
            elem = elem.parentNode;

            if (elem.nodeName == 'BODY') {
                elem = null;
                return;
            }
        }
        return elem;
    }

    function closeLeaflet() {
        pageCount = 0;
        document.body.classList.remove('leaflet-opened');
        pageElems[2].classList.remove('page-flipped');
        // index 2를 닫고 시간을 두고 같이 닫아줌
         setTimeout(() => {
            pageElems[0].classList.remove('page-flipped');
        }, 500);
    }

    function zoomIn(elem) {
        // elem 위치 가져오기
        // console.log(elem.getBoundingClientRect());
        const rect = elem.getBoundingClientRect();
        // console.log(rect.left, rect.top);
    }

    leaflet.addEventListener('click', e =>{
        // console.log(e.target);
        let pageElem = getTarget(e.target, 'page')
        // console.log(pageElem);

        if (pageElem) {
            pageElem.classList.add('page-flipped');
            pageCount ++;
            
            if (pageCount == 2) {
                document.body.classList.add('leaflet-opened');
            }
        }

        // close 버튼 누르면 동작
        let closeBtnElem = getTarget(e.target, 'close-btn');
        
        if (closeBtnElem) {
            closeLeaflet();
        }

        // zoom-in, zoom-out
        let menuItemElem = getTarget(e.target, 'menu-item');
        if (menuItemElem) {
            zoomIn(menuItemElem);
        }
    }); 
})();