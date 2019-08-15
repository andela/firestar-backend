Barefoot Nomad - Making company travel and accomodation easy and convinient.
=======

## Vision
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

---

[![](https://img.shields.io/badge/Hound-Excellent-brightgreen)](https://houndci.com)

[![Build Status](https://travis-ci.org/andela/firestar-backend.svg?branch=stage)](https://travis-ci.org/andela/firestar-backend)


### HOW TO USE THE DOTENV PACKAGE TO SET AND GET ENVIRONMENT VARIABLES
    To setup an environmental variable with dotenv. Follow the steps below.
    - Create a dotenv file `.env` in the root of the project. 
    - Enter your variable name in the following format:
        environment_variable_name=value.

         Example:
        secret=my_secret
        Notice that there are not quotation marks around the value.

     That is all with the setup.
    Now you can get your environmental variable from the process.env object by using `process.env.variable_name` syntax
    Example console.log(process.env.secret) === secret