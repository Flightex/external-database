/* 
                   __ _          _     
   ___ ___  _ __  / _(_) __ _   (_)___ 
  / __/ _ \| '_ \| |_| |/ _` |  | / __|
 | (_| (_) | | | |  _| | (_| |_ | \__ \
  \___\___/|_| |_|_| |_|\__, (_)/ |___/
                        |___/ |__/     

  The config.js is essential for starting the server.  One has already been set up for you below, and we recommend you change the values as you wish (especially the token as the current one is not secure).
  
*/

module.exports = {
  dbURI: "sqlite://db.sqlite",
  port: 3000,
  token: "some random token"
}