package com.naver.erp;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// URL 주소로 접속하면 호출되는 메소드를 소유한 [컨트롤러 클래스] 선언
	// @Controller 를 붙임으로써 [컨트롤러 클래스]임을 지정한다.
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping( value="/daum")
public class LoginController2 {

	

	//======================================
	// 속성변수 loginDAO 선언하고, LoginDAO 라는 인터페이스를
	// 구현한 클래스를 객체화하여 저장
	// 즉 속성변수 loginDAO 에는 LoginDAOImple 객체의 메위주가 저장된다.
	//======================================
		// @Autowired 이 붙은 속성변수에는 인터페이스 자료형을 쓰고
		// 이 인터페이스를 구현한 클래스를 객체화하여 저장한다.
		// LoginDAO 라는 인터페이스를 구현한 클래스의 이름을 몰라도 관계없다.
		// 1개 존재하기만 하면된다.
	//======================================
	//     @Autowired
	//     인터페이스명 속성변수;    
	//======================================
		// 인터페이스를 구현한 클래스를 찾아서 객체화한후 객체의 메위주를 속성변수에 저장한다.
		// 객체의 이름은 무엇이든 상관없다. 인터페이스를 구현한 객체이면된다.
		// 즉 속성변수에는 null 저장이 아니다.
		// <주의> 인터페이스를 구현한 객체는 1개 이어야한다.
	@Autowired
	private LoginDAO loginDAO;


	
	private String path = Info.naverPath;   // naver/
	
	
	
	
	

	//***************************************
	// 가상주소 /loginProc.do 로 접근하면 호출되는 메소드 선언
	// 메소드 앞에 
	// @RequestMapping(~,~,produces="application/json;charset=UTF-8") 하고
	// @ResponseBody  가 붙으면 리턴하는 데이터가 라이언트에게 전송된다.
	// ModelAndView 객체를 리턴하면 JSP 를 호출하고 그 JSP 페이지의 실행결과인 HTML 문서가 응답메시지에 저장되어 전송되지만
	// @RequestMapping(~) 와 @ResponseBody 가 붙으면 리턴하는 데이터가 JSON 형태로  응답메시지에 저장되어 전송된다.
	//***************************************
	//@RequestMapping(  value="/loginProc.do" ,method=RequestMethod.POST )
	
	@PostMapping("/loginProc.do")
	
