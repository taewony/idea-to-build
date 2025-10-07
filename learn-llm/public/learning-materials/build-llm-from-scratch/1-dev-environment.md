## Introduction

Welcome to the first step! A solid development environment is crucial for a smooth learning experience. We'll use `conda` to manage our Python environment, which helps avoid conflicts between project dependencies. We will also install PyTorch, the core library for building our models.

### Step 1: Install Conda

If you don't have Conda, download and install it from the official [Anaconda website](https://www.anaconda.com/products/distribution). Choose the Python 3.10+ version.

### Step 2: Create a New Conda Environment

Open your terminal and run the following command to create a new environment named `learnllm`.

```bash
conda create --name learnllm python=3.10 -y
```

### Step 3: Activate the Environment

To start using the environment, you need to activate it:

```bash
conda activate learnllm
```

You should see `(learnllm)` at the beginning of your terminal prompt.

### Step 4: Install PyTorch

We will install PyTorch, a powerful library for deep learning. Visit the [PyTorch website](https://pytorch.org/get-started/locally/) to get the correct command for your system (macOS, Linux, or Windows). For most systems with a CPU, the command will be:

```bash
# For CPU-only systems
pip install torch torchvision torchaudio
```

> **Note:** If you have a CUDA-enabled GPU, make sure to select the appropriate CUDA version on the PyTorch website to get the correct installation command for GPU support.

### Step 5: Verify Installation

You can verify that PyTorch was installed correctly by running a simple Python script.

```python
# main.py
import torch

print(f"PyTorch version: {torch.__version__}")
x = torch.rand(5, 3)
print("Here is a random tensor:")
print(x)
```

Run this from your terminal: `python main.py`. You should see the PyTorch version and a random tensor printed without any errors.

Congratulations! Your development environment is now ready for building an LLM.
