import https from 'https';

const host = "astropixel.tech";
const key = "611d3d3f77bf4440b4583708aac5b67b";
const keyLocation = `https://${host}/${key}.txt`;

const urlList = [
  `https://${host}/`,
  `https://${host}/about`,
  `https://${host}/services`,
  `https://${host}/services/logo-brand-identity`,
  `https://${host}/services/branding`,
  `https://${host}/services/ui-ux-design`,
  `https://${host}/services/web-design-development`,
  `https://${host}/services/social-media-design`,
  `https://${host}/work`,
  `https://${host}/contact`,
  `https://${host}/join-team`,
  `https://${host}/courses`
];

const payload = JSON.stringify({
  host,
  key,
  keyLocation,
  urlList
});

console.log("Submitting URLs to IndexNow API...");
console.log("Payload:", payload);

const options = {
  hostname: 'api.indexnow.org',
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`IndexNow Response Status Code: ${res.statusCode} (${res.statusMessage})`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log("SUCCESS: All URLs successfully submitted to IndexNow for instant search engine indexing!");
    } else {
      console.log("Response body:", data);
    }
  });
});

req.on('error', (err) => {
  console.error("Error submitting to IndexNow:", err);
});

req.write(payload);
req.end();
