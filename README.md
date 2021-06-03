# Words counter
(Symfony5, Vue3, TypeScript and Webpack5)

## Requirements
- python3
- docker + docker-compose (images list)

    - httpd:2.4-alpine
    - besogon1/php-fpm-dbs
    - memcached:1.6.5-alpine
    - postgres:13-alpine
- npm 6.14
- node v12.16

## Installation
- Automatic installation `python install.py`
- Manual installation

    1. Switch to `docker` folder
    2. Copy file from `.env.dist` to `.env`
    3. Run `python deploy.py`
    4. Attach to PHP container and install composer requirements with command: `./composer.phar i`
    5. Logout from the container and go to `assets` folder
    6. Install Npm libraries with command `npm clean-install`

## Run Project
This project supports 2 modes (development and production)

1. Development Mode command is `python run.py dev`
2. Prod Mode command is `python run.py prod`
3. To Stop Project execute `python run.py -r`



