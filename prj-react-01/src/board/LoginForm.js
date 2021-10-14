import React, {useState,useRef, useEffect} from 'react';
import axios from "axios";

function LoginForm(props){
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //지역변수 id_pwd 선언하고 {login_id:'', pwd:''}저장하기
  //지역변수 setId_pwd 선언하고 id_pwd 변수안의 데이터를 수정하는 익명함수 저장하기
  // useState함수를 사용하여 선언된 변수는 갱신시 함수 컴포넌트 안의 코딩이 재실행된다.
  // 즉, setId_pwd(~)가 실행되어 id_pwd 변수 안의 데이터가 갱신되면 함수 컴포넌트 안의 코딩이   재실행된다.
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const [id_pwd, setId_pwd] = useState( {login_id:'abc', pwd:'123'} );

  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //지역변수 change 선언하고 화살표 함수 저장하기
  //이 화살표 함수 안의 코딩은 아이디 또는 암호를 입력할때마다 실행됨
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const change= (e)=>{
    setId_pwd( { ...id_pwd, [e.target.name]:e.target.value } );
  }

  //**************************************************************
  //**************************************************************
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //지역변수 login 선언하고 화살표 함수 저장하기
  //이 화살표 함수 안의 코딩은 로그인 버튼 클릭 시 실행됨
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const login= (e)=>{
    //------------------------------------------------------------
    //비동긱 방식으로 타 웹서버에 접속하여 JSON 객체로 응답받기
    //------------------------------------------------------------
    axios.post(
      "http://localhost:8081/naver/loginProc.do" //타 웹서버의 URL 주소 설정
      ,id_pwd //타 웹서버로 전송할 사용정 객체 설정(가져갈 데이터) -> 현재 입력한 아이디와 암호가 들어 있음
    ).then(
      //타 웹서버가 응답을 성공했을 경우 호출할 화살표 함수 설정하기
      // 이 때 매개변수로 JSON 객체가 들어온다.
      // 타 웹서버는 응답을 JSON 객체로 해준다
      // JSON 객체에는 대부분 DB연동 결과가 들어있다.
      //매개변수 =>{}
      responseJson => {
        //만약 JSON 객체의 속성변수 data에 1이 있으면
        // 즉 아이디, 암호의 존재 개수가 1이면
        // 즉 아이디 암호가 DB에 있으면
        if(responseJson.data==1){
          //alert("로그인 성공");
          props.history.push("/board/boardList");
        }
        //만약 JSON 객체의 속성변수 data에 1이 아니면
        // 즉 아이디, 암호의 존재 개수가 1이 아니면
        // 즉 아이디 암호가 DB에 없으면
        else{
          alert("로그인 실패");
          //id_pwd 변수 안의 사용정 객체 안의 속성변수에 ''저장하기
          //즉 아이디와 암호를 비우기
          setId_pwd( {...id_pwd, ...{login_id:'', pwd:''} }) // 동일한 속성변수명이 여러개면 마지막 것이 진짜
        }
      }
    ).catch(
      //타 웹서버가 응답을 못했을 경우 호출할 화살표 함수 설정하기
      // 즉 타 서버와 통신이 실패했을 때 호출할 화살표 함수 설정하기
      //매개변수로 예외를 관리하는 객체가 들어온다.
      // .message : 예외에 담겨있는 메시지를 꺼내는 메소드
        error => {
        alert("타 웹서버와의 통신이 실패했습니다. " + error.message)
      }
    )
  }
  //**************************************************************
  //**************************************************************
  
  const init= (e)=>{setId_pwd( {...id_pwd, ...{login_id:'', pwd:''} })}

  return(
    <>
    <center>
    함수 컴포넌트 LoginForm<br/><br/>
    <table board="0" cellPadding="7" cellSpacing="0" bgColor="lightgray">
      <caption>[로그인]</caption>
      <tr><td align="right">아이디 : </td>
          <td><input type="text" name="login_id" onChange={change} value={id_pwd.login_id}/></td>
      </tr>
      <tr><td align="right">비밀번호 :</td>
          <td><input type="password" name="pwd" onChange={change} value={id_pwd.pwd}/></td>
      </tr>
    </table>
    <br/>
    <button onClick={login}>로그인</button>&nbsp;
    <button onClick={init}>초기화</button>&nbsp;<br/>
    </center>
    </>
  )
}

export default LoginForm;