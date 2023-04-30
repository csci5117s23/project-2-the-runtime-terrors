const applicationServerPublicKey = process.env.VAPID_PUBLIC_KEY;
const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// function needed to convert application key
export function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

 // add a endpoint to server
export async function updateSubscriptionOnServer(authToken, subscriptionPackage){
    const result = await fetch(backend_base+'/subscribe/_byquery?q={"subscription" : ' + JSON.stringify(subscriptionPackage.subscription) + '}',{
        'method':'PATCH',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'userId': subscriptionPackage.userId, 'subscription': subscriptionPackage.subscription})
    })
    let data = await result.json();
    if (data.count == 0) {
        const result = await fetch(backend_base+"/subscribe",{
            'method':'POST',
            'headers': {'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'},
            'body': JSON.stringify({'userId': subscriptionPackage.userId, 'subscription': subscriptionPackage.subscription})
        })
        data = await result.json();
    }
    return data;
}
  