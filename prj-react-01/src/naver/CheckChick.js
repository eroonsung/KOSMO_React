import React, {useState} from "react";

function CheckChick(){
  const default_chick =0;

  const [female, setFemale] = useState(default_chick);
  const [male, setMale] = useState(default_chick);
  
  const addF = () => { setFemale(female+1) }; 
  const minusF = () => {
    if(female<=0){
      alert("병아리 수는 0보다 작을 수 없습니다.");
      return;
    }
    setFemale(female-1) 
  };
  const addM = () => { setMale(male+1) }; 
  const minusM = () => { 
    if(male<=0){
      alert("병아리 수는 0보다 작을 수 없습니다.");
      return;
    }
    setMale(male-1) 
  };


  return(
    <>
    <center>
    함수 컴포넌트1<br/>
      <table cellPadding="5">
        <tr><td colSpan="2">총 개수 : {female + male}</td></tr>
        <tr><td>암병아리</td><td>수병아리</td></tr>
        <tr>
          
          <td>
            <button onClick={addF}>+1</button>
            <button onClick={minusF}>-1</button>
          </td>
          <td>
            <button onClick={addM}>+1</button>
            <button onClick={minusM}>-1</button>
          </td>

        </tr>
        <tr><td>{female} 마리</td><td>{male} 마리</td></tr>
      </table>
      

    </center>
    </>

  )

}

export default CheckChick;