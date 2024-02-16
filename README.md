# Legislative Drafting NLP
There are several valuable use cases for the application of advanced NLP language models for the analysis, summarisation, change detection and tracking of key elements such as citations and effective dates. Most if not all US states provide public access to their complete code of laws and statute in addition to the legislation that is introduced for a given session. This data can be used as a training set for NLP models to provide unique insights into new and existing proposed legislation.The goal of this project will be to develop a Microsoft Word Office Add-In that works in conjunction with trained NLP model to perform analysis on new and existing legislation to surface key data to the user using an in-document UI layer.This project will involve the implementation, training and integration of an NLP model, and the construction of a service and UI layer to allow for interaction between Microsoft Word and the model. It will require design decisions to be made around features, data modelling, system architectre and user experience.

### Set up virtual environment (recommended):

For macOS and Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

For Windows:

```bash
python -m venv venv
.\venv\Scripts\activate.bat
```

### Install the Requirements:
With the virtual environment activated, install the project dependencies using:

```bash
pip install -r requirements.txt
```
make sure you have python and pip installed first

### Setting up the .env file:
To set up your environment variables, copy `.env.example` to a new file named `.env` and replace `insert_your_key_here` with your actual API keys.

```bash
cp .env.example .env
```