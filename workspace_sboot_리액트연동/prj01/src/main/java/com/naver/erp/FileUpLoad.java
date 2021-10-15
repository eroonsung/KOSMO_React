package com.naver.erp;

import java.io.File;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;


//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// 파일업 로드 관련 메소드를 제공하는 FileUpLoad 클래스 선언
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
public class FileUpLoad {
	//----------------------------------
	// 업로드되는 파일을 관리하는 MultipartFile 객체의 메위주 저장할 속성변수 선언
	// 업로드되는 파일의 새로운 이름을 저장할 속성변수 선언.
	//----------------------------------
	private MultipartFile multi;
	private String newFileName;
	//----------------------------------
	// 생성자(Constructor) 선언.
	// <참고>생성자는 객체 생성 시 단 한번 호출된다. 이때 외부에서 데이터 주입된다.
	//----------------------------------
	public FileUpLoad(MultipartFile multi) {
		// 매개변수로 들어온 MultipartFile 객체를 속성변수 multi 에 저장하기
		this.multi = multi;
		// 만약 업로드된 파일이 존재하면
		if( multi!=null && multi.isEmpty()==false ) {
			// 업로드한 파일의 원래 파일명 얻기. 파일명에는 확장자가 포함한다.
			String oriFileName = multi.getOriginalFilename();
			// 업로드한 파일의  파일확장자 얻기
			String file_extension = oriFileName.substring(   oriFileName.lastIndexOf(".")+1      );
			// 고유한 새 파일명 얻기. 파일명에는 파일확장자 포함한다.
			newFileName = UUID.randomUUID() + "." + file_extension;
		}
	}
	//----------------------------------
	// 속성변수 newFileName 안의 데이터를 리턴하는 메소드 선언.
	// 새로운 파일명을 리턴하는 메소드 선언.
	//----------------------------------
	public String getNewFileName() {
		return newFileName;
	}
	//----------------------------------
	// 속성변수 newFileName 안의 데이터를 리턴하는 메소드 선언.
	// 개배변수로 boolean 값이 들어온다.
	// 새로운 파일명을 리턴하는 메소드 선언.
	//----------------------------------
	public String getNewFileName(boolean flag) {
		// 만약 매개변수로 들어온 데이터 true 면 속성변수 newFileName 안의 데이터를 리턴
		// 아니면 null 리턴하기
		return flag?newFileName:null;
	}
	
	//----------------------------------
	// 업로드된 파일을 원하는 폴더에 새로운 이름으로 실제 저장하는 메소드 선언
	//----------------------------------
	public void uploadFile( String upLoadDir) throws Exception {
		// 매개변수로 들어온 저장경로 맨 뒤에 \ 가 없으면 넣어주기
		if( upLoadDir.endsWith("\\")==false ) {
			upLoadDir = upLoadDir + "\\";
		}
		
		// 만약 업로드된 파일이 있고 newFileName 속성변수 안에 데이터가 있으면
		if( multi!=null && multi.isEmpty()==false && newFileName!=null && newFileName.length()>0 ){
			// 새 파일을 생성하기. File 객체를 생성하면 새 파일을 생성할 수 있다.
			File file = new File( upLoadDir + newFileName );
			// 업로드한 파일을 새 파일에 전송하여 덮어쓰기
			multi.transferTo(file);
		}
	}
	//----------------------------------
	// 파일을 삭제하는 메소드 선언
	//----------------------------------
	public void delete( String filePath )  {
		// 삭제할 파일을 관리하는 File 객체 생성하기
		File file = new File( filePath );
		// File 객체의 delete 메소드 호출로 파일 삭제하기
		file.delete();
	}
	//----------------------------------
	// 파일을 삭제하는 메소드 선언
	//----------------------------------
	public void delete( String filePath, boolean flag )  {
			// 만약에 2번째 매개변수로 들어온 데이터가 true 
			if( flag==true ){
				// 동료 메소드 중에 delete 메소드해서 파일 삭제하기
				delete( filePath );
			}
	}
}

/*
	FileUpLoad  fileUpLoad = new FileUpLoad(multi);
	
	board.setPic( fileUpLoad.getNewFileName() );
	
	DB 연동 코드
	
	fileUpLoad.uploadFile();

 */













