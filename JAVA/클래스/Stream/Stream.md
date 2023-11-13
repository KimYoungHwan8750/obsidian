Collection 객체에 추가된 stream() 메서드

list 객체에서 .stream()메서드를 실행하면 steam객체를 생성 가능하다

#### Stream 객체 생성 예제

```java
List<String> test1 = new ArrayList<>();
Stream test2 = test1.stream();
//또는
Stream<String> stream = Stream.of();
```
#### 스트림의 중간 연산 목록

```java
- Stream<T> distinct() 									중복을 제거
- Stream<T> filter(Predicate<T> predicate) 				조건에 안 맞는 요소 제외
- Stream<T> limit(long maxSize) 						스트림의 일부를 잘라냄
- Stream<T> skip(long n) 								스트림의 일부를 건너뜀
- Stream<T> peek(Consumer<T> action) 					스트림의 요소에 작업수행
- Stream<T> sorted()									스트림의 요소를 정렬
  Stream<T> sorted(Comparator<T> comparator) 		
- Stream<R>    map(Function<T,R> mapper)				스트림의 요소를 변환
  DoubleStream mapToDouble(ToDoubleFunction<T> mapper)
  IntStream    mapToInt(ToIntFunction<T> mapper)
  LongStream   mapToLong(ToLongFunction<T> mapper)
  Stream<R>    flatmap(Function<T,Stream<R>> mapper)
  DoubleStream flatMapToDouble(Function<T,DoubleStream> m)
  IntStream    flatMapToInt(Function<T,IntStream> m)
  LongStream   flatMapToLong(Function<T,LongStream> m)
```


#### 스트림의 최종 연산 목록

```java
- void forEach(Consumer<? super T> action)				 각 요소에 지정된 작업 수행
  void forEachOrdered(Consumer<? super T> action)
- long count()											 스트림의 요소의 개수 반환
- Optional<T> max(Comparator<? super T> comparator)      스트림의 최대값/최소값을 반환
  Optional<T> min(Comparator<? super T> comparator)
- Optional<T> findAny()		// 아무거나 하나				 스트림의 요소 하나를 반환
  Optional<T> findFirst()	// 첫 번째 요소				
- boolean allMatch(Predicate<T> p) // 모두 만족하는지		주어진 조건을 모든 요소가 만족시키는지, 만족시키지 않는지 확인
  boolean anyMatch(Predicate<T> p) // 하나라도 만족하는지
  boolean noneMatch(Predicate<> p) // 모두 만족하지 않는지
- Object[] toArray()
  A[]      toArray(IntFunction<A[]> generator)			  스트림의 모든 요소를 배열로 반환
- Optinal<T> reduce(BinaryOperator<T> accumulator)		  스트림의 요소를 하나씩 줄여가면서(리듀싱) 계산
  T reduce(T identity, BinaryOperator<T> accumulator)
  U reduce(U identity, BiFunction<U,T,U> accumulator,BinaryOperator<U> combiner)
- R collect(Collector<T,A,R> collector)					  스트림의 요소를 수집한다. 주로 요소를 그룹화 하거나 분할한 결과를 컬렉션에 담에 반환하는데 사용한다.
```

#### for 문과의 차이

단순한 계산일수록 for문의 성능이 압도적이지만
계산복잡도가 올라갈수록 성능차이가 미미해진다.
가독성이나 기타 연산, 코드의 일관성을 생각하면 stream만 써도 되겠지만
간단한 처리가 대량으로 들어왔을 때 선택적으로 for문으르 사용해볼만 하다.