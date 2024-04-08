<div style="text-align:center;">
    <img src="https://github.com/HazelHilbert/Legislative-Drafting-NLP/assets/98608198/2c5a8f29-a6ce-4ec3-9f96-123c70384960" alt="drawing"/>
</div>

# 📜 NLP for Legislative Drafting
The NLP for Legislative Drafting application is a full stack Microsoft Word Add-in that simplifies the process of legislative drafting. It allows users to search for, summarize, and extract legal citations and effective dates from a vast repository of American laws. It accomplishes this through the use of several advanced Natural Language Processing (NLP) models, including the OpenAI API, as well as a specifically trained Hugging Face NLP model. This project is a collaboration between Trinity College Dublin's School of Computer Science and Statistics and Propylon, a Dublin-based company specializing in software solutions for the legal sector. Watch our promo video:
<div align="left">
      <a href="https://youtu.be/EDPA96esfSY">
         <img src="https://github.com/HazelHilbert/Legislative-Drafting-NLP/assets/98608198/d1584dc6-809b-451e-9110-1c342289a40a" style="width:300px;">
      </a>
</div>

# 👩‍💻 The Team 👨‍💻
Our team is made up of a mix of second and third-year students studying computer science at Trinity College Dublin. The third-year students were in charge of project management, while second-year students focused on development.
### The 3rd Years
[Hazel Hilbert](https://github.com/HazelHilbert) - Team Leader

[Ralf Duli](https://github.com/RalfDuli) - Sprint Master

[Muavia Ghazi](https://github.com/MauvG) - Product Owner

[Sean Kavanagh](https://github.com/skavgou) - Backend Lead

[Tom Gilbride](https://github.com/TomG03) - Frontend Lead

[Isioma Anonyai](https://github.com/anonyaii) - Social Media Lead

<div style="text-align:center;">
    <img src="https://github.com/HazelHilbert/Legislative-Drafting-NLP/assets/98608198/a7c87af4-a65b-4e69-8588-92321cb7609e" alt="drawing" style="width: 250px;"/>
</div>

### The 2nd Years
[James Bradley](https://github.com/bradleja) - Backend Developer

[Jason Qu](https://github.com/Jasonqu04) - Backend Developer

[Aaron Groome](https://github.com/aagroome) - NLP Developer

[Elizabeth O’Sullivan](https://github.com/bethboo222) - NLP Developer

[David Rosca](https://github.com/roscanTCD) - Frontend Developer

<div style="text-align:center;">
    <img src="https://github.com/HazelHilbert/Legislative-Drafting-NLP/assets/98608198/c567c247-894c-4fc9-8f6d-d70105a90478" alt="drawing" style="width: 270px;"/>
</div>


### The Mentors
Special thanks to our clients from Propylon: Brendan Salmond, Akshay Sayar, Johan du Plessis, and Paul Higgins, along with our demonstrator
Nicky Gray for their help and guidance.

# 👥 Find Out More

Take a look at our [Digital Brochure](https://simplebooklet.com/swenggroup25) or [Project Poster](https://github.com/HazelHilbert/Legislative-Drafting-NLP/files/14909503/group25.pdf) to find out more about our team. You can also follow our social media pages:

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/nlp_legislative_drafting_/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sweng-group-twenty-five-b7a3b72b5/)


# 💻 Running the Application

## 🔑 Adding API keys to the .env file:
To set up your environment variables, copy `.env.example` to a new file named `.env` and replace `insert_your_key_here` with your actual API keys.

```bash
cp .env.example .env
```

## 	🐳 Running the application using Docker:
To run the application using Docker, please ensure that Docker Desktop ([download here](https://www.docker.com/products/docker-desktop/)) is running on your machine. You can now run the application using docker-compose:

```bash
docker-compose up --build
```

## 📂 Running the application using a venv:
### Setting up the virtual environment:

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
pip install -r backend/requirements.txt
```
make sure you have python and pip installed first

### Run Flask
To start the Flask application:
```bash
cd backend
flask --app app run
```

### Run React
Make sure that you have installed npm. You can use the following command to do so:
```bash
cd frontend_nlp_react
npm install
```
To start the frontend:
```bash
cd frontend_nlp_react
npm start
```
