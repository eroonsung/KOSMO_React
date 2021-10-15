package com.naver.erp;

import java.util.Map;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
// [DAO 클래스]인 [LoginDAOImpl 클래스] 선언
//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
	// @Repository 를 붙임으로써 [DAO 클래스]임을 지정하게되고,
	// Spring에서 인식해서 필요시 객체화한다.
//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
@Repository
public class LoginDAOImpl implements LoginDAO{
	//+++++++++++++++++++++++++++++++++++++++
	// SqlSessionTemplate 객체를 생성해 속변 sqlSession 에 저장
	// @Autowired 어노테이션을 붙이면 속성변수 자료형에 맞는 SqlSessionTemplate 객체를 생성한 후 
	// 객체의 메위주를 속성변수 저장한다.
	//+++++++++++++++++++++++++++++++++++++++
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//+++++++++++++++++++++++++++++++++++++++
	// 로그인 아이디와 암호 존재의 개수를 리턴하는 메소드 선언
	//+++++++++++++++++++++++++++++++++++++++
	public int getLogin_idCnt( Map<String,String> id_pwd_map  ) {
		//--------------------------------------------------
		// SqlSessionTemplate 객체의 selectOne 메소드 호출로
		// mybatis 프레임워크가 관리하는 select 구문을 실행하여 얻는
		// 1행 m열의 데이터를 리턴받는다.
		// 이 데이터는 mybatis 쪽에서 resultType 속성값에 설정된다.
		// [로그인 아이디,암호 존재 개수]를 얻기
		//--------------------------------------------------
		int login_idCnt = this.sqlSession.selectOne(
			//-----------------------------------------------
			// 실행할 SQL 구문의 위치를 지정하기.
			// 실행할 SQL 구문의 위치 문자열 패턴은 아래와 같다.
			// xml 파일 중에 "mapper태그의namespace명.mapper태그내부의호출할SQL구문소유한태그id값"
			//-----------------------------------------------
			"com.naver.erp.LoginDAO.getLogin_idCnt" 
			//-----------------------------------------------
			// 호출할 SQL구문에서 사용할 데이터 지정하기
			//-----------------------------------------------
			,id_pwd_map
		);
		return login_idCnt;
	}
	
}