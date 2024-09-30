This is my 1st ever project, I recently started programming for the 1st real time about a month ago and decided to start making projects that can both help people and better my understanding of coding. 

This calculator is able to take complex calculations such as sample variance and standard deviation, and return their values instantly, regardless of data sample size.

The project's front end (written in HTML, CSS, and JavaScript), are hosted on here through GitHub Pages.

The backend (written in Java), is hosted on Heroku.

Here are the code files that are necessary to run the code - https://drive.google.com/drive/folders/1D3xa0z42oJzmfNUSWWU9p8zFXmTaa5if?usp=sharing

I also used Spring Boot framework in the backend to handle web connectivity, enabling the backend services to interact with the frontend by providing RESTful APIs


CODE STRUCTURE:

I organized the code into distinct packages and classes so it would be easier to change for updates:

Calculations Package: Each metric (Mean, Median, Range, Sample Variance, and Standard Deviation) has its dedicated calculation class within this package. This separation keeps the calculations organized and isolated from each other.

StepsGenerator Class: This class centralizes the logic for generating step-by-step explanations of calculations, which are displayed on the right side of the UI. It keeps the derivations and explanations managed in one place.

Spring Boot Classes: The remaining classes handle the core functionality needed to work with the Spring Boot framework, such as the controller, application setup, and configurations required for web connectivity.



Enjoy :)

