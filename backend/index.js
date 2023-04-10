
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';
import jwtDecode from 'jwt-decode';


// ADD USER_ID ???
const choresYup = object({
    //userId: string().required(),
    content: string().required(),
    done: boolean().required().default(false),
    assignedTo: string().required(),
    assignedBy: string().required(),
    due: date().required(),
    createdOn: date().required().default(() => new Date()),
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {chores: choresYup})

// bind to serverless runtime
export default app.init();
