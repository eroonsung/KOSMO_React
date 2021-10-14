import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//CSS파일 수입하기
import './naver/common.css'; 


import CheckChick from './naver/CheckChick';
import CheckChick3 from './naver/CheckChick3';
import CheckChick2 from './naver/CheckChick2';
import CheckChick4 from './naver/CheckChick4';

// Counter : 컴포넌트 명
// ./naver/Counter : .js 파일의 위치
import Counter from './naver/Counter';
//import xxx from './naver/Counter';
//import Test from './naver/Test';
import Counter2 from './naver/Counter2';

import Test01 from './test/Test01';
import Test02 from './test/Test02';
import Test03 from './test/Test03';

import RegData from './naver/RegData';
import RegData2 from './naver/RegData2';
import Search from './naver/Search';
import SearchDouble from './naver/SearchDouble';
import SearchDouble2 from './naver/SearchDouble2';
import Search2 from './naver/Search2';
import Search5 from './naver/Search5';
import CheckLogin from './naver/CheckLogin';
import CheckLogin2 from './naver/CheckLogin2';
import Avg from './naver/Avg';
import LoginForm from './board/LoginForm';
import BoardList from './board/BoardList';

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

      <Route path ="/test/test01" component={Test01}/>
      <Route path ="/test/test02" component={Test02}/>
      <Route path ="/test/test03" component={Test03}/>

      <Route path ="/naver/checkChick" component={CheckChick}/>
      <Route path ="/naver/checkChick2" component={CheckChick2}/>
      <Route path ="/naver/checkChick3" component={CheckChick3}/>
      <Route path ="/naver/checkChick4" component={CheckChick4}/>

      <Route path ="/naver/regData" component={RegData}/>
      <Route path ="/naver/regData2" component={RegData2}/>
      
      <Route path ="/naver/search" component={Search}/>
      <Route path ="/naver/search2" component={Search2}/>
      <Route path ="/naver/searchDouble" component={SearchDouble}/>
      <Route path ="/naver/searchDouble2" component={SearchDouble2}/>
      <Route path ="/naver/search5" component={Search5}/>

      <Route path ="/naver/checkLogin" component={CheckLogin}/>
      <Route path ="/naver/checkLogin2" component={CheckLogin2}/>

      <Route path ="/naver/avg" component={Avg}/>

      <Route path ="/board/loginForm" component={LoginForm}/>
      <Route path ="/board/boardList" component={BoardList}/>
    </div>
  );
}

export default App;
