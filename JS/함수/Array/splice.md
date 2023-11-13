#### 사용법
splice(삭제를 시작할 인덱스,범위,추가할 내용)
매개변수를 세 개 받는다. 기본적으로 삭제를 먼저 진행하고 내용을 추가한 배열을 반환한다.
```js
//내용 삭제
let spliceStr = [0,1,2,3,4,5];
spliceStr.splice(2,4); // [2,3]
console.log(spliceStr); // [0,1,4,5]

//내용 추가
let spliceStr = [0,1,2,3,4,5];
spliceStr.splice(2,0,'!'); // 2번째 인덱스에 ['!'] 삽입
let spliceStr = [0,1,2,3,4,5];
spliceStr.splice(2,3,'!'); // [2,3] 삭제 후 ['!'] 삽입

```


## 사용 유의점
함수 자체의 리턴값은 잘라낸 배열에 대해서 반환하고 원본 배열은 처리가 끝난 결과값이 들어간다.
자세히 서술하자면 이와 같다.

```js
let testArr = [0,1,2,3,4,5];
testArr.splice(2,3,'!'); // [2,3]
console.log(testArr);    // [0,1,'!',4,5];
```