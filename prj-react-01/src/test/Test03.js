import React, {useState} from "react";

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//리액트의 단위 프로그램 중 하나인 [함수 컴포넌트] 선언하기
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
function Test03 (){
  //n행 m열의 데이터 저장
  // 실제로는 DB에서 가져옴 => select 결과
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //지역변수 names 선언하고 사용정객체 4개가 저장된 Array 객체를 저장하기
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const names = [
      {id: 1, text:'사오정'}
      ,{id: 2, text:'저팔계'}
      ,{id: 3, text:'손오공'}
      ,{id: 4, text:'삼장법사'}
    ]
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //지역변수 namesTag 선언하고 Array 객체의 map 메소드를 호출해서 
  //names에 저장된 사용정객체를 하나씩 꺼내서
  //아래의 화살표 함수를 호출하여 리턴되는 HTML 코딩을 누적해서 저장하기
      //name => <tr><td>{name.id}</td><td>{name.text}</td></tr>  
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  const namesTag = names.map(
    //한행씩 뽑아서 누적시킴
    name => <tr key={name.id}><td>{name.id}</td><td>{name.text}</td></tr>
  )
 
  return(
    <>
    <center>
    <table border="1" cellPadding="5" >
      <caption>총 개수 : {names.length}명</caption>
      <tr><th>직원번호</th><th>직원명</th></tr>
      {namesTag}
    </table>
    </center>
    </>
  )
  
}

export default Test03;