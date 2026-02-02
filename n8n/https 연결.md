```yml
environment:
	N8N_PROTOCOL: https
	N8N_SSL_CERT: /data/cert.crt
	N8N_SSL_KEY: /data/cert.key
volumes:
	- n8n-data:/home/node/.n8n
	- ./desktop-8srcvi0.tail248333.ts.net.crt:/data/cert.crt:ro
	- ./desktop-8srcvi0.tail248333.ts.net.key:/data/cert.key:ro
```

tailscale로 접속하는 경우
node이름.tailscale-tel-id.ts.net으로 도메인이 할당된다.
`ex) my-node123.tail248883.ts.net`
