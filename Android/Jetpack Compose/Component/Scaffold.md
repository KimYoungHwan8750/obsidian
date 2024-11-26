# Scaffold
상단 앱바, 하단 네비게이션바를 쉽게 구현할 수 있게 도와준다.

```kotlin
Scaffold(  
    topBar = {  
        TopAppBar(  
            title = {  
                Text("Top app bar")  
            }  
        )  
    },  
) { innerPadding ->  
    Column(  
        modifier = Modifier  
            .padding(innerPadding),  
        verticalArrangement = Arrangement.spacedBy(16.dp),  
    ) {  
        Text(  
            modifier = Modifier.padding(8.dp),  
            text = "콘텐츠"  
        )  
    }  
}
```