const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getChoresParent(authToken, done, userId) {
    const result = await fetch(backend_base+"/chores?sort=createdOn&done="+done+"&assignedBy="+userId,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getChoresChild(authToken, done) {
    const result = await fetch(backend_base+"/chores?sort=createdOn&done="+done+"&assignedTo="+userId,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getChore(authToken, id) {
    const result = await fetch(backend_base+"/chores/"+id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function addChore(authToken, title, description, due, assignedTo, priority) {
    const result = await fetch(backend_base+"/chores/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'title': title, 'description': description, 'due': due, 'assignedTo': assignedTo, 'priority': priority})
        })
    return await result.json();
}

export async function getChildren(authToken){
    const result = await fetch(backend_base+"/children/",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function addUser(authToken, name, isParent){
    const result = await fetch(backend_base+"/users/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'name': name, 'isParent': isParent})
    })
    return await result.json();
}