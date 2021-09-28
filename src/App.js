import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// Counter : 컴포넌트 명
// ./naver/Counter : .js 파일의 위치
import Counter from './naver/Counter';
//import xxx from './naver/Counter';
//import Test from './naver/Test';
import Counter2 from './naver/Counter2';

function App() {
  return (
    <div>
      {/* <Route path ="/naver/test" component={Test}/> */}
      {/* ------------------------------------------- */}
      {/* URL 주소가 ~:3000/naver/counter/일 경우 Counter 컴포넌트 호출해라*/}
      {/* /naver/counter : 포트번호 뒷부분(내부 URL 주소) */}
      {/* Counter : 수입한 컴포넌트 명 */}
      {/* ------------------------------------------- */}
      <Route path ="/naver/counter" component={Counter}/>
      {/* <Route path ="/naver/counter" component={xxx}/> */}

      {/* ------------------------------------------- */}
      {/* URL 주소가 ~:3000/naver/counter2/일 경우 Counter2 컴포넌트 호출해라*/}
      {/* ------------------------------------------- */}
      <Route path ="/naver/counter2" component={Counter2}/>
      
    </div>
  );
}

export default App;
