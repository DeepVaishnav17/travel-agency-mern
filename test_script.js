const fs = require('fs');

const API_URL = 'http://127.0.0.1:5000/api';
const ADMIN_KEY = 'my-secret-admin-key ';

async function test() {
    try {
        console.log('1. Testing Auth...');
        const verify = await fetch(`${API_URL}/config/verify`, {
            method: 'POST',
            headers: { 'x-admin-key': ADMIN_KEY }
        }).catch(err => {
            console.error("Fetch Error:", err);
            return null;
        });

        if (!verify) {
            console.log("Server unreachable.");
            return;
        }

        console.log('Verify Status:', verify.status);
        if (!verify.ok) {
            console.log('Verify Response:', await verify.text());

        }

        console.log('2. Testing Tour Create...');
        const tourRes = await fetch(`${API_URL}/tours`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-key': ADMIN_KEY
            },
            body: JSON.stringify({
                title: 'Test Tour ' + Date.now(),
                destination: 'Test Dest',
                duration: '1 Day',
                price: 100,
                desc: 'Test Desc',
                mainImage: 'https://via.placeholder.com/150',
                category: "Domestic"
            })
        });
        console.log('Tour Create Status:', tourRes.status);
        const tourText = await tourRes.text();
        console.log('Tour Create Response:', tourText);


        console.log('3. Testing Image Upload...');
        const formData = new FormData();
        const jpgBlob = new Blob(['fake jpg header'], { type: 'image/jpeg' });
        formData.append('image', jpgBlob, 'test.jpg');

        const uploadRes = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: { 'x-admin-key': ADMIN_KEY },
            body: formData
        });
        console.log('Upload Status:', uploadRes.status);
        const uploadText = await uploadRes.text();
        console.log('Upload Response:', uploadText);

        if (tourRes.ok) {
            try {
                const tour = JSON.parse(tourText);
                console.log('Cleaning up tour...');
                await fetch(`${API_URL}/tours/${tour._id}`, {
                    method: 'DELETE',
                    headers: { 'x-admin-key': ADMIN_KEY }
                });
                console.log('Cleanup Done');
            } catch (e) { console.log("Cleanup failed", e); }
        }

    } catch (e) {
        console.error('Test Script Error:', e);
    }
}
test();
