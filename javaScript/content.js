const contentWrap = document.querySelector('.content-wrap');
const backBtn = document.querySelectorAll('.back-btn');


contentWrap.addEventListener('click', goBack);

function goBack(e){
	if(e.target.classList.contains('back-btn')){
		location.href = "index.html";
	}else if(e.target.classList.contains('EXIT')){
		location.href = "index.html";
	}
}





/******************************************		I N T E R V I E W	 	 *************************************************/
/******************************************		I N T E R V I E W	 	 *************************************************/
/******************************************		I N T E R V I E W	 	 *************************************************/

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const canvasWidth = canvas.width = 250;
const canvasHeight = canvas.height = 500;

const hopeSheet = new Image();
hopeSheet.src = "./img/hope-sprite.png";

const frameWidth = 250;
const frameHeight = 500;

let ImageFrame = 0;
let staggerFrames = 0;
const spriteAnimations = [];
const animationStates = [
	{
		name: 'idle',
		frames: 6,
	},
	{
		name: 'talk',
		frames: 4,
	},
	{
		name: 'smile',
		frames: 4,
	},
	{
		name: 'surprise',
		frames: 8,
	},
	{
		name: 'cute',
		frames: 4,
	},
	{
		name: 'angry',
		frames: 4,
	},
	{
		name: 'old',
		frames: 4,
	},
	{
		name: 'flip',
		frames: 10,
	},
	{
		name: 'freak',
		frames: 10,
	},
	{
		name: 'cry',
		frames: 10,
	},
	{
		name: 'jump',
		frames: 10,
	},
]


animationStates.forEach((state, index) => {
	let frames = {
		loc: [],
	}
	for(let j = 0; j < state.frames; j++){
		let positionX = j * frameWidth;
		let positionY = index * frameHeight;
		frames.loc.push({x: positionX, y: positionY});
	}
	spriteAnimations[state.name] = frames;
});


let currState = '';

function animate(){
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	let position = Math.floor(ImageFrame/staggerFrames) % spriteAnimations[currState].loc.length;

	let frameX = frameWidth * position;
	let frameY = spriteAnimations[currState].loc[position].y;

	context.drawImage(
		hopeSheet,
		frameX,
		frameY,
		frameWidth,
		frameHeight,
		0,
		0,
		canvasWidth,
		canvasHeight
	)
	
	ImageFrame++;
	requestAnimationFrame(animate);
}


let entryFrame_1 = 0;
let entryFrame_2 = 0;

function entry_1(){
	context.clearRect(0, 0, canvasWidth, canvasHeight);

	context.drawImage(
		hopeSheet,
		entryFrame_1 * frameWidth,
		3 * frameHeight,
		frameWidth,
		frameHeight,
		0,
		0,
		canvasWidth,
		canvasHeight
	)
	
	if(ImageFrame % 20 == 0){
		if(entryFrame_1 < 7){
			entryFrame_1++;
		}
	}
	
	ImageFrame++;
	requestAnimationFrame(entry_1);
}


function entry_2(){
	context.clearRect(0, 0, canvasWidth, canvasHeight);

	context.drawImage(
		hopeSheet,
		entryFrame_2 * frameWidth,
		10 * frameHeight,
		frameWidth,
		frameHeight,
		0,
		0,
		canvasWidth,
		canvasHeight
	)
	
	if(ImageFrame % 3 == 0){
		if(entryFrame_2 < 9){
			entryFrame_2++;
		}
	}
	
	ImageFrame++;
	requestAnimationFrame(entry_2);
}


function entry(){
	if(content[1].classList.contains('fade-in')){
		setTimeout(() => {
			entry_1();
			setTimeout(() => {
				entry_2();
				setTimeout(() => {
					textBox();
					charLog('너.. 넌.!! 누기야..!!!', '0');
					userLog('면접관', 'A');
					userLog('방문객', 'B');
					select_1();
				}, 500);
			}, 2000);
		},500)
	}
}


function textBox() {
	const monitor = document.querySelector('.monitor');
	const charBox = document.createElement('div');
	charBox.classList.add('character-box');
	monitor.appendChild(charBox);
}


function charLog(text, time) {
	const charBox = document.querySelector('.character-box');

	if(charBox){ // if CHAT BOX is deleted then don't spawn TEXT = (equivalent to 'clearTimeout')
		setTimeout(() => {
			const charText = document.createElement('p');
			charText.classList.add('character-text');

			const charNode = document.createTextNode(text);

			charText.appendChild(charNode);
			charBox.appendChild(charText);
		}, time);
	}
}


