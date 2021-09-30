import React, {Component} from "react";

class RegData2 extends Component{
//***********************************
//속성변수 nameRef 선언하고 React 객체의 createRef 메소드 호출하여 리턴된 데이터를 저장하기
//이후부터 ref={this.nameRef}를 가진 태그는 
//this.nameRef.current.focus(); 코딩이 실행되면 포커스가 그 안으로 들어간다
//***********************************
  nameRef = React.createRef();

//***********************************
//속성변수 names 선언하고 Array 객체 저장하기
//***********************************
  names=[
    {id: 1, text:'사오정'}
    ,{id: 2, text:'저팔계'}
    ,{id: 3, text:'손오공'}
    ,{id: 4, text:'삼장법사'}
  ]

//***********************************
//리액트가 제공하는 state 속성변수 선언하고 [사용정 객체]를 저장하기
//***********************************
  // 클래스 컴포넌트 안에서 리액트가 제공하는 state 속성변수 특징
  //-----------------------------------------------------------
  //state 속성변수의 갱신은 리액트가 제공하는 setState 메소드 호출로만 가능하다.
  //setState 메소드 호출로 state 속성변수 안의 값이 갱신되면 render 메소드가 재호출된다.
  //state 속성변수 호출할 경우 this. 을 붙인다.
  //-----------------------------------------------------------  
  state={
    names:  this.names              //이름 목록 저장
    , inputText: ''                 //입력 데이터 저장
    , nextId: this.names.length+1   //추가 저장될 데이터의 고유값 저장
  }

  //***********************************
  //화살표함수가 저장된 속성변수 textChange 선언
  //아래 매개변수 e에는 Event 객체가 들어온다.
  //즉 아래 화살표 함수는 입력 양식에 이벤트가 발생했을 때 실행할 구문을 내포하고 있음
  //***********************************
  textChange = e => { 
    let val = e.target.value;
    //val = val.trim();
    //-----------------------------------------------------------
    //setState라는 메소드 호출하여 state 변수 안에 저장된 사용정 객체 안의 
    // 속성변수 inputText 안의 데이터를 val의 실행결과로 갱신하라
    //-----------------------------------------------------------
    //<주의> state 변수 안에 저장된 사용정 객체가 {inputText:val}로 완전 갱신된 것이 절대 아니다.
    // 즉 부분 갱신만 진행된 것이다.
    //----------------------------------------------------------- 
    this.setState(
      {inputText: val}
    )
  }

  keyPress = e=>{
    if(e.key=='Enter') {this.addName()}
  }
  
  addName = ()=>{
    //3개의 지역변수 선언하고 state 속성변수 안의 사용정 객체 안의 데이터를 지역변수에 저장하기
    //<주의> 만약 아래에서 변수가 변경될 가능성이 있을 경우에는 const로 선언하지 말 것
    const inputText= this.state.inputText;
    const nextId = this.state.nextId;
    const names = this.state.names;

    if(inputText==null || inputText==undefined || inputText.split(" ").join("") == ""){
      alert("값을 입력하세요.");
      this.setState(
        {inputText: ""}
      )
      //ref={nameRef}를 가진 태그에 포커스 들여놓기
      this.nameRef.current.focus();
      return;
    }
    
    const tmpNames = names.filter(name=>name.text===inputText.trim());
    if( tmpNames.length>0 ){
      alert("값이 중복됩니다.")
      this.setState(
        {inputText: ''}
      )
      //ref={nameRef}를 가진 태그에 포커스 들여놓기
      this.nameRef.current.focus();
      return;
    }
    
    const newNames = names.concat({
      id: nextId
      , text: inputText.trim()
    })

    //newNames안의 Array 객체를 기존 사용정 객체 안의 names 속성변수에 갱신해서 저장하기
    this.setState( {names: newNames} )
    //사용정 객체 안의 nextId 속성변수에 nextId+1의 실행결과 저장하기
    //즉 기존 데이터에서 1 증가하라는 의미
    this.setState( {nextId: nextId+1} )
    //inputText 지역변수에 ""저장하기. 결국 입력양식 비워줌
    this.setState( {inputText: ''} )
    //ref={nameRef}를 가진 태그에 포커스 들여놓기
    this.nameRef.current.focus();
  }

  //***********************************
  //화살표 함수가 저장된 지역변수 removeName 선언
  //화살표 함수 안에는 목록을 더블 클릭하면 목록을 삭제하는 구문이 내포되어 있다.
  //매개변수 더블클릭하는 목록의 고유값인 id값이 들어온다.
  //***********************************
  removeName = id => {
    //매개 변수로 들어온 id값을 가진 놈을 삭제한 후 재 저장
    // names.id 가 매개변수로 작성하지 않는 데이터들만 추출해서 새로운 배열을 만듬
    // = names.id 가 id 인 것을 제거함
    //setNames(names.filter(name => name.id !== id));
    const newNames = this.state.names.filter(name => name.id != id);
    /*
    if(newNames.length>=1){
      this.setState(
        {names: newNames}
      )
    }else{
      alert("제거 불가능. 목록은 최소 1개 이상 존재해야 합니다.")
      return;
    }*/
    if(this.state.names.length==1){
      alert("제거 불가능. 목록은 최소 1개 이상 존재해야 합니다.")
      return;
    }
    this.setState(
      {names: newNames}
    )
  };

  //***********************************
  //render 메소드 필수 1개 선언
  //***********************************
  render(){
    //-------------------------------------------------------
    //지역변수 nameList 선언하고 Array 객체의 map 메소드를 호출하여
    //names에 저장된 사용정 객체를 1개씩 꺼내서
    //아래의 화살표 함수를 호출하여 리턴되는 html 코딩을 누적해 저장하기
    //-------------------------------------------------------
    const nameList = this.state.names.map(
      name=>
        <li style={{cursor:'pointer'}} key={name.id} 
        onDoubleClick={()=>{this.removeName(name.id)}}
        >
          {name.text}
        </li>
    )

    return(
      <>
        <center>
        클래스 컴포넌트<br/>
          {/*{inputText}*/}
          <table><tr><td>

          <input 
            type="text" 
            value={this.state.inputText} //value라는 속성값으로 속성변수 안의 inputText 안의 데이터를 삽입하기 
            ref={this.nameRef}
            onChange={this.textChange} //입력값이 바뀌면, 즉 키보드로 데이터를 입력하면 textChange 변수 안의 화살표 함수 호출하기 
            onKeyPress={this.keyPress}
            /*
            onKeyPress={(e)=>{
              if(e.key=='Enter') {this.addName()}
            }}
            */
            ></input> &nbsp;
          <button onClick={this.addName} //버튼을 클릭하면 addName 변수 안의 화살표함수 호출하기
          >추가</button>
          <ul>{nameList}</ul>

          </td></tr></table>
        </center>
      </>
    )

  }
}

export default RegData2;