// Firebase Firestore reference
const db = firebase.firestore();
let userId = null;

// Wait for auth
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        userId = user.uid;
        loadDailyPlanner();
    } else {
        window.location.href = "index.html";
    }
});

// Save daily planner data
function saveDailyPlanner() {
    if (!userId) return;
    const data = {
        todaysGoals: document.getElementById('todaysGoals').value,
        todoList: Array.from(document.querySelectorAll('#todoList li')).map(li => li.textContent),
        habits: {
            workout: document.getElementById('habitWorkout').checked,
            skincare: document.getElementById('habitSkincare').checked,
            haircare: document.getElementById('habitHaircare').checked
        },
        foodDiary: document.getElementById('foodDiary').value,
        exercise: {
            minutes: document.getElementById('exerciseMinutes').value,
            steps: document.getElementById('exerciseSteps').value
        },
        mood: document.getElementById('mood').value,
        waterIntake: document.getElementById('waterIntake').value,
        sleepHours: document.getElementById('sleepHours').value,
        gratitude: document.getElementById('gratitude').value,
        glowup: {
            workout: document.getElementById('glowWorkout').checked,
            skincare: document.getElementById('glowSkincare').checked,
            haircare: document.getElementById('glowHaircare').checked
        },
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection('users').doc(userId).collection('dailyPlanner')
        .doc(new Date().toISOString().slice(0,10)) // use date as doc ID
        .set(data)
        .then(() => console.log("Daily Planner saved"))
        .catch(err => console.error(err));
}

// Load daily planner data
function loadDailyPlanner() {
    if (!userId) return;
    const docRef = db.collection('users').doc(userId)
        .collection('dailyPlanner')
        .doc(new Date().toISOString().slice(0,10));

    docRef.get().then(doc => {
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('todaysGoals').value = data.todaysGoals || '';
            document.getElementById('foodDiary').value = data.foodDiary || '';
            document.getElementById('exerciseMinutes').value = data.exercise?.minutes || '';
            document.getElementById('exerciseSteps').value = data.exercise?.steps || '';
            document.getElementById('mood').value = data.mood || '';
            document.getElementById('waterIntake').value = data.waterIntake || '';
            document.getElementById('sleepHours').value = data.sleepHours || '';
            document.getElementById('gratitude').value = data.gratitude || '';

            document.getElementById('habitWorkout').checked = data.habits?.workout || false;
            document.getElementById('habitSkincare').checked = data.habits?.skincare || false;
            document.getElementById('habitHaircare').checked = data.habits?.haircare || false;

            document.getElementById('glowWorkout').checked = data.glowup?.workout || false;
            document.getElementById('glowSkincare').checked = data.glowup?.skincare || false;
            document.getElementById('glowHaircare').checked = data.glowup?.haircare || false;

            // Load To-Do List
            const todoList = data.todoList || [];
            document.getElementById('todoList').innerHTML = '';
            todoList.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = todo;
                document.getElementById('todoList').appendChild(li);
            });
        }
    });
}

// To-Do List Add
function addTodo() {
    const todoInput = document.getElementById('newTodo');
    const val = todoInput.value.trim();
    if (!val) return;
    const li = document.createElement('li');
    li.textContent = val;
    document.getElementById('todoList').appendChild(li);
    todoInput.value = '';
    saveDailyPlanner();
}

// Auto-save when fields change
['todaysGoals','foodDiary','exerciseMinutes','exerciseSteps','mood','waterIntake','sleepHours','gratitude',
 'habitWorkout','habitSkincare','habitHaircare','glowWorkout','glowSkincare','glowHaircare'].forEach(id=>{
    const el = document.getElementById(id);
    if(el){
        el.addEventListener('change', saveDailyPlanner);
    }
});
