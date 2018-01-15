# Project Name

Coin Rebase (aka coinspace)

## Team

  - Dillon Lin
  - Jackie Jou
  - Nuno Neves
  - Derrick Cross

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

> Flick through the different currency tabs to see the evolution of its value over time
  Login to display the portfolio tab
  Click portfolio tab to see a simulation of currency portfolio

## Requirements

- Node 8.9.1
- Postgresql 10.1
- heroku

## Development

Install the necessary dependencies from [Installing Dependencies](#installing-dependencies)
Config your .env file from [Setting Config Vars] (#Setting-Config-Vars)

Install heroku with npm installer:
$ npm install -g heroku-cli

Start webpack:
$ npm run react-dev

Run Heroku local:
$ heroku local
  
open your browser, and write the following url:
http://localhost:5000/

If you have any more questions, email jackie at joujackies@gmail.com

### Setting Config Vars
```
Create a Postgres Database Addon with Heroku (this will be used to fillout below)
Open example.env file
Fill out env variables as defined
DATABASE=''
DATABASE_URL=''
HOST=''
PASSWORD=''
DB_PORT=
USER=''
PORT=3000
NEWSAPI='API KEY'
```

### Initializing the Database and Historical Data
```
Navigate to directory database/Initialize_database_data/ in terminal
Open initalizedatabase.js
Uncomment "ssl: true", for both the Pool and Client models
From terminal execute: node initalizedatabase.js
```

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the project roadmap [here](https://docs.google.com/spreadsheets/d/1jKqRBsl55nnvQkFvP-IGpUZXj8pgGDHMPH6e1joLihU/edit?usp=sharing)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
