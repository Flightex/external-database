# External Database
This is the backend/server version of an external database system.  External databases are good for sharing data between multiple hosted projects that aren't hosted on the same infrastructure or server.  It is also a good way to save space on your server as database files can sometimes get quite hefty.  Here is a pretty simple external database system which you can easily host yourself!

## Prerequisites
Before you get started, you need to make sure you have Node.js version `12.0.0` or higher installed.  Lower versions aren't really supported with these libraries we use and may cause the system to malfunction.

You'll need the following packages installed:
* `express`
* `marked`
* `keyv`
* `@keyv/sqlite`
* `body-parser`
test

To quickly install all files, you can run

```
npm i express marked keyv @keyv/sqlite body-parser
```

## Configuration
Before you use the system, you need to change the configuration files.  Head over to the `config.js` file to continue.  Here are some explanations for these values.
| Config Value | Explanation | Example Value | Required |
| --- | --- | --- | --- |
| `dbURI` | The file path where your database will be made.  You can keep the current value as is, not unless you have a particular naming/ID system. | `sqlite://db.sqlite` | Yes |
| `port` | The port of what your server will be listening on.  You can keep at its default setting of `3000`. | `3000` | Yes |
| `token` | The API token you will use to authenticate with your server.  This is required and you should choose something secure.  We recommend you change what's already there. | `331dc1d9-ea01-486f-89dd-7a58731cef6d` | Yes |

Now that you have that completed, you can continue.


## Deploying
To deploy the server, simply run `node index.js`.  It will log in the console with a confirmation message that it started.


## Requests
To make requests, please follow the following format below.  You can also use our client (where you won't really have to worry about these requests) which will be available to the public soon.

#### Posting Data to the Database
* Method: `POST`
* Path: `/set`
* Headers: 
```javascript
{ 
  "token": "Your API token here",
  "Content-Type": "application/json"
}
```
* Body: 
```javascript
{
  "data": {
    "key": "Key to post",
    "value": "Value to post"
  }
}
```
* Returns: `204 - No Content`

#### Getting Data from the Database
* Method: `POST`
* Path: `/get`
* Headers: 
```javascript
{ 
  "token": "Your API token here",
  "Content-Type": "application/json"
}
```
* Body: 
```javascript
{
  "data": {
    "key": "Key to fetch"
  }
}
```
* Returns: `200 - OK` & String Data

#### Pinging Database
* Method: `GET`
* Path: `/ping`
* Headers: 
```javascript
{ 
  "Content-Type": "application/json"
}
```
* Body: `N/A`
* Returns: `200 - OK` & `"Pong"`

## Support
If you need help with this, you can [join our Discord Support Server](https://discord.com/invite/7va3rtC).  We will happily help you there!


If you want to contribute to this, you can submit a pull request and we'll happily review it!