

<span style="color:red">JSON.stringify(객체)=></span>
@GetMapping
public String example(@RequestBody String Example){
SOUT(Example)
}

이라고 입력하면 
{
"데이터1":"값1",
"데이터2":"값2",
"데이터3":"값3",
}
이라는 문자열을 반환 받는다.

이걸 객체로 활용하고 싶으면

JSONObject를 활용하면 되는데 예제는 다음과 같다.

@GetMapping
public String example(@RequestBody String Example){
JSONObject <span style="color:green">this_is_example</span> = new JSONObject(<span style="color:green">Example</span>);
String <span style="color:green">test</span>= this_is_example.getString("<span style="color:green">키값</span>")
}

# 탐구

파라미터로 String이 아니라 다른 것들도 써봤는데 잘 모르겠다.
Object Example로 파라미터를 받고
SOUT를 이용해 콘솔을 봤는데 String으로 받았을 때랑 같은 값이 출력되나
스트링으로 받아서 제이슨으로 파싱하면 데이터를 사용할 수 있는데에 반해
Object로는 아직 어떻게 값을 사용할 수 있는지 모르겠다.



# 주의사항

[[매핑]]
