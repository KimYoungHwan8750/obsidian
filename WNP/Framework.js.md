# Framework.js API 문서

## 유틸리티 함수

### IsJsonString()
```javascript
// JSON 문자열 유효성 검사
// @param {string} str - 검사할 문자열
// @returns {boolean} JSON 형식이면 true, 아니면 false
function IsJsonString(str)
```

---
## jQuery Plugin - Date/Time Picker

### $.fn.changeDateRange()
```javascript
// 날짜 범위를 변경합니다 (daterangepicker 초기화 필수)
// @param {string} p_StartDate - 시작 날짜 (필수)
// @param {string} p_EndDate - 종료 날짜 (선택, 없으면 시작일자 기준으로 기존 차이만큼 계산)
$.fn.changeDateRange(p_StartDate, p_EndDate)
```

### $.fn.initDateSingle()
```javascript
// 단일 날짜 선택기 초기화 (년/월 단위)
// @param {string} p_Type - 타입 ("year", "month")
// @param {string} p_Date - 초기 날짜
$.fn.initDateSingle(p_Type, p_Date)
```

### $.fn.initDateRangeMonthly()
```javascript
// n달 전 1일부터 오늘까지 범위로 설정
// @param {number} p_Diff - 몇 달 전부터 표시할지 (기본값: 0, 이번달)
$.fn.initDateRangeMonthly(p_Diff)
```

### $.fn.initDateRange()
```javascript
// 범위 달력 초기화 (월/주 단위)
// @param {string} p_Mode - "month"(기본값) 또는 "week"
// @param {number} p_StartDiff - 시작 월/주 차이 (기본값: 0)
// @param {number} p_EndDiff - 종료 월/주 차이 (기본값: 0)
$.fn.initDateRange(p_Mode, p_StartDiff, p_EndDiff)
```

### $.fn.initDateOnly()
```javascript
// 날짜만 선택하는 범위 picker 초기화 (시간 없음)
// p_EndUnit, p_EndDiff 가 없는 경우 Single Datepicker로 세팅
// @param {string} p_StartUnit - "days", "months", "years" 중 하나
// @param {number} p_StartDiff - 시작일자 오프셋
// @param {string} p_EndUnit - "days", "months", "years" 중 하나 (선택)
// @param {number} p_EndDiff - 종료일자 오프셋 (선택, 없으면 Single Datepicker)
$.fn.initDateOnly(p_StartUnit, p_StartDiff, p_EndUnit, p_EndDiff)
```

### $.fn.initDateTime()
```javascript
// 날짜와 시간 선택하는 범위 picker 초기화
// p_EndUnit, p_EndDiff 가 없는 경우 Single Datepicker로 세팅
// @param {string} p_StartUnit - "days", "months", "years" 중 하나
// @param {number} p_StartDiff - 시작일자 오프셋
// @param {string} p_EndUnit - "days", "months", "years" 중 하나 (선택)
// @param {number} p_EndDiff - 종료일자 오프셋 (선택, 없으면 Single Datepicker)
$.fn.initDateTime(p_StartUnit, p_StartDiff, p_EndUnit, p_EndDiff)
```

### $.fn.initTimeOnly()
```javascript
// 시간만 선택하는 picker 초기화
// @param {string} p_StartTime - 시작 시간 (HH:mm 형식, 선택)
// @param {string} p_EndTime - 종료 시간 (HH:mm 형식, 선택)
$.fn.initTimeOnly(p_StartTime, p_EndTime)
```

---

## jQuery Plugin - Tree (jsTree)

