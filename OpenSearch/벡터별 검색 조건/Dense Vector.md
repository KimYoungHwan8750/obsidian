```json
"query": {
	"hybrid": {
		"queries": [
			{"knn": {"content_dense": {"vector": dense_vec, "k": 10}}}
		]
	}
}
```