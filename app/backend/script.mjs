import fetch from 'node-fetch';

const url = 'https://deleteoldposts-b67h2kof7a-uc.a.run.app';
const url2 = 'https://deleteoldusers-b67h2kof7a-uc.a.run.app';

// async function sendRequest() {
//   try {
//     const response = await fetch(url);
//     if (response.ok) {
//       console.log('Request successful:', await response.text());
//       // Call the function again to send another request
//       sendRequest();
//     } else {
//       console.error('Request failed:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
var count = 0;
async function sendRequest2() {
  const startTime = Date.now(); // Capture the start time

  try {
    const response = await fetch(url2);
    const endTime = Date.now(); // Capture the end time

    if (response.ok) {
      count++;
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Calculate time taken in seconds
      const responseText = await response.text();
      console.log(`${count} Request successful in ${timeTaken} seconds: ${responseText}`);
      // Call the function again to send another request
      sendRequest2();
    } else {
      console.error('Request failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Start the first request
sendRequest2();