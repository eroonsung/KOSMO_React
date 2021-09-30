//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//프로젝트명/node_modules/react 안에 default가 붙어 수출하는 놈 React을 수입해서
    //현재 파일 안에서 React란 이름으로 사용
//프로젝트명/node_modules/react 안에 default가 안 붙어 수출하는 놈 useState을 수입해서
    //현재 파일 안에서 useState란 이름으로 사용
//-----------------------------------------------------------------------
//<참고> 아래 수입코드는 함수 컴포넌트가 선언되는 js 파일 안에서는 필수로 수입되는 것들
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
import React, {useState, useRef} from "react";

//배열에 새로운 데이터 추가/삭제
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//리액트 단위 프로그램 중 하나인 [함수 컴포넌트] 선언하기
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//const RegData()=>{
//function RegData()=>{
function RegData(){

  const nameRef = useRef(null);

  //***********************************
  //지역변수 names, setNames 선언하고
  //지역변수 names에는 [~] 즉 Array 객체 저장하고
  //지역변수 setNames에는 지역변수 names 안을 갱신하는 익명함수 저장하기
  //--------------------------------------------------------------------------
  //  이후부터 setNames(~)이 호출되면 함수 컴포넌트 안에 있는 코딩이 재실행됨
  //  재실행시 useState함수 호출이 있는 코딩줄은 재실행에서 제외됨
  //<참고>이제부터 names는 마치 클래스 컴포넌트의 state 속성변수와 동일한 성격을 가지게 됨
  //***********************************
  const [names, setNames] = useState(
    [
      {id: 1, text:'사오정'}
      ,{id: 2, text:'저팔계'}
      ,{id: 3, text:'손오공'}
      ,{id: 4, text:'삼장법사'}
    ]
  )
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(names.length+1);

  //***********************************
  //지역변수 nameList 선언하고 Array 객체의 map메소드를 호출하여 
  //names에 저장된 사용정객체를 1개씩 꺼내서
  //아래의 화살표 함수를 호출하여 리턴되는 html 코딩을 누적해서 저장하기
  //***********************************
  const nameList = names.map(
    name=>
      <li style={{cursor:'pointer'}} key={name.id} onDoubleClick={()=>{removeName(name.id)}}>
        {name.text}
      </li>
  )
  //***********************************
  //화살표함수가 저장된 지역변수 textChange 선언
  //아래 매개변수 e에는 Event 객체가 들어온다.
  //즉 아래 화살표 함수는 입력양식에 이벤트가 발생했을 때 실행할 구문을 내포하고 있다
  //***********************************
  //change 이벤트가 발생할 때마다 inputText 내용 갱신됨
  // 지역변수 inputText에 이벤트가 발생한 놈의 value 값을 저장하기
  //<참고> value 속성을 가진 것은 입력양식 태그 밖에 없다.
  const textChange = e => { 
    //지역변수 val 선언하고 이벤트가 발생한 놈의 value값을 저장하기
    let val = e.target.value;
    
    
    //앞뒤 공백 제거하고 재저장하기. 입력하는 순간마다 앞뒤 공백 제거
    val = val.trim();
    //<참고> 원시적인 방법으로 공백 제거하기
    /*
    while(val.indexOf(" ")==0){
      val = val.substring(1);
    }

    while(val.lastIndexOf(" ")==val.length-1){
      val = val.substring(0, val.length-1);
    }
    */

    //지역변수 val 안의 지역변수 inputText에 저장하기
    //<참고>value 속성을 가진 놈은 입력양식 태그밖에 없다.
    setInputText(val); 
  }
  


  //***********************************
  //화살표함수가 저장된 지역변수 addName 선언
  //화살표 함수 안에는 추가 버튼을 클릭하면 호출되는 실행구문을 내포하고 있다.
  //***********************************
  const addName = ()=>{
    //---------------------------------------------------
    //만약 입력한 데이터가 비어있으면 경고하고 함수 중단
    //---------------------------------------------------
    //외부에서 String 객체가 들어오면 무조건 null인지 undefined 확인 먼저 하기!!
    if(inputText==null || inputText==undefined || inputText.split(" ").join("") == ""){
      alert("값을 입력하세요.");
      setInputText("");
      nameRef.current.focus();
      return;
    }
    /*
    if(inputText.split(" ").join("") == ""){
      alert("값을 입력하세요.");
      setInputText("");
      input.current.focus();
      return;
    }
    */

    //---------------------------------------------------
    //만약 중복되어 있으면 경고하고 함수 중단
    //---------------------------------------------------
    //***외부에서 객체가 들어올 때 null인지 확인하는 것 잊지 말자!!

    //지역변수 tmpNames를 선언하고 Array객체의 filter 메소드를 호출하여
    //names에 저장된 사용정객체를 1개씩 꺼내서
    //아래의 화살표 함수를 호출하여 리턴되는 데이터가 true일 때만 
    //기존 사용자 정의 객체를 복사해 누적하기
    const tmpNames = names.filter(name=>name.text===inputText);
    if( tmpNames.length>0 ){
      alert("값이 중복됩니다.")
      setInputText("");
      nameRef.current.focus();
      return;
    }
    
    /*
    if(names != null){
      for(let i = 0; i < names.length; i++) {
        if(inputText == names[i].text){
          alert("값이 중복됩니다.");
          setInputText("");
          nameRef.current.focus();
          return;
        }
      }
    }
    */
    //-----------이 프로그램의 키포인트 소스-------------
    //지역변수 newNames 선언한 후
    //names안의 Array 객체 복사하고 {id: nextId, text: inputText} 추가하기
    //이렇게 만들어진 새로운 Array 객체를 newNames안에 저장하기
    //---------------------------------------------------
    const newNames = names.concat({
      id: nextId
      , text: inputText
    })

    //newNames안의 Array 객체를 기존 names안에 갱신해서 저장하기
    setNames(newNames);
    //nextId 지역변수에 nextId+1의 실행결과 저장하기. 
    //즉 기존데이터에서 1 증가하라는 의미
    setNextId(nextId+1);
    //inputText 지역변수에 ""저장하기. 결국 입력양식 비워줌
    setInputText("");
    nameRef.current.focus();
  }


  //***********************************
  //화살표함수가 저장된 지역변수 removeName 선언
  //화살표 함수 안에는 목록을 더블클릭하면 목록을 삭제하는 구문을 내포하고 있다.
  //매개변수 더블클릭하는 목록의 고유값인 id값이 들어온다.
  //***********************************
  const removeName = id => {
    //매개 변수로 들어온 id값을 가진 놈을 삭제한 후 재 저장
    // names.id 가 매개변수로 작성하지 않는 데이터들만 추출해서 새로운 배열을 만듬
    // = names.id 가 id 인 것을 제거함
    //setNames(names.filter(name => name.id !== id));
    const newNames = names.filter(name => name.id != id);
    setNames(newNames);
  };


  //***********************************
  //JSX문법을 가진 return 구문 선언
  //리턴되는 JSX문법이 웹 화면에 출력된다.
  //***********************************  
  return(
    <>
    <center>
      함수 컴포넌트<br/>
      {/*{inputText}*/}
      <table><tr><td>

      <input 
        type="text" 
        value={inputText} //value라는 속성값으로 지역변수 inputText 안의 데이터 삽입하기 
        onChange={textChange} //입력값이 바뀌면, 즉 키보드로 데이터를 입력하면 textChange 변수 안의 화살표 함수 호출하기 
        ref={nameRef}></input> &nbsp;
      <button onClick={addName} //버튼을 클릭하면 addName 변수 안의 화살표함수 호출하기
      >추가</button>
      <ul>{nameList}</ul>

      </td></tr></table>
    </center>
    </>
  )
}

export default RegData;