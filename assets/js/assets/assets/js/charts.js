// Firebase reference
const db = firebase.firestore();
let charts = {};

// Initialize Charts
function initCharts() {
    const ctxSteps = document.getElementById('dailyStepsChart').getContext('2d');
    charts.steps = new Chart(ctxSteps, { type:'line', data:{labels:[], datasets:[{label:'Steps', data:[], borderColor:'#3867d6', fill:false}]} });

    const ctxWater = document.getElementById('dailyWaterChart').getContext('2d');
    charts.water = new Chart(ctxWater, { type:'line', data:{labels:[], datasets:[{label:'Water (ml)', data:[], borderColor:'#4b7bec', fill:false}]} });

    const ctxSleep = document.getElementById('dailySleepChart').getContext('2d');
    charts.sleep = new Chart(ctxSleep, { type:'line', data:{labels:[], datasets:[{label:'Sleep Hours', data:[], borderColor:'#34ace0', fill:false}]} });

    const ctxExercise = document.getElementById('dailyExerciseChart').getContext('2d');
    charts.exercise = new Chart(ctxExercise, { type:'line', data:{labels:[], datasets:[{label:'Exercise Minutes', data:[], borderColor:'#33d9b2', fill:false}]} });

    const ctxScreen = document.getElementById('dailyScreenChart').getContext('2d');
    charts.screen = new Chart(ctxScreen, { type:'line', data:{labels:[], datasets:[{label:'Screen Time (min)', data:[], borderColor:'#ff5252', fill:false}]} });

    const ctxSocial = document.getElementById('dailySocialChart').getContext('2d');
    charts.social = new Chart(ctxSocial, { type:'line', data:{labels:[], datasets:[{label:'Social Media (min)', data:[], borderColor:'#ffa502', fill:false}]} });

    const ctxReading = document.getElementById('dailyReadingChart').getContext('2d');
    charts.reading = new Chart(ctxReading, { type:'line', data:{labels:[], datasets:[{label:'Reading Time (min)', data:[], borderColor:'#2ed573', fill:false}]} });

    const ctxSkills = document.getElementById('dailySkillsChart').getContext('2d');
    charts.skills = new Chart(ctxSkills, { type:'line', data:{labels:[], datasets:[{label:'Skill Learning (min)', data:[], borderColor:'#ff7f50', fill:false}]} });

    const ctxGlow = document.getElementById('dailyGlowupChart').getContext('2d');
    charts.glow = new Chart(ctxGlow, { type:'line', data:{labels:[], datasets:[{label:'Glow-Up Habits', data:[], borderColor:'#a29bfe', fill:false}]} });

    const ctxSunlight = document.getElementById('dailySunlightChart').getContext('2d');
    charts.sunlight = new Chart(ctxSunlight, { type:'line', data:{labels:[], datasets:[{label:'Sunlight (min)', data:[], borderColor:'#fffa65', fill:false}]} });
}

// Apply Filter
function applyChartFilter() {
    const startDate = document.getElementById('filterStart').value;
    const endDate = document.getElementById('filterEnd').value;
    const quickFilter = document.getElementById('timeFilter').value;
    loadChartData(startDate, endDate, quickFilter);
}

// Load chart data from Firestore
function loadChartData(startDate, endDate, quickFilter) {
    if (!userId) return;

    const collectionRef = db.collection('users').doc(userId).collection('dailyPlanner');

    collectionRef.get().then(snapshot => {
        const labels = [];
        const stepsData=[], waterData=[], sleepData=[], exerciseData=[],
              screenData=[], socialData=[], readingData=[], skillsData=[],
              glowData=[], sunlightData=[];

        snapshot.forEach(doc=>{
            const data = doc.data();
            const dateStr = doc.id; // YYYY-MM-DD
            labels.push(dateStr);
            stepsData.push(Number(data.exercise?.steps || 0));
            waterData.push(Number(data.waterIntake || 0));
            sleepData.push(Number(data.sleepHours || 0));
            exerciseData.push(Number(data.exercise?.minutes || 0));
            screenData.push(Number(data.screenTime || 0));
            socialData.push(Number(data.socialMedia || 0));
            readingData.push(Number(data.readingTime || 0));
            skillsData.push(Number(data.skillLearning || 0));
            glowData.push(
                (data.glowup?.workout?1:0) +
                (data.glowup?.skincare?1:0) +
                (data.glowup?.haircare?1:0)
            );
            sunlightData.push(Number(data.sunlight || 0));
        });

        // Update charts
        charts.steps.data.labels = labels; charts.steps.data.datasets[0].data = stepsData; charts.steps.update();
        charts.water.data.labels = labels; charts.water.data.datasets[0].data = waterData; charts.water.update();
        charts.sleep.data.labels = labels; charts.sleep.data.datasets[0].data = sleepData; charts.sleep.update();
        charts.exercise.data.labels = labels; charts.exercise.data.datasets[0].data = exerciseData; charts.exercise.update();
        charts.screen.data.labels = labels; charts.screen.data.datasets[0].data = screenData; charts.screen.update();
        charts.social.data.labels = labels; charts.social.data.datasets[0].data = socialData; charts.social.update();
        charts.reading.data.labels = labels; charts.reading.data.datasets[0].data = readingData; charts.reading.update();
        charts.skills.data.labels = labels; charts.skills.data.datasets[0].data = skillsData; charts.skills.update();
        charts.glow.data.labels = labels; charts.glow.data.datasets[0].data = glowData; charts.glow.update();
        charts.sunlight.data.labels = labels; charts.sunlight.data.datasets[0].data = sunlightData; charts.sunlight.update();
    });
}

// Initialize all charts on load
window.onload = () => { initCharts(); applyChartFilter(); }
