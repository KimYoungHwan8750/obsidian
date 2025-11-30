```sql
/* insert into ... on duplicate key update 문 */
INSERT INTO 테이블명 (
	 컬럼명1
	,컬럼명2
	,컬럼명3
	,컬럼명4
    ) VALUE (
     '값1'
    ,'값2'
    ,'값3'
    ,'값4'
    )
    ON DUPLICATE KEY UPDATE
      컬럼명3 = '업데이트 될 값1'
      컬럼명4 = '업데이트 될 값2'
```