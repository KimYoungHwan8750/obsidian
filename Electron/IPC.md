# IPC
IPC란 Inter Process Communication의 줄임말이다.
말 그대로 프로세스 간 통신을 뜻한다.

일렉트론은 node 환경에서 동작하는 main process가 있고, 프론트단에서 동작하는 renderer process가 있다.

만약 input으로 text를 유저에게 입력받고 그것을 파일로 저장하고 싶으면 renderer process에서 main process로 입력받은 text를 전달하면, main process는 node 환경에서 동작하므로 file system 같은 모듈을 설치해 해당 text를 파일로 저장할 수 있게 된다.

## ipcMain

메인 프로세스에서 IPC 관련 동작을 제어할 수 있다.

ipcMain.on(채널명, (evt, data)=>{})
ipcMain.handle(채널명, async (evt, data)=>{})

메세지를 청취할 수 있는데, on은 비동기 메세지이며 handle은 동기 메세지이다.
매개변수로 전달받는 evt는 evt.sender.send(채널명, 데이터)를 통해 응답 가능하고,
같은 채널명이라면 간편하게 evt.reply(데이터)를 사용 가능하다.

ipcMain에서도 ipcRenderer와 마찬가지로 메세지 발신이 가능한데,

```js
let win = new BrowserWindow({})
win.webContents.send(채널명, 데이터);
```
로 가능하다.

또한 loadURL, loadFile전에 채널에 대한 핸들링을 작성해야한다. (이유는 아직 모름)

**함수 정리 (ipcMain)**
	- on(채널, (evt, data) => {})
	- handle(채널, (evt, data) => {})

handle 함수는 return을 통해 값을 반환한다.
on 함수는 evt.sender.send(채널, 데이터) 또는 evt.reply(데이터)를 통해 응답 가능하다.

둘의 차이는 reply는 메세지를 보낸 클라이언트에게 메세지를 보내지만 evt.sender.send는 evt.sender.send(송신한_클라이언트가_수신_가능한_채널, 데이터)로 메세지를 보낸 클라이언트에게 응답을 할 뿐이지, 별개의 메세지를 보내는 동작이다. 처음에 reply로 응답하는 것과 evt.sender.send로 응답하는 것의 차이가 헷갈렸어서 기록해둔다.

또한 ipcRenderer와 달리 send를 할 때 webContents를 이용한다.
webContents는 main process의 BrowerWindow 객체에 있다.

```js
let mainWindow = new BrowserWindow({
	width: 900,
	height: 680,
	webPreferences: {
		preload: path.join(__dirname, 'preload.js'),
		nodeIntegration: true,
		contextIsolation: true,
	},
});
mainWindow.webContents.send(채널, 데이터);
```



## ipcRenderer


**함수 정리 (ipcRenderer)**
	- on(채널, (evt, data) => {})
	- invoke(채널, data)
	- send(채널, data)

invoke는 동기적으로 메세지를 주고 받는다. invoke함수는 Promise를 반환하므로  `invoke('ch', data).then(res => console.log(res))`로 데이터에 접근 가능하다. main process에서도 return으로 값을 반환한다.

## contextBridge

preload 파일에서 main process와 renderer process 사이의 컨텍스트 교환에 쓰인다.

예를 들면 ipcRenderer 객체를 window 객체에 넣고 사용하면 심각한 보안 위협이 될 수 있다.

따라서 contextBridge를 이용해 명시적으로 기능을 제한해서 제공하는 것이 바람직하다.

**preload.js**
```js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeMainWorld('api이름', {
	api1: (data) => { ipcRenderer.send('my-ch', data) },
	api2: () => { console.log('api2') }
})

// 브라우저에서 window.api이름.api1, window.api이름.api2로 접근 가능

```