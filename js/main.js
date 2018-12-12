/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const app = (() => {
  'use strict';

  let swRegistration = null;

  const notifyButton = document.querySelector('.js-notify-btn');
  const pushButton = document.querySelector('.js-push-btn');

  // TODO 2.1 - check for notification support
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!');
    return;
  }

  // TODO 2.2 - request permission to show notifications
  Notification.requestPermission(status => {
    console.log('Notification permission status:', status);
  });

  function displayNotification() {

    // TODO 2.3 - display a Notification
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(reg => {

        // TODO 2.4 - Add 'options' object to configure the notification
        const options = {
          body: 'First notification!',
          icon: 'images/notification-flat.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },

          // TODO 2.5 - add actions to the notification

          // TODO 5.1 - add a tag to the notification

        };

        reg.showNotification('Hello world!', options);
      });
    }

  }



  // TODO 4.2a - add VAPID public key











  notifyButton.addEventListener('click', () => {
    displayNotification();
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log('Service Worker and Push is supported');

      navigator.serviceWorker.register('sw.js')
        .then(swReg => {
          console.log('Service Worker is registered', swReg);

          swRegistration = swReg;

          // TODO 3.3a - call the initializeUI() function
        })
        .catch(err => {
          console.error('Service Worker Error', err);
        });
    });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }

})();
