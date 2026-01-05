로컬 llm api 서버를 열게 도와주는 라이브러리
```shell
uv venv
source .venv/bin/activate

# Install vLLM >=0.11.0
uv pip install -U vllm

# Install Qwen-VL utility library (recommended for offline inference)
uv pip install qwen-vl-utils==0.0.14

```

```shell
vllm serve \
    tclf90/Qwen3-VL-30B-A3B-Instruct-AWQ \
    --served-model-name My_Model \
    --swap-space 4 \
    --max-num-seqs 8 \
    --max-model-len 32768 \
    --gpu-memory-utilization 0.9 \ # GPU 선점 설정(현재 VRAM의 90%)
    --tensor-parallel-size 1 \  # 동시 구동 GPU 수
    --trust-remote-code \
    --disable-log-requests \
    --host 0.0.0.0 \
    --port 8000

```