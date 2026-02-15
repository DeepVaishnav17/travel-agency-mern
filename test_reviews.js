const API_URL = 'http://127.0.0.1:5000/api';

async function testReviews() {
    try {
        console.log('1. Submitting Review...');
        const res = await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Bot',
                rating: 5,
                comment: 'This is a test review from script.'
            })
        });

        console.log('Submit Status:', res.status);
        const text = await res.text();
        console.log('Submit Response:', text);

        if (!res.ok) return;

        console.log('2. Fetching Top Reviews...');
        const getRes = await fetch(`${API_URL}/reviews/top`);
        const reviews = await getRes.json();
        console.log('Top Reviews Count:', reviews.length);
        console.log('Latest Review:', reviews[0]);

        const newReview = JSON.parse(text);


        const ADMIN_KEY = 'my-secret-admin-key';
        console.log('3. Deleting Test Review...');
        const delRes = await fetch(`${API_URL}/reviews/${newReview._id}`, {
            method: 'DELETE',
            headers: { 'x-admin-key': ADMIN_KEY }
        });
        console.log('Delete Status:', delRes.status);

    } catch (e) {
        console.error('Test Failed:', e);
    }
}
testReviews();
