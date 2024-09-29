This is my 1st ever project, I recently started programming for the 1st real time about a month ago and decided to start making projects that can both help people and better my understanding of coding. 

Granted, its just a basic stats calculator but could be useful for stats students

The project's front end (written in HTML, CSS, and JavaScript), are hosted on here through GitHub Pages.

The backend (written in Java), is hosted on Heroku.

Here are the code files that are necessary to run the code - https://drive.google.com/drive/folders/1D3xa0z42oJzmfNUSWWU9p8zFXmTaa5if?usp=sharing

I also used Spring Boot framework in the backend to handle web connectivity, enabling the backend services to interact with the frontend by providing RESTful APIs


- CODE STRUCTURE -

I separated all the calculation classes for each metric (Mean, median, range, sample variance, and standard deviation) into a Calculations package

I also made a separate StepsGenerator class to centralize the derivations of the step explanations that are displayed on the right side of the UI after the user does a calculation

Then the rest of the code are just the standard classes needed to properly function with Spring Boot framework

Enjoy :)



PS: The amount of errors I ran into made me rethink my life choices several times 
