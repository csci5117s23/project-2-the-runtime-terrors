// requirements
const webpush = require('web-push');
const dotenv = require('dotenv');
const cron = require("node-cron");
const fetch = require("node-fetch");
// local requirements
const constants = require('./constants');

// enviroment variables
dotenv.config()
const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

// setup push notification service
webpush.setVapidDetails('mailto:contact@doyourchores.com', 
                        publicVapidKey, 
                        privateVapidKey);





async function queryNotificationEndpoints() {
    // call the endpoints.
    function handleSuccess(success, index, chore) {
        
        chore.notified = true;

        fetch("https://backend-1zr3.api.codehooks.io/dev/chores/" + chore._id, {
            'method': 'patch',
            'headers': {'x-api-key' : '36ab01e0-e919-4a1a-9ae1-4193ea79fa55',
            'Content-Type': 'application/json'},
            'body': JSON.stringify(chore)
        }).then( (res_json) => {
            res_json.json().then( (resJson) => {
                console.log(resJson);
            });
        });

        res.send(constants.messages.SINGLE_PUBLISH_SUCCESS_MESSAGE);

    }

    function handleError(error, index) {
        console.log('Push send error: ', error);
    }

    function sendNotifications(endpoints, chore) {
        endpoints.map((endpoint, index) => {
            let subJson = JSON.parse(endpoint.subscription);
            webpush.sendNotification(subJson, JSON.stringify({
                notificationMessage: chore.description,
                notificationTitle: chore.title,
                notificationLink: "https://main--incredible-tulumba-63afdc.netlify.app/home"
            }))
            .then((success) => handleSuccess(success, index, chore))
            .catch((error) => handleError(error, index));
        });
    }

    const chore_json = await fetch("https://backend-1zr3.api.codehooks.io/dev/api/returnEndpoints", {
        method: 'get',
        headers: {'x-api-key' : '36ab01e0-e919-4a1a-9ae1-4193ea79fa55'}
    });

    const chores = await chore_json.json();

    chores.forEach( (chore) => {
        if (!chore.notified && !chore.done) {
            console.log(chore.assignedTo);
            fetch("https://backend-1zr3.api.codehooks.io/dev/subscribe?userId=" + chore.assignedTo, {
                method: 'get',
                headers: {'x-api-key' : '36ab01e0-e919-4a1a-9ae1-4193ea79fa55'}
            }).then( (res_json) => {
                res_json.json().then( (resJson) => {
                    sendNotifications(resJson, chore);
                });
            });
        }
    });
}

cron.schedule('*/10 * * * * *', queryNotificationEndpoints);