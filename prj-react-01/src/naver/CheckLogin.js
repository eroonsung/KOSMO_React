import  React, { Component } from "react";
import "./validation.css";

//컴포넌트 이름은 관용적으로 대문자
class CheckLogin extends Component{
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //리액트가 지원하는 속성변수 state를 선언하고 사용자 정의 객체({~})를 저장하기
  //속성변수 state의 데이터 갱신은 setState(~)라는 메소드 호출로 갱신된다.
  //setState(~) 메소드가 호출되어 state 변수 안의 데이터가 갱신되면 render 메소드가 재호출되고
  //리턴되는 JSX의 실행결과가 웹브라우저로 출력된다.
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  state={
    id :''
    , pwd:''
    , clicked: false
    , validated: false
  }
/*
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //속성변수 handleChange 선언하고 화살표 함수(=익명함수) 저장하기
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  handleChange= e => {
    //----------------------------------------------------------------------------
    //setState 메소드 호출하여 state 변수 안의 데이터를 갱신한다.
    //즉 state 변수 안의 사용정 객체 안의 password 안의 값이 바뀌는 것이다.
    //setState 메소드 호출 시 'this.'를 붙여야 한다.
    //setState(~) 메소드가 호출되어 state 변수 안의 데이터가 갱신되면 render 메소드가 재호출되고
    //리턴되는 JSX의 실행결과가 웹브라우저로 출력된다.
    //----------------------------------------------------------------------------
    this.setState(
      { pwd: e.target.value }
      // e.target.value => 이벤트가 발생한 놈의 value 속성값을 의미한다.
      // 즉 이벤트가 발생한 입력양식의 입력/선택값을 말한다.
      // <주의> 매개변수 e에는 이벤트를 관리하는 객체가 들어온다.
      //       target은 이벤트 관리 객체의 속성변수로 이벤트가 발생한 입력양식을 관리하는 객체가 저장
      //       객체가 저장되었다는 말은 객체의 메위주가 저장됨을 의미
      //       value는 입력양식을 관리하는 객체의 속성변수로 입력또는 선택한 값이 저장되어 있다.
      // 객체의메위주.속성변수/ 객체의메위주.메소드
      // 변수 = 데이터
    )
  };

  handleChangeId= e => {
    this.setState(
      { id: e.target.value }
    )
  };
*/
/*
  handleChange = e =>{
    if(e.target.name==="id"){
      this.setState(
        { id: e.target.value }
      )
    } else if(e.target.name==="pwd"){
      this.setState(
        { pwd: e.target.value }
      )
    }
  }
*/
  //----------------------------------------------------------------------------
  //state 속성변수 안의 사용정 객체에서
  //이벤트가 발생한 입력양식의 name값을 속성변수명으로 하는 놈에게
  // 이벤트가 발생한 입력양식의 value값을 저장하기
  //<주의>이벤트가 발생한 입력양식의 name값을 속성변수명을 취급할때 꼭 []로 감싸야 한다.
  //----------------------------------------------------------------------------
  handleChange= e => {
    this.setState(
      {[e.target.name]: e.target.value}
    )
  }

  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //속성변수 handleButtonClick 선언하고 화살표 함수(=익명함수) 저장하기
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  handleButtonClick= () => {
    this.setState(
      { 
        clicked: true
        , validated: this.state.pwd==="0000"&&this.state.id==="abc" // "0000"과 같으면 true 다르면 false
      } 
    )
    setTimeout(()=>{
      this.setState({
        clicked:false
      , id:''
      , pwd:''});
    },3000)
  }
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //render 메소드 선언하기
  //render 메소드는 [클래스 컴포넌트]를 처음 호출할 때 setState 메소드 호출할 때 재호출 된다
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  render(){
    
    return(
      <>
        <center>
          <br/>
          클래스 컴포넌트 CheckLogin  <br/><br/>
          <table>
            <tr>
              <td>아이디 : </td>
              <td><input type="text" value={this.state.id} onChange={this.handleChange} name="id"
              className={
                //만약 속성변수 clicked가 true면 (this.state.validated?"success":"failure")의 실행결과를 리턴
                //                        false면 ''를 리턴
                this.state.clicked
                        ?(this.state.validated?"success":"failure") //clicked가 true면 validated 살핌
                        :''}
              /></td>
            </tr>
            {/* ====================================================================================== */}
            <tr>
              <td>암호 : </td>
              <td><input type="password" value={this.state.pwd} onChange={this.handleChange} name="pwd"
            //3항 연산자가 나오는 곳에는 그 자리에 데이터가 들어감
            className={
              //만약 속성변수 clicked가 true면 (this.state.validated?"success":"failure")의 실행결과를 리턴
              //                        false면 ''를 리턴
              this.state.clicked
                      ?(this.state.validated?"success":"failure") //clicked가 true면 validated 살핌
                      :''}
            /></td>
            </tr>
          </table>
          <button onClick={this.handleButtonClick}>검증하기</button>  
        </center>
      </>
    )
  }
}

export default CheckLogin;