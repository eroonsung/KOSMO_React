import React, {useState,useRef, useEffect} from 'react';
import axios from "axios";

function BoardList(props){
  // cdt: condition 조건
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //검색 조건이 저장되는 searchCdt 지역 변수 선언
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 const [searchCdt, setSearchCdt] = useState( {keyword1:'',selectPageNo:1} );
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //검색 결과물이 저장되는 searchResult 지역 변수 선언
  //검색 결과물은 비동기 방식으로 타 서버에 접근해서 응답 받아온 결과물이다.
  //응답 결과물인 결국 JSON 객체이다.
  //타 서버가 HashMap 객체로 응답하면 react에서는 JSON으로 받는다. 
  //  (자바의 HashMap과 JSON은 비슷한 형태이다.)
  //검색 결과물은 다음과 같다.
  //        검색 select 결과물
  //        선택 페이지 번호
  //        한 화면에 보여줄 행의 개수
  //        한 화면에 보여줄 페이지 번호의 개수
  //        시작 페이지 번호
  //        끝 페이지 번호
  //        검색 총 개수
  //        마지막 페이지 번호(=총 페이지 개수)
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 const [searchResult, setSearchResult] = useState( {} );
 const [xxx, setXxx] = useState('');
 //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 //처음 함수 컴포넌트 안의 코딩이 모두 실행된 이후 search 변수 안의 화살표 함수 안의 코딩 실행하기
 //<참고> useEffect 함수 안의 2번째 인자에 대한 설명
 //만약 두번째 인자가 없다면 함수 컴포넌트 안의 코딩이 실행될 때마다 이고
 //만약 두번째 인자가 Array 객체이고 비어있다면 처음 함수 컴포넌트 안의 코딩이 모두 실행된 이후 이고
 //만약 두번째 인자가 Array 객체이고 searchResult가 들어있다면 처음 함수 컴포넌트 안의 코딩이 모두 실행된 이후 또는 searchResult 변수 안의 내용이 바뀌어 함수 컴포넌트 안의 코딩이 모두 실행된 이후 이다.

 //useEffect 입사시험문제
 //-----------------------------------------------------------
 //두번째 인자가 없을 경우
 //처음으로 함수 컴포넌트가 호출되어 함수 컴포넌트 안의 코딩이 모두 실행된 이후 실행할 코딩 설정
 //그리고 useState 함수 호출로 선언된 모든 변수안의 데이터가 갱신될 때 함수 컴포넌트 안의 코딩이 모두 실행된 이후 실행할 코딩 설정 
 //-----------------------------------------------------------
 /*
  useEffect(
   ()=>{
     함수 컴포넌트 안의 내용이 모두 실행된 이후 실행할 코딩
   }
 )
 */
 //-----------------------------------------------------------
 //두번째 인자의 Array 객체가 비어있을 경우
 //처음으로 함수 컴포넌트가 호출되어 함수 컴포넌트 안의 코딩이 모두 실행된 이후 실행할 코딩 설정
 //-----------------------------------------------------------
 /*
  useEffect(
   ()=>{
     함수 컴포넌트 안의 내용이 모두 실행된 이후 실행할 코딩
   },[]
 )
 */
 //-----------------------------------------------------------
 //두번째 인자의 Array 객체안에 지역변수가 있을 경우
 //처음으로 함수 컴포넌트가 호출되어 함수 컴포넌트 안의 코딩이 모두 실행된 이후 실행할 코딩 설정
 //그리고 useState 함수 호출로 선언된 지역변수명 변수 안의 데이터가 갱신될 때 함수 컴포넌트 안의 코딩이 모두 실행된 이후 실행할 코딩 설정
 //-----------------------------------------------------------
 /*
  useEffect(
   ()=>{
     함수 컴포넌트 안의 내용이 모두 실행된 이후 실행할 코딩
   },[지역변수명]
 )
 */
 //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 useEffect(
   ()=>{
     search();
   },[xxx]
 )
 
 const logout = ()=>{
    props.history.push('/board/loginForm');
 }

 const change= (e)=>{
  setSearchCdt( { ...setSearchCdt, [e.target.name]:e.target.value } );
}
const keyPress = e=>{
  if(e.key=='Enter') {search()}
}

 //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 //지역변수 search 선언하고 화살표 함수 저장하기
 //검색 버튼을 눌렀을 때 실행할 코딩 설정하기
