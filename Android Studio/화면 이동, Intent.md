
## Intent

```kotlin
class MainActivity : AppCompatActivity() {  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        enableEdgeToEdge()  
        setContentView(R.layout.activity_main)  
  
  
        val btn : Button = findViewById(R.id.button)  
        btn.setOnClickListener{  
            val intent = Intent(this, MyActivity::class.java)  
            startActivity(intent)  
        }  
    }  
}
```

첫 번째 인자 this, 자바에선 getApplicationContext()이다.

두 번째 인자는 MyActivity.class (자바 클래스 타입). 코틀린에선 ::class.java를 통해 자바 클래스로 참조 가능하다.