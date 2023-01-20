# Team Project

This repository has been created to store your Team Project.

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
* python 3.6+
* flask
* psycopg2
