## CONN
`$dblink = SetConn($_conf_db["main_db"])`와 같은 형태로 사용되고 있다.
`$_conf_db`는 dbconfig.inc.php 파일에 다음과 같이 정의되어 있다.

```php
$_conf_db = array(
    "main_db"=>array(
        "host"=>"보안",
        "db"=>"보안",
        "user"=>"보안",
        "password"=>"보안"),
    "zipcode"=>array(
        "host"=>"보안",
        "db"=>"보안",
        "user"=>"보안",
        "password"=>"보안")
);
```

## DISCONN
`SetDisConn($dblink)`로 필요한 쿼리를 모두 실행한 후 연결을 해제해줘야한다.

## CREATE, READ, UPDATE, DELETE
바이오라인에서는 CRUD 별로 쿼리를 나누지 않고 raw query를 그대로 사용하고 있다.
읽어온 데이터는 mysql_real_escape_string 함수를 거쳐서 클라이언트에게 제공되고 있음
또한 새로운 쿼리가 필요할 시 다음 절차를 따름
1. dbconfig.inc.php에 함수 정의
2. 함수는 아래 양식을 따름
>```php
>function getHelloWorld($tbl) {
>	$sql = "SELECT * FROM $tbl";
>	$rs = mysql_query($sql, $GLOBALS[dblink]);
>	$total_rs = mysql_num_rows($rs); // 검색된 행 수를 표시하는 함수
}
>```