### $.fn.initCheckTree()
```javascript
// 체크 가능한 트리 초기화
// @param {string} _rowValue - 선택된 값을 저장할 요소 ID
// @param {function} _callBack - 선택 변경 시 호출될 콜백 함수
// @param {boolean} _useDragDrop - 드래그 앤 드롭 사용 여부 (기본값: false)
// @param {boolean} _multiSelect - 다중 선택 사용 여부 (기본값: false)
// @param {boolean} _useIcon - 아이콘 사용 여부 (기본값: false)
// @param {boolean} _useSearch - 검색 기능 사용 여부 (기본값: false)
// @param {boolean} _openState - 초기 열림 상태 (기본값: true)
// @param {function} _onRefreshFunc - 새로고침 시 호출될 함수
$.fn.initCheckTree(_rowValue, _callBack, _useDragDrop, _multiSelect, _useIcon, _useSearch, _openState, _onRefreshFunc)
```

---

## jQuery Plugin - Grid 데이터 관리

### $.fn.gridDataAll()
```javascript
// 그리드의 전체 데이터를 폼에 추가
// @param {object} _gridOptions - ag-Grid 옵션 객체
// @returns {number} 데이터 개수
$.fn.gridDataAll(_gridOptions)
```

### $.fn.gridDataSelected()
```javascript
// 그리드의 선택된 행 데이터를 폼에 추가
// @param {object} _gridOptions - ag-Grid 옵션 객체
// @returns {number} 선택된 데이터 개수
$.fn.gridDataSelected(_gridOptions)
```

### $.fn.gridStateChanged()
```javascript
// 그리드에서 추가/수정/삭제된 행만 폼에 추가 (state_col 기준)
// @param {object} _gridOptions - ag-Grid 옵션 객체
// @returns {number} 변경된 데이터 개수
$.fn.gridStateChanged(_gridOptions)
```

### $.fn.gridAutoComplete()
```javascript
// 그리드 셀에 자동완성 기능 추가
// @param {object} _gridHelper - 그리드 헬퍼 객체
// @param {string} _queryId - 쿼리 ID (공통코드는 #ParentCodeId 형식)
// @param {string} _textColId - 텍스트를 표시할 컬럼명
// @param {string} _valueColId - 코드를 저장할 컬럼명
// @param {boolean} _required - 필수 입력 여부
$.fn.gridAutoComplete(_gridHelper, _queryId, _textColId, _valueColId, _required)
```

### $.fn.setExcel()
```javascript
// 폼을 엑셀 다운로드용으로 설정
// @param {object} gridHelperObj - 그리드 헬퍼 객체
$.fn.setExcel(gridHelperObj)
```

---

## jQuery Plugin - Form 관리

### $.fn.setAction()
```javascript
// 폼의 action 속성 설정
// @param {string} p_action - action URL
$.fn.setAction(p_action)
```

### $.fn.removeAction()
```javascript
// 폼의 action 속성 제거
$.fn.removeAction()
```

### $.fn.getAction()
```javascript
// 폼의 action 속성 반환
// @returns {string} action URL
$.fn.getAction()
```

### $.fn.setMehtod()
```javascript
// 폼의 method 속성 설정
// @param {string} p_method - HTTP 메서드 ("GET", "POST" 등)
$.fn.setMehtod(p_method)
```

### $.fn.addParam()
```javascript
// 폼 데이터에 키-값 추가
// @param {string} keyStr - 키
// @param {any} valueStr - 값
$.fn.addParam(keyStr, valueStr)
```

### $.fn.getParam()
```javascript
// 폼 데이터에서 값 가져오기
// @param {string} keyStr - 키
// @param {any} p_defaultValue - 기본값 (선택)
// @returns {any} 저장된 값 또는 기본값
$.fn.getParam(keyStr, p_defaultValue)
```

### $.fn.addInput()
```javascript
// 폼에 hidden input 추가 또는 업데이트
// @param {string} keyStr - input name
// @param {any} valueStr - input value
$.fn.addInput(keyStr, valueStr)
```

