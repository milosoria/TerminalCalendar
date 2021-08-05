Take this to golang

<h1>TerminalCalendar</h1>

<h2> Usage:</h2>
- Create a shell script to run the program as a function:
    ```
    event () {
        node absolutepathto/TerminalCalendar.js $1 $2 $3 $4 $5
        }
    ```
- Place the script in some path and name it "____some_name_.sh". Then source in
your shell profile file (.zshrc or .bashrc):

    ```
    source ~/path_to_script/_some_name_.sh
    ```

-   Finally, source your shell profile or reopen your terminal emulator

-   The program uses google credentials that will need authorization process:
    -client_id
    -redirect_uris
    -client_secret
    You can the instructions specified here <https://developers.google.com/calendar/quickstart/nodejs> provided by google.
    With your credentials create a credentials.json file to store them
    Finally, in TerminalCalendar.js getAccessToken function is defined to help you with Oauth2 flow and to
    retrieve tokens neeeded into token.json file. Run the function with the instructions specified in the comment
    line nested in main function.