//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 const search = e=>{
   //------------------------------------------------------------------
   //타 서버에 'http://localhost:8081/naver/boardList.do'로 post방식으로 접속하면서
   //searchCdt 변수 안의 데이터를 가지고 접속하기
   //타 서버가 응답해줄 경우 
   //responseJson => {~} 화살표 함수 호출하기
   //이때 매개변수 responseJson으로는 JSON 객체가 들어온다.
   // JSON 객체 안에 타 서버가 DB연동해서 얻은 결과물이 들어있다.
   //타 서버가 응답을 실패했을 경우
   //function (error) {~} 익명함수 호출하기
   //------------------------------------------------------------------
   //결과적으로 아래의 매개변수 responseJson으로는
    //        검색 select 결과물(n행 m열의 데이터, 즉 1개의 Array 객체 안에 다량의 JSON이 들어있다.)
    //        선택 페이지 번호
    //        한 화면에 보여줄 행의 개수
    //        한 화면에 보여줄 페이지 번호의 개수
    //        시작 페이지 번호
    //        끝 페이지 번호
    //        검색 총 개수
    //        마지막 페이지 번호(=총 페이지 개수)
    //가 들어온다.
    //------------------------------------------------------------------ 
   axios.post(
    "http://localhost:8081/naver/boardList.do"
    , searchCdt
   ).then(
      responseJson =>{
        setSearchResult( {...setSearchResult,...responseJson.data} );
      }
   ).catch(
     function (error) {
       alert(error.message);
     }
   )
 }

 //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 //지역변수 searchAll 선언하고 화살표 함수 저장하기
 //모두 검색 버튼을 눌렀을 때 실행할 코딩 설정하기
//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 const searchAll = ()=>{
  //let tmp = xxx;
  setSearchCdt( {...searchCdt, keyword1:''} );
  //setXxx(++tmp);
  setXxx( Math.random() );
 }

 const searchWithPageNo = (clickedselectPageNo)=>{
   setSearchCdt({...searchCdt, selectPageNo:clickedselectPageNo});
   setXxx( Math.random() );
 }


 const goContentForm = (b_no)=>{
   //"/board/boardContentForm"라는 URL 주소로 이동하기
   //이동시 가져갈 데이터는 매개변수로 들어온 클릭한 행의 게시판 고유번호이다.
  //alert(b_no);
  //상세보기 화면으로 이동하기
  props.history.push({
    //url 주소 설정
    pathname:"/board/boardContentForm"
    //이동시 가져갈 데이터 설정
    , state:{b_no:b_no}
  })
  /*
  -----------------------------------------------
  URL 주소로 이동하면서 데이터 가져가는 코딩 형식
  -----------------------------------------------
    props.history.push({
    pathname:"URL 주소 설정"
    , state:이동시 가져갈 사용정 객체
  })
  -----------------------------------------------
  URL 주소로 이동한 후 데이터를 꺼낼 때 형식
  -----------------------------------------------
  {props.location.state.사용정객체의속성변수명}  
  */

 }

 const goBoardRegForm = ()=>{
  props.history.push(
    {
      pathname: "/board/boardRegForm"
      , state:{ b_no:0 }
    }
  )
}

const makeSpace = (print_level)=>{
  
    for(let i =0; i<print_level; i++){
      
    }
}
 //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 //지역변수 pagingNoTag 선언하고 화살표 함수 저장하기
 //페이징 번호가 HTML 태그와 어울려 저장된다.
