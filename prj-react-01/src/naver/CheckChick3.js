import React, {Component} from "react";

class CheckChick3 extends Component{
  default_chick =0;
  state={
    female: this.default_chick
    , male: this.default_chick
  }

  /*
  set = (gender, num)=>{
    if(gender=="f"){
      this.setState(
        {female: this.state.female+num}
      )
      if(num<0){
        if(this.state.female<=0){
          alert("병아리 수는 0보다 작을 수 없습니다.");
          this.setState({female:this.default_chick})
        }
      }
    }else if(gender=="m"){
      this.setState(
        {male: this.state.male+num}
      )
      if(num<0){
        if(this.state.male<=0){
          alert("병아리 수는 0보다 작을 수 없습니다.");
          this.setState({male:this.default_chick})
        }
      }
    }
  }
  */
  set=(gender,num)=>{
    if(num<0){
      if(gender=="f" && this.state.female==0){
        alert("병아리 수는 0보다 작을 수 없습니다.");
        return;
      }else if(gender=="m" && this.state.male==0){
        alert("병아리 수는 0보다 작을 수 없습니다.");
        return;
      }
    }
    
    if(gender == "f"){
      this.setState( {female: this.state.female+num} )
    }else if(gender == "m"){
      this.setState( {male: this.state.male+num})
    }
  }

  render(){
    const {female, male} = this.state;
    return(
      <>
      <center>
        클래스 컴포넌트2<br/>
        <table cellPadding="5">
          <tr><td colSpan="2">총 개수 : {female + male}</td></tr>
          <tr><td>암병아리</td><td>수병아리</td></tr>
          <tr>
            <td>
              <button onClick={()=>{this.set("f",1)}}>+1</button>
              <button onClick={()=>{this.set("f",-1)}}>-1</button>
            </td>
            <td>
              <button onClick={()=>{this.set("m",1)}}>+1</button>
              <button onClick={()=>{this.set("m",-1)}}>-1</button>
            </td>
          </tr>
          <tr><td>{female} 마리</td><td>{male} 마리</td></tr>
        </table>
      </center>
      </>
  
    )
  }
}

export default CheckChick3;