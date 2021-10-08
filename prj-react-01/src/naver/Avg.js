import React, {useState, useMemo, useRef, useCallback} from "react";

//numbers : 변수에 s가 붙으면 Array객체가 들어올 가능성이 높음
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//평균을 구해서 리턴하는 함수 선언
// getAverage는 컴포넌트가 아닌 단순한 함수
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
const getAverage = numbers => {
  if(numbers==null||numbers.length===0){return 0;}
  /*
  let sum = 0;
  let result = 0;
  for(let i=0; i<numbers.length;i++){
    sum += numbers[i];
  }
  result = sum/numbers.length;
  return result;
  */
  //-----------------------------------------------------------------------------------
  //지역변수 sum 선언하고 매개변수로 들어온 Array 객체 안의 데이터를 모두 더해서 저장하기
  //이때 Array 객체의 reduce 메소드를 이용한다.
  //-----------------------------------------------------------------------------------
  const sum = numbers.reduce( (a, b) => a + b );
  return sum/numbers.length;
}

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//리액트의 단위 프로그램 중 하나인 [함수 컴포넌트] 선언하기
//변수 안에 화살표 함수 저장하여 함수 컴포넌트를 만들 수 있다.
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
const Avg = ()=>{

  const numRef = useRef(null);

  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  const numberChange = e =>{
    setNumber(e.target.value);
  }

  //useMemo와 useCallback은 당장쓸 필요는 없지만 추후에 퍼포먼스를 위해 필요함
  // 클래스 컴포넌트는 render 메소드만 재호출되지만 함수 컴포넌트는 쓸데없는 것 까지
  // 재호출되기 때문에 useMemo와 useCallback이 등장함
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //갱신 불가능한 지역변수 insert 선언하고 익명함수 코딩 저장하기.
  //단 useCallback 함수를 사용하여 컴포넌트가 처음 랜더링 될 때 또는
  //number 혹은 list가 바뀌었을 때만 재 랜더링할 시 익명함수 저장하도록 하기
  //즉 number 혹은 list가 바뀌지 않으면 기존 저장 익명함수 그대로 사용하기
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm  
  const insert = 
  useCallback( //화살표 함수는 useCallback이 끌어안음
    ()=>{
      const nextList = list.concat( parseInt(number,10) );
      setList(nextList);
      setNumber('');
     } ,[number, list]
  )

  const init = () => {
    setList([]);
  }

  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //갱신 불가능한 지역변수 avg 선언하고 getAverage(list) 코딩 저장하기.
  //단 useMemo 함수를 사용하여
  //컴포넌트가 처음 랜더링 될때만 getAverage(list) 코딩 저장하고
  //이후 list 변수안의 데이터가 갱신될 때만 랜더링 시 getAverage(list) 코딩 새롭게 저장하기
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm  
  //list안의 내용이 바뀔 때만 아래 함수가 실행되게 함
  //효율성 극대화
  const avg = useMemo( //그냥 함수를 호출할 때는 useMemo가 끌어안음
    ()=>getAverage(list), [list] 
  ); 

  return(
    <>
      <center>
        <br/>
        함수 컴포넌트 Avg<br/>
        <input type="text" value={number} onChange={numberChange} ref={numRef}/><br/>
        <br/>
        <button onClick={insert}>입력</button> &nbsp;&nbsp;
        <button onClick={init}>초기화</button><br/><br/>
        평균 : {avg}<br/><br/>
        <table>
          <tr><td align="center">숫자 리스트</td></tr>
          <tr><td>
          
          <ul>
          {list.map(li => <li>{li}</li>)}
          </ul>
        </td></tr></table>
      </center>
    </>
  )
}

export default Avg;