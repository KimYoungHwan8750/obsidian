
## Open AI

개발 환경

* Python
* Flask
* Open AI (Model : GPT-4o-2024-05-13)

```shell
pip3 install flask
pip3 install openai
```

### 대화 내역 기억 시키기

```python
from flask import Flask, render_template, request  
from openai import OpenAI  
client = OpenAI(  
    api_key="<Input Your Open Ai API key>"  
)  
  
app = Flask(__name__)  
  
users = []  
assistance = []  
  
@app.route("/")  
def main():  
    return render_template("main.html")  
  
_message = []

@app.route("/answer", methods=['POST'])  
def answer():  
    global _message  
    userContent = request.get_json()  
    processUserContent(_message, userContent)  
    completion = client.chat.completions.create(  
        model="gpt-4o-2024-05-13",  
        messages=_message  
    )  
    result = completion.choices[0].message.content  
    processAssistant(_message, result)  
    print(_message)  
  
    return result  
  
def processAssistant(arr, prompt):  
        data = {"role": "assistant", "content": prompt}  
        arr.append(data)  
  
def processUserContent(arr, prompt):  
        data = {"role": "user", "content": prompt}  
        arr.append(data)  
  
app.run(debug=True)
```