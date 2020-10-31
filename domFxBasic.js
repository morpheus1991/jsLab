/* */
//document.querySelector/all
let qs = (qsValue) => {
	let that = document.querySelectorAll(qsValue);
	let res;
	that.length == 1 ?
		res = document.querySelector(qsValue) :
		res = that;
	return res
};

/*스크롤 기본 */
let scrollPercent;
let scrollY;
window.addEventListener('scroll', (event) => {
	let currentScroll = window.scrollY;
	let height = (qs('html').scrollHeight) - (window.innerHeight);
	let percent = ((currentScroll / height) * 100);
	let roundPercent = Math.round(percent);
	scrollPercent = percent;
	roundPercent == 0 ?
		addClass(qs('body'), 'scorll-top') : removeClass(qs('body'), 'scorll-top');
	roundPercent == 100 ?
		addClass(qs('body'), 'scorll-bottom') : removeClass(qs('body'), 'scorll-bottom');
	eventPlay()
	scrollY = currentScroll;
	console.log(scrollY)
});

let scrollQue = []

class ScrollEvent {
	constructor(name, el, optionFunction) {
		console.log('클레스 생성 동작')
		this.element = qs(el);
		this.name = name;
		this.rect = qs(el).offsetTop;
		this.optionFunction = optionFunction;
	}
	pushQue() {
		scrollQue.push(this);
	}
	play() {
		console.log(this.element)
		console.log(`렉트값${this.rect}`)
		this.optionFunction(this.element)
	}
}

const eventPlay = () => {
	for (const that of scrollQue) {
		console.log(`${that.lect}렉트`)
		if (that.rect < scrollY) {
			that.play()
		}
	}
}
/*
스크롤 이벤트 메이커가 동작시에 항상 스크롤 큐를 재정렬함
스크롤 시작점을 읽어와서 가까운 순으로 재정렬함. 
*/

const ScrollEventMaker = (className, el, optionFunction) => {
	console.log('동작')
	window[className] = new ScrollEvent(className, el, optionFunction);
	console.log('끝')
	window[className].pushQue();
	console.log(window[className].element)
	console.log(window[className].rect);
	console.log(scrollQue)
	scrollQue.sort(function (a, b) {
		if (a.rect > b.rect) {
			return 1;
		}
		if (a.rect < b.rect) {
			return -1;
		}
		return 0;
	})
	console.log(scrollQue)
}

// let scrollQuePlayer = () => {

// }


//모든 스크롤 이벤트는 스크롤 퍼센트를 기반으로 함
//
//스크롤 하다가 해당 값에 도달하면 발동,

// const scrollEvent(el, scrollPercent) => {

// }

/*EventListener*/
const addEvent = (el, eventName, f) => {
	let eventDelegation = listBoxFinder(el);
	eventDelegation.addEventListener(eventName, (event) => {
		f(targetOnly(el, event));
	});
}
/*Dom select or find*/

//element.create
let createEl = (elValue) => {
	res = document.createElement(elValue);
	return res;
}


//findClass
const findClass = (el) => {
	res = el.getAttribute('class');
	return res;
};
//findId
const findId = (el) => {
	res = el.getAttribute('id');
	return res;
};
// addClass
const addClass = (el, className = false) => {
	className ?
		el.classList.add(className) :
		el.classList.add('on');
};
// removeClass
const removeClass = (el, className = false) => {
	className ?
		el.classList.remove(className) :
		el.classList.remove('on')
};



/*loop*/
const looper = (el, f) => {
	for (let i = 0; i < el.length; i++) {
		f(el[i])
	};
};

