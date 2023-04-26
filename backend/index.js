
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean, number } from 'yup';
import jwtDecode from 'jwt-decode';

const choresYup = object({
  title: string().required(),
  description: string(),
  done: boolean().required().default(false),
  assignedTo: string().required(), // child's user id
  assignedBy: string().required(), // parent's user id
  due: date().required(),
  priority: string().required(),
  doneOn: date(),
  createdOn: date().required().default(() => new Date()),
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

app.use('/chores/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub
  // Check access rights for the document being read/updated/replaced/deleted
  const conn = await Datastore.open();
  try {
      const doc = await conn.getOne('chores', id)
      if (doc.assignedBy != userId) { // doc.userId ???
          // Authenticated user doesn't own this document
          res.status(403).end(); // quit this request
          return
      }
  } catch (e) {
      console.log(e);
      res.status(404).end(e);
      return;
  }
  next();
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {chores: choresYup, users: usersYup, children: childrenYup, pins: pinsYup})

// Bind to serverless runtime
export default app.init();
