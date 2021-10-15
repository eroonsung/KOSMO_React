

function setTrBgcolor( tableClassV , headBgcolor, oddTrBgcolor, evenTrBgcolor, mouceOverBgcolor ){
	try{
		var tableObj = $("."+tableClassV);
		var firstTrObj = tableObj.find("tr:eq(0)");
			//var firstTrObj = tableObj.find("tr:first");
			//var firstTrObj = tableObj.find("tr").first();
		var oddTrObj = firstTrObj.siblings("tr").filter(":even")
		var evenTrObj = firstTrObj.siblings("tr").filter(":odd")

		firstTrObj.attr("bgColor", headBgcolor );
		oddTrObj.attr("bgColor", oddTrBgcolor );
		evenTrObj.attr("bgColor", evenTrBgcolor );
	
		//oddTrObj.find("td,th").css("color", "pink" );
		//evenTrObj.find("td,th").css("color", "green" );
		
		oddTrObj.hover(
			function(){
				$(this).attr("bgColor",mouceOverBgcolor);
			}
			,function(){
				$(this).attr("bgColor",oddTrBgcolor);
			}
		);
		evenTrObj.hover(
			function(){
				$(this).attr("bgColor",mouceOverBgcolor);
			}
			,function(){
				$(this).attr("bgColor",evenTrBgcolor);
			}
		);
	}
	catch(e){
		alert("setTrBgcolor 함수 호출 시 예외발생!"+ e.message );
	}
}

//-----------------------------------------------------------------------
// 1차원 Array 객체에 저장된 데이터 중에 랜덤하게 
// 하나의 데이터를 복사해서 리턴하는 함수
//-----------------------------------------------------------------------
function getRandomData( arr ){
	// Array 객체에 배열변수의 개수
	var cnt = arr.length;
	// 랜덤한 인덱스번호 구하기
	var idx = Math.floor( Math.random()*cnt );
	// 랜덤한 인덱스번호에 해당하는 배열변수의 데이터 리턴하기
	return arr[idx];
}
//-----------------------------------------------------------------------
function getRandomData_with_del( arr ){
	var cnt = arr.length;
	var idx = Math.floor( Math.random()*cnt );
	var randomData = arr[idx];
	arr.splice(idx,1)
	return randomData;
}
//-----------------------------------------------------------------------
// 1차원 Array 객체에 저장된 데이터 중에 랜덤하게 
// 원하는 개수의 데이터를 복사해서 또 다른 Array 객체에 담아 리턴하는 함수
//-----------------------------------------------------------------------
function getRandomDataArr( arr, cnt ){
	if( arr==null || arr.length==0 ){
		alert("배열변수의 개수가 없습니다.");
		return null;
	}
	if( arr.length<cnt ){
		alert("배열변수의 개수보다 랜덤하게 뽑을 개수가 큽니다.");
		return null;
	}
	var randomDataArr = [];
	var arr2 = arr.slice(0);
	for( var i=1 ; i<=cnt ; i++ ){
		randomDataArr.push( getRandomData_with_del( arr2 ) )
	}
	return randomDataArr;
}
//-----------------------------------------------------------------------
// 1차원 Array 객체에 저장된 데이터 중에 랜덤하게 
// min_cnt~max_cnt 사이 개수 하나 골라서 그 개수 만큼 데이터를 복사해서 또 다른 Array 객체에 담아 리턴하는 함수
//-----------------------------------------------------------------------
function getRandomDataArr2( arr, min_cnt, max_cnt ){
	if( arr==null || arr.length==0 ){
		alert("배열변수의 개수가 없습니다.");
		return null;
	}
	if( arr.length<min_cnt ){
		alert("배열변수의 개수보다 랜덤하게 뽑을 개수가 큽니다.");
		return null;
	}
	if( max_cnt<min_cnt ){
		alert("뽑을 개수의 범위가 이상합니다.");
		return null;
	}
	var randomCntArr = [];
	for( var i=min_cnt ; i<=max_cnt ; i++ ){
		randomCntArr.push( i );
	}
	var randomCnt = getRandomData( randomCntArr );
	var arr2 = arr.slice(0);
	return getRandomDataArr( arr2, randomCnt );
}














