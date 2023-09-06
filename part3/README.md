https://esnow-fsopen-phonebook.fly.dev/

NOTES: 
Everything is done according to the class instructions, but I handled a few things slightly differently.
I had ESLint and Prettier running in VSCode already, so for 3.22 I didn't have any remaining issues to address
I handled the phone number formatting on the backend as a US phone format, i.e. 555-555-5555
I tried to enforce the format (555) 555-5555 but spent a little too long on trying to get that right, so I simplified it to above
The backend validation and errors all work properly
On the frontend, I prevented the errors in a few ways:
The Create New Contact button is disabled until both fields are filled out, the name field w/ 3+ characters and the number field with 12 characters
I wrote a basic function to append the "-" character after the 3rd and 6th digits, and set the input field character limit to 12, so the user can't really submit an incorrect number format
This created a bunch of issues with deleting the number characters, and I spent too long trying to solve them, so I just made tying delete erase the entire number instead of individual characters

This class is AWESOME! THANK YOU!!!
