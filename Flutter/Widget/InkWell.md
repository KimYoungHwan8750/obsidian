버튼을 클릭했을 때 물결이 퍼져나가는(ripple) 효과를 주기 위해 사용한다.
```dart
InkWell(
      borderRadius: BorderRadius.circular(12),
      onTap: onTap,
      child: Ink(
        width: 300,
        height: 45,
        decoration: BoxDecoration(
          color: Color(color),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Colors.grey.shade300, // 테두리 색상
            width: 1, // 테두리 두께
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset(
              assetPath,
              height: 24, // 아이콘 크기 지정
            ),
            const SizedBox(width: 12), // 아이콘과 텍스트 사이 간격
            Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                color: Color(0xFF191919)
              ),
            ),
          ],
        ),
      ),
    )
```