### $.fn.request()
```javascript
// Ajax 요청 실행 또는 엑셀 다운로드
// 폼에 data-form-excel 속성이 있으면 submit으로 처리
// IQ로 시작하는 func는 조회, IS/MD/DL은 저장/수정/삭제 처리
// 그리드 데이터 검증 및 자동 포함
//
// 주요 파라미터 (addParam으로 설정):
// - func: "IQ"(조회), "IS"(등록), "MD"(수정), "DL"(삭제)
// - grid: 그리드 ID와 옵션 (예: "gridId.all", "gridId.check", "gridId.state_col")
//   * .all: 전체 데이터
//   * .check: 선택된 데이터
//   * .state_col: 변경된 데이터 (기본값)
// - afterAction: Ajax 완료 후 실행할 함수
// - reqAction: 필수값 미입력 시 기본 동작 여부 (boolean)
// - reqFunc: 필수값 미입력 시 커스텀 콜백 함수
// - ajaxType: Ajax 타입
// - result: 결과를 표시할 요소
// - dataType: 응답 데이터 타입
$.fn.request()
```

### $.fn.serializeArrayCustom()
```javascript
// 폼 내 모든 입력 요소를 직렬화하여 data에 저장
// input(text, hidden, radio, checkbox), textarea, select 처리
// jQueryNumericInputCheck 클래스는 콤마 제거
$.fn.serializeArrayCustom()
```

### $.fn.hrefPost()
```javascript
// POST 방식으로 페이지 이동 (hidden form 생성)
// @param {string} _url - 이동할 URL
$.fn.hrefPost(_url)
```

### $.fn.autoSearch()
```javascript
// 입력 요소 변경 시 자동으로 검색 함수 실행
// @param {function} funcSearch - 검색 함수
$.fn.autoSearch(funcSearch)
```

### $.fn.formSet()
```javascript
// 서버에서 받은 데이터로 폼 요소에 값 설정
// @param {object} data - 키-값 객체
$.fn.formSet(data)
```

### $.fn.formClear()
```javascript
// 폼 내 모든 입력 요소 초기화
$.fn.formClear()
```

### $.fn.checkEmptyValue()
```javascript
// 필수 입력 필드 검증 (.form-danger, .has-danger 클래스 요소)
// @returns {boolean} 빈 값이 있으면 true, 없으면 false
$.fn.checkEmptyValue()
```

---

## jQuery Plugin - 캘린더

### $.fn.setFullCalendar()
```javascript
// FullCalendar 초기화 및 설정
// @param {string} p_Selector - 캘린더를 표시할 셀렉터
// @param {string} p_QueryId - 이벤트 조회 쿼리 ID
// @param {string} p_DefaultDate - 초기 날짜
// @param {boolean} p_Editable - 이벤트 수정 가능 여부
// @param {function} p_CallbackFunction - 이벤트 로드 완료 콜백
// @param {function} p_UpdateFunction - 이벤트 드롭/리사이즈 콜백
// @param {boolean} p_ShowTime - 시간 표시 여부
// @param {function} p_ClickFunction - 날짜 클릭 콜백
// @param {function} p_EventClickFunction - 이벤트 클릭 콜백
// @param {function} p_ResizeFunction - 이벤트 리사이즈 콜백
$.fn.setFullCalendar(p_Selector, p_QueryId, p_DefaultDate, p_Editable, p_CallbackFunction, p_UpdateFunction, p_ShowTime, p_ClickFunction, p_EventClickFunction, p_ResizeFunction)
```

---

## jQuery Plugin - 버튼 권한

### $.fn.setButtonAuth()
```javascript
// 사용자 권한에 따라 버튼 동적 생성
// @param {string} p_MenuId - 메뉴 ID / 팝업 ID
// @param {string} p_FormGubn - 폼 구분 ("NORMAL", "POPUP1", "POPUP2", "MODAL")
// @param {string} p_FormCond - 구분값
$.fn.setButtonAuth(p_MenuId, p_FormGubn, p_FormCond)
```

---

## jQuery Plugin - Input Masking

