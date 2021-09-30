import React, {useState} from "react";

function CheckChick4(){
  const default_chick =0;

  const [female, setFemale] = useState(default_chick);
  const [male, setMale] = useState(default_chick);
/*
  const set = (gender, num)=>{
    if(gender == "f"){
      setFemale(female+num);
      if(num<0){
        if(female<=0){
          alert("병아리 수는 0보다 작을 수 없습니다.");
          setFemale(default_chick);
          return;
        }
      }
    }
    else if(gender == "m"){
      setMale(male+num);
      if(num<0){
        if(male<=0){
          alert("병아리 수는 0보다 작을 수 없습니다.");
          setMale(default_chick);
          return;
        }
      }
    }
  }
*/
const set=(gender,num)=>{
  if(num<0){
    if(gender=="f" && female==0){
      alert("병아리 수는 0보다 작을 수 없습니다.");
      return;
    }else if(gender=="m" && male==0){
      alert("병아리 수는 0보다 작을 수 없습니다.");
      return;
    }
  }
  
  if(gender == "f"){
    setFemale(female+num);
  }else if(gender == "m"){
    setMale(male+num);
  }
}

  return(
    <>
    <center>
    함수 컴포넌트2<br/>
      <table cellPadding="5">
        <tr><td colSpan="2">총 개수 : {female + male}</td></tr>
        <tr><td>암병아리</td><td>수병아리</td></tr>
        <tr>
          <td>
            <button onClick={() => set("f",1)}>+1</button>
            <button onClick={() => set("f",-1)}>-1</button>
          </td>
          <td>
            <button onClick={() => set("m",1)}>+1</button>
            <button onClick={() => set("m",-1)}>-1</button>
          </td>
        </tr>
        <tr><td>{female} 마리</td><td>{male} 마리</td></tr>
      </table>
      

    </center>
    </>

  )

}

export default CheckChick4;