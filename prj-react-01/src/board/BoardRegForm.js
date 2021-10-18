import React, {useState,useRef, useEffect} from 'react';
import axios from "axios";

function BoardRegForm(props){
  const b_no = props.location.state.b_no;

  const [board, setBoard] = useState({b_no:b_no});


  
  const goBoardList = ()=>{
    props.history.push('/board/boardList');
  }
  const change= (e)=>{
    
    setBoard( { ...board, [e.target.name]:e.target.value } );
  }
  

  const regBoard=()=>{
    axios.post(
      "http://localhost:8081/naver/boardRegProc.do"
      , board
     ).then(
        (responseJson)=>{
          alert(responseJson.boardRegCnt);
          return;
          if(board.b_no==0){
            if(responseJson.msg==""&&responseJson.boardRegCnt==1){
              alert("새글쓰기 성공")
            }
          }else{
            if(responseJson.msg==""&&responseJson.boardRegCnt==1){
              alert("댓글쓰기 성공")
            }
          }
        }
     ).catch(
       function (error) {
         alert(error.message);
       }
     )
  }


  
  return(
    <>
    <center>
    함수 컴포넌트 BoardRegForm<br/><br/>

    <table  border="1" cellPadding="5" cellSpacing="0" width="500" bordercolor="lightgray" style={{borderCollapse:'collapse'}}>
    <caption>{b_no==0?'새글쓰기':'댓글쓰기'}</caption>
      <tr>
        <th bgcolor="#efefef">제목</th>
        <td colSpan="3"><input type="text" name="subject" value={board.subject} onChange={change} /></td>
      </tr>
      <tr>
        <th bgcolor="#efefef">작성자</th>
        <td colSpan="3"><input type="text" name="writer" value={board.writer} onChange={change}/></td>
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
        <td><input type="password" name="pwd" onChange={change}/></td>
      </tr>
    </table>
    <br/>
    <button onClick={regBoard}>{b_no===0?'새글쓰기':'댓글쓰기'}</button>&nbsp;&nbsp;
    <button onClick={goBoardList}>목록화면으로</button>&nbsp;&nbsp;
    <button onClick={()=>{props.history.push('/board/loginForm')}}>로그아웃</button>
    </center>
    </>
  )
}

export default BoardRegForm;