### $.fn.inputMasking()
```javascript
// 입력 필드에 마스킹 적용
// @param {string} p_Type - 마스킹 타입
//   * "number": 숫자
//   * "phone": 전화번호
//   * "saupja": 사업자등록번호
//   * "time": 시간 (HH:mm)
//   * "time2": 시간 (HH:mm:ss)
//   * "date": 날짜 (YYYY-MM-DD)
//   * "date2": 날짜 (YYYY.MM.DD)
//   * "datetime": 날짜시간
//   * "zip": 우편번호
// @param {object} p_Option - 옵션 객체
//   * maxLength: 최대 길이 (기본값: 10)
//   * decimal: 소수점 자리수 (기본값: 0)
//   * signed: 음수 허용 여부 (기본값: false)
//   * min: 최소값 (선택)
//   * max: 최대값 (선택)
$.fn.inputMasking(p_Type, p_Option)
```

---

## jQuery Plugin - UI 상태 제어

### $.fn.changeReadonly()
```javascript
// 요소의 readonly 속성 변경
// @param {boolean} p_Readonly - true: 읽기전용, false: 수정가능
// @param {object} p_Option - 옵션 객체
//   * keep_icon: readonly 시 아이콘 유지 여부 (기본값: false)
//   * readonly_icon: readonly 시 변경할 아이콘 클래스 (예: "fas fa-eye")
$.fn.changeReadonly(p_Readonly, p_Option)
```

### $.fn.changeDisabled()
```javascript
// 요소의 disabled 속성 변경
// @param {boolean} p_Disabled - true: 비활성화, false: 활성화
// @param {object} p_Option - 옵션 객체
//   * keep_icon: disabled 시 아이콘 유지 여부 (기본값: true)
//   * disabled_icon: disabled 시 변경할 아이콘 클래스 (예: "fas fa-eye")
$.fn.changeDisabled(p_Disabled, p_Option)
```

### $.fn.changeLabel()
```javascript
// 입력 요소의 라벨 텍스트 변경
// @param {string} p_Caption - 새 라벨 텍스트
$.fn.changeLabel(p_Caption)
```

### $.fn.changeColor()
```javascript
// 입력 요소의 색상 변경
// 상단 검색조건 디자인: success, danger, warning 사용 가능
// 폼 입력 디자인(신규): success, danger, info 사용 가능
// @param {string} p_Color - 색상 ("success", "danger", "warning", "info")
$.fn.changeColor(p_Color)
```

### $.fn.changeIcon()
```javascript
// 입력 요소의 아이콘 변경 (신규 디자인만)
// @param {string} p_Icon - 아이콘 클래스 (예: "fas fa-user")
$.fn.changeIcon(p_Icon)
```

---

## 전역 이벤트 핸들러

### jQueryNumericInputCheck 클래스
```javascript
// 자동으로 숫자만 입력 가능하도록 처리
// 사용법: <input type="text" class="jQueryNumericInputCheck" />
//
// 동작:
// - keydown: 숫자/특수키 외 입력 차단
// - keyup/change: 숫자 아닌 문자 제거
// - focus: 포커스 시 검증
// - focusout: 콤마 자동 추가
```

### data-checkbox 속성
```javascript
// 체크박스 전체 선택 기능
// 사용법:
// <input type="checkbox" data-checkbox="group_checkall" name="group" /> 전체
// <input type="checkbox" data-checkbox="group_item" name="group" /> 항목1
// <input type="checkbox" data-checkbox="group_item" name="group" /> 항목2
```

### basicAutoComplete 클래스
```javascript
// 자동완성 기능
// 사용법:
// <input type="text" class="basicAutoComplete" 
//        data-query-id="autocomplete.select_user" 
//        data-code="userId" />
//
// 속성:
// - data-query-id: 쿼리 ID (공통코드는 #ParentCodeId 형식)
// - data-code: 선택 시 값을 저장할 input ID
```

---

## 사용 예시

