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

## ipcRenderer

ipcRenderer.send(채널명, 데이터)
ipcRenderer.on(채널명, (evt, data)=>{

})