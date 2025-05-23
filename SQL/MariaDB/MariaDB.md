## MariaDB 사용법
MariaDB와 MySQL은 대체로 같은 데이터베이스로 취급하므로 이 문서는 MySQL에 해당하는 문서이기도 하다. 심지어 mariadb는 CLI에 mysql을 입력해도 접속된다.

CLI에서 `mariadb -u 사용자명 -p 데이터베이스명`를 입력한다.

만약 처음 접속해서 사용자와 데이터베이스를 만들어야한다면 다음과 같이 입력한다.
`mariadb -uroot -p`

`-uroot`는 root 계정으로 접속하겠다는 옵션이며 p는 비밀번호를 통해 접속하겠다는 말이다.

```shell
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 4
Server version: 11.7.2-MariaDB-ubu2404 mariadb.org binary distribution

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> 
```

MariaDB에 정상적으로 연결되었다. 이제 데이터베이스를 생성할 건데, 명령어를 여러줄로 입력하고 싶으면 엔터를 누르고, 쉘에게 명령어의 끝을 알려 실행시키고 싶다면 세미콜론을 붙인다.

`create database test;`

test라는 이름의 데이터베이스를 만들었다.

`create user 'test-user'@'127.0.0.1 identified by'test-password';`

이렇게 만든 test-user는 127.0.0.1(localhost)에서, test-password로만 접속 가능하다. 만약 외부접속을 허용하려면 ip-adress 자리에 127.0.0.1 대신 %를 입력하면 된다. %는 와일드카드로써 모든 아이피를 허용한다는 뜻이다.

만든 계정에 적절한 권한을 부여하려면 다음 절차를 따른다.

`grant all privileges on db.table to user@ip-adress;`

이는 db.table에 모든 권한을 user@ip-adress에 부여한다는 것을 의미한다.

만약 위에서 만든 test 유저에게 test 데이터베이스의 example 테이블에 쓰기 권한만을 허용하고 싶다고 가정해보자.

`grant update privileges on test.example to 'test-user'@'127.0.0.1';`

CRUD 권한은 각각 `create`, `select`, `update`, `delete`와 매칭된다.

이러한 권한 설정이 완료되면 DB 캐시에 의해 즉시 반영이 되지 않으므로 `flush priviliges;`를 통해 캐시를 초기화해줌으로써 바로 반영이 가능하다.

