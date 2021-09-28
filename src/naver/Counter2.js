//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//프로젝트명/node_modules/react 안에 default가 붙어 수출하는 놈 React을 수입해서
    //현재 파일 안에서 React란 이름으로 사용
//프로젝트명/node_modules/react 안에 default가 안 붙어 수출하는 놈 useState을 수입해서
    //현재 파일 안에서 useState란 이름으로 사용
//-----------------------------------------------------------------------
//<참고> 아래 수입코드는 함수 컴포넌트가 선언되는 js 파일 안에서는 필수로 수입되는 것들
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
import React, { useState } from "react";

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// 리액트 단위 프로그램 중 하나인 [함수 컴포넌트] 선언하기
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
function Counter2() {
  //***********************************
  //지역변수 default_number 선언하고 0 저장하기
  //***********************************
  const default_number = 0;

  //***********************************
  //지역변수 number, setNumber 선언하고
  //리액트가 제공하는 내장함수 useState( default_number ) 호출하여 => Array객체
  // 지역변수 number에 default_number 변수 안의 데이터를 저장하고
  // 지역변수 setNumber에 number 변수 안의 데이터를 수정하는 익명함수 저장하기
    //---------------------------------------------------------------
    // 이제부터 setNumber 변수 안의 익명함수를 호출하여
    // number 변수 안의 데이터가 갱신되면 Counter2 함수가 재호출된다.
    // 단, useState(~) 함수가 호출되는 코딩은 제외된다.
    //---------------------------------------------------------------
    // setNumber 변수 안의 익명함수를 호출하는 방법은 setNumber(number변수안에저장될데이터)이다.
  //***********************************
  const [ number, setNumber ] = useState( default_number );

  //***********************************
  //지역변수 add, minus, init 선언하고 화살표 함수 저장하기
  //***********************************
  const add = () => { setNumber(number+1) };
  const minus = () => { setNumber(number-1) };
  const init = () => { setNumber(default_number) };
  
  return( 
    <>
      <center>
        Counter2<br/>
        시작값 : {default_number}<br/>
        현재값 : {number}<br/>
        <button onClick={add}>+1</button> &nbsp;&nbsp;
        <button onClick={minus}>-1</button> &nbsp;&nbsp;
        <button onClick={init}>초기화</button>
      </center>
    </>
  )
}

/*
const Counter2 = ()=>{
}
*/

export default Counter2;