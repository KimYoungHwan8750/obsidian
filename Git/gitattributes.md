매우 특정한 상황에 사용된다.

.gitattributes파일에
txt파일이 가끔 바이너리 파일로 지정돼서 충돌이 일어났을 때 충돌 내용을 안 보여주는 경우가 있는데, 이때 `*.txt text`를 gitattributes에 명시적으로 적어주면 충돌이 일어났을 때 해당 파일을 제대로 텍스트로 인식해서 충돌난 지점을 보여준다.

echo "*.txt text" > .gitattributes