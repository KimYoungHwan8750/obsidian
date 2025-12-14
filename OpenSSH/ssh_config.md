ssh는 Host를 만나게 되면 if문처럼 새로운 조건이 이어진다고 판단한다.

따라서
```
Host server1
    HostName 1.1.1.1
    User admin
    IdentityFile ~/.ssh/key1

Host server2
    HostName 2.2.2.2
    User root
    Port 2222
```

위와 같이 작성해둔 후

`ssh server1`을 입력하면 admin 유저로 ~/.ssh/key1 키를 사용해 1.1.1.1로 접속한다.

`ssh -i ~/.ssh/key1 admin@1.1.1.1`을 입력한 것과 같다.