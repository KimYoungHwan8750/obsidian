```dart
children: List.generate(100, (index) {
  return Center(
	child: Text(
	  'Item $index',
	  style: Theme.of(context).textTheme.displayLarge,
	),
  );
}
```