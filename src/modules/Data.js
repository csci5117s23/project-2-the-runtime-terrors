const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Get chores assigned by this parent
export async function getChoresParent(authToken, done, userId) {
    const result = await fetch(backend_base+"/chores?sort=createdOn&done="+done+"&assignedBy="+userId,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Get chores assigned to this child
export async function getChoresChild(authToken, done, userId) {
    const result = await fetch(backend_base+"/chores?sort=createdOn&done="+done+"&assignedTo="+userId,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Get a specific chore by id
export async function getChore(authToken, id) {
    const result = await fetch(backend_base+"/chores/"+id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })

    return await result.json();
}

// Get all chores assigned to this parent
export async function getChoresParentAll(authToken, userId) {
    const result = await fetch(backend_base+"/chores?sort=createdOn&assignedBy="+userId,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Get all chores assigned to this child
export async function getChoresChildAll(authToken, userId) {
    const result = await fetch(backend_base+"/chores?sort=createdOn&assignedTo="+userId,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Filter chores
export async function getFilteredChores(authToken, status, priority, userInfo) {
    const result = await fetch(backend_base+"/chores?sort=due&"+status+priority+userInfo,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Add a chore
export async function addChore(authToken, title, description, assignedTo, due, priority) {
    const result = await fetch(backend_base+"/chores/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'title': title, 'description': description, 'assignedTo': assignedTo, 'due': due, 'priority': priority})
        })
    return await result.json();
}


// Delete a chore
export async function deleteChore(authToken, id) {
    const result = await fetch(backend_base+"/chores/"+id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Update Chore
export async function updateChore(authToken, title, description, assignedTo, due, priority, id) {
    const result = await fetch(backend_base+"/chores/"+id,{
        'method':'PATCH',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'title': title, 'description': description, 'assignedTo': assignedTo, 'due': due, 'priority': priority})
        })
    return await result.json();
}

// Complete Chore
export async function completeChore(authToken, status, imageContent, date, id) {
    const result = await fetch(backend_base+"/chores/"+id,{
        'method':'PATCH',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'done': status, 'imageContent': imageContent, 'doneOn': date})
        })
    return await result.json();
}

// Get children of this user (parent)
export async function getChildren(authToken){
    const result = await fetch(backend_base+"/children/",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Get a child of this user (by id) (parent)
export async function getChild(authToken, id){
    const result = await fetch(backend_base+"/children?childId="+id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Add a child to this user's account
export async function addChild(authToken, name, id){
    const result = await fetch(backend_base+"/children/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'childName': name, 'childId': id})
    })
    return await result.json();
}

// Add a user account
export async function addUser(authToken, name, isParent){
    const result = await fetch(backend_base+"/users/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'name': name, 'isParent': isParent})
    })
    return await result.json();
}

// Get a specific user by id
export async function getUser(authToken) {
    const result = await fetch(backend_base+"/users/",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Get pin data 
export async function getPin(authToken, pin) {
    const result = await fetch(backend_base+"/pins/?pin="+pin,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Add a pin 
export async function addPin(authToken, pin, childName){
    const result = await fetch(backend_base+"/pins/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'pin': pin, 'childName': childName})
    })
    let data = await result.json();
    // setTimeout(deletePin, 180000, authToken, id)
    // auth token will already be expired  ???
    return data;
}

// Delete a pin data 
export async function deletePin(authToken, id) {
    const result = await fetch(backend_base+"/pins/"+id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken}
        // 'headers': {'x-apikey': API_KEY} ???
    })
    return await result.json();
}