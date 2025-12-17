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
CONTEXT_LENGTH=32768

vllm serve \
    tclf90/Qwen3-VL-30B-A3B-Instruct-AWQ \
    --served-model-name My_Model \
    --swap-space 4 \
    --max-num-seqs 8 \
    --max-model-len $CONTEXT_LENGTH \
    --gpu-memory-utilization 0.9 \
    --tensor-parallel-size 2 \
    --trust-remote-code \
    --disable-log-requests \
    --host 0.0.0.0 \
    --port 8000

```