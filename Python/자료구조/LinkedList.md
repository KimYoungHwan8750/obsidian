배열을 활용한 자료형이다. 배열과 연결된 리스트는 모든 자료 구조의 기본이 되므로 매우 중요한 개념이다. 그냥 아무 생각 없이 쓰던 Dictionary(HashTable)과 List(Queue, Stack의 기능을 모두 소화 가능하다)가 이처럼 구현된 자료형임을 알게 되고 나서 자료 구조와 알고리즘 공부가 상당히 재밌어졌다. 이 글을 읽는 사람들도 나와 같은 재미를 느끼기 바라며 포스팅을 이어간다.

Singly-Linked-List(단일 연결 리스트)와 Doubly-Linked-List(이중 연결 리스트)로 구현 가능하다.

## Singly Linked List

연결 리스트는 기본적으로 Node와 LinkedList로 역할이 나뉜다.

그 중 단일 연결 리스트는 노드에 data와 next가 존재하고, 이중 연결 리스트는 이전 노드도 참조할 수 있어 prev가 추가된 형태이다.

**단일 연결 리스트의 Node**

```python
class Node:
	def __init__(self, data=None):
		self.data = data
		self.next = None
```

**이중 연결 리스트의 Node**

```python
class Node:
	def __init__(self, data=None):
		self.data = data
		self.next = None
		self.prev = None
```
