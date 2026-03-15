// Firebase reference
const db = firebase.firestore();

// Save additional trackers
function saveTracker(trackerName, value) {
    if (!userId) return;
    const today = new Date().toISOString().slice(0,10);
    const docRef = db.collection('users').doc(userId).collection('dailyPlanner').doc(today);

    const updateData = {};
    updateData[trackerName] = value;

    docRef.set(updateData, { merge: true })
        .then(() => console.log(`${trackerName} saved`))
        .catch(err => console.error(err));
}

// Example: Reading Tracker
document.getElementById('readingTime')?.addEventListener('change', (e) => {
    saveTracker('readingTime', Number(e.target.value));
});

// Example: Skill Learning Tracker
document.getElementById('skillLearning')?.addEventListener('change', (e) => {
    saveTracker('skillLearning', Number(e.target.value));
});

// Example: Screen Time Tracker
document.getElementById('screenTime')?.addEventListener('change', (e) => {
    saveTracker('screenTime', Number(e.target.value));
});

// Example: Social Media Tracker
document.getElementById('socialMediaTime')?.addEventListener('change', (e) => {
    saveTracker('socialMedia', Number(e.target.value));
});
