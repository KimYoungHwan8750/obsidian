#### PathVariable
```java
@Controller
public class UserController {
    @RequestMapping("/userInfo/{userName}")
    public String showUserInfo(@PathVariable String userName, Model model) {
        // 여기서 userName 매개변수에는 "/userInfo/{userName}" 형태의 URL에서
        // "{userName}" 부분에 해당하는 값이 들어갑니다.
        
        model.addAttribute("name", userName);
        
        return "user_info";
    }
}
```