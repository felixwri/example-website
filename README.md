# RHUL Team Project | Group 17
**This is a team project surrounding a brief of a fullstack website called "Oaxaca".**

**This project uses:**
* HTML, CSS
* JavaScript
* Flask (Python)
* Psycopy2 (Postgres API)

## Admin account

username: admin \
password: @dmin123456

## Setting up the project

This clones the project, creates a branch and pulls the gitlab branch to your local folder

`git clone https://gitlab.cim.rhul.ac.uk/TeamProject17/PROJECT.git`\
`git branch [branch-name]`\
`git checkout [branch-name]`\
`git pull origin [branch-name]`

Run the code with `python app.py` in your terminal after you have installed the requirements

## Adding code to the gitlab

Save your changes\
`git add *` or `git add [file-name]`\
`git commit -m "[message]"`\

Merge any differences\
`git pull origin [branch-name]`

Publish changes to the remote\
`git push origin [branch-name]`

## Requirements

Get the requiremnents with \
`pip install -r ./requirements.txt`

-   Flask 1.1.2
-   flask_session 0.4.0
-   flask_cors 3.0.10
-   psycopg2 2.9.5
-   bcrypt 4.0.1
-   cloudinary 1.32.0
-   python-dotenv 0.17.1
