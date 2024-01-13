```java
File file = new File("C:\\upload\\image.png");
try(FileOutputStream output = new FileOutputStream(file);) {
	// ...
} catch (IOException e){
    // ...
}
```