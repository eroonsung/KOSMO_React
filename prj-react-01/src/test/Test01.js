import React, {Component} from "react";

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//리액트의 단위 프로그램 중 하나인 [클래스 컴포넌트] 선언하기
// <주의> [클래스 컴포넌트]는 반드시 [Component 클래스]를 상속해야 한다
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
class Test01 extends Component{
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //리액트가 제공하는 state 속성변수를 선언하고 [사용자 정의 객체]를 저장하기
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  state={
    number: 0
  }

  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //사용정(=개발자가 만든) 속성변수 add에 화살표 함수 저장하기
  // 버튼 클릭할 때 실행할 구문을 내포하고 있다. 
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  add = ()=>{
    //state 변수 안의 사용정 객체 안의 number라는 속성변수의 데이터를 갱신하기
    //리액트가 제공하는 setState라는 메소드 호출로 갱신할 수 있다.
    this.setState({number: this.state.number+1});
  }
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //리액트가 제공하는 render 메소드 선언. 마지막 필수 1개 선언
  // <주의> render 메소드는 컴포넌트를 처음 호출 시 호출되고
  //        setState 메소드를 통해 state 속성변수 안의 데이터가 갱신될 때 재호출된다
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  render(){
    //지역변수 number 선언하고 state 변수 안의 사용정 객체 안의 number라는 속성변수의 데이터 저장하기
    const number = this.state.number;
    //JSX 문법을 리턴하기. JSX 문법의 실행결과가 화면에 출력되는 셈이다.
    return(
      <>
        <center>
        클래스 컴포넌트<br/>
          {/* 지역변수 number안의 데이터를 div 태그 사이에 표현하기 */}
          <div>{number}</div>
          {/* 버튼 출력하고 버튼을 클릭하면 add라는 속성변수 안의 화살표 함수 호출하기 */}
          <button onClick={this.add}>+1</button>
        </center>
      </>
    )
  }
}

export default Test01;