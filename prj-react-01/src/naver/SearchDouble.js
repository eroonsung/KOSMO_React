
import React, {useState, useRef, useMemo} from "react";

function SearchDouble(){
  //*************************************************
  //지역변수 devRef 선언하고
  //devRef함수를 호출하여 리턴된 데이터를 저장하기
  //이후부터 ref={devRef}를 가진 태그는
  //devRef.current.focus(); 코딩이 실해되면 포커스가 그 태그 안으로 들어간다
  //*************************************************
  const devRef = useRef(null);

  //*************************************************
  //지역변수 developerList 선언하고 Array 객체 저장
  //개발자 목록이 저장되어 있다.
  //실제로는 DB에서 가져와야 한다
  //*************************************************
  const developers = 
    [
      {dev_no: 1, dev_name:'사오정', addr:'서울',phone:'010-1111-2222'}
      ,{dev_no: 2, dev_name:'저팔계', addr:'김포',phone:'010-2222-3333'}
      ,{dev_no: 3, dev_name:'손오공', addr:'인천',phone:'010-3333-4444'}
      ,{dev_no: 4, dev_name:'삼장법사', addr:'서울',phone:'010-4444-5555'}
      ,{dev_no: 5, dev_name:'저팔팔', addr:'수원',phone:'010-5555-6666'}
      ,{dev_no: 6, dev_name:'손오오', addr:'인천',phone:'010-6666-7777'}
      ,{dev_no: 7, dev_name:'삼장법사사', addr:'평택',phone:'010-7777-8888'}
      ,{dev_no: 8, dev_name:'저팔순', addr:'성남',phone:'010-8888-9999'}
      ,{dev_no: 9, dev_name:'손오순', addr:'인천',phone:'010-9999-0000'}
      ,{dev_no: 10, dev_name:'삼장법순', addr:'서울',phone:'010-0000-1111'}
    ]
  
  //*************************************************
  const [keyword, setKeyword] = useState('');
  const [keyword2, setKeyword2] = useState('');
  //지역변수 searchDevelopers, setSearchDevelopers 선언하고
  //지역변수 searchDevelopers에는 Array객체 저장하고
  //지역변수 setSearchDevelopers에는 지역변수 searchDevelopers 안을 갱신하는 익명함수 저장하기
  // 이후부터 setSearchDevelopers(~)이 호출되면 함수 컴포넌트 안의 코딩이 재실행됨
  // 재실행시 useState가 있는 코딩줄은 재실행에서 제외됨
  //searchDevelopers는 마치 클래스 컴포넌트의 state 속성변수와 동일한 성격을 가짐
  const [searchDevelopers, setSearchDevelopers] = useState(developers);
  const [orAndVal, setOrAndVal] = useState('or');
 //*************************************************

  const searchKeyword = (e) =>{
    let val = e.target.value;
    val = val.trim();
    setKeyword(val);
  }

  const searchKeyword2 = (e) =>{
    let val = e.target.value;
    val = val.trim();
    setKeyword2(val);
  }

 //*************************************************
 //화살표 함수가 저장된 지역변수 serach 선언
 //검색 버튼을 누르면 실행할 구문을 내포하고 있다.
 //*************************************************
  const search = ()=>{
    let new_searchDevelopers = "";
    if(keyword==null || keyword==undefined || keyword.split(" ").join("") == ""
    ){
      //키워드1 X // 키워드2 X
      if( keyword2==null || keyword2==undefined || keyword2.split(" ").join("") == ""){
      alert("검색어를 입력하세요.");
      setKeyword("");
      setKeyword2("");
      //ref={nameRef}를 가진 태그에 포커스 들여놓기
      devRef.current.focus();
      return;

      //키워드1 X // 키워드2 O
      }else{
        let keyW2= keyword2.trim().toLowerCase(); 
        new_searchDevelopers = developers.filter(
          dev => dev.dev_name.toLowerCase().indexOf(keyW2) !== -1||dev.addr.toLowerCase().indexOf(keyW2) !== -1||dev.phone.indexOf(keyW2) !== -1
        )
        setSearchDevelopers(new_searchDevelopers);
      }
    //키워드1 O // 키워드2 X
    }else{
      if( keyword2==null || keyword2==undefined || keyword2.split(" ").join("") == ""){
        let keyW= keyword.trim().toLowerCase(); 
        new_searchDevelopers = developers.filter(
          dev => dev.dev_name.toLowerCase().indexOf(keyW) !== -1||dev.addr.toLowerCase().indexOf(keyW) !== -1||dev.phone.indexOf(keyW) !== -1
        )
        setSearchDevelopers(new_searchDevelopers);
      }
      //키워드1 O //키워드2 O
      else{
        let keyW= keyword.trim().toLowerCase(); 
        let keyW2= keyword2.trim().toLowerCase(); 
        //or일 경우
        if(orAndVal=="or"){
          new_searchDevelopers = developers.filter(
            dev => dev.dev_name.toLowerCase().indexOf(keyW) !== -1||dev.addr.toLowerCase().indexOf(keyW) !== -1||dev.phone.indexOf(keyW) !== -1 || dev.dev_name.toLowerCase().indexOf(keyW2) !== -1||dev.addr.toLowerCase().indexOf(keyW2) !== -1||dev.phone.indexOf(keyW2) !== -1
          )
          setSearchDevelopers(new_searchDevelopers);
        }
        //and일 경우
        else if(orAndVal=="and"){
          new_searchDevelopers = developers.filter(
            dev => (dev.dev_name.toLowerCase().indexOf(keyW) !== -1||dev.addr.toLowerCase().indexOf(keyW) !== -1||dev.phone.indexOf(keyW) !== -1) && (dev.dev_name.toLowerCase().indexOf(keyW2) !== -1||dev.addr.toLowerCase().indexOf(keyW2) !== -1||dev.phone.indexOf(keyW2) !== -1)
          )
          setSearchDevelopers(new_searchDevelopers);
        }
      }
    }
  }
  
  const searchAll = () => {
    //키워드 입력란 비우기
    setKeyword("");
    setKeyword2("");
    //orAndVal 값 'or'로 초기화하기
    setOrAndVal("or");
    //----------------------------------------------------
    //developers 안에 Array 객체를 developers 지역변수 안에 넣기
    // 즉 원래 있던 데이터가 복구되는 셈
    //----------------------------------------------------
    setSearchDevelopers(developers);
    devRef.current.focus();
    
  }
  const keyPress = e=>{
    if(e.key=='Enter') {search()}
  }
  
  const selectOrAnd = e =>{
    setOrAndVal(e.target.value);
  }

  const devSearchResultList = searchDevelopers.map(
    (serachDev,index) => (
      <tr bgColor={index%2==0?"white":"lightgray"}>
        <td>{searchDevelopers.length-index}</td>
        <td>{serachDev.dev_no}</td>
        <td>{serachDev.dev_name}</td>
        <td>{serachDev.addr}</td>
        <td>{serachDev.phone}</td>
      </tr>
    )
  )
  
 //*************************************************
 //JSX 문법을 가진 return 구문 선언
 //리턴되는 JSX 문법이 결국 웹 화면에 출력된다.
 //*************************************************
  return(
    <>
    <center>
    함수 컴포넌트<br/>
    <div style={{height:'10px'}}/>
    [키워드] : <input 
        type="text" 
        value={keyword}
        onChange={searchKeyword} 
        onKeyPress={keyPress}
        ref={devRef}></input> &nbsp;
    <select name="orAnd" value={orAndVal} onChange={selectOrAnd}>
      <option value="or">or</option>
      <option value="and">and</option>
    </select> &nbsp;
    <input 
        type="text" 
        value={keyword2}
        onChange={searchKeyword2}
        onKeyPress={keyPress}
        ></input> &nbsp;
      <button onClick={search} 
      >검색</button>&nbsp;
      <button onClick={searchAll} 
      >모두검색</button>
      <div style={{height:'10px'}}/>
      
      총 검색 개수 : {searchDevelopers.length}
      {/* 
        { searchDevelopers.length==0?
        <div>검색 결과가 없습니다.</div>
        : <table width="500" cellPadding="5" border="1" style={{borderCollapse:"collapse"}}>
          <tr bgColor="gray"><th>번호</th><th>직원번호</th><th>직원명</th><th>거주지</th><th>전화번호</th></tr>
          {devSearchResultList}
        </table>
        }
      */}
      <table width="500" cellPadding="5" border="1" style={{borderCollapse:"collapse"}}>
        <tr bgColor="gray"><th>번호</th><th>직원번호</th><th>직원명</th><th>거주지</th><th>전화번호</th></tr>
        {devSearchResultList}
      </table>
      {searchDevelopers.length==0?'검색결과가 없습니다.':null}
    </center>
    </>
  )
}

export default SearchDouble;