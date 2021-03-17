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
And then run source with your .bashrc