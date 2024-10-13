import fetch from 'node-fetch';

const url = 'https://deleteoldposts-b67h2kof7a-uc.a.run.app';

async function sendRequest() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log('Request successful:', await response.text());
      // Call the function again to send another request
      sendRequest();
    } else {
      console.error('Request failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Start the first request
sendRequest();