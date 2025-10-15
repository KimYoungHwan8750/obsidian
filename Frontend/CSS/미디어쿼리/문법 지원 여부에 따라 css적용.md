```CSS
/* flex를 지원한다면 */
@supports (display: flex){
	... /* 적용할 CSS */
}

@supports not (display: flex){
	... /* 적용할 CSS */
}

@supports (display: flex) and (display : grid){
	... /* 적용할 CSS */
}

@supports (display: flex) or (display : grid){
	... /* 적용할 CSS */
}

```