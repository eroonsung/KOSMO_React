import React, {useState,useRef, useEffect} from 'react';
import axios from "axios";

function BoardContentForm(props){
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //게시판 검색화면에서 행 클릭시 들고온 게시판 고유번호를 꺼내기
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const b_no = props.location.state.b_no;
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //DB에서 가져온 1개의 게시판 데이터를 저장할 지역변수 board 선언하기
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const [board, setBoard] = useState( {} );
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //DB에서 1개의 게시판 데이터를 가져올 코딩이 내포된 화살표 함수를 저장할 변수 선언하기
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const getBoard = ()=>{
    //alert(b_no); return;
    axios.post(
      //---------------------------------------------------------
      //"http://localhost:8081/naver/boardContentForm.do"라는 url 주소로 접속해서 
      //DB연동 결과물을 얻어와 지역변수 board에 저장
      //---------------------------------------------------------
      "http://localhost:8081/naver/boardContentForm.do" //URL 주소
      , {b_no:b_no}                                     //전송할 데이터
      //=> 이렇게 보내면 Controller 메소드 안의 매개변수로 들어감
    ).then(
      //서버의 응답이 성공했을 때 실행할 코딩을 내포한 화살표 함수 선언하기
      //화살표 함수의 매개변수로 1개의 게시판 글을 내포한 사용정 객체가 들어온다.
      //이 사용정 객체에서 서버의 응답물(=1개의 게시판 글)은 responseJson.data에 저장되어 있다.
      responseJson =>{
        setBoard( {...board,...responseJson.data.boardDTO} );
      }
    ).catch(
      //서버의 응답이 실패했을 때 실행할 코딩을 내포한 화살표 함수 선언하기
      error => {
        alert(error.message);
      }
    );
  }

  const goBoardList = ()=>{
    props.history.push('/board/boardList');
  }

  useEffect(
    ()=>{
      getBoard();
    },[]
  )
  const goBoardRegForm = ()=>{
    props.history.push(
      {
        pathname: "/board/boardRegForm"
        , state:{ b_no:board.b_no }
      }
    )
  }

  const goBoardUpDelForm = (b_no)=>{
    props.history.push({
      //url 주소 설정
      pathname:"/board/boardUpDelForm"
      //이동시 가져갈 데이터 설정
      , state:{b_no:board.b_no}
    })
  }
  return(
    <>
    <center>
    함수 컴포넌트 BoardContent<br/><br/>
    {b_no}
    <table  border="1" cellPadding="5" cellSpacing="0" width="500" bordercolor="lightgray" style={{borderCollapse:'collapse'}}>
    <caption>상세보기</caption>
      <tr>
        <th bgcolor="#efefef">제목</th>
        <td colSpan="3">{board.subject}</td>
      </tr>
      <tr>
        <th bgcolor="#efefef">작성자</th>
        <td colSpan="3">{board.writer}</td>
      </tr>
      <tr>
        <th bgcolor="#efefef">이메일</th>
        <td colSpan="3">{board.email}</td>
      </tr>
      <tr>
        <th bgcolor="#efefef">등록일</th>
        <td>{board.reg_date}</td>
        <th bgcolor="#efefef">조회수</th>
        <td>{board.readcount}</td>
      </tr>
      <tr>
        <th bgcolor="#efefef">내용</th>
        <td colSpan="3">
          <textarea
            name="content"
            rows="20" cols="50"
            value={board.content}
            readOnly
          >
          </textarea>
        </td>
      </tr>
    </table>
    <br/>
    <button onClick={goBoardRegForm}>댓글쓰기</button> &nbsp;&nbsp;
    <button onClick={goBoardUpDelForm}>수정/삭제</button> &nbsp;&nbsp;
    <button onClick={goBoardList}>목록화면으로</button>
    </center>
    </>
  )
}

export default BoardContentForm;