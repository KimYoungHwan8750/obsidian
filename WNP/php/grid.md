php 프로젝트에선 그리드가 날코딩되어있다.
```js
$("#result").initGrid({
	callFunc:"loadTableData",
	colNames:["h_lect_code", "강의일자", "강의시간", "상호명", "인원", "배정유무", "주소", "교육내용", "특이사항"],
	colModel:[
		{width:0, visible: false, align:"center"},
		{width:100, visible: true, align:"center",sortable:true},//1
		{width:100, visible: true, align:"center",sortable:true},//2
		{width:160, visible: true, align:"left",sortable:true},//3
		{width:70, visible: true, align:"right",sortable:true, formatter:"number"},//4
		{width:260, visible: true, align:"center",sortable:true, type:"buttonEmpty", formatoptions: "btnDetailAssign"},
		{width:300, visible: true, align:"left",sortable:true},
		{width:150, visible: true, align:"left",sortable:true},
		{width:250, visible: true, align:"left",sortable:true}
	],
	rownumbers: false,
	pager: "table1",
	autoSearch: true,
	excel:false,
	maxRows: "40%",
	rowOrder:["lect_date"],
	filter: ["corp_name","addr","lect_cont","remark","assign_status"],
	rowEvent:[{callEvent:"dblclick", callEventFunc:"result_dblclick"}],
});
```


>[!info] 주의사항
> foramtoptions: 이벤트 리스너로 보여지는데, 파라미터로 넘겨준 문자열에 `click_`이라는 prefix가 붙은 이름을 가진 함수를 호출한다. 내부적으로 js의 eval을 통해 구현되어있다.