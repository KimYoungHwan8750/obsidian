## Firestore

NoSQL이다.

Firestore의 디렉토리 구조는 Collection=>Document=>Field 순이다.

```js
import firestore from "@react-native-firebase/firestore";

export const userCollection = firestore().collection("users").doc('test');
```

위 코드는 users라는 collection을 만들어서 test라는 document를 만든다.

firestore에 데이터를 삽입할 때  add와 set 메서드가 있는데, add 같은 경우 `firestore().collection(콜렉션이름).add({key:value})` 형식으로 삽입한다. set의 경우 `firestore().collection(콜렉션이름).doc(document이름).set({key:title})` 형식으로 삽입한다. 차이점은 add의 경우 doc 이름이 랜덤으로 생성된다.

```js
firestore().collection('Dogs').doc('dog1').set({'name':'뽕순이', 'age': 10});
// Dogs/dog1/{name: '뽕순이', age: 10}
firestore().collection('Dogs').doc('dog2').set({'name':'체리', 'age': 5});
// Dogs/dog2/{name: '체리', age: 5}
firestore().collection('Dogs').add({'name':'퍼피', 'age': 20});
// Dogs/WaxcSAqweqASw/{name: '퍼피', age: 20}
```

