# Giphy Site

This site is hosted [here](https://ankitrawani.gq/)

## Installation for development
- Clone this repository
- Run ```docker build -t giphy --target dev .``` to build a development container
- Once build is finished, run ```docker run -dp 3000:3000 -v $(pwd):/code giphy```

You'll have your dev container running. You can change the code in any editor and save and it'll reflected in realtime. To view the site, go to http://localhost:3000/ in browser.

## Installation for deployment
- Clone this repository
- Run ```docker build -t giphy --target prod .``` to build a production container
- Once build is finished, run ```docker run -dp 3000:3000 giphy```

You'll have your prod container running. Configure your server (NGINX or Apache) to reverse proxy to port 3000 and you're all set.