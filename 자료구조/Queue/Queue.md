FIFO(선입선출)

front와 rear 포인터를 통해 선입선출 구조를 구현할 수 있다.

원시적인 큐는 논리적으로 선입선출이 구현되어있다. 왜 논리적 선입선출이라고 콕 집어 말하냐면, 실제 데이터는 큐상에 물리적으로 남아있기 때문이다.

데이터를 추가하면 front를 +1하고, 데이터를 꺼내면 rear를 +1하여 포인터를 조절해 선입선출을 구현한다.

```c++
class Queue{
private:
	int front = -1;
	int rear = -1;
	int queue[10];

public:
	void enqueue(int data) {
		this.queue[++front] = data;
	}

	int dequeue() {
		return this.queue[++rear];
	}

	bool isFull() {
		return front == rear;
	}
}
```
