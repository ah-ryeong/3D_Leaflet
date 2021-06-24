(() => {
    // 익명함수 직접호출
    const leaflet = document.querySelector('.leaflet');
    const hand = document.querySelector('.hand');
    const pageElems = document.querySelectorAll('.page');
    let pageCount = 0;
    // 선택한 메뉴 아이템
    let currentMenu;

    // 현재 손 위치 확인
    const handPos = {x: 0, y: 0};
    const targetPos = {x: 0, y: 0};

    // 거리구하는 변수
    let distX;
    let distY;

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
        const dx = window.innerWidth/2 - (rect.x + rect.width/2);
        const dy = window.innerHeight/2 - (rect.y + rect.height/2);
        
        // 각도조절
        let angle;

        switch (elem.parentNode.parentNode.parentNode.dataset.page*1) {
            case 1:
                angle = -30;
                break;
            case 2:
                angle = 0;
                break;
            case 3:
                angle = 30;
                break;
        }

        // 줌인된 상태
        document.body.classList.add('zoom-in');

        leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 50vw) rotateY(${angle}deg)`;
        currentMenu = elem;
        currentMenu.classList.add('current-menu'); 
    }

    function zoomOut() {
        leaflet.style.transform = 'translate3d(0, 0, 0)';
        if(currentMenu) {
            document.body.classList.remove('zoom-in');
            currentMenu.classList.remove('current-menu');
            currentMenu = null;
        }
    }

    function render() {
        // 거리구하기
        distX = targetPos.x - handPos.x;
        distY = targetPos.y - handPos.y;

        // 손 위치 바꿔주기
        handPos.x = handPos.x + distX*0.1;
        handPos.y = handPos.y + distY*0.1;

        hand.style.transform = `translate(${handPos.x - 60}px, ${handPos.y + 30}px)`;
        requestAnimationFrame(render);
    }

    render();

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
            zoomOut();
        }

        // zoom-in, zoom-out
        let menuItemElem = getTarget(e.target, 'menu-item');
        if (menuItemElem) {
            zoomIn(menuItemElem);
        }

        let backBtn = getTarget(e.target, 'back-btn');
        if (backBtn) {
            zoomOut(backBtn);
        }
    }); 

    // 마우스 move 이벤트 -> 마우스 따라오게 하기
    window.addEventListener('mousemove', e=> {
        // 좌표 확인
        // console.log(e.clientX, e.clientY);

        targetPos.x = e.clientX - window.innerWidth*0.7;
        targetPos.y = e.clientY - window.innerHeight*0.7;
        // hand.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
})();