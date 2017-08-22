# wramtas

This is the repository for the code behind http://www.wramtas.org/.

# Set up

In order to begin development on wramtas, you'll need to install some programs.  The latest versions should be fine.
1. NodeJS
2. MongoDB

Run npm install to get all the latest versions of the javascript dependencies.

You'll also need a .env file that lives in the root of the project.  It will require these keys:
1. MAILGUN_API_KEY - The API key for mailgun, which is our email service
2. MAILGUN_DOMAIN - The domain for mailgun, becomes part of the "From" address
3. MONGODB_URI - The URI to the MongoDB you are connecting to
4. PASSPORT_SECRET - A secret key for authenticating using passport
5. ADMIN_USERNAME - Username for the auto-generated admin account
6. ADMIN_PASSWORD - Password for the auto-generated admin account

# Running the web server
The package.json file has three scripts.  Two of them can be used for running the web server.
1. start - Simply starts up the web server. Heroku uses this to host the application.
2. dev-start - Only works on Linux for now.  Starts up MongoDB and web server with auto-reloading.

# Code Standards
We use eslint to ensure that all javascript code is up to our standards.  All code should be checked before merging in order to ensure compliance with the rules in the .eslintrc.json file.  You can lint the whole repo by running npm lint.
