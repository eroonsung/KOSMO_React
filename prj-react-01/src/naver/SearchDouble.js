
import React, {useState, useRef} from "react";

function SearchDouble(){

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
  const [keyword2, setKeyword2] = useState('');
  const [serachDevelopers, setSearchDevelopers] = useState(developers);
  const [orAndVal, setOrAndVal] = useState('or');


  const devSearchList = serachDevelopers.map(
    (serachDev,index) => (
    <tr bgColor={index%2==0?"white":"lightgray"}><td>{serachDevelopers.length-index}</td><td>{serachDev.dev_no}</td><td>{serachDev.dev_name}</td><td>{serachDev.addr}</td><td>{serachDev.phone}</td></tr>
    )
  )

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

  const search = ()=>{
    let searchDevelopers = "";
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
        searchDevelopers = developers.filter(
          dev => dev.dev_name.indexOf(keyW2) !== -1||dev.addr.indexOf(keyW2) !== -1||dev.phone.indexOf(keyW2) !== -1
        )
        setSearchDevelopers(searchDevelopers);
      }
    //키워드1 O // 키워드2 X
    }else{
      if( keyword2==null || keyword2==undefined || keyword2.split(" ").join("") == ""){
        let keyW= keyword.trim().toLowerCase(); 
        searchDevelopers = developers.filter(
          dev => dev.dev_name.indexOf(keyW) !== -1||dev.addr.indexOf(keyW) !== -1||dev.phone.indexOf(keyW) !== -1
        )
        setSearchDevelopers(searchDevelopers);
      }
      //키워드1 O //키워드2 O
      else{
        let keyW= keyword.trim().toLowerCase(); 
        let keyW2= keyword2.trim().toLowerCase(); 
        //or일 경우
        if(orAndVal=="or"){
          searchDevelopers = developers.filter(
            dev => dev.dev_name.indexOf(keyW) !== -1||dev.addr.indexOf(keyW) !== -1||dev.phone.indexOf(keyW) !== -1 || dev.dev_name.indexOf(keyW2) !== -1||dev.addr.indexOf(keyW2) !== -1||dev.phone.indexOf(keyW2) !== -1
          )
          setSearchDevelopers(searchDevelopers);
        }
        //and일 경우
        else if(orAndVal=="and"){
          searchDevelopers = developers.filter(
            dev => (dev.dev_name.indexOf(keyW) !== -1||dev.addr.indexOf(keyW) !== -1||dev.phone.indexOf(keyW) !== -1) && (dev.dev_name.indexOf(keyW2) !== -1||dev.addr.indexOf(keyW2) !== -1||dev.phone.indexOf(keyW2) !== -1)
          )
          setSearchDevelopers(searchDevelopers);
        }
      }
    }
  }
  
  const searchAll = () => {
    setKeyword("");
    setKeyword2("");
    setOrAndVal("or");
    setSearchDevelopers(developers);
  }
  const keyPress = e=>{
    if(e.key=='Enter') {search()}
  }
  
  const selectOrAnd = e =>{
    setOrAndVal(e.target.value);
  }

  return(
    <>
    <center>
    <div style={{height:'10px'}}/>
    <input 
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
      
      <table width="500" cellPadding="5" border="1" style={{borderCollapse:"collapse"}}>
        <tr bgColor="gray"><th>번호</th><th>직원번호</th><th>직원명</th><th>거주지</th><th>전화번호</th></tr>
        {devSearchList}
      </table>
      
    </center>
    </>
  )
}

export default SearchDouble;