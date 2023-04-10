const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;


export async function getChores(authToken, done) {
    const result = await fetch(backend_base+"/chores?sort=createdOn&done="+done,{
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

export async function addChore(authToken, content, assignedTo, due) {
    const result = await fetch(backend_base+"/chores/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'content': content, 'assignedTo': assignedTo, 'due': due} )
        })
    return await result.json();
}