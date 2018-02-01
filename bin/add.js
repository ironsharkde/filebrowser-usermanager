#! /usr/bin/env node

var request = require("request-promise");
var find = require("lodash/find");

var filebrowser = {
    token: null,
    users: [],
    baseUrl: process.env.FILEBROWSER_BASEURL || "http://localhost",
    adminUsername: process.env.FILEBROWSER_ADMIN_USERNAME || "admin",
    adminPassword: process.env.FILEBROWSER_ADMIN_PASSWORD || "admin",
    newUserUsername: process.argv[2],
    newUserPassword: process.argv[3],
    newUserDirectory: process.argv[4] || "",
    rootDataDirectory: "/srv",

    authenticate: function() {
        return request({
            "method":"POST",
            "uri": filebrowser.baseUrl + "/api/auth/get",
            "json": {
                "username": filebrowser.adminUsername,
                "password": filebrowser.adminPassword
            }
        }).then(function(response) {
            console.log("Authentication successful");
            filebrowser.token = response;
        }, function(){
            throw "Authentication failed";
        });
    },

    loadUsers: function() {
        return request({
            "method": "GET",
            "uri": filebrowser.baseUrl + "/api/users/",
            "headers": {
                "Authorization": "Bearer " + filebrowser.token
            }
        }).then(function(response) {
            filebrowser.users = JSON.parse(response);
            console.log(filebrowser.users.length + " users found");
            return true;
        }, function(){
            throw "Unable to load users";
        });
    },

    removeUser: function() {
        var user = find(filebrowser.users, {username: filebrowser.newUserUsername});

        // skip if user not already exists
        if (!user) {
            return Promise.resolve();
        }

        console.log("User already exists and needs to be deleted");

        // delete user
        return request({
            "method": "DELETE",
            "uri": filebrowser.baseUrl + "/api/users/" + user.ID,
            "headers": {
                "Authorization": "Bearer " + filebrowser.token
            }
        }).then(function() {
            console.log("User successful deleted");
            return true;
        }, function(){
            throw "Unable to delete user";
        });
    },

    addUser: function() {
        return request({
            "method":"POST",
            "uri": filebrowser.baseUrl + "/api/users/",
            "headers": {
                "Authorization": "Bearer " + filebrowser.token
            },
            "json": {
                "what": "user",
                "which": "new",
                "data": {
                    "ID": 0,
                    "username": filebrowser.newUserUsername,
                    "password": filebrowser.newUserPassword,
                    "admin": false,
                    "filesystem": filebrowser.rootDataDirectory + "/" + filebrowser.newUserDirectory,
                    "rules": [

                    ],
                    "css": "",
                    "locale": "",
                    "lockPassword": true,
                    "allowNew": true,
                    "allowEdit": true,
                    "allowCommands": true,
                    "allowPublish": true,
                    "commands": [
                        ""
                    ],
                    "viewMode": "mosaic"
                }
            }
        }).then(function() {
            console.log("User created");
            return true;
        }, function(){
            throw "Unable to create user";
        });
    }
}

function main() {
    return filebrowser.authenticate()
        .then(filebrowser.loadUsers)
        .then(filebrowser.removeUser)
        .then(filebrowser.addUser);
}

if(!filebrowser.newUserUsername || !filebrowser.newUserPassword) {
    console.log("Usage:");
    console.log("filebrowser-user-add [username] [password] [directory]");
    return;
}

main().then(function() {
    console.log("Done...");
}).catch(function(e){
    console.error(e);
    process.exit(1);
});
