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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// URL 주소로 접속하면 호출되는 메소드를 소유한 [컨트롤러 클래스] 선언
	// @Controller 를 붙임으로써 [컨트롤러 클래스]임을 지정한다.
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping( value="/naver")
public class LoginController {

	

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
	// 가상주소 /loginForm.do 로 접근하면 호출되는 메소드 선언
	//***************************************
	@RequestMapping( value="/loginForm.do")
	public ModelAndView loginForm(  ){
		//---------------------
		// [ModelAndView 객체] 생성하기
		// [ModelAndView 객체]에 [호출 JSP 페이지명]을 저장하기
		// [ModelAndView 객체] 리턴하기
		//---------------------
		ModelAndView mav = new ModelAndView();
		mav.setViewName( path+"loginForm.jsp" );  //    "/WEB-INF/views/naver/loginForm.jsp"
		return mav;
	}

	/*
	// 위 메소드는 아래 처럼도 가능하다
	//***************************************
	// 가상주소 /loginForm.do 로 접근하면 호출되는 메소드 선언
	//***************************************
	@RequestMapping( value="/loginForm.do")
	public String loginForm(  ){
		return path+"loginForm.jsp";
	}
	*/
	
	
	
	
	
	
	


	
	

	//***************************************
	// 가상주소 /loginProc.do 로 접근하면 호출되는 메소드 선언
	// 메소드 앞에 
	// @RequestMapping(~,~,produces="application/json;charset=UTF-8") 하고
	// @ResponseBody  가 붙으면 리턴하는 데이터가 클라이언트에게 전송된다.
	// ModelAndView 객체를 리턴하면 JSP 를 호출하고 그 JSP 페이지의 실행결과인 HTML 문서가 응답메시지에 저장되어 전송되지만
	// @RequestMapping(~) 와 @ResponseBody 가 붙으면 리턴하는 데이터가 JSON 형태로  응답메시지에 저장되어 전송된다.
	//***************************************
	@RequestMapping( 
			value="/loginProc.do"
			,method=RequestMethod.POST
			,produces="application/json;charset=UTF-8"
	)
	@ResponseBody
	public int loginProc( 
			@RequestBody LoginDTO loginDTO
			//--------------------------------------
			,HttpSession session
			//--------------------------------------
			,HttpServletResponse response
	){
		
		String login_id = loginDTO.getLogin_id();
		String pwd = loginDTO.getPwd();
		String is_login = loginDTO.getIs_login();
		System.out.println( "login_id => " + loginDTO.getLogin_id());
		System.out.println( "pwd => " + loginDTO.getPwd());
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
	
	
	
	
	
	
	
	
	
	
	//***************************************
	// 가상주소 /logout.do 로 접근하면 호출되는 메소드 선언
	//***************************************
	@RequestMapping( value="/logout.do")
	public ModelAndView logout( 
		HttpSession 	session
	){
		//------------------------------------------------
		// HttpSession 객체에 "login_id" 라는 키값으로 저장된 데이터 삭제하기
		// 즉 HttpSession 객체에 로그인 성공 후 저장된 아이디값을 지우기
		// 즉 HttpSession 객체에 저장된 즉 로그인 정보를 삭제하기
		//------------------------------------------------
		session.removeAttribute("login_id");
		//------------------------------------------------
		// [ModelAndView 객체] 생성하기
		// [ModelAndView 객체]에 [호출 JSP 페이지명]을 저장하기
		// [ModelAndView 객체] 리턴하기
		//------------------------------------------------
		ModelAndView mav = new ModelAndView();
		mav.setViewName( path+"logout.jsp");
		return mav;
	}

	//***************************************
	// 가상주소 /login_alert.do 로 접근하면 호출되는 메소드 선언
	//***************************************
	@RequestMapping( value="/login_alert.do")
	public ModelAndView login_alert( ){
		//------------------------------------------------
		// [ModelAndView 객체] 생성하기
		// [ModelAndView 객체]에 [호출 JSP 페이지명]을 저장하기
		// [ModelAndView 객체] 리턴하기
		//------------------------------------------------
		ModelAndView mav = new ModelAndView();
		mav.setViewName( path+"login_alert.jsp");
		return mav;
	}
}

/*
 * 
	//***************************************
	// 가상주소 /loginProc.do 로 접근하면 호출되는 메소드 선언
	//***************************************
	@RequestMapping( value="/loginProc2.do")
	public ModelAndView loginProc2( 
			//--------------------------------------
			// "login_id" 라는 파라미터명에 해당하는 파라미터값을 꺼내서 매개변수 login_id 에 저장하고 들어온다.
			//--------------------------------------
			@RequestParam( value="login_id" ) String login_id
			//--------------------------------------
			// "pwd" 라는 파라미터명에 해당하는 파라미터값을 꺼내서 매개변수 pwd 에 저장하고 들어온다.
			//--------------------------------------
			, @RequestParam( value="pwd" ) String pwd
			//--------------------------------------
			// "is_login" 라는 파라미터명에 해당하는 파라미터값을 꺼내서 매개변수 is_login 에 저장하고 들어온다.
			//--------------------------------------
			, @RequestParam( value="is_login", required=false  ) String is_login
			//--------------------------------------
			// HttpSession 객체의 메위주를 저장하는 매개변수 session 선언하기
			//--------------------------------------
			,HttpSession session
			//--------------------------------------
			// [HtppServletResponse 객체]가 들어올 매개변수 선언
			//--------------------------------------
			,HttpServletResponse response
	){
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
		int login_idCnt = loginDAO.getLogin_idCnt(map);

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
				
				// Cookie 객체를 생성하고 쿠키명-쿠키값을 ["login_id"-null]로 하기
				Cookie cookie1 = new Cookie("login_id",null);
				// Cookie 객체에 저장된 쿠키의 수명은 0으로 하기
				cookie1.setMaxAge(0);
				// Cookie 객체를 생성하고 쿠키명-쿠키값을 ["pwd"-null]로 하기
				Cookie cookie2 = new Cookie("pwd",null);
				// Cookie 객체의 수명은 0으로 하기
				cookie2.setMaxAge(0);
				// Cookie 객체가 소유한 쿠키를 응답메시지에 저장하기. 
				// 결국 Cookie 객체가 소유한 쿠키명-쿠키값이 응답메시지에 저장되는 샘이다.
				// 응답메시지에 저장된 쿠키는 클라이언트쪽으로 전송되어 클라이언트쪽에 저장된다.
				response.addCookie(cookie1);
				response.addCookie(cookie2);
				
				Util.addCookie( "login_id" , null , 0 , response );
				Util.addCookie( "pwd" , null , 0 , response );
			}
			//--------------------------------------
			// 매개변수 is_login 에 "yes" 이 저장되어 있으면(=[아이디,암호 자동 입력]의사 있을 경우 )
			//--------------------------------------
			else{
				
				//--------------------------------------------------
				// 클라이언트가 보낸 아이디,암호를 응답메시지에 쿠키명-쿠키값으로 저장하기
				//--------------------------------------------------
				// Cookie 객체를 생성하고 쿠키명-쿠키값을 ["login_id"-"입력아이디"]로 하기
				Cookie cookie1 = new Cookie("login_id",login_id);
				// Cookie 객체에 저장된 쿠키의 수명은 60*60*24으로 하기
				cookie1.setMaxAge(60*60*24);

				// Cookie 객체를 생성하고 쿠키명-쿠키값을 ["pwd"-"입력암호"]로 하기
				Cookie cookie2 = new Cookie("pwd",pwd);
				// Cookie 객체에 저장된 쿠키의 수명은 60*60*24으로 하기
				cookie2.setMaxAge(60*60*24);

				// Cookie 객체가 소유한 쿠키를 응답메시지에 저장하기. 
				response.addCookie(cookie1);
				response.addCookie(cookie2);
				
				Util.addCookie( "login_id" , login_id , 60*60*24 , response );
				Util.addCookie( "pwd" , pwd , 60*60*24 , response );
			}
		}

		//------------------------------------------------
		// [ModelAndView 객체] 생성하기
		// [ModelAndView 객체]에 [호출 JSP 페이지명]을 저장하기
		// [ModelAndView 객체]에 아이디 암호 존재개수 저장하기. 즉 DB 연동 결과물 저장하기
			// ModelAndView 객체에 저장된 DB 연동 결과물은 HttpServletRequest 객체에 setAttribute 메소드로 저장된다.
		// [ModelAndView 객체] 리턴하기
		//------------------------------------------------
		ModelAndView mav = new ModelAndView();
		mav.setViewName("loginProc2.jsp");
		mav.addObject( "idCnt" , login_idCnt );   // DB 연동 결과물 저장
			// 위 addObject 메소드로 저장된 DB 연동 결과물은 HttpServletRequest 객체에 setAttribute 메소드로도 저장된다.
		System.out.println( "LoginController.loginProc 메소드 호출 완료!");
		return mav;
	}
	
	
	//***************************************
	// 가상주소 /loginProc.do 로 접근하면 호출되는 메소드 선언
	//***************************************
	@RequestMapping( value="/loginProc.do")
	public ModelAndView loginProc( 
			// 클라이언트가 보낸 요청 메시지를 관리하는 HttpServletRequest 객체가 매개변수로 들어온다.
			// HttpServletRequest 객체의 메소드 이용하면 파리미터값을 얻을수 있다.
			HttpServletRequest request
	){
		//------------------------------------------------
		// 클이 보낸 요청 메시지 안의 "id" 라는 파라미터명의 파라미터값 꺼내기
		// 클이 보낸 아이디를 꺼내라
		// 클이 보낸 요청 메시지 안의 "pwd" 라는 파라미터명의 파라미터값 꺼내기
		// 클이 보낸 암호를 꺼내라
		//------------------------------------------------
		String login_id = request.getParameter("login_id");
		String pwd = request.getParameter("pwd");
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
		int login_idCnt = loginDAO.getLogin_idCnt(map);
		//---------------------
		// [ModelAndView 객체] 생성하기
		// [ModelAndView 객체]에 [호출 JSP 페이지명]을 저장하기
		// [ModelAndView 객체]에 아이디 암호 존재개수 저장하기. 즉 DB 연동 결과물 저장하기
			// ModelAndView 객체에 저장된 DB 연동 결과물은 HttpServletRequest 객체에 setAttribute 메소드로 저장된다.
		// [ModelAndView 객체] 리턴하기
		//---------------------
		ModelAndView mav = new ModelAndView();
		mav.setViewName("loginProc.jsp");
		mav.addObject( "idCnt" , login_idCnt );   // DB 연동 결과물 저장
			// 위 addObject 메소드로 저장된 DB 연동 결과물은 HttpServletRequest 객체에 setAttribute 메소드로도 저장된다.
		System.out.println( "LoginController.loginProc 메소드 호출 완료!");
		return mav;
	}
 */






