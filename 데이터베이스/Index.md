Index는 두 가지로 나눌 수 있다.

* Clustered Index
* Non-Clustered Index

Clustered Index는 컬럼을 Primary Key로 설정하게 되면 PK 컬럼에 대해 자동으로 생성된다. 따라서 Clustered Index는 테이블당 한 개만 생성된다. 또한 테이블을 실제 물리적으로 재정렬한다. 이것이 PK를 설정한 테이블이 자동으로 정렬되는 이유이다.

Non-Clustered Index는 Unique 제약 조건을 설정한 컬럼에 대해 생성된다. 인덱스 테이블을 따로 만드는 것이기 때문에 Unique 제약 조건이 걸린 컬럼마다 각각 인덱스 테이블이 생성된다.

다중 컬럼을 인덱스로 설정할 경우 두 번째 인덱스는 첫 번째 인덱스에 의존한다. where 절을 사용해 검색할 때 두 번째 인덱스만을 검색하게 되면 인덱스를 사용하지 않는 것(full scan)과 다름없이 동작한다.