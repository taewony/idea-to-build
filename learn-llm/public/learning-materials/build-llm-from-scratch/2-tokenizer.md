### What is a Tokenizer?

Language models don't understand words or characters directly. They work with numbers. A tokenizer is a crucial component that translates a piece of text into a sequence of numbers (called "tokens"). It also does the reverse: converting a sequence of tokens back into human-readable text.

Our goal is to create a simple, character-level tokenizer. This means every unique character in our text will be assigned a unique integer.

### Step 1: Prepare the Data

First, we need some text data to "train" our tokenizer on. The tokenizer needs to know the complete set of unique characters (the "vocabulary") it will ever encounter.

Let's start with a simple text file. Create a file named `input.txt`:

```
Hello world! This is a simple text for our tokenizer.
```

### Step 2: Build the Vocabulary

Now, let's write Python code to read this file and create our vocabulary.

```python
# read the text
with open('input.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# find all the unique characters in the text
chars = sorted(list(set(text)))
vocab_size = len(chars)

print("".join(chars))
print(f"Vocabulary size: {vocab_size}")
```

The output will show all unique characters and the total count.

### Step 3: Create the Encoder and Decoder

The core of the tokenizer is a mapping from characters to integers (encoder) and from integers back to characters (decoder).

```python
# Create a mapping from characters to integers
stoi = { ch:i for i,ch in enumerate(chars) }
# Create a mapping from integers to characters
itos = { i:ch for i,ch in enumerate(chars) }

# Encoder: takes a string, outputs a list of integers
def encode(s):
    return [stoi[c] for c in s]

# Decoder: takes a list of integers, outputs a string
def decode(l):
    return "".join([itos[i] for i in l])

# Let's test it!
encoded_text = encode("hello")
print(f"Encoded 'hello': {encoded_text}")

decoded_text = decode(encoded_text)
print(f"Decoded back: {decoded_text}")
```

### Full Tokenizer Code

Here is the complete code for our simple character-level tokenizer.

```python
# tokenizer.py

# read the text
with open('input.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# find all the unique characters in the text
chars = sorted(list(set(text)))
vocab_size = len(chars)

# Create mappings
stoi = { ch:i for i,ch in enumerate(chars) }
itos = { i:ch for i,ch in enumerate(chars) }

# Encoder and Decoder functions
def encode(s):
    return [stoi[c] for c in s]

def decode(l):
    return "".join([itos[i] for i in l])

# Example usage
original_string = "Hello world!"
encoded_output = encode(original_string)
decoded_output = decode(encoded_output)

print(f"Original: {original_string}")
print(f"Encoded: {encoded_output}")
print(f"Decoded: {decoded_output}")
```

This is a very basic tokenizer, but it covers the fundamental concept of converting text to numbers that a model can process. More advanced tokenizers like Byte-Pair Encoding (BPE) or WordPiece work on sub-word units, but the principle remains the same.