function userLog(text, className) {
	const userBox = document.querySelector('.user-box');
	const userText = document.createElement('p');
	userText.classList.add('user-text');
	userText.classList.add(className);

	const userNode = document.createTextNode(text);
	userText.appendChild(userNode);
	userBox.appendChild(userText);
}


function clearLog(e) {
	const userBox = document.querySelector('.user-box');
	const monitor = document.querySelector('.monitor');
	const charBox = document.querySelector('.character-box');
	if(e.target.classList.contains('user-text')){
		if(charBox){
			monitor.removeChild(monitor.lastChild);
		}
		while(userBox.firstChild){ // delete all user-text inside user-box
			userBox.removeChild(userBox.lastChild);
		}	
	}
}


function charState(BS, BF, after, AS, AF, time){
// BeforeState / BeforeFrames / after = run / AfterState / AfterFrame / setTimeout 
	currState = BS;
	staggerFrames = BF;

	if(after == 'after'){
		stateTime = setTimeout(() => {
			currState = AS;
			staggerFrames = AF;
		}, time);
	}else {
		return;
	}
}



const userBox = document.querySelector('.user-box');

function select_1(){
	userBox.onclick = (e)=>{
		clearLog(e)

		if(e.target.classList.contains('A')){
			charState('cute', '40');
			animate();
			textBox();
			charLog('아니 이런 누추한 곳에 귀하신 분이');
			userLog('엣햄', 'A');
			select_2();
		
		}else if(e.target.classList.contains('B')){
			charState('angry', '30');
			animate();
			textBox();
			charLog('아니 이런 귀한 곳에 누추한 분이');
			userLog('힝..', 'B')
			select_2();
		}
	}
}


function select_2(){
	userBox.onclick = (e)=> {
		clearLog(e);

		if(e.target.classList.contains('A')){
			charState('smile', '50');
			textBox();
			charLog('방문해 주셔서 감사합니다!!!');
			charLog('궁굼하신것들 무엇이든 물어봐주세요!', '1000');
			
			userLog('NEXT', 'A');
			select_3();
		}else if(e.target.classList.contains('B')){
			charState('freak', '40');
			textBox()
			charLog('장난입니당 ㅋㅋ');
			charLog('둘러보다 가세요 ㅋㅋ', '1000');

			userLog('예압', 'B');
			select_3();
		}
	}
}


function select_3() {
	userBox.onclick = (e)=> {
		clearLog(e);
			
		if(e.target.classList.contains('user-text')){
			if(canvas.classList.contains('hide')){  // operate only when canvas has .hide from select_4 LINE:363
				const monitor = document.querySelector('.monitor');
				monitor.classList.remove('black-out');  // remove .black-out to show original BG
				canvas.classList.remove('hide');  // remove .hide to show character 
				monitor.classList.add('fade-in');  // add .fade-in to gradually show when clicked From select_5 LINE:427
			}
			
			charState('idle', '100');

			userLog('자기소개', 'A');
			userLog('경력', 'B');
			userLog('연락처', 'C');
			select_4();

		}
	}
}


function select_4(){
	userBox.onclick = (e)=> {
		clearLog(e);

		if(e.target.classList.contains('A')){
			charState('talk', '30', 'after', 'idle', '100', '4000');

			textBox();
			charLog('이름은 이소망, 나이는 1993년생');
			charLog('(만28)살 입니다.', '1000');
			
			userLog('NEXT', 'A');
			select_5();

		}else if(e.target.classList.contains('B')){
			charState('cry', '60');
			const monitor = document.querySelector('.monitor');
			monitor.classList.remove('fade-in'); // remove fade-in to reuse at select_4 LINE:365
			monitor.classList.add('fade-out'); // fade-out original BG

			setTimeout(() => {
				canvas.classList.add('hide');  // add .hide on canvas to apply display:none on -> character
				monitor.classList.add('black-out'); // add .black-out on monitor to override original BG to -> BLACKED OUT BG
				monitor.classList.add('fade-in');  // add .fade-in on monitor to gradually show blacked-out screen ^^^^^^
				setTimeout(() => {
					textBox();
					charLog('.......');
					charLog('뭐가.. 보이세요..?', '2000');
					charLog('아무것도.. 안보이죠..?', '4000');
					
					setTimeout(() => {
						userLog('NEXT', 'B');
						select_5();
					}, 5500);
				}, 2000);
			}, 1400);

		}else if(e.target.classList.contains('C')){
			charState('old', '40', 'after', 'old', '40', '20000');

			textBox();
			charLog('드.. 드디어..! 기다리고.. 있었습니다..');
			charLog('이제야.. 저를 불러주시는 군요.. 쿨럭..', '1200');
			charLog('한참을 기다리느라.. 많이 늙었지만..', '2400');
			charLog('그래도.. 저의 두눈을 보십시오..!', '3600');

			userLog('NEXT', 'C')
			select_5();
		}
	}
}