	public int loginProc( 
			//--------------------------------------
			// "login_id" 라는 파라미터명에 해당하는 파라미터값을 꺼내서 매개변수 login_id 에 저장하고 들어온다.
			// "pwd" 라는 파라미터명에 해당하는 파라미터값을 꺼내서 매개변수 pwd 에 저장하고 들어온다.
			// "is_login" 라는 파라미터명에 해당하는 파라미터값을 꺼내서 매개변수 is_login 에 저장하고 들어온다.
			// HttpSession 객체의 메위주를 저장하는 매개변수 session 선언하기
			// [HtppServletResponse 객체]가 들어올 매개변수 선언
			//--------------------------------------
			@RequestBody @RequestParam( value="login_id" , required=false) String login_id
			//--------------------------------------
			, @RequestBody @RequestParam( value="pwd" , required=false) String pwd
			//--------------------------------------
			, @RequestParam( value="is_login", required=false  ) String is_login
			//--------------------------------------
			,HttpSession session
			//--------------------------------------
			,HttpServletResponse response
	){
		System.out.println( "login_id => " + login_id);
		System.out.println( "pwd => " + pwd);
		//------------------------------------------------
		// HashMap 객체 생성하기
		// HashMap 객체에 로그인 아이디 저장하기
		// HashMap 객체에 암호 저장하기
		//------------------------------------------------
		Map<String,String> map = new HashMap<String,String>();
		map.put("login_id", login_id);
		map.put("pwd", pwd);
		//------------------------------------------------
		// LoginDAOImple 객체의  getLogin_idCnt  메소드를 호출하여 
		// 로그인아이디와 암호의 전제 개수 얻기
		//------------------------------------------------
		int login_idCnt = this.loginDAO.getLogin_idCnt(map);
		//------------------------------------------------
		// 만약 login_idCnt 변수안의 데이터가 1이면
		// 즉 만약 입력한 아이디 암호가 DB에 존재하면
		// 즉 만약 로그인이 성공했으면
		//------------------------------------------------
		if( login_idCnt==1 ){
			//-------------------------------
			// HttpSession 객체에 로그인 아이디 저장하기
			// HttpSession 객체에 로그인 아이디를 저장하면 재 접속했을때 다시 꺼낼수 있다.
			// <참고>HttpSession 객체는 접속한 이후에도 제거되지 않고 지정된 기간동안 살아있는 객체이다.
			// <참고>HttpServletRequest,HttpServletResponse 객체는 접속때 생성되고 응답이후 삭제되는 객체이다
			//-------------------------------
			session.setAttribute( "login_id", login_id );
			
			
			//--------------------------------------
			// 매개변수 is_login 에 null 이 저장되어 있으면(=[아이디,암호 자동 입력]의사 없을 경우 )
			//--------------------------------------
			if(is_login==null){
				// 쿠키명 "login_id" 에 쿠키값 null 로 응답메시지에 쿠키 저장하기
				// 응답메시지에 저장된 쿠키 클라이언트쪽에 저장된다. 또는 이미 존재하면 덮어쓴다.
				Util.addCookie( 
						"login_id"    // 쿠키명
						, null        // 쿠키값
						, 0           // 살아있을 시간
						, response    // HttpServletReponse 객체
				);
				// 쿠키명 "pwd" 에 쿠키값 null 로 응답메시지에 쿠키 저장하기
				// 응답메시지에 저장된 쿠키 클라이언트쪽에 저장된다. 또는 이미 존재하면 덮어쓴다.
				Util.addCookie( "pwd" , null , 0 , response );
			}
			//--------------------------------------
			// 매개변수 is_login 에 "yes" 이 저장되어 있으면(=[아이디,암호 자동 입력]의사 있을 경우 )
			//--------------------------------------
			else{
				// 쿠키명 "login_id" 에 쿠키값 매개변수 login_id 로 응답메시지에 쿠키 저장하기
				// 응답메시지에 저장된 쿠키 클라이언트쪽에 저장된다. 또는 이미 존재하면 덮어쓴다.
				Util.addCookie( "login_id" , login_id , 60*60*24 , response );
				// 쿠키명 "pwd" 에 쿠키값 매개변수 pwd 로 응답메시지에 쿠키 저장하기
				// 응답메시지에 저장된 쿠키 클라이언트쪽에 저장된다. 또는 이미 존재하면 덮어쓴다.
				Util.addCookie( "pwd" , pwd , 60*60*24 , response );
			}
			//-------------------------------
			// HttpSession 객체에 메시지 저장하기.
			// HttpSession 객체에 저장된 데이터는 모든 JSP 페이지에서 ${sessionScope.키값명}  으로 꺼내 표현할수 있다.
			//-------------------------------
			session.setAttribute( 
					"msg"
					, "환절기 감기 조심!" 
			);
		}
		//------------------------------------------------
		// 로그인아이디와 암호의 존재 개수 리턴하기
		//------------------------------------------------
		return login_idCnt;
	}
	
	

	@PostMapping("/loginProc2.do")
	
	public int loginProc2( 
			//--------------------------------------
			// "login_id" 라는 파라미터명에 해당하는 파라미터값을 꺼내서 매개변수 login_id 에 저장하고 들어온다.
			// "pwd" 라는 파라미터명에 해당하는 파라미터값을 꺼내서 매개변수 pwd 에 저장하고 들어온다.
			// "is_login" 라는 파라미터명에 해당하는 파라미터값을 꺼내서 매개변수 is_login 에 저장하고 들어온다.
			// HttpSession 객체의 메위주를 저장하는 매개변수 session 선언하기
			// [HtppServletResponse 객체]가 들어올 매개변수 선언
			//--------------------------------------
			@RequestBody LoginDTO loginDTO
			,String login_id
			,String pwd
	){
		System.out.println( "loginDTO.login_id => " + loginDTO.getLogin_id() );
		System.out.println( "loginDTO.pwd => " + loginDTO.getPwd());
		//System.out.println( "loginDTO.xxx => " + loginDTO.getXxx()[2]);
		System.out.println( "login_id => " + login_id);
		System.out.println( "pwd => " + pwd);
		return 1;
	}
	
	
	
	
	
	
}





