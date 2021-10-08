
import React, {useState, useRef} from "react";

function Search(){

  const devRef = useRef(null);

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
  
  const [keyword, setKeyword] = useState('');
  const [searchDevelopers, setSearchDevelopers] = useState(developers);



  const searchKeyword = (e) =>{
    let val = e.target.value;
   // val = val.trim();
    setKeyword(val);
  }

  const search = ()=>{
    if(keyword==null || keyword==undefined || keyword.split(" ").join("") == ""){
      alert("검색어를 입력하세요.");
      setKeyword("");
      //ref={nameRef}를 가진 태그에 포커스 들여놓기
      devRef.current.focus();
      return;
    }

    let keyW= keyword.trim().toLowerCase();
    setKeyword(keyword.trim()); 
    //----------------------------------------------------------------------------
    //지역변수 searchDevelopers를 선언하고 
    //Array 객체의 filter 메소드를 호출하여
    //developers에 저장된 사용정 객체를 1개씩 복사해서 꺼내서
    //화살표 함수를 호출하면서 매개변수로 전달시킨다.
    //화살표 함수의 리턴값이 true이면 매개변수로 들어온 사용정 객체를 누적시킨다.
    //즉 입력한 키워드가 부분적으로 들어있는 사용정 객체만 누적시킨다.
    //즉 new_developerList 안에는 키워드가 들어있는 사용정 객체만 모여있는 Array 객체가 저장되어 있다.
    //----------------------------------------------------------------------------
    const new_searchDevelopers = developers.filter(
      //(매개변수명)=>{return true 또는 false를 리턴하는 연산식;}
      dev => dev.dev_name.toLowerCase().indexOf(keyW) !== -1||dev.addr.toLowerCase().indexOf(keyW) !== -1||dev.phone.indexOf(keyW) !== -1
    )
    //new_searchDevelopers안에 Array객체를 searchDevelopers 지역변수 안에 넣기 
    setSearchDevelopers(new_searchDevelopers);


  }
  
  const searchAll = () => {
    setKeyword("");
    setSearchDevelopers(developers);
  }
  const keyPress = e=>{
    if(e.key=='Enter') {search()}
  }

  //******************************************************************************
  //지역변수 devSearchList선언
  // searchDevelopers안에 저장된 사용정 객체들 안의 데이터를 html태그 형태로 누적
  //******************************************************************************
  
  const devSearchList = searchDevelopers.map(
    (serachDev, index)=>
    <tr bgColor={index%2==0?"white":"lightgray"}><td>{searchDevelopers.length-index}</td><td>{serachDev.dev_no}</td><td>{serachDev.dev_name}</td><td>{serachDev.addr}</td><td>{serachDev.phone}</td></tr>
  )
  
 /*
  let devSearchList="";
  if(searchDevelopers.length==0){
    devSearchList = "검색 결과가 없습니다."
  }else{
    devSearchList = searchDevelopers.map(
      (serachDev, index)=>
      <tr bgColor={index%2==0?"white":"lightgray"}><td>{searchDevelopers.length-index}</td><td>{serachDev.dev_no}</td><td>{serachDev.dev_name}</td><td>{serachDev.addr}</td><td>{serachDev.phone}</td></tr>
    )
  }
*/
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
      <button onClick={search} 
      >검색</button>&nbsp;
      <button onClick={searchAll} 
      >모두검색</button>
      <div style={{height:'10px'}}/>
      
      <table width="500" cellPadding="5" border="1" className="tbcss0">
        <tr bgColor="gray"><th>번호</th><th>직원번호</th><th>직원명</th><th>거주지</th><th>전화번호</th></tr>
        {devSearchList}
      </table>
      {searchDevelopers.length==0?'검색결과가 없습니다.':null}
    </center>
    </>
  )
}

export default Search;