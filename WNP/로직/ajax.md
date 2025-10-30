```js
const params = {
	queryId: "join.member.insert_applyMember",
	userName: $("#userName").val(),
	userId: $("#userId").val(),
	userPw: $("#userPw").val(),
	userCompCode: $("#hiddenCompCode").val(),
	userEmail: $("#userEmail").val(),
	deptName: $("#deptName").val(),
	jobName: $("#jobName").val(),
	mPhone: $("#mPhone").val(),
	func: "IQ",
};
$.ajax({
	method: "POST",
	url: "/common_select.do",
	data: params,
	dataType: "json",
	async: false,
	success: function(data, textStatus, jqXHR) {
	},
	error: function(data, textStatus, jqXHR) {
		alert('요청에 실패했습니다. [err]joinMember')
	}
});
```