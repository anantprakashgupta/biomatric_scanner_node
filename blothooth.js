const wifi = require('node-wifi');

// Function to connect to a Wi-Fi network
function connectToWifi(ssid, password) {
  wifi.connect({ ssid, password }, (error) => {
    if (error) {
      console.error('Error connecting to Wi-Fi network:', error);
    } else {
      console.log('Connected to Wi-Fi network:', ssid);
    }
  });
}

// Example usage:
const ssid = 'Your_WiFi_SSID';
const password = 'Your_WiFi_Password';

connectToWifi(ssid, password);
