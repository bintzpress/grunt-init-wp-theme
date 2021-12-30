# Readme

## About Me

My name is Brian Bintz. I am a freelance writer, developer, and trainer.
Check out my profile on GitHub for more details on me. If you have issues with this 
project please contact me at brian@bintzpress.com.

## About the Project

This project is a grunt-init template file for a WordPress theme.

It will get you a build environment from which you can build your own themes.

It is designed to work best with my Containerized Wordpress Development Environment
which I will be talking about in a future [Medium](https://medium.com/@bintzpress) 
article.

## Using the Project

To use in your own environment you'll need to do the below.

On Ubuntu using your developer account:

1. Run the below to download the nvm install script
     curl -O https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh
2. Run the install script
     . ./install.sh
3. Install nodejs (I use nodejs version 10.24.1)
     nvm install lts/dubnium
4. Install grunt-cli
     nvm install --global grunt-cli
5. Install grunt-init
     nvm install --global grunt-init
6. Checkout this project to a directory using git

After this you can create WordPress theme projects by:

1. Create the directory to contain the theme project
2. Change into the theme project directory
3. Run the following to create the theme project from the template
    grunt-init THIS_PROJECT_DIR

   NOTE: Replace THIS_PROJECT_DIR with wherever you checked out this git project

The readme.md in the directory created has directions for initializing the theme
project, building, and deploying. The deploy depends on WordPress being in
/var/www/html and using wp-cli.
