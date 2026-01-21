function inputCheck(){
	if(document.regForm.email.value==""){
		alert("이메일을 입력해 주세요.");
		document.regForm.email.focus();
		return;
		}
	var str = document.regForm.email.value;
	var atPos = str.indexOf('@');
	var atLastPos = str.lastIndexOf('@');
	var dotPos = str.indexOf('.');
	var spacePos = str.indexOf(' ');
	var commaPos = str.indexOf(',');
	var eMailSize = str.length;
	if(atPos > 1 && atPos == atLastPos && dotPos > 3 && spacePos == -1 && commaPos == -1 && atPos +1 < dotPos && dotPos +1 < eMailSize){}
	else {
	alert('E-mail 주소 형식이 잘못되었습니다. \n\r 다시 입력해 주세요.');
	document.regForm.email.focus();
	return;	
	}
	
	if(document.regForm.id.value==""){
		alert("아이디를 입력해 주세요.");
		document.regForm.id.focus();
		return;
		}
	if(document.regForm.name.value==""){
		alert("이름을 입력해 주세요.");
		document.regForm.name.focus();
		return;
		}
	if(document.regForm.passwd.value==""){
		alert("비밀번호를 입력해 주세요.");
		document.regForm.passwd.focus();
		return;
		}
	if(document.regForm.passwd_2.value==""){
		alert("비밀번호를 입력해 주세요.");
		document.regForm.passwd_2.focus();
		return;
		}
	if(document.regForm.passwd.value != document.regForm.passwd_2.value){
		alert("비밀번호가 일치하지 않습니다.");
		document.regForm.passwd_2.focus();
		return;
	}
	if(document.regForm.phone1.value==""){
		alert("전화번호를 입력해 주세요.1");
		document.regForm.phone1.focus();
		return;
	}
	if(document.regForm.phone2.value==""){
		alert("전화번호를 입력해 주세요.2");
		document.regForm.phone2.focus();
		return;
	}
	if(document.regForm.phone3.value==""){
		alert("전화번호를 입력해 주세요.3");
		document.regForm.phone3.focus();
		return;
	}
	
		
	document.regForm.submit();
}