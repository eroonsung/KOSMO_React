import React, {useState,useRef, useEffect} from 'react';
import axios from "axios";

function BoardUpDelForm(props){
  const b_no = props.location.state.b_no;

  
  const goBoardList = ()=>{
    props.history.push('/board/boardList');
  }
  const [board, setBoard] = useState( {} );
  const [xxx,setXxx]= useState("0");
  const change= (e)=>{
    setBoard( { ...board, [e.target.name]:e.target.value } );
  }


  const checkBoardUpDelForm = upDel=>{
    setBoard({ ...board, upDel:upDel });
    setXxx(Math.random());
  };

  const checkBoardUpDelFormExe = () =>{
    //alert(xxx);
    if(xxx==0){
      setXxx(Math.random());
      return;
    }
    axios.post(
      "http://localhost:8081/naver/boardUpDelProc.do" //URL 주소
      , board                 //전송할 데이터
      //=> 이렇게 보내면 Controller 메소드 안의 매개변수로 들어감
    ).then(
      responseJson =>{
        let upDelCnt = responseJson.data.boardUpDelCnt;
        let msg = responseJson.data.msg;
/*
        if(upDel=="up"){
          if(msg!=""&& msg.length>0){
            alert(msg);
            return;
          }
          
          if(upDelCnt == -1){
            alert("게시판 글이 삭제되었습니다.");
          }else if(upDelCnt == -2){
            alert("암호가 틀립니다.");
          }else if(upDelCnt == 1){
            alert("수정 성공");
            }else{
              return;
            }
          }
        //====================================================
        else if(upDel=="del"){
          if(upDelCnt == 1){
            alert("삭제성공.");
          }else if(upDelCnt == -1){
            alert("게시판 글이 삭제되었습니다.");
          }else if(upDelCnt == -2){
            alert("암호가 틀립니다.");
          }else if(upDelCnt == -3){
            alert("댓글이 존재해 삭제가 불가능합니다.");
          }
          
        }
*/
      }
    ).catch(
      //서버의 응답이 실패했을 때 실행할 코딩을 내포한 화살표 함수 선언하기
      error => {
        alert(error.message);
      }
    );
  }

  const getBoard = ()=>{
    //alert(b_no); return;
    axios.post(
      //---------------------------------------------------------
      //"http://localhost:8081/naver/boardContentForm.do"라는 url 주소로 접속해서 
      //DB연동 결과물을 얻어와 지역변수 board에 저장
      //---------------------------------------------------------
      "http://localhost:8081/naver/boardUpDelForm.do" //URL 주소
      , {b_no:b_no}                                     //전송할 데이터
      //=> 이렇게 보내면 Controller 메소드 안의 매개변수로 들어감
    ).then(
      //서버의 응답이 성공했을 때 실행할 코딩을 내포한 화살표 함수 선언하기
      //화살표 함수의 매개변수로 1개의 게시판 글을 내포한 사용정 객체가 들어온다.
      //이 사용정 객체에서 서버의 응답물(=1개의 게시판 글)은 responseJson.data에 저장되어 있다.
      responseJson =>{
        setBoard( {...board,...responseJson.data.boardDTO, pwd:''} );
      }
    ).catch(
      //서버의 응답이 실패했을 때 실행할 코딩을 내포한 화살표 함수 선언하기
      error => {
        alert(error.message);
      }
    );
  }
  useEffect(
    ()=>{
      getBoard();
    },[]
  )
  useEffect(
    ()=>{
      checkBoardUpDelFormExe();
    },[xxx]
  )
  return(
    <>
    <center>
    함수 컴포넌트 BoardUpDelForm<br/><br/>

    <table  border="1" cellPadding="5" cellSpacing="0" width="500" bordercolor="lightgray" style={{borderCollapse:'collapse'}}>
    <caption>수정/삭제</caption>
      <tr>
        <th bgcolor="#efefef">제목</th>
        <td colSpan="3"><input type="text" name="subject" value={board.subject} onChange={change}/></td>
      </tr>
      <tr>
        <th bgcolor="#efefef">작성자</th>
        <td colSpan="3"><input type="text" name="writer"  value={board.writer} onChange={change}/></td>
      </tr>
      <tr>
        <th bgcolor="#efefef">이메일</th>
        <td colSpan="3"><input type="text" name="email" value={board.email} onChange={change}/></td>
      </tr>
      <tr>
        <th bgcolor="#efefef">내용</th>
        <td colSpan="3">
          <textarea
            name="content"
            rows="20" cols="50"
            value={board.content} onChange={change}
          >
          </textarea>
        </td>
      </tr>
      <tr>
        <th bgcolor="#efefef">비밀번호</th>
        <td><input type="password" name="pwd" value={board.pwd} onChange={change}/></td>
      </tr>
    </table>
    <br/>
    <button onClick={()=>{checkBoardUpDelForm('up')}}>수정</button>&nbsp;&nbsp;
    <button onClick={()=>{checkBoardUpDelForm('del')}}>삭제</button>&nbsp;&nbsp;
    <button onClick={goBoardList}>목록화면으로</button>
    </center>
    </>
  )
}

export default BoardUpDelForm;