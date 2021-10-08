
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// 프로젝트명/node_modules/react 안에서 default 가 붙어 수출하는 놈을 수입해서 현재 파일에서 변수 React 에 저장하기
// 프로젝트명/node_modules/react 안안에서에 default 가 안붙어 수출하는 useState 함수를 수입해서 현재 파일에서 변수 useState 에 저장하기
// <참고>함수 컴포넌트를 선언할 할 경우 대부분 useState 함수를 사용한다.
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
import React, {useState,useRef} from 'react';

const developerList = [
  {dev_no: 1, dev_name:'사오정', addr:'서울',phone:'010-1111-2222'}
  ,{dev_no: 2, dev_name:'저팔계', addr:'경기',phone:'010-2222-3333'}
  ,{dev_no: 3, dev_name:'손오공', addr:'인천',phone:'010-3333-4444'}
  ,{dev_no: 4, dev_name:'삼장법사', addr:'서울',phone:'010-4444-5555'}
  ,{dev_no: 5, dev_name:'저팔팔', addr:'경기',phone:'010-5555-6666'}
  ,{dev_no: 6, dev_name:'손오오', addr:'인천',phone:'010-6666-7777'}
  ,{dev_no: 7, dev_name:'삼장법사사', addr:'경기',phone:'010-7777-8888'}
  ,{dev_no: 8, dev_name:'저팔순', addr:'경기',phone:'010-8888-9999'}
  ,{dev_no: 9, dev_name:'손오순', addr:'인천',phone:'010-9999-0000'}
  ,{dev_no: 10, dev_name:'삼장법순', addr:'서울',phone:'010-0000-1111'}
]

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//리액트의 단위 프로그램 중 하나인 [함수 컴포넌트] 선언하기
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
function Search5(){
  const devRef = useRef(null);
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //재 마운트(=함수 컴포넌트 내용 재호출)되게 하는 지역변수들을 선언하기
  //검색 결과물 저장변수 developers 선언
  //키워드 저장 변수 keyword 선언
  //체크된 주소 저장 변수 addrs 선언
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const [developers, setDevelopers] = useState(developerList);
  const [keyword, setKeyword] = useState('');
  const [addrs, setAddrs] = useState([]);

  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  // 키워드 내용 변경시 즉 키워드 입력란에 데이터가 입력될 때 실행할 구문 설정
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const keywordChange=(e)=>{
    //이벤트가 발생한 입력양식의 value값
    setKeyword(e.target.value);
  }

  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  // 주소에 체크 넣기/빼기 시 실행할 구문 설정
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const addrChecked = (e)=>{
    //체크의 넣기/빼기(change이벤트) 이벤트가 발생한 입력 양식의 value값 가져오기
    const val = e.target.value;
    //체크의 넣기/빼기(change이벤트) 이벤트의 정보 얻기
    const checked = e.target.checked;
    //만약에 체크가 되어있으면 addrs 변수 안의 Array 객체에 val변수 안의 값을 누적해서 저장하기
    if(checked){
      setAddrs(addrs.concat(val));
    }
    //만약에 체크가 되어있지 않으면 addrs 변수 안의 Array 객체에서 체크 안된 놈의 value 값을 삭제하기
    else{
      setAddrs( addrs.filter( addr => addr!=val ) );
    }
  }
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //검색 버튼 클릭시 실행할 구문 설정
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const search = ()=>{
    //----------------------------------------------------------------------------
    //키워드가 비어있거나 주소가 무체크되어 있으면 함수 중단
    //----------------------------------------------------------------------------
    //지역변수 flag1 선언하고 키워드가 비어있거나 공백으로만 구성되어 있으면 false를 flag1에 저장하기
    const flag1 = keyword!=null && keyword!=undefined && keyword.split(" ").join("")!="";
    //지역변수 flag2 선언하고 addrs 변수안의 Array 객체가 null이 아니고 배열변수의 개수가 0보다 크면
    //즉 체크된 놈의 value값이 들어있으면 true를 flag2에 저장하기
    const flag2 = addrs!=null && addrs.length>0
    
    //키워드도 없고 주소도 체크되어있지 않으면 함수 중단하기
    if(flag1 == false && flag2 == false){ 
      alert("검색 조건을 설정하세요.");
      setKeyword("");
      devRef.current.focus();
      return; 
    }

    //----------------------------------------------------------------------------
    //키워드 또는 체크된 주소를 가지고 있는 행만 모아서 새로운 Array 객체 얻기
    //----------------------------------------------------------------------------
    let tmp_keyword= "";
    if(flag1){ tmp_keyword = keyword.trim(); }
    setKeyword(keyword.trim()); 

    const new_developerList = developerList.filter(
      (developer) =>{
        if( flag1 == true ){
          //키워드 O, 주소 X
          if(flag2 == false){
            return developer.dev_name.indexOf(tmp_keyword) !== -1||developer.addr.indexOf(tmp_keyword) !== -1||developer.phone.indexOf(tmp_keyword) !== -1
          }
          //키워드 O, 주소O
          else{
            for(let i=0; i<addrs.length; i++){
              if(developer.addr == addrs[i]&&(developer.dev_name.indexOf(tmp_keyword) !== -1||developer.addr.indexOf(tmp_keyword) !== -1||developer.phone.indexOf(tmp_keyword) !== -1)){
                return true;
              }
            }
          }
        }
        //키워드 X, 주소O
        else{
          for(let i=0; i<addrs.length; i++){
            if(developer.addr == addrs[i]){
              return true;
            }
          }
        }
      }
    );
    //----------------------------------------------------------------------------
    //키워드 또는 체크된 주소를 가지고 있는 행만 모인 새로운 Array 객체를 developers에 새롭게 갱신 저장하기
    //----------------------------------------------------------------------------
    setDevelopers( new_developerList );
  }
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm  
  //모두 검색 버튼 클릭시 실행할 구문 설정 
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm  
  const searchAll = () => {
    setKeyword("");
    setAddrs([]);
    setDevelopers(developerList);
  }

  const keyPress = e=>{
    if(e.key=='Enter') {search()}
  }

  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //지역변수 searchResultList 선언
  //검색 결과물이 저장된 developers 안의 데이터를 html 태그 형태로 누적시키기
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const searchResultList = developers.map(
    (serachDev,index) => (
      <tr bgColor={index%2==0?"white":"lightgray"}>
        <td>{developers.length-index}</td>
        <td>{serachDev.dev_no}</td>
        <td>{serachDev.dev_name}</td>
        <td>{serachDev.addr}</td>
        <td>{serachDev.phone}</td>
      </tr>
    )
  )

  return(
    <>
    <center>
    함수 컴포넌트 Search5<br/><br/>
    {/* 검색 조건을 출력하는 HTML선언하기 */}
    <table cellPadding="5" borderColor="lightgray">
      <caption>[검색조건]</caption>
      <tr>
        <td align="right">키워드 : </td>
        <td>
          <input 
            type="text" 
            value={keyword}
            onKeyPress={keyPress} 
            onChange={keywordChange}
            ref={devRef}/>
        </td>
      </tr>
      <tr>
        <td>주소 : </td>
        <td>
          <input type="checkbox" name="addr" value="서울" onChange={addrChecked}/>서울&nbsp;&nbsp;
          <input type="checkbox" name="addr" value="경기" onChange={addrChecked}/>경기&nbsp;&nbsp;
          <input type="checkbox" name="addr" value="인천" onChange={addrChecked}/>인천&nbsp;&nbsp;
          <input type="checkbox" name="addr" value="기타" onChange={addrChecked}/>기타
        </td>
      </tr>
    </table>
    <div style={{height:'10px'}}/>

    {/* 검색 버튼, 모두 검색 버튼을 출력하는 HTML 선언하기 */}
    <button onClick={search} 
      >검색</button>&nbsp;
      <button onClick={searchAll} 
      >모두검색</button>
    <br/><br/>

    {/* 검색 결과를 출력하는 HTML선언하기 */} 
    검색 개수 : {developers.length}
    <table width="500" cellPadding="5" border="1" style={{borderCollapse:"collapse"}}>
        <tr bgColor="gray"><th>번호</th><th>직원번호</th><th>직원명</th><th>거주지</th><th>전화번호</th></tr>
        {searchResultList}
      </table>
      {searchResultList.length==0?'검색결과가 없습니다.':null}
    </center>
    </>

  )
}

export default Search5;