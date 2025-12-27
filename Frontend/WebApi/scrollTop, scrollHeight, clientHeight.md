스크롤 핸들링은 항상 숙제같은 녀석이었다.

몇번을 마주쳤지만 피하고 싶었던 녀석, 그래서 자세한 개념 아묻따하고 그때그때 해결하기 바빳는데, 

결국 확실히 알고 넘어가야겠다는 생각이 들어 그동안 야금야금 쌓아왔던 포스팅을 방출하고자 한다.

---

## JavaScript - scrollTop / scrollHeight / clientHeight 이란 (feat.최대스크롤 값)

긴 게시글이 하나있다고 치고 설명하겠다.

## scrollTop

아래 참고 이미지에 보이는 것처럼, 원글 맨 처음부터 ~ 현재 화면에 보이는 부분까지의 길이가 **scrollTop** 이다.

글의 맨 처음 부터 얼마나 내려왔는지 현재 스크롤 위치 를 알수있다.

> An element's scrollTop value is a measurement of the distance   
> from the element's top to its topmost visible content. 

## scrollHeight

원글이 있다. 너무 길어서 화면 바깥으로 삐져나갔다.

화면 바깥으로 삐져나간 부분까지 포함해서 전체 글의 길이를 **scrollHeight** 라고 비유해볼 수 있겠다.

![](https://blog.kakaocdn.net/dna/BT8K3/btrGhVK3Ogw/AAAAAAAAAAAAAAAAAAAAACEH_YhHNLlAN0Oj68fBBi9N5shi74C3JGDqrs_Hlzc4/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1764514799&allow_ip=&allow_referer=&signature=gzO0LyW13gukOlSevRGdUjeWDG8%3D)

scrollTop 과 scrollHeight

## clientHeight

현재 화면에서 보이는 height 만 말한다. (스크롤 사이즈, 보더 사이즈는 포함 X)

![](https://blog.kakaocdn.net/dna/K39qV/btrGg2jD53D/AAAAAAAAAAAAAAAAAAAAABefHJNz0Y2VwytYmJ8I2R3ZuO6HFV1sVGCmA7SXUi0D/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1764514799&allow_ip=&allow_referer=&signature=iPVoGOeKOKDFSbLhWZ3UQdTgoUo%3D)

clientHeight

## 최대 스크롤 값

쉽게 말해 맨 위에서 스크롤을 끝까지 내렸을 때,

(현재 화면 이후 ~ 맨 아래까지의) 스크롤할 수 있는 화면 길이가 최대 얼마인지를 의미하는 것 같다.

예를 들어 원글의 길이는 0 - 1000px 이다.

현재 화면 범위가 0 - 100px 이라면, 101px - 1000px 까지가 마우스휠로 끝까지 스크롤을 내릴 수 있는 길이인 것이다.

최대 스크롤값은 (1000 - 101) px 인 899px 가 될 것이다.

![](https://blog.kakaocdn.net/dna/dwtybR/btrGgn9dbVP/AAAAAAAAAAAAAAAAAAAAAHIv9oO2bQomrL689cdH1RIra8K13LKTtN3NEHbIchON/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1764514799&allow_ip=&allow_referer=&signature=%2FjQ3n51ZfzFfCVqM7dRxI2%2FjpiE%3D)

최대스크롤값

따라서 scrollTop 으로 스크롤 위치를 핸들링할때,

최대스크롤 값 이상의 숫자를 넣어줘도 최대 스크롤 값만 리턴하게 된다.

```
// 최대 스크롤 값
const maxScrollValue = element.scrollHeight - element.clientHeight;
```

> 공식문서(에도 이와같은 설명이 딱한줄 나와있다)  
> If set to a value greater than the maximum available for the element, scrollTop settles itself to the maximum value.

출처: [https://devbirdfeet.tistory.com/228](https://devbirdfeet.tistory.com/228) [새발개발자:티스토리]