```javascript
// ============================================
// Date/Time Picker 사용 예시
// ============================================

// 날짜 범위 초기화 (오늘 기준)
$("#dateInput").initDateOnly("days", 0);

// 날짜 범위 초기화 (일주일 전 ~ 오늘)
$("#dateInput").initDateOnly("days", -7, "days", 0);

// 월 단위 범위 (이번 달 1일 ~ 오늘)
$("#monthInput").initDateRangeMonthly(0);

// 날짜+시간 범위 (어제 ~ 내일)
$("#datetimeInput").initDateTime("days", -1, "days", 1);

// 시간만 선택 (09:00 ~ 18:00)
$("#timeInput").initTimeOnly("09:00", "18:00");

// 날짜 범위 변경
$("#dateInput").changeDateRange("2024-01-01", "2024-12-31");


// ============================================
// Grid 데이터 관리 예시
// ============================================

// 그리드 전체 데이터를 폼에 추가
var count = $("#myForm").gridDataAll(gridOptions);

// 그리드 선택된 행만 폼에 추가
var count = $("#myForm").gridDataSelected(gridOptions);

// 그리드 변경된 행만 폼에 추가
var count = $("#myForm").gridStateChanged(gridOptions);

// 그리드 셀에 자동완성 추가
$("#myGrid").gridAutoComplete(gridHelper, "#DEPT_CD", "deptName", "deptCode", true);


// ============================================
// Form 관리 예시
// ============================================

// 폼 액션 설정
$("#myForm").setAction("/api/save");

// 파라미터 추가
$("#myForm").addParam("userId", "user001");
$("#myForm").addParam("func", "IS");
$("#myForm").addParam("grid", "myGrid.state_col");

// Ajax 요청 실행
$("#myForm").request();

// 필수값 검증 후 요청
if (!$("#myForm").checkEmptyValue()) {
    $("#myForm").request();
}

// POST 방식 페이지 이동
$("#myForm").hrefPost("/detail.do");

// 폼 데이터 설정
$("#myForm").formSet({
    userName: "홍길동",
    userId: "user001",
    email: "test@example.com"
});

// 폼 초기화
$("#myForm").formClear();


// ============================================
// Input Masking 예시
// ============================================

// 전화번호 마스킹
$("#phoneInput").inputMasking("phone");

// 숫자, 소수점 2자리
$("#priceInput").inputMasking("number", {
    maxLength: 10,
    decimal: 2,
    min: 0,
    max: 999999.99
});

// 날짜 마스킹
$("#dateInput").inputMasking("date");

// 사업자등록번호 마스킹
$("#bizNoInput").inputMasking("saupja");


// ============================================
// UI 상태 제어 예시
// ============================================

// readonly 상태 변경
$("#input1").changeReadonly(true);
$("#input2").changeReadonly(false, {
    keep_icon: true,
    readonly_icon: "fas fa-lock"
});

// disabled 상태 변경
$("#input3").changeDisabled(true);

// 라벨 변경
$("#input4").changeLabel("새로운 라벨");

// 색상 변경
$("#input5").changeColor("success");
$("#input6").changeColor("danger");

// 아이콘 변경
$("#input7").changeIcon("fas fa-user");


// ============================================
// 버튼 권한 예시
// ============================================

// 메뉴 ID와 폼 구분에 따라 버튼 동적 생성
$("#buttonArea").setButtonAuth("MENU001", "NORMAL", "A");


// ============================================
// Tree 예시
// ============================================

// 단일 선택 트리
$("#tree1").initCheckTree("selectedRow", function(e, data) {
    console.log("선택됨:", data);
}, false, false, true, false);

// 다중 선택, 검색 가능 트리
$("#tree2").initCheckTree("selectedRows", function(e, data) {
    console.log("변경됨:", data);
}, false, true, false, true, true);


// ============================================
// FullCalendar 예시
// ============================================

$("#calendar").setFullCalendar(
    "#calendarDiv",
    "calendar.select_events",
    "2024-01-01",
    true,
    function(events) { console.log("로드됨:", events); },
    function(event) { console.log("업데이트됨:", event); },
    true,
    function(date) { console.log("날짜 클릭:", date); },
    function(event) { console.log("이벤트 클릭:", event); },
    function(event) { console.log("리사이즈됨:", event); }
);
```