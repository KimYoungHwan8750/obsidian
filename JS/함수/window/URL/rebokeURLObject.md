
createURLObject로 만든 url을 삭제하는데 사용한다.
사용하지 않는 URL을 계속 사용하면 메모리 누수가 발생한다.

#### 왜 수동으로 URL을 해제해줘야 할까?
그 대답은 프로필 이미지만 봐도 그렇다.
채팅방을 만들고 상대 유저의 프로필 이미지가 채팅 옆에 표시된다고 가정한다.
이때 프로필 이미지는 여러번 재사용되기 때문에 일일히 바이너리 값을 그대로 쓰기보다는
한번 받아온 바이너리 값을 계속 재사용하는 것이 메모리 측면에서 훨씬 유리하다.

하지만 상대방이 채팅을 칠 때마다 사진은 계속 쓰일 것이므로, 사진이 더 이상 쓰이지 않는 시점을 예측할 수 없기 때문에 예측 가능한 상황에 대해서 개발자가 rebokeURLObject 메서드를 통해 임의로 URL을 해제하게 하는 것이다.

반대로 더 이상 유저가 사진을 볼 일이 없다고 확정되는 상황에서는 robokeURLObject로 해당 URL참조를 해제해준다.


## 주의할 문법

createURLObject와 rebokeURLObject의 실행시간이 있기 때문에 순서를 보장하기 위해선 async await문법을 사용해야한다.

```js
        document.querySelector(".input_box").addEventListener('change',function(){

            let blobURL = URL.createObjectURL(this.files[0]);

            let newPromise = new Promise((resolve,reject)=>{

                document.querySelector(".output_box").src = blobURL;

                resolve();

            });

            let task2 = async()=>{

            console.log(blobURL);  

            await newPromise;

            await URL.revokeObjectURL(blobURL);

            document.querySelector(".output_box_after").src= blobURL;  

            }

            task2();    

        })
```