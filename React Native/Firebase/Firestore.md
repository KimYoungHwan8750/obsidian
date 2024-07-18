## Firestore

NoSQL이다.


```js
import firestore from "@react-native-firebase/firestore";

export const userCollection = firestore().collection("users").doc('test');


```