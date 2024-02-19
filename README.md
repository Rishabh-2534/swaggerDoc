# API Gateway

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1d6a47b460dc483998d25a2d4d19e5c5)](https://www.codacy.com?utm_source=bitbucket.org&amp;utm_medium=referral&amp;utm_content=simpplr/api-gateway-n&amp;utm_campaign=Badge_Grade)

API Extensibility centre to encapsulate all salesforce modules

1.  Alerts
2.  Content
3.  Carousel
4.  Notification
5.  People
6.  Search
7.  Site

## Linting

Use [eslint](https://sourcelevel.io/blog/how-to-setup-eslint-and-prettier-on-node) to setup the linting rules

## Branching convention

Production Branch - master

Release Branches (Architects & Dev Lead) - release/<release-name>

Non Release Branch (Developer) <(feature, bugfix, hotfix)>/<ticket\*id>\_<name> Eg: SV2-36658_code_refactor

## File/Variable naming convention

File naming convention <module*name>*<action> Eg: alerts_routes.js

Variable naming convention - Camel Casing

Function - ES6 Arrow functions

## Local Setup

1.  Install node(v14.17.4) and npm(7.20.6) using nvm [link](https://heynode.com/tutorial/install-nodejs-locally-nvm/)
2.  Take pull of the code
3.  Install dependencies (npm install)
4.  Run server.js for gateway (node server.js) and scripts/service.js for express APIs (node scripts/service.js)

Server should run on http://localhost:3001

## Logs

Process manager - PM2

List Process IDs - pm2 ls

Tail Logs - pm2 logs <process_id>
