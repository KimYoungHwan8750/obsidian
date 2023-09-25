#### Redirect
redirect해줄 때 변수를 다룰 수 있다.

```java
@GetMapping
	RedirectAttributes test
public String test(RedirectAttributes test, @RequestParam String url){
	test.addAttributes("testUrl",url);
return "redirect:/{testUrl}"
}
```


