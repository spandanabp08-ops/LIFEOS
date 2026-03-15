// Firebase references
const storage = firebase.storage();
const db = firebase.firestore();

// Load photos on auth
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        userId = user.uid;
        loadPhotos();
    }
});

// Upload Photo
function uploadPhoto() {
    if (!userId) return alert('Login required');
    const file = document.getElementById('photoUpload').files[0];
    if (!file) return alert('Select a photo');
    const category = document.getElementById('photoCategory').value || 'Uncategorized';
    const notes = document.getElementById('photoNotes').value || '';
    const date = new Date().toISOString().slice(0,10);
    const time = new Date().toLocaleTimeString();

    const uploadRef = storage.ref(`users/${userId}/photos/${Date.now()}_${file.name}`);
    uploadRef.put(file).then(() => {
        uploadRef.getDownloadURL().then(url => {
            db.collection('users').doc(userId).collection('photos').add({
                url, date, time, category, notes
            }).then(() => {
                loadPhotos();
                document.getElementById('photoUpload').value = '';
                document.getElementById('photoCategory').value = '';
                document.getElementById('photoNotes').value = '';
            });
        });
    }).catch(err => alert(err.message));
}

// Load Photos
function loadPhotos() {
    if (!userId) return;
    const timeline = document.getElementById('photoTimeline');
    timeline.innerHTML = '';
    db.collection('users').doc(userId).collection('photos')
        .orderBy('date','desc')
        .get().then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data();
                const div = document.createElement('div');
                div.classList.add('photo-card');
                div.innerHTML = `
                    <img src="${data.url}" width="150">
                    <p><strong>Date:</strong> ${data.date} ${data.time}</p>
                    <p><strong>Category:</strong> ${data.category}</p>
                    <p><strong>Notes:</strong> ${data.notes}</p>
                `;
                timeline.appendChild(div);
            });
        });
}
