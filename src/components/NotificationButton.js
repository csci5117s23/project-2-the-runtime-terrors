import { useState, useEffect } from "react"
import { getUser } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link'
import { urlB64ToUint8Array, updateSubscriptionOnServer } from "@/modules/Push";

export default function NotificationButton(){ 
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const [loading, setLoading] = useState(true);
    const [isSubscribed, setSubscribed] = useState(false);
    const [swRegistration, setSwReg] = useState(null);
    const applicationServerPublicKey = 'BB0asxSO-QxcyTYK6hTHfj3FEvQwoH_LPmv7HjY3cwUTlnSWe9eLpWDb75SEfaB9TOk75xS89U42Dj4qMmIXBGo';
      
    // Get user info - find out if this is a parent or child account
    useEffect(() => {
      async function notification() {
        if (userId) {
          const token = await getToken({ template: "codehooks" });
          let user = await getUser(token); 
        
          // check and load service worker
          if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('Service Worker and Push is supported');
            navigator.serviceWorker.register('sw.js')
            .then(function(swReg) {
              swReg.pushManager.getSubscription()
              .then(function(subscription) {
                  let isSubscribed = !(subscription === null);
                  setSwReg(swReg);
                  setSubscribed(isSubscribed);
                  // if registration is good, send subscription to server
                  const subscriptionPackage = {
                    userId: userId,
                    subscription: JSON.stringify(subscription)
                }
                  updateSubscriptionOnServer(token, subscriptionPackage);
                  console.log(subscription);
                  if (isSubscribed) {
                      console.log('User IS subscribed.');
                    } else {
                      console.log('User is NOT subscribed.');
                  }
              })
            })
            .catch(function(error) {
              console.error('Service Worker Error', error);
            });
          } else {
            console.warn('Push messaging is not supported');
          }

          setLoading(false);
        }
      }
      notification();
    }, []);

    // do something to check if isSubscribed

    async function setupSubscription() {
        const token = await getToken({ template: "codehooks" });
        if (!isSubscribed) {
            console.log(applicationServerPublicKey);
            const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
        
            // register service 
            swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            })
            .then(function(subscription) {
                console.log('New user is subscribed.');
        
                // if registration is good, send subscription to server
                const subscriptionPackage = {
                    userId: userId,
                    subscription: JSON.stringify(subscription)
                }
                updateSubscriptionOnServer(token, subscriptionPackage);
            })
            .catch(function(err) {
                console.log('Failed to subscribe the user: ', err);
                return false;
            });
        }
    }
    
    return <>
    <Link href='#' onClick={setupSubscription}><img className="icon" src="bell.png" alt="Notifications"></img></Link>
    </>
}