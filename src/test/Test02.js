import React, {useState} from "react";

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//리액트의 단위 프로그램 중 하나인 [함수 컴포넌트] 선언하기
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
function Test02 (){
  
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //지역변수 number, setNumber 선언하기
  //number에는 0 저장하고, setNumber에는 number 지역변수 안의 데이터를 갱신하는 익명함수 저장
  //이후부터 setNumber(데이터)라는 코딩이 실행되면 number 변수안에 있는 데이터가 갱신되고 이 함수 컴포넌트 전체가 재호출된다.
  // 재호출시 아래 코딩은 실행에서 제외된다.
  // number 변수가 마치 클래스 컴포넌트의 state 속성변수의 성격을 가진다.
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const [number, setNumber] = useState(0);

  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //지역변수 add에 화살표 함수 저장하기
  // 버튼을 클릭할 때 실행할 구문을 내포하고 있다.
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const add =  () => { setNumber(number+1) };

  return(
    <>
      <center>
        함수 컴포넌트<br/>
        {/* 지역변수 number안의 데이터를 div 태그 사이에 표현하기 */}
        <div>{number}</div>
        {/* 버튼 출력하고 버튼을 클릭하면 add라는 속성변수 안의 화살표 함수 호출하기 */}
        <button onClick={add}>+1</button>
      </center>
    </>
  )
  
}

export default Test02;