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
    console.log(result.json());
    // return await result.json();
}

// Add a chore
export async function addChore(authToken, title, description, assignedTo, due, priority, imageContent) {
    const result = await fetch(backend_base+"/chores/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'title': title, 'description': description, 'assignedTo': assignedTo, 'due': due, 'priority': priority, 'imageContent': imageContent})
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
export async function updateChore(authToken, title, description, assignedTo, due, priority, imageContent, id) {
    const result = await fetch(backend_base+"/chores/"+id,{
        'method':'PATCH',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'title': title, 'description': description, 'assignedTo': assignedTo, 'due': due, 'priority': priority, 'imageContent':imageContent})
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