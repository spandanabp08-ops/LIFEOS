/* Firebase Authentication Logic */
const auth = firebase.auth();

// Google Login
document.getElementById('googleLogin')?.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(() => window.location.href = 'dashboard.html')
        .catch(err => alert(err.message));
});

// Email/Password Login
document.getElementById('loginBtn')?.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) return alert('Enter email and password');
    auth.signInWithEmailAndPassword(email, password)
        .then(() => window.location.href = 'dashboard.html')
        .catch(err => alert(err.message));
});

// Sign Up
document.getElementById('signupBtn')?.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) return alert('Enter email and password');
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert('User created! Login now.'))
        .catch(err => alert(err.message));
});

// Forgot Password
document.getElementById('forgotPassword')?.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    if (!email) return alert('Enter your email first');
    auth.sendPasswordResetEmail(email)
        .then(() => alert('Password reset email sent!'))
        .catch(err => alert(err.message));
});
