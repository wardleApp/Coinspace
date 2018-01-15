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

- Node 8.9.4
- Postgresql 10.1
- etc

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
npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_DOC)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
