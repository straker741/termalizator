# Packages needed:
## System prerequisities:
```
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install -y python3 python3-pip
sudo apt-get install -y git net-tools build-essential file
sudo apt-get install nginx
```

## Node JS
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs
```

## Installing server:
go to folder **termalizator/backend**, and type:
```
npm install
```
Change **BASE_PATH** in **settings.js** to:
```
const BASE_PATH = process.env.BASE_PATH || "<path-to-termalizator-base>";
```

## Installing static files
go to folder **termalizator/frontend**, and type:
```
npm install
```
Change **HOST_URL** in **termalizator/frontend/src/settings.js** to:
```
const BASE_PATH = process.env.BASE_PATH || "<hostname-of-server>";
```
go to folder **termalizator/frontend**, and type:
```
npm run build
sudo cp -r ./build/* ../backend/public/
```

## Installing Package Manager pm2
Check official docs for detailed manual!
```
npm i pm2 -g
```

### Create configuration file for your server.
```
cd /etc/nginx/sites-available
sudo nano termalizator

server {
    listen 80;
    server_name raspi4wifi;
    location / {
        proxy_pass http://localhost:5000/;
    }
}

# check if your configuration is ok
sudo nginx -t

# enable your configuration
sudo ln -s /etc/nginx/sites-available/termalizator /etc/nginx/sites-enabled

# restart nginx
sudo systemctl restart nginx
```

End of Instalation process

# Dev section
## Backend - Express JS
```
npx express-generator
npm install -g express-generator
npm i -D nodemon
npm i -S cors yup find-process
```
## Frontend - React JS:
```
npm i -S formik axios yup
npm i -S react-chartjs-2 chart.js
npm i -S react-router-dom
npm i -S @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core
npm i -S material-table @material-ui/core @material-ui/icons @material-ui/lab
```