function select_5() {
	userBox.onclick = (e)=> {
		clearLog(e);

		if(!canvas.classList.contains('hide')){  // hotFix for broken stateTime due to canvas missing from select_4 LINE:350
			clearTimeout(stateTime); 
		}
		
		if(e.target.classList.contains('A')){
			charState('talk', '30', 'after', 'idle', '100', '6000');

			textBox();
			charLog('출생은 충청북도 충주시에서 태어나', '0');
			charLog('2002년도 10살에 사이판으로 이민을간후', '1200');
			charLog('2010년도에 귀국하였고.', '2400');					
			charLog('현재는 전주에서 거주중입니다.', '3600');
		
			userLog('NEXT', 'A');
			select_6();

		}else if(e.target.classList.contains('B')){
			const monitor = document.querySelector('.monitor');
			monitor.classList.remove('fade-in'); // remove fade-in to reuse at select_3 LINE:320
			monitor.classList.remove('fade-out'); // remove fade-out to reuse at select_4 LINE:352

			textBox();
			charLog('맞습니다.. 저는 비전공.. 무경력..',)
			charLog('기껏해야.. 5개월치 디퍼블 국비 공장코스..', '2000');
			charLog('그리고 30만원 남짓.. 유료 인강..', '4000');
			charLog('눙물좀 닦고.. 불 켜드릴게요..', '6000');

			setTimeout(() => {
				userLog('불 켜', 'B');
				select_3();
			}, 8000);

		}else if(e.target.classList.contains('C')){
			charState('old', '40');

			textBox()
			charLog('열정과 패기로 빛나는 눈알이 두개지요??');
			charLog('저를 불러주신다면 앞으로 더 빛날것이고', '1200');
			charLog('제 남은 인생 전부를 귀사에 걸겄입니다!', '2400');
			charLog('우선 면도좀하고 공중제비 한번 돌겠습니다!', '3600');

			userLog('돌려돌려', 'C');
			select_6();
		}
	}
}

function select_6() {
	userBox.onclick = (e)=> {
		clearLog(e);
		clearTimeout(stateTime);

		if(e.target.classList.contains('A')){
			charState('idle', '100');

			userLog('흑역사', 'A');
			userLog('성격', 'B');
			userLog('목표', 'C');
			userLog('BACK', 'D');
			select_7();

		}else if(e.target.classList.contains('C')){
			charState('flip', '20', 'after', 'smile', '50', '4000');

			textBox();
			charLog('mobile: 010-9024-4888');
			charLog('Email: john_lee0607@naver.com', '1200');
			charLog('방문해주셔서 다시한번 감사드립니다!', '2400');
			charLog('저와 함께 귀사의 무궁한 발전을 기원합니다', '3600');

			userLog('EXIT', 'EXIT');
			
		}
	}
}

function select_7() {
	userBox.onclick = (e)=> {
		clearLog(e);

		if(e.target.classList.contains('A')){
			charState('talk', '30', 'after', 'idle', '100', '6000');

			textBox();
			charLog('현시대를 살아가는 10대 20대들 처럼');
			charLog('저 또한 인생의 목표 와 꿈을 찾지 못하여', '1200');
			charLog('오랜 세월 방황했습니다.', '2400');

			userLog('NEXT', 'A');
			select_8();

		}else if(e.target.classList.contains('B')){
			charState('talk', '30', 'after', 'idle', '100', '7000');

			textBox();
			charLog('저의 MBTI 는 전체인구의 3%에 해당하는');
			charLog('나름 유별난? 논리적인 사색가', '1200');
			charLog('또는 "아이디어뱅크형"으로 불리는', '2400');
			charLog('INTP-T 입니다.', '3600');

			userLog('NEXT', 'B');
			select_8();

		}else if(e.target.classList.contains('C')){
			charState('talk', '30', 'after', 'idle', '100', '7000');

			textBox();
			charLog('저의 목표는 "상상에서 현실로" 입니다.');
			charLog('상상하는 모든 아이디어들을 코딩으로', '1200');
			charLog('완벽히 시각화 하는것이 목표이자', '2400');
			charLog('해당 직업군을 선택한 이유입니다.', '3600');

			userLog('NEXT', 'C');
			select_8();

		}else if(e.target.classList.contains('D')){
			userLog('자기소개', 'A');
			userLog('경력', 'B');
			userLog('연락처', 'C');
			select_4();
		}
	}
}


