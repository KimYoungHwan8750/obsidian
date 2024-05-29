## \#define

\#define에는 두가지 사용법이 있다.
* \#define \[identifier\] \[replacement\]
* \#define \[function\] \[function define\]

### \#define \[identifier\] \[replacement\]

식별자 치환

```cpp
#include <iostream>
#define TEST cout
using namespace std;
void main() 
{
	TEST << 1 << endl; // TEST가 cout로 치환된다.
}
```

### \#define \[function\] \[function define\]

함수 매크로

```cpp
#include <iostream>
#define Max(a,b) (a>b?a:b)
using namespace std;
int main(void) {
	int x = 5, y = 10;
	cout << Max(x, y); // 10
	return 0;
}
```

매개 변수에 \#을 사용하는 함수 매크로

```cpp
#include <iostream>
#define str(x) #x
using namespace std;
int main(void) {
	cout << str(Hello World!) << "Hello World!" << endl;
	return 0;
} // Hello World! Hello World!
```

매개 변수 이름을 문자열로 치환해준다.

매개 변수에 \#\#을 사용하는 함수 매크로

```cpp
#include <iostream>
#define concatenate(a,b) a ## b
using namespace std;
int main(){
	concatenate(c,out) << "Hello World!";
	return 0;
} // concatenate(c,out)가 cout로 치환됨

```