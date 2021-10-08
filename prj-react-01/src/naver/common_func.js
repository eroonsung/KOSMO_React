export function isEmpty(str) {
  let result = false;

  let dataType = typeof(str);
  /*
  if(dataType!="string"){
    alert("isEmpty 함수의 매개변수로 문자를 넣어주세요.")
    return result;
  }
  */
  if(dataType=="string" && (str==""&&str.split(" ").join("")=="")){
    result=true;
  }

  return result;
}

export function isNotEmpty(str) {
  return !isEmpty(str);
}

export function is_from_arr(targetArr, keywordStr) {
  let result = false;

  if(targetArr!=null){
    for(let i=0; i<targetArr.length;i++){
      if(targetArr[i]==keywordStr){
        result = true;
        break;
      }
    }
  }

  return result;
}

//중복 제거
export function del_dupl(targetArr) {
  if(targetArr!=null){
    for (let i = 0; i < targetArr.length-1; i++) {
      for(let j=1; j<targetArr.length; j++){
        if(targetArr[i]==targetArr[j]){
          targetArr.splice(j,1);
          j--;
        }
      }
    }
  }
  return targetArr;
}