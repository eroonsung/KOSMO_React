import  React, { useState } from "react";
import "./validation.css";

//컴포넌트 이름은 관용적으로 대문자
function CheckLogin2(){

  const [ id, setId ] = useState( '' );
  const [ pwd, setPwd ] = useState( '' );
  const [ clicked, setClicked ] = useState( false );
  const [ validated, setValidated ] = useState( false );

  const handleChange = e=>{
    if(e.target.name=="id"){
      setId(e.target.value)
    }else if(e.target.name=="pwd"){
      setPwd(e.target.value);
    }
  }

  const handleButtonClick = ()=>{
    setClicked(true);
    setValidated(pwd==="0000"&&id==="abc")
    setTimeout(()=>{
      setId('');
      setPwd('');
      setClicked(false);
    },3000)
  }

  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //render 메소드 선언하기
  //render 메소드는 [클래스 컴포넌트]를 처음 호출할 때 setState 메소드 호출할 때 재호출 된다
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

    return(
      <>
        <center>
          <br/>
          함수 컴포넌트 CheckLogin  <br/><br/>
          <table>
            <tr>
              <td>아이디 : </td>
              <td><input type="text" value={id} onChange={handleChange}
              name="id"
              className={
                //만약 속성변수 clicked가 true면 (this.state.validated?"success":"failure")의 실행결과를 리턴
                //                        false면 ''를 리턴
                clicked
                        ?(validated?"success":"failure") //clicked가 true면 validated 살핌
                        :''}
              /></td>
            </tr>
            <tr>
              <td>암호 : </td>
              <td><input type="password" value={pwd} onChange={handleChange}
              name="pwd"
            //3항 연산자가 나오는 곳에는 그 자리에 데이터가 들어감
            className={
              //만약 속성변수 clicked가 true면 (this.state.validated?"success":"failure")의 실행결과를 리턴
              //                        false면 ''를 리턴
              clicked
                      ?(validated?"success":"failure") //clicked가 true면 validated 살핌
                      :''}
            /></td>
            </tr>
          </table>
          <button onClick={handleButtonClick}>검증하기</button>  
        </center>
      </>
    )
  }

export default CheckLogin2;