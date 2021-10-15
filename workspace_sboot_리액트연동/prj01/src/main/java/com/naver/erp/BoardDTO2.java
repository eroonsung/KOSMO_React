package com.naver.erp;

import java.io.File;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class BoardDTO2 {

	//--------------------------------------------
	private int b_no;
	private String subject;
	private String writer;
	private String reg_date;
	private int readcount;
	private String content;
	
	private String pic;

	private MultipartFile img;

	private String pwd;
	private String email;
	private int group_no;
	private int print_no;
	private int print_level;
	
	private String is_del;
	//--------------------------------------------

	public int getB_no() {
		return b_no;
	}

	public void setB_no(int b_no) {
		this.b_no = b_no;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getReg_date() {
		return reg_date;
	}

	public void setReg_date(String reg_date) {
		this.reg_date = reg_date;
	}

	public int getReadcount() {
		return readcount;
	}

	public void setReadcount(int readcount) {
		this.readcount = readcount;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getPic() {
		return pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

	public MultipartFile getImg() {
		return img;
	}

	public void setImg(MultipartFile img) {
		this.img = img;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getGroup_no() {
		return group_no;
	}

	public void setGroup_no(int group_no) {
		this.group_no = group_no;
	}

	public int getPrint_no() {
		return print_no;
	}

	public void setPrint_no(int print_no) {
		this.print_no = print_no;
	}

	public int getPrint_level() {
		return print_level;
	}

	public void setPrint_level(int print_level) {
		this.print_level = print_level;
	}

	public String getIs_del() {
		return is_del;
	}

	public void setIs_del(String is_del) {
		this.is_del = is_del;
	}
	
	//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
	// 파일업로드 관련 속성변수 메소드 선언
	//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
	//---------------------------------------
	// 이전의 pic 속성변수 안의 데이터를 복사 저장할 속성변수 pic_old 선언
	//---------------------------------------
	private String pic_old;
	//---------------------------------------
	// pic 속성변수에 새로운 파일명 저장하는 메소드 선언
	//---------------------------------------
	public void setNewFileName() {
		// 만약 업로드된 파일이 존재하면
		if( img!=null && img.isEmpty()==false ) {
			// 업로드한 파일의 원래 파일명 얻기. 파일명에는 확장자가 포함한다.
			String oriFileName = img.getOriginalFilename();
			// 업로드한 파일의  파일확장자 얻기
			String file_extension = oriFileName.substring(   oriFileName.lastIndexOf(".")+1      );
			// 고유한 새 파일명 얻기. 파일명에는 파일확장자 포함한다.
			String newFileName = UUID.randomUUID() + "." + file_extension;
			pic_old = pic;
			pic = newFileName;
		}
	}
	//---------------------------------------
	// 파일업로드하는 메소드 선언
	//---------------------------------------
	public void uploadFile( String upLoadDir) throws Exception {
		// upLoadDir 변수 안에 마지막 \ 로 끝나지 않으면 \ 붙이기
		if( upLoadDir.lastIndexOf("\\")<0 ) {
			upLoadDir = upLoadDir + "\\";
		}
		// 만약 업로드된 파일이 있으면
		if( img!=null && img.isEmpty()==false && pic!=null && pic.length()>0  ){
			// 새 파일을 생성하기. File 객체를 생성하면 새 파일을 생성할 수 있다.
			File file = new File( upLoadDir + pic );
			// 업로드한 파일을 새 파일에 전송하여 덮어쓰기
			img.transferTo(file);
			// pic_old 안에 데이터가 있으면, 즉 예전 이미지 파일명이 있으면 예전 파일 삭제하기
			if( pic_old!=null && pic_old.length()>0 ) {
				new File( upLoadDir + pic_old ).delete();
			}
		}
	}
	
	
	
	
	
	
	
	
	

	
}
