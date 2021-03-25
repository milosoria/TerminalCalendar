**TerminalCalendar: create bash script with the following code:**

```
event () {
    node absolutepathto/TerminalCalendar.js $1 $2 $3 $4 $5
    }
```
Place this bash script in usr/local/bin and name it ".my_custom_commands.sh". Paste in your .bash_profile or .bashrc the following line of code:
```
source ~/.my_custom_commands.sh
```
And then run source with your .bashrc or .bash_profile.
For the credentials you will have to follow the instructions specified here <https://developers.google.com/calendar/quickstart/nodejs>. Once you have your client_id, redirect_uris, client_secret, create a credentials.json file to store them. Finally, in TerminalCalendar.js getAccessToken function is defined to help you with Oauth2 flow and to retrieve tokens neeeded into token.json file. Run the function with the instructions specified in the comment line nested in main function.
