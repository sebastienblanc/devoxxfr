# devoxxfr - Keycloak - Tools In Action

These are the demo apps showed during the devoxxfr Keycloak Tools in Action.
They are shanelessy inspired by the official Keycloak examples : https://github.com/keycloak/keycloak/tree/master/examples/demo-template

Link to slides :  http://redhat.slides.com/sblanc/deck-2?token=tc_y0a5a#/

## Initial setup 
* Maven and npm installed (and cordova for the hybrid client) 
* Setup a Keycloak server : check different option on http://keycloak.github.io/docs/userguide/keycloak-server/html/server-installation.html#d4e70 and http://keycloak.jboss.org/downloads
* Import the realm provided at the root of this repo ( devoxxrealm.json ) 

Default user : sebi / password 


## product-app 

`mvn clean wildfly:deploy` 

Access application on `localhost:8080/product-portal` 

## nodejs-service 

`npm start`

## angular-client

`grunt serve`

Access application on `localhost:9000`

## hybrid-client

```
mkdir platforms plugins

cordova plugin add org.apache.cordova.inappbrowser

cordova plugin add cordova-plugin-whitelist

cordova platform add android

cordova run android


```

    

