```js
function colorToRgba(color: string, alpha: number = 1): string {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return `rgba(0, 0, 0, ${alpha})`;
    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
```

CSS에서 허용하는 형태의 색상 코드를 RGBA라는 일정한 형태로 포맷팅할 때 사용