function select_8(){
	userBox.onclick = (e)=> {
		clearLog(e)
		clearTimeout(stateTime);

		if(e.target.classList.contains('A')){
			charState('talk', '30', 'after', 'idle', '100', '6000');

			textBox();
			charLog('스스로 찾을 수 없었던 미래이기에',);
			charLog('주변 사람들의 이야기에 귀를 귀우리니', '1200');
			charLog('저에겐 IT(코딩)계업이 어울린다는 것을', '2400');
			charLog('추천받아 도전해보게 되었습니다.', '3600');

			userLog('NEXT', 'A');
			select_9();

		}else if(e.target.classList.contains('B')){
			charState('talk', '30', 'after', 'cry', '50', '5000');

			textBox();
			charLog('저와 동일한 유형으로');
			charLog('빌 게이츠, 아인슈타인, 아이작 뉴턴..', '1200');
			charLog('어..? 어라..? 눈물..?', '2400');
			charLog('나.. 어째서.. 눈물이..?', '3600');

			userLog('NEXT', 'B');
			select_9();

		}else if(e.target.classList.contains('C')){
			charState('talk', '30', 'after', 'idle', '100', '7000');

			textBox();
			charLog('커리어 외적인 인생 목표는');
			charLog('미리 안될거라 단정지으며 시도조차', '1200');
			charLog('하지않고 허송세월 보냈던 과거와는 달리', '2400');
			charLog('도전하며 실천할것입니다.', '3600');
			
			userLog('NEXT', 'C');
			select_9();
		}
	}
}


function select_9(){
	userBox.onclick = (e)=>{
		clearLog(e);
		clearTimeout(stateTime);
		

		if(e.target.classList.contains('A')){
			charState('cry', '50');

			textBox();
			charLog('본격적으로 공부를 시작하게되니 욕심이', '0');
			charLog('생기게되었고 현재도 지식을 채우기 위해', '1200');
			charLog('노력중입니다. 이 계열에 몸담을수 있는', '2400');
			charLog('날이 하루빨리 오길 간절히 바랍니다.', '3600');

			userLog('NEXT', 'A');
			select_6();

		}else if(e.target.classList.contains('B')){
			charState('talk', '30', 'after', 'freak', '50', '4000');

			textBox();
			charLog('저의 성격을 3줄로 요약하자면');
			charLog('알기 전엔 예의바른 내성적 성향', '1200');
			charLog('친해지면 전형적인 4차원 AB형', '2400');
			charLog('(얘가 원래 이랬나?!)', '3600');

			userLog('NEXT', 'A');
			select_6();

		}else if(e.target.classList.contains('C')){
			charState('talk', '30', 'after', 'idle', '100', '6000');

			textBox();
			charLog('포트폴리오를 준비하며 깨달은 것은');
			charLog('"하냐, 하지 않냐"의 차이입니다.', '1200');
			charLog('하고자 하면 방법은 항상 있다.', '2400');
			charLog('저는 프론트엔드 개발자가 될것입니다.', '3600');

			userLog('해라', 'A');
			select_6();
		} 
	}
}


/******************************************		I N T E R V I E W	E N D 	 *************************************************/
/******************************************		I N T E R V I E W	E N D 	 *************************************************/
/******************************************		I N T E R V I E W	E N D 	 *************************************************/








/********************************		S L I D E R		B U T T O N S		 ********************************/
/********************************		S L I D E R		B U T T O N S		 ********************************/




