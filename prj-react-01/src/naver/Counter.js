//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//프로젝트명/node_modules/react 안에 default가 붙어 수출하는 놈 React을 수입해서
    //현재 파일 안에서 React란 이름으로 사용
//프로젝트명/node_modules/react 안에 default가 안 붙어 수출하는 놈 Component을 수입해서
    //현재 파일 안에서 Component란 이름으로 사용
//-----------------------------------------------------------------------
//<참고> 아래 수입코드는 클래스 컴포넌트가 선언되는 js 파일 안에서는 필수로 수입되는 것들
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
import React, { Component } from "react";

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// 리액트 단위 프로그램 중 하나인 [클래스 컴포넌트] 선언하기
//<참고> [클래스 컴포넌트]는 자바의 클래스와 유사한 형태를 가지고 있다.
//<주의> [클래스 컴포넌트]는 반드시 Component 클래스를 상속해야 한다.
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
class Counter extends Component{
  //***********************************
  //사용자정의(=개발자가 만든) 속성변수 선언하기. 
  //<참고> 속성변수는 클래스 내부의 동료 속성변수나 메소드가 공유할 데이터를 저장
  //<주의> 사용자 정의 속성변수 선언 시에는 this. 을 붙이지 않는다.
  //<주의> 호출할 시에는 this. 를 붙여야 한다. 
  //***********************************
  default_number = 0;


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //***********************************
  //리액트가 제공하는 state 속성변수 선언하고 [사용자 정의 객체]를 저장하기
  // 0~1개 선언
  //***********************************
    //---------------------------------------------------------------
    // 클래스 컴포넌트 안에서 리액트가 제공하는 state 속성변수의 특징★
    //---------------------------------------------------------------
      //state 속성변수의 갱신은 리액트가 제공하는 setState 메소드 호출로만 가능하다.
      //setState 메소드 호출로 state 속성변수 안의 값이 갱신되면 render 메소드가 재호출된다.
      //state 속성변수를 호출할 경우 this.을 붙인다.
  state = {
    start_number: this.default_number     
    //사용자 정의 객체안에 속성변수 start_number 선언하고 바깥쪽 속성변수 default_number안의 값을 저장하기
    , now_number: this.default_number
    //사용자 정의 객체안에 속성변수 now_number 선언하고 바깥쪽 속성변수 default_number안의 값을 저장하기
  }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



  //***********************************
  //사용자 정의 속성변수 add에 화살표함수 저장하기
  // add안에는 실행구문이 아니라 데이터가 담겨있음
  //***********************************
  add = ()=>{
    this.setState(
      //-------------------------------------------------------------------------
      //setState라는 메소드를 호출하여
      //state 변수 안에 저장된 사용정 객체 안의 속성변수 now_number안의 데이터를
      //this.state.now_number+1의 실행 결과로 부분 갱신함
        // state 변수가 사라지고 새롭게 생기는게 아니라 해당 값을 덮어 씌움
      //-------------------------------------------------------------------------
      //<주의> state 변수 안에 저장된 사용정 객체가 
        //{now_number: this.state.now_number+1}로 완전히 갱신된게 절대 아니다.
        //즉 부분 갱신만 이루어짐
      {now_number: this.state.now_number+1}
    );
  }
  

  //***********************************
  //사용자 정의 속성변수 minus에 화살표함수 저장하기
  //***********************************
  minus = ()=>{
    //-------------------------------------------------------------------------
    //setState라는 메소드를 호출하여
    //state 변수 안에 저장된 사용정 객체 안의 속성변수 now_number안의 데이터를
    //this.state.now_number-1의 실행 결과로 갱신함
    //-------------------------------------------------------------------------
    this.setState(
      {now_number: this.state.now_number-1}
    );
  }

  //***********************************
  //사용자 정의 속성변수 init에 화살표함수 저장하기
  //***********************************
  init = ()=>{
    //-------------------------------------------------------------------------
    //setState라는 메소드를 호출하여
    //state 변수 안에 저장된 사용정 객체 안의 속성변수 now_number안의 데이터를
    //this.state.start_number의 실행 결과로 갱신함
    //-------------------------------------------------------------------------
    this.setState(
      {now_number: this.state.start_number}
    );
  }

  //***********************************
  //render 메소드 필수 1개 선언
  //***********************************
  render(){
    //---------------------------------
    //render 메소드 안에서만 사용 가능한 지역변수 start_number,now_number를 선언하고
    //지역변수 start_number에는 state 변수 안의 사용정 객체 안의 start_number 속성변수의 값을 저장하기
    //지역변수 now_number state 변수 안의 사용정 객체 안의 now_number 속성변수의 값을 저장하기
    //---------------------------------
    //즉 지역변수명과 일치하는 사용정 객체의 속성변수 안의 값을 지역 변수에 저장하기
    //---------------------------------
    const {start_number, now_number} = this.state;
    //위 코드는 아래와 동일함
      //const start_number = this.state.start_number;
      //const now_number = this.state.now_number;

    //---------------------------------
    // return 구문 필수 선언
    //---------------------------------
    return(
      <>
        <center>
         클래스 컴포넌트<br/>
            {/* ---------------------------------------------------------------------- */}
            {/* render 메소드 안에 선언된 start_number라는 지역변수 안의 값을 표현하기 */}
            {/* 자스 영역안에 있는 데이터 표현 => {} */}
            {/* ---------------------------------------------------------------------- */}
            시작값 : {start_number}<br/>

            {/* ---------------------------------------------------------------------- */}
            {/* render 메소드 안에 선언된 now_number라는 지역변수 안의 값을 표현하기 */}
            {/* ---------------------------------------------------------------------- */}
            현재값 : {now_number}<br/>

            {/* ---------------------------------------------------------------------- */}
            {/* +1이 들어간 버튼을 클릭하면 속성변수 add 안의 화살표 함수 안의 코딩을 실행하기 */}
            {/* onClick 이벤트 오른쪽에는 실행구문을 끌어 안고 있는 화살표 함수(데이터)가 들어있음 */}
            {/* ---------------------------------------------------------------------- */}
            <button onClick={this.add}>+1</button> &nbsp;&nbsp;

            {/* ---------------------------------------------------------------------- */}
            {/* -1이 들어간 버튼을 클릭하면 속성변수 minus 안의 화살표 함수 안의 코딩을 실행하기 */}
            {/* ---------------------------------------------------------------------- */}
            <button onClick={this.minus}>-1</button> &nbsp;&nbsp;

            {/* ---------------------------------------------------------------------- */}
            {/* 초기화가 들어간 버튼을 클릭하면 속성변수 init 안의 화살표 함수 안의 코딩을 실행하기 */}
            {/* ---------------------------------------------------------------------- */}
            <button onClick={this.init}>초기화</button>
            
        </center>
      </>
    )
  }
}

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//현재 이 파일 안에서 기본적으로 수출할 컴포넌트 지정하기
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
export default Counter;

