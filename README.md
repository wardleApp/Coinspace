# Project Name

> This project is meant to emulate Coinbase.

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

> Some usage instructions

## Requirements

- Node 8.9.1
- Postgresql 10.1

## Development

### Setting Config Vars
```
Create a Postgres Database Addon with Heroku (this will be used to fillout below)
Open example.env file
Fill out env variables as defined
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
