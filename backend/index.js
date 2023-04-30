
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js';
import {crudlify} from 'codehooks-crudlify';
import { date, object, string, boolean, number } from 'yup';
import jwtDecode from 'jwt-decode';

const SUPER_SPECIAL_KEY = "8BAqznShdrFbS5VisuxXxKpZmDvRL6iE";

const choresYup = object({
  title: string().required(),
  description: string(),
  done: boolean().required().default(false),
  assignedTo: string().required(), // child's user id
  assignedBy: string().required(), // parent's user id
  due: date().required(),
  priority: string().required(),
  imageContent: string(),
  doneOn: date(),
  notified: boolean().required().default(false),
  createdOn: date().required().default(() => new Date())
})

const usersYup = object({
  userId: string().required(),
  name: string().required(),
  isParent: boolean().required(),
})

const childrenYup = object({
  parentId: string().required(),
  childId: string().required(),
  childName: string().required()
})

const pinsYup = object({
  pin: number().required().integer(),
  childId: string().required(),
  childName: string().required(),
  createdOn: date().required().default(() => new Date()),
})

const endPointsYup = object({
  userId: string().required(),
  subscription: string().required()
})


// Kluver Code
const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } 
  catch (error) {
    next(error);
  } 
}
app.use(userAuth)

app.use('/chores', (req, res, next) => {
  if (req.method === "POST" || req.method === "PATCH") {
    req.body.assignedBy = req.user_token.sub
  }
  next();
})

app.use('/children', (req, res, next) => {
  if (req.method === "POST") {
    req.body.parentId = req.user_token.sub
  } 
  else if (req.method === "GET") {
    req.query.parentId = req.user_token.sub
  }
  next();
})

app.use('/users', (req, res, next) => {
  if (req.method === "POST") {
    req.body.userId = req.user_token.sub
  } 
  else if (req.method === "GET") {
    req.query.userId = req.user_token.sub
  }
  next();
})

app.use('/pins', (req, res, next) => {
  if (req.method === "POST") {
    req.body.childId = req.user_token.sub
  } 
  next();
})

/**
 * Had to remove this because the backend server needs to be able to access all chores by ID, I tried to add
 * a second type of authentication for that server but codehooks will kill the whole process if you try to read
 * a query param that isn't in the request. It doesn't support default values like Express does I guess.
 * 
 */

// app.use('/chores/:id', async (req, res, next) => {
//   const id = req.params.id;
//   let secretKey = "null";
//   let userId = "null";
//   // try {
//   //   userId = req.user_token.sub;
//   // } catch(e) {
//   //   userId = null;
//   // }


//   // try {
//   //   key = req.query.key;
//   // } catch(e) {
//   //   key = null;
//   // }
    
//   if (secretKey != SUPER_SPECIAL_KEY) {
//     // Check access rights for the document being read/updated/replaced/deleted
//     const conn = await Datastore.open();
//     try {
//         const doc = await conn.getOne('chores', id)
//         // if (doc.assignedBy != userId) { // doc.userId ???
//         //     // Authenticated user doesn't own this document
//         //     res.status(403).end(); // quit this request
//         //     return
//         // }
//     } catch (e) {
//         console.log(e);
//         res.status(404).end(e);
//         return;
//     }
//   }
//   next();
// })

app.use('/api/returnEndpoints', async (req, res, next) => {
  // default 15 minutes for now
  const timeBeforeDue = 900;

  const conn = await Datastore.open();
  const curTime = new Date();
  const targetTime = new Date(curTime.getTime() + 1000*60*timeBeforeDue);
  log.debug(curTime);
  log.debug(targetTime);
  const query = {"due" : {$gt: curTime, $lt: targetTime}};
  const options = {
    //filter: query,
    limit: 100
  }

  conn.getMany('chores', options).json(res);


})

// Use Crudlify to create a REST API for any collection
crudlify(app, {chores: choresYup, users: usersYup, children: childrenYup, pins: pinsYup, subscribe: endPointsYup});

// Bind to serverless runtime
export default app.init();
