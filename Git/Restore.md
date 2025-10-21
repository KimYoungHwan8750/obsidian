먼저, git restore 명령어는 파일을 최근 커밋 시점으로 되돌릴 때 사용됩니다. git restore 명령어에 파일 이름을 붙이면 가장 최근에 커밋이 된 상태(HEAD 커밋)로 복구가 가능합니다.

```bash
git restore <file name>
```

 git restore 명령어도 여러 옵션을 붙일 수 있습니다. 대표적으로 source와 staged 옵션이 있습니다.

### git restore --source

git restore에 --source 옵션을 붙이면 특정 파일을 특정 커밋 시점으로 복구할 수 있습니다. 사용법은 다음과 같습니다. 명령어 뒤에 커밋 해쉬와 파일명을 붙이면 됩니다.

```bash
git restore --source <commit> <file name>
```

### git restore --staged

git restore에 --staged 옵션을 붙이면 스테이징된 파일을 다시 취소시킬 수 있습니다. 즉, git add를 취소시킬 수 있는 것입니다.

```bash
git restore --staged <file name>
```