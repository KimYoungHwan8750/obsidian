
## DFS (Depth First Search)

깊이를 우선해 탐색하는 기법이다.

![DFS and BFS](Python/알고리즘/image/DFS_BFS.gif)

출처 - [나무위키](https://namu.wiki/w/%EB%84%88%EB%B9%84%20%EC%9A%B0%EC%84%A0%20%ED%83%90%EC%83%89)

보통 재귀적으로 구현한다.

```python
graph = {  
    'A': ['B', 'C'],  
    'B': ['A', 'D', 'E'],  
    'C': ['A', 'F'],  
    'D': ['B'],  
    'E': ['B', 'F'],  
    'F': ['C', 'E']  
}  
def dfs(graph, node, visited = set()):  
    if node not in visited:  
            print(node, end=" ")  
            visited.add(node)  
            for neighbour in graph[node]:  
                if neighbour not in visited:  
                    dfs(graph, neighbour, visited)  
  
  
dfs(graph, "A")
```

A는 자식 노드로 B와 C를 가지고 있다.

위 그래프는 다음과 같은 경로를 가진다.

1. A => B => D
2. A => B => E => F
3. A => C => F

DFS는 선택한 노드의 흐름을 따라 최하층에 있는 노드를 탐색한 후에 다음 노드로 넘어간다.

따라서 A => B => D(종점) => 다시 B에서 시작 => E => F(종점) => 다시 A로 돌아감(B의 루트를 모두 탐색했기 때문) => C => F 의 경로를 가지게 된다.

따라서 최종 경로는 A => B => D => E => F => C가 된다.

**최종 결과**

```terminal
A B D E F C 
```

## BFS (Breath First Search)

보통 큐를 사용해 구현한다.

파이썬에선 덱이라는 클래스를 임포트해서 사용 가능한데 이는 큐와 스택을 동시에 사용할 수 있는 자료구조다. (deque)

```python
def bfs(graph, start, visited=set()):  
    queue = deque([start])  
    while queue:  
        node = queue.popleft()  
        if node not in visited:  
            print(node, end=" ")  
            visited.add(node)  
            for neighbour in graph[node]:  
                if neighbour not in visited:  
                    queue.append(neighbour)  
bfs(graph, 'A')
```


**최종 결과**

```terminal
A B C D E F 
```

**비교**

```terminal
DFS : A B D E F C 
BFS : A B C D E F 
```

BFS의 알파벳이 순서대로 나열돼 있다고 깊이 우선 탐색이라고 오해하면 안 된다.

A는 B와 C라는 자식을 가지고 있고 B는 D와 E라는 자식 노드를 가지고 있다.

DFS와 BFS를 이용하고, 백트래킹이라는 개념을 도입하면 어려운 문제를 쉽게 해결 가능하다.

예를 들면 백준의 미로찾기 등이 그러한데 해당 문제는 코딩 테스트 카테고리에서 다룰 예정이다.