/*event.delegation*/
//list-box라는 클레스를 가진 ul,ol 등의 리스트 box를 찾아서 반환
const listBoxFinder = (el) => {
	let identiti = null;
	let parent = el.parentElement;
	if (1 < el.length) {
		identiti = el[0].tagName; //인접한 형제가 있으므로 태그네임이 구분자
		parent = el[0].parentElement; //부모요소를 따둠, 앞으로 바뀔 예정
	}
	while (!parent.classList.contains('list-box')) {
		parent = parent.parentElement;
		if (parent.tagName == 'BODY') {
			return;
		};
	};
	return parent;
};
//타겟관련
const targetOnly = (el, event) => {
	let findtarget = event.target;
	let elTagName;
	//테그네임과 클레스명이 모두 같을 때
	//클레스명만 같을 때
	el.length == 1 ?
		elTagName = el.tagName :
		elTagName = el[0].tagName;
	if (findtarget.classList.contains('list-box')) {
		return
	}
	if (elTagName == findtarget.tagName) {
		return findtarget
	}
	if (findtarget.tagName) {
		while (!(elTagName == findtarget.tagName)) {
			findtarget = findtarget.parentElement;
		}
	}
	return findtarget;
}
//인덱스 반환
const thisIndex = (el, event) => {
	let target = el; //누른 타겟
	let targetParent = target.parentElement; //누른 타겟의 부모요소
	target.classList.add('clickChecker-maker'); //누른 타겟 마킹
	let isTargetList = targetParent.children; //부모요소의 자식요소 콜렉션
	let isTarget = isTargetList[0]; //첫번쨰 인덱스 자식요소 셋팅
	let result; //결과값담을 변수
	let index = 0; //초기 검사 인덱스
	for (const el of isTargetList) {
		//마킹한 클레스 확인
		if (el.classList.contains('clickChecker-maker')) { //마킹한 클레스인경우 현제 인덱스 저장
			result = index;
			target.classList.remove('clickChecker-maker') //마킹 클레스 제거
			return result; //결과값 리턴
		} else {
			isTarget = isTargetList.nextelementsibling; //아닌경우 타겟은 다음 인덱스로 변경
			index = index + 1; //아닌경우 타겟은 다음 인덱스로 변경
		}
	}
	return result
}
//클레스 가진요소의 인덱스
const hasOnCalssIndex = (el, event) => {
	let target = el; //누른 타겟
	let targetParent = target.parentElement; //누른 타겟의 부모요소
	let isTargetList = targetParent.children; //부모요소의 자식요소 콜렉션
	let isTarget = isTargetList[0]; //첫번쨰 인덱스 자식요소 셋팅
	let result; //결과값담을 변수
	let index = 0; //초기 검사 인덱스
	for (const el of isTargetList) {
		//마킹한 클레스 확인
		if (el.classList.contains('on')) { //마킹한 클레스인경우 현제 인덱스 저장
			result = index;
			return result; //결과값 리턴
		} else {
			isTarget = isTargetList.nextelementsibling; //아닌경우 타겟은 다음 인덱스로 변경
			index = index + 1; //아닌경우 타겟은 다음 인덱스로 변경
		}
	}
	return result
}


/*toggle*/
//on 토글
const toggleClass = (el) => {
	if (!(el == undefined)) {
		el.classList.toggle('on');

	}
};
//동일 형제들의 on 제거 후 on 토글
const cleanToggleClass = (el) => {
	if (!(el == undefined)) {
		if (el.parentElement) {
			parentEl = el.parentElement;
			looper(parentEl.children, removeClass)
			el.classList.toggle('on');
		}
	}

};
// 더 엄격한 토글(자기자신 on도 삭제)
const cleanSelfToggleClass = (el, event) => {
	if (!(el == undefined)) {
		let selectedIndex = thisIndex(el);
		let hasOnIndex = hasOnCalssIndex(el);
		if (el.parentElement) {
			parentEl = el.parentElement;
			looper(parentEl.children, removeClass)
		}
		el.classList.toggle('on');
		if (selectedIndex == hasOnIndex) {
			el.classList.remove('on');
		}
	}

};
/*scroll*/

//scroll top
const docmentScrollTop = (el, f, className = false) => {
	window.addEventListener('scroll', () => {
		let currentScroll = scrollPercent;
		if (currentScroll == 0) {
			if (className) {
				f(el, className)
			}
			f(el)
		}
	})
}
//scroll bottom
const docmentScrollBottom = (el, f, className = false) => {
	window.addEventListener('scroll', () => {
		// let scrollHeight = qs('body').getBoundingClientRect.top
		let currentScroll = scrollPercent;
		if (currentScroll <= 100) {
			if (className) {
				f(el, className)
			}
			f(el)
		}
	})
}


/*엘리먼트 변경*/
const changeEl = (nowEl, changeEl) => {
	let CreatEl = createEl(changeEl);
	let FindClass = findClass(nowEl);
	let FindClassArry = FindClass.split(' ')
	let FindId = findId(nowEl);
	let inner = nowEl.innerHTML;
	CreatEl.innerHTML = inner;
	let parentEl = nowEl.parentElement;
	if (1 < FindClassArry.length) {
		for (let i = 0; i < FindClassArry.length; i++) {
			CreatEl.classList.add(`${FindClassArry[i]}`);
		};
	};
	if (FindId) {
		CreatEl.setAttribute('id', FindId)
	};
	parentEl.insertBefore(CreatEl, nowEl)
	nowEl.parentElement.removeChild(nowEl);
	return CreatEl
};


const elRectTop = (el) => {

	let res;

}

//1.문서 내에서의 시작위치
//1.문서 내에서 시작위치를 총 높이에대한 퍼센트로 계산하여 반환

//2.el과 px값을 받음 / px값은 문서 총 높이 기준으로 퍼센트로 환산됨
//


///스크롤 큐 

//