//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 const getPagingNoTag = ()=>{
   let pagingNoTag = [];
   /*
   if(searchResult.selectPageNo>1){
     
   }else{

   }
   */

   if(searchResult.selectPageNo>1){
     pagingNoTag.push(
       // onClick='search_with_changePageNo(1);'
       <td><span style={{cursor:'pointer'}} onClick={()=>{
        searchWithPageNo(1);
      }}>[처음]</span></td>
     )    
     pagingNoTag.push(
       //onClick='search_with_changePageNo(${pagingNos.selectPageNo}-1);
      <td><span style={{cursor:'pointer'}} onClick={()=>{
        searchWithPageNo(searchCdt.selectPageNo-1);
      }}>[이전]</span></td>
    )
   }else{
    pagingNoTag.push(
      <td><span>[처음]</span></td>
    )
    pagingNoTag.push(
      <td><span>[이전]</span></td>
    )
   }  
   for(let i=searchResult.min_pageNo; i<=searchResult.max_pageNo; i++){
      if(i==searchResult.selectPageNo){
        pagingNoTag.push(
          <td><span><b>{i}</b></span></td>
        )
      }else{
        pagingNoTag.push(
          //onClick='search_with_changePageNo(${no});
          <td><span style={{cursor:'pointer'}} onClick={()=>{
            searchWithPageNo(i);
          }}>[{i}]</span></td>
        )
      }

   }
   if(searchResult.selectPageNo<searchResult.last_pageNo){
    pagingNoTag.push(
      //onClick='search_with_changePageNo(${pagingNos.selectPageNo}+1);'
      <td><span style={{cursor:'pointer'}} onClick={()=>{
        searchWithPageNo(searchCdt.selectPageNo+1);
      }}>[다음]</span></td>
    )
    pagingNoTag.push(
      //onClick='search_with_changePageNo(${pagingNos.last_pageNo});
     <td><span style={{cursor:'pointer'}} onClick={()=>{
      searchWithPageNo(searchResult.last_pageNo);
    }}>[마지막]</span></td>
   )
  }else{
   pagingNoTag.push(
     <td><span>[다음]</span></td>
   ) 
   pagingNoTag.push(
     <td><span>[마지막]</span></td>
   )
  }

   return pagingNoTag;
 }
  return(
    <>
    <center>
    함수 컴포넌트 BoardList<br/><br/>
    [키워드] : <input type="text" name="keyword1" onChange={change} value={searchCdt.keyword1} onKeyPress={keyPress} />
    <br/><br/>
    <button onClick={search}>검색</button>{'  '}
    <button onClick={searchAll}>모두검색</button>{'  '}
    <button onClick={logout}>로그아웃</button><br/><br/>
    <button onClick={goBoardRegForm}>새글쓰기</button> &nbsp;&nbsp;
    {searchResult.boardListAllCnt} 개
    <table border="0" cellPadding="5" cellSpacing="0">
      <tr bgColor="gray">
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>조회수</th>
        <th>등록일</th>
      </tr>
      {
        searchResult.boardList==null?null:
        searchResult.boardList.map(
          (board,index) => (
            <tr bgColor={index%2==0?"white":"lightgray"} style={{cursor:'pointer'}} onClick={()=>{
              goContentForm(board.b_no);
            }}>
              <td>{searchResult.boardListAllCnt-(searchResult.selectPageNo*20-20+1)+1-index}</td>
              <td>
                {
                  board.print_level>0?makeSpace(board.print_level)+'ㄴ':''
                }
                {board.subject}
                
              </td>
              <td>{board.writer}</td>
              <td>{board.readcount}</td>
              <td>{board.reg_date}</td>
            </tr>
          )
        )
      }
    </table><br/>

    <table cellPadding="3">
      <tr>
        {getPagingNoTag()}
      </tr>
    </table>

    <br/><br/>
    {/*
        last_pageNo : {searchResult.last_pageNo}<br/>
        min_pageNo : {searchResult.min_pageNo}<br/>
        max_pageNo : {searchResult.max_pageNo}<br/>
        selectPageNo : {searchResult.selectPageNo}<br/>
        last_pageNo : {searchResult.last_pageNo}<br/>
        rowCntPerPage : {searchResult.rowCntPerPage}<br/>
        pageNoCntPerPage : {searchResult.pageNoCntPerPage}<br/>
    */}

    </center>
    </>
  )
}

export default BoardList;


/*
<참고>
------------------------------
정적함수 선언과 호출 형식
------------------------------
function xxx(){~}                     => xxx()
------------------------------
익명함수 선언과 호출 형식
------------------------------
var xxx = function([매개변수]){~}     => xxx()
*/