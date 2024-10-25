# Glob Patterns (글로브 패턴)

리눅스 계열 플랫폼에서 자주 사용하는 패턴 매칭 문법이다.

## *

모든 문자열과 매칭한다.

>[!summary] a* (a로 시작하는 모든 파일)
>* a \[o]
>* a.exe \[o]
>* abc.txt \[o]
>* back.js \[x]
>
>a*.exe는 a로 시작하는 모든 exe 파일이다.

## ?

물음표에 해당하는 칸만 모든 문자열과 매칭한다.

>[!summary] t?p?.txt
>* tape.txt \[o]
>* type.txt \[o]
>* tape.exe \[x]
>* tape1.txt \[x]

## **

0개 이상 모든 하위 디렉토리와 매칭한다.

>[!summary] ./src/\*\*/\*\.\* (src 및 src 하위 폴더에 있는 확장자를 가진 모든 파일)
>* src/abc.text \[o]
>* src/a/b/c/d/e/f.txt \[o]
>* src/abc \[x]

>[!summary] ./src/\*\*/\* (src 및 src 하위 폴더에 있는 모든 파일)
>* src/abc \[o]

## {}

한가지 패턴으로 여러 패턴을 구현 가능하다

>[!summary] a*.{txt,exe}
>* abc.txt \[o]
>* abc.exe \[o]
>* abc.jpg \[x]

## []

문자를 기준으로 매칭.

* \[abc]\[abc].exe : 두글자이며 두 글자 모두 abc중에 하나여야하고 exe로 끝나는 파일
* \[a-f] : abcdef
* \[a-z] : 모든 소문자 알파벳
* \[A-Z] : 모든 대문자 알파벳
* \[0-5] : 0~5
* \[0-9] : 숫자

>[!summary] a\[abc].exe
>* ab.exe \[o]
>* ac.exe \[o]
>* bc.exe \[x]
>* af.exe \[x]
>* ab.txt \[x]

>[!summary] a\[abc]\[!cde]\*.exe (두번째 글자가 abc 중 하나, 세 번째 글자는 cde가 아닌 exe 파일) 
>* aba.exe \[o]
>* aaaerarasraser.exe \[o]
>* aac.exe \[x]

## ()

선택지를 제공해줄 수 있다.

>[!summary] ab?(cd|ef).exe
>* abcd.exe \[o]
>* abef.exe \[o]
>* ab.exe \[o]
>* abc.exe \[x]

>[!summary] ab?(aa|bb)?.txt
>* abaac.txt \[o]
>* abbba.txt \[o]
>* abf.txt \[o]
>* abaaff.txt \[x]
>* abaa.txt \[x]