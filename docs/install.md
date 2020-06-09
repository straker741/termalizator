# Packages needed:
## System prerequisities:
```
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install -y python3 python3-pip
sudo apt-get install -y git net-tools build-essential file
```

## Node JS
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs
```

# Installing server:
go to folder termalizator/backend, and type:
```
npm install
```
```
sudo apt install nginx
```
Change BASE_PATH in settings.js to:
```
const BASE_PATH = process.env.BASE_PATH || "<path-to-termalizator-base>";
```

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
npm i -S material-table @material-ui/core @material-ui/icons
```

Test: not needed
```
#npm i -D @types/react-dom @types/react
#npm install -g typescript
```