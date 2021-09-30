import React, {Component} from "react";

class CheckChick2 extends Component{
  default_chick =0;
  state={
    female: this.default_chick
    , male: this.default_chick
  }

  
  addF = ()=>{
    this.setState(
      {female: this.state.female+1}
    )
  }
  minusF = ()=>{
    this.setState(
      {female: this.state.female-1}
    )
    if(this.state.female<=0){
      alert("병아리 수는 0보다 작을 수 없습니다.");
      this.setState({female:this.default_chick})
    }
  }
  addM = ()=>{
    this.setState(
      {male: this.state.male+1}
    )
  }
  minusM = ()=>{
    this.setState(
      {male: this.state.male-1}
    )
    if(this.state.male<=0){
      alert("병아리 수는 0보다 작을 수 없습니다.");
      this.setState({male:this.default_chick})
    }
  }



  render(){
    const {female, male} = this.state;
    return(
      <>
      <center>
        클래스 컴포넌트1<br/>
        <table cellPadding="5">
          <tr><td colSpan="2">총 개수 : {female + male}</td></tr>
          <tr><td>암병아리</td><td>수병아리</td></tr>
          <tr>
            <td>
              <button onClick={this.addF}>+1</button>
              <button onClick={this.minusF}>-1</button>
            </td>
            <td>
              <button onClick={this.addM}>+1</button>
              <button onClick={this.minusM}>-1</button>
            </td>
          </tr>
          <tr><td>{female} 마리</td><td>{male} 마리</td></tr>
        </table>
      </center>
      </>
  
    )
  }
}

export default CheckChick2;