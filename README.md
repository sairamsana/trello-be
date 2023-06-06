# Trello Authentication and API Integation

Trello API Authentication and Card Creation API

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install foobar.

```bash
npm install
```

## Required Data to run this project

Trello API Key, Secret, and call back URL [Trello API](https://trello.com/power-ups/admin)

* config
    * config.env

```
NDOE_ENV=developmet
PORT=5000
MONGO_URI_DEV=mongodb://localhost:27017/speakaiintegration

TRELLO_BASEURL=https://api.trello.com/1
TRELLO_APIKEY=__TRELLO_APIKEY__

CORSORIGIN=http://localhost:4200

SESSION_SECRET=__RANDOMSTRING__

TRELLO_CALLBACK_URL=http://localhost:5000/api/v1/authenticate/parsetoken

FRONTEND_REDIRECT_URL_SUCCESS=http://localhost:4200/dashboard/default
FRONTEND_REDIRECT_URL_FAIL=http://localhost:4200/authenticate/failed
```

## Usage

Create a .env file and save configuration information of MongoDB and Trello API

## API Endpoints to integrate with Frontend

* /api/v1/authenticate - redirect to Trello authentication URL with required permissions
* /api/v1/member - get member information
* /api/v1/card - Card CRUD API
* /api/v1/list - get List on a Trello board 

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