function sliderSelector(i){

	const slider = document.querySelectorAll('.slider');
	const sliderControl = document.querySelectorAll('.slider-control');

	slider[i].addEventListener('mousemove', sliderHover);	// hover event for (slider) 




	let sliderTime;

	function sliderHover() {
		clearTimeout(sliderTime);
		sliderControl[i].classList.add('show');
		sliderControl[i].classList.add('slider-in');
		sliderControl[i].classList.remove('slider-out');
		
		sliderTime = setTimeout(() => {
			sliderControl[i].classList.remove('slider-in');
			sliderControl[i].classList.add('slider-out');
			sliderTime = setTimeout(() => {
				sliderControl[i].classList.remove('show');
				}, 400);
			}, 1000);
	}


	sliderControl[i].addEventListener('mouseenter', sliderBtnEnter);	// mouse enter event for (slider-button)

	function sliderBtnEnter() {
		clearTimeout(sliderTime);
		sliderControl[i].classList.add('show');
	}


	sliderControl[i].addEventListener('mouseleave', sliderBtnLeave);	// mouse leave event for (slider-button)

	function sliderBtnLeave() {
		sliderTime = setTimeout(() => {
			sliderControl[i].classList.remove('slider-in');
			sliderControl[i].classList.add('slider-out');
			sliderTime = setTimeout(() => {
				sliderControl[i].classList.remove('show');
			}, 400);
		}, 1000);
	}

	/*************************************		S L I D E R		F R A M E	  C O N T R O L     *************************************/
	/*************************************		S L I D E R		F R A M E	  C O N T R O L     *************************************/

	/*	 EXECUTE and APPEND cloneNode BEFORE querySelecting(.slider-item) at LINE:688	*/
	const copyFirst = slider[i].firstElementChild.cloneNode(true);
	const copyLast = slider[i].lastElementChild.cloneNode(true);  // copy first and last (item) from (slider) and,
	slider[i].insertBefore(copyLast, slider[i].firstElementChild);   // append two of (cloneNodes) to (slider) on opposite direction.
	slider[i].appendChild(copyFirst);


	const sliderCounter = document.querySelectorAll('.slider-counter');
	const sliderItem = slider[i].querySelectorAll('.slider-item');  // DON'T CHANGE LINE 
	const itemLength = sliderItem.length;


	let itemWidth = 0;
	for(let j=0; j < itemLength; j++){
		sliderItem[j].style.width = (100 / itemLength) + "%";  // automatically calculate and apply width for (items)  
		itemWidth = sliderItem[j].style.width = (100 / itemLength);
	}

	const sliderWidth = slider[i].style.width = itemLength * 100 + "%";  // automatically calculate and apply width for (Slider)
	slider[i].style.transform = "translateX(-"+ itemWidth +"%)" // first item position for (slider)


	let sliderPosition = 1;

	const counter = document.createTextNode((sliderPosition) +' / '+ (itemLength - 2)); // subtract 2 (cloneNodes)'s LENGTH from LINE:685
	sliderCounter[i].appendChild(counter);  // create DEFAULT (counter) node, and will be removed at LINE:760 


	sliderControl[i].addEventListener('click', sliderBtnClick);	//  click event for (slider-buttons)

	function sliderBtnClick(e) {
		elem = e.target;

		while(!elem.classList.contains('slider-button')){
			elem = elem.parentNode;
			if(elem.nodeName == "BODY") {
				elem = null;
				return; 
			}
		}

		if(elem.classList.contains('next-btn')) {
			
			slider[i].style.transition = "0.8s ease";
			slider[i].style.transform = "translateX(-"+ (sliderPosition + 1) * itemWidth + "%)";

			if(sliderPosition === (itemLength - 2)){ 
				sliderPosition = 0;  // set (sPosition) to (0) here, and will eventually become (1) at LINE:737
				sliderControl[i].style.pointerEvents = "none";  // prevent spam clicking so the (counter) does not surpass (itemLength)
				setTimeout(() => {
					slider[i].style.transition = "0s";
					sliderControl[i].style.pointerEvents = "auto";
					slider[i].style.transform = "translateX(-"+ sliderPosition * itemWidth + "%)";
				}, 750);
			}
			sliderPosition++;
		}

		if(elem.classList.contains('prev-btn')) {
			
			slider[i].style.transition = "0.8s ease" 
			slider[i].style.transform = "translateX(-"+ (sliderPosition - 1) * itemWidth + "%)";
			
			if(sliderPosition === 1){
				sliderPosition = itemLength - 1;  // subtract (-1) from (itemLength) here and will additionally (-1) again at LINE:753
				sliderControl[i].style.pointerEvents = "none";  // prevent spam clicking so the (counter) does not go below (1) 
				setTimeout(()=> {
					slider[i].style.transition = "0s";
					sliderControl[i].style.pointerEvents = "auto";
					slider[i].style.transform = "translateX(-"+ sliderPosition * itemWidth + "%)";
				}, 750);
			}
			sliderPosition--;
		}
		
		const counter = document.createTextNode((sliderPosition)+' / '+ (itemLength - 2)); // subtract 2 (cloneNodes)'s LENGTH from LINE:685
		sliderCounter[i].appendChild(counter);  // create after (counter) and append to (sliderCounter)

		if(sliderCounter[i].contains(counter)) {  // remove before (counter) from LINE:705
			sliderCounter[i].removeChild(sliderCounter[i].firstChild); 
		}
	}
}







