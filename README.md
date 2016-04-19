# devoxxfr - Keycloak - Tools In Action

These are the demo apps showed during the devoxxfr Keycloak Tools in Action

## Initial setup 
* Maven and npm installed
* Setup a Keycloak server : check different option on http://keycloak.github.io/docs/userguide/keycloak-server/html/server-installation.html#d4e70 and http://keycloak.jboss.org/downloads
* Import the realm provided at the root of this repo ( devoxxrealm.json ) 

## product-app 

`mvn clean wildfly:deploy` 

Access application on `localhost:8080/product-portal` 

## nodejs-service 

`npm start`

## angular-client

`grunt servce`

Access application on `localhost:9000`
