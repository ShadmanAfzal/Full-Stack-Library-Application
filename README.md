# Full Stack Library Application
Full Stack Library Application built with PERN Stack.

## Built on

<div style="display: flex; flex-direction: row;">
<img src="https://cdn.iconscout.com/icon/free/png-256/postgresql-11-1175122.png" height="100">
<img src="https://www.mementotech.in/assets/images/icons/express.png" height="100">
<img src="https://styles.redditmedia.com/t5_2su6s/styles/communityIcon_4g1uo0kd87c61.png" height="100">
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968322.png" height="100">
</div>

## Tech used
1) 🔒 Authentication using passport google oauth 2.0 middleware.
2) 📦 Webpack as module bundler.
3) 📙 Sequelize ORM.
4) 📝 Formik and Yup for form validation.
5) 🐋 Docker

## Setup 

Install docker and docker compose

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

Clone the Repo

```bash
git clone https://github.com/ShadmanAfzal/Full-Stack-Library-Application.git
cd Full-Stack-Library-Application

```

Create docker-compose.yaml file in root directory.

```yaml
version: '3.9'

services:
  server:
    build: .
    ports:
      - '5000:5000'
    expose:
      - 5000
    environment:
      PORT: 5000
      DATABASE_URL: 
      NODE_ENV: 
      SESSION_KEY:
      SESSION_SECRET:
      Client_ID:
      Client_Secret:
      CALLBACK_URL:
  db:
    image: 'postgres'
    environment:
      POSTGRES_PASSWORD:
      POSTGRES_USER: 'postgres'
    volumes:
      - data:/var/lib/postgresql/data

volumes:
  data:
```

Start the docker container

```bash
sudo docker compose up --build -d
```
