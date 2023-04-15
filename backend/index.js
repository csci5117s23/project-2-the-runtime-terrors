
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';
import jwtDecode from 'jwt-decode';

const choresYup = object({
  content: string().required(),
  done: boolean().required().default(false),
  assignedTo: string().required(), // child's user id
  assignedBy: string().required(), // parent's user id
  due: date().required(),
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

// ???
app.use('/chores', (req, res, next) => {
  if (req.method === "POST" || req.method === "PATCH") {
    req.body.assignedBy = req.user_token.sub
  }
  next();
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {chores: choresYup, users: usersYup, children: childrenYup})

// Bind to serverless runtime
export default app.init();
