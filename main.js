const displayTopElem = document.querySelector(".display_top");
const displayMidElem = document.querySelector(".display_mid");
const tempResultElem = document.querySelector(".temp_result");
const numbersElem = document.querySelectorAll(".number");
const operationElem = document.querySelectorAll(".operation");
const equalElem = document.querySelector(".equal");
const clearAllElem = document.querySelector(".all_clear");
const clearEntryElem = document.querySelector(".clear_entry");
let disTopNum = "";
let disMidNum = "";
let result = null;  // displayMiddle에 보여지는 결과
let lastOperation = "";
let haveDot = false;

numbersElem.forEach( number => {
  number.addEventListener("click", (event) => {
    if ( event.target.innerText === "." && !haveDot ) { // .이 없으면 .입력 가능
      haveDot = true;
    } else if ( event.target.innerText === "." && haveDot ) { // .이 있으면 .입력 불가능
      return;
    }
    disMidNum += event.target.innerText;  // disMidNum은 string이므로 line35에서 float으로 변환
    displayMidElem.innerText = disMidNum;
  });
});

operationElem.forEach( operation => {
  operation.addEventListener("click", (event) => {
    if ( !disMidNum ) return;  // 숫자 입력된 게 없으면 연산자 입력 불가능 (cf)!0는 true, !1은 false
    haveDot = false;  // disMidNum을 disTop으로 올리면 disMidNum이 비워지니까 haveDot을 다시 false로 초기화해줌 (위에서 if문 타면 haveDot이 true가 되고 else if문 타면 false임. 뭐가 될지 모르니까 걍 false로 초기화해주는 것)
    const operationName = event.target.innerText;
    if ( disTopNum && disMidNum && lastOperation ) {
      mathOperation();
    } else {
      result = parseFloat(disMidNum); // line22의 disMidNum을 string에서 float으로 변환
    }
    clearVar(operationName);  //연산자(operationNam)가 입력되면 displayMiddle을 clear하고, displayTop으로 보냄
    lastOperation = operationName;  // line12에서 빈 변수 설정 & mathOperation function에서 이용
    console.log(result);
  })
});

function clearVar(name = ''){
  disTopNum += disMidNum + ' ' + name + ' ';  // disTop에 'disMidNum 연산자 '순으로 입력되게끔 
  displayTopElem.innerText = disTopNum; // displayTopElem와 disTopNum의 차이는?
  displayMidElem.innerText = '';  // disTop으로 올리고 displayMid를 비움
  disMidNum = '';
  tempResultElem.innerText = result;  // line35에 있는 result값을 띄움
}

function mathOperation(){
  if ( lastOperation === '+' ) {
    result = parseFloat(result) + parseFloat(disMidNum)  // result는 line48의 result, 거기에다가 disMidNum을 연산함 & string이므로 float으로 변환
  } else if ( lastOperation === "-" ) {
    result = parseFloat(result) - parseFloat(disMidNum)
  } else if ( lastOperation === "×" ) {
    result = parseFloat(result) * parseFloat(disMidNum)
  } else if ( lastOperation === "÷" ) {
    result = parseFloat(result) / parseFloat(disMidNum)
  }
}

equalElem.addEventListener("click", (event) => { // = 연산 정의
  if ( !disTopNum || !disMidNum ) return; // 최소한 숫자 두 개가 있어야지 사칙연산을 하고 =도 누를 수 있는 거니까, 최소 두 개의 숫자가 없으면 = 연산 이루어지지 않게
  haveDot = false;  // line30과 동일한 이유
  mathOperation();  // mathOperation 작동 (?)
  clearVar(); // clearVar 작동
  displayMidElem.innerText = result;  // displayMid에 result 값을 띄움
  tempResultElem.innerText = '';  // = 연산을 누르면 tempDisplay를 비움
  disMidNum = result; // disMidNum에 result 값을 띄움
  disTopNum = ''; // = 연산을 누르면 disTopNum을 비움 (displayTop를 비우는 건 아님)
});

clearAllElem.addEventListener("click", (event) => {
  displayTopElem.innerText = '0';
  displayMidElem.innerText = '0';
  disTopNum = '';
  disMidNum = '';
  result = '';  // 얘네 셋은 실제 숫자니까 0가 아닌 비워둬야함 (? 56:30초쯤 참고)
  tempResultElem.innerText = '0'; // clearAll button을 누르면 다 비움
});

clearEntryElem.addEventListener("click", (event) => {
  displayMidElem.innerText = '0';
  disMidNum = '';
});
