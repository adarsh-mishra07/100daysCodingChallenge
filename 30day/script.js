/* 
  Chat App JS
  - Firebase mode: realtime multi-user (requires firebase config + uncomment SDK in index.html)
  - Local mode: messages stored in localStorage for demo (single-machine)
*/

/* ----------------- USER / MODE SETUP ----------------- */
const loginSection = document.getElementById('loginSection');
const chatSection = document.getElementById('chatSection');
const enterBtn = document.getElementById('enterBtn');
const leaveBtn = document.getElementById('leaveBtn');
const usernameInput = document.getElementById('usernameInput');
const messagesDiv = document.getElementById('messages');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const modeSelect = document.getElementById('modeSelect');
const modeLabel = document.getElementById('modeLabel');

let username = "";
let mode = "local"; // default
let firebaseDB = null; // will hold firebase.database() if initialized
const LOCAL_STORAGE_KEY = "chat_demo_messages";

/* --------- OPTIONAL: Firebase CONFIG (replace with your values) ---------
To use the realtime feature:
1. Create Firebase project -> Realtime Database (mode: test for dev)
2. Get config from Firebase console and paste below
3. Uncomment Firebase SDK lines in index.html

const firebaseConfig = {
  apiKey: "API_KEY_HERE",
  authDomain: "PROJECT.firebaseapp.com",
  databaseURL: "https://PROJECT-default-rtdb.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
-------------------------------------------------------------------------*/

// Try to initialize firebase if config present (user should paste their config)
function tryInitFirebase() {
    if (typeof firebase !== "undefined" && typeof firebase.initializeApp === "function") {
        // if user added firebaseConfig object in window (uncomment below)
        if (window.firebaseConfig) {
            firebase.initializeApp(window.firebaseConfig);
            firebaseDB = firebase.database();
            console.log("Firebase initialized.");
        } else {
            console.log("Firebase SDK found but firebaseConfig not set. Using local mode.");
        }
    }
}

// call at load
tryInitFirebase();

/* ----------------- UI CONTROL ----------------- */
modeSelect.addEventListener("change", () => {
    mode = modeSelect.value;
    modeLabel.innerText = `Mode: ${mode === "firebase" ? "Firebase (Realtime)" : "Local (Demo)"}`;
});

enterBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if (!name) { alert("Please enter your name."); return; }
    username = name;
    mode = modeSelect.value;
    loginSection.style.display = "none";
    chatSection.style.display = "block";
    modeLabel.innerText = `Mode: ${mode === "firebase" ? "Firebase (Realtime)" : "Local (Demo)"}`;

    if (mode === "firebase") {
        // try Firebase init again (in case user added config after load)
        tryInitFirebase();
        if (!firebaseDB) {
            alert("Firebase not configured. Please add your firebaseConfig in script.js and include SDK scripts in index.html.");
            // fallback to local
            mode = "local";
            modeLabel.innerText = "Mode: Local (fallback)";
        } else {
            startFirebaseListener();
        }
    }

    if (mode === "local") {
        renderLocalMessages();
    }
});

/* ----------------- SENDING MESSAGES ----------------- */
messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (!text) return;
    const msgObj = {
        user: username,
        text,
        ts: Date.now()
    };

    if (mode === "firebase" && firebaseDB) {
        // push to firebase realtime db
        firebaseDB.ref('messages').push(msgObj);
    } else {
        // local storage mode
        const arr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
        arr.push(msgObj);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arr));
        appendMessage(msgObj, true);
    }

    messageInput.value = "";
});

/* ----------------- LOCAL STORAGE RENDER ----------------- */
function renderLocalMessages() {
    messagesDiv.innerHTML = "";
    const arr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    arr.forEach(m => appendMessage(m, m.user === username));
    // scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* ----------------- APPEND MESSAGE TO UI ----------------- */
function appendMessage(msgObj, isYou) {
    const div = document.createElement('div');
    div.classList.add('msg');
    div.classList.add(isYou ? 'you' : 'other');

    const meta = document.createElement('div');
    meta.className = 'meta';
    const time = new Date(msgObj.ts).toLocaleTimeString();
    meta.innerText = `${msgObj.user} • ${time}`;

    const text = document.createElement('div');
    text.innerText = msgObj.text;

    div.appendChild(meta);
    div.appendChild(text);
    messagesDiv.appendChild(div);
    // auto scroll
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* ----------------- FIREBASE REALTIME LISTENER ----------------- */
function startFirebaseListener() {
    if (!firebaseDB) return;
    messagesDiv.innerHTML = "<div class='meta'>Connecting to Firebase...</div>";
    // listen for child_added events
    firebaseDB.ref('messages').limitToLast(100).on('child_added', snapshot => {
        const msgObj = snapshot.val();
        // determine if message is from current user
        const isYou = msgObj.user === username;
        appendMessage(msgObj, isYou);
    });
}

/* ----------------- LEAVE CHAT ----------------- */
leaveBtn.addEventListener("click", () => {
    username = "";
    loginSection.style.display = "flex";
    chatSection.style.display = "none";
    messagesDiv.innerHTML = "";
    if (firebaseDB && mode === "firebase") {
        // remove firebase listeners to avoid multiple attachments
        firebaseDB.ref('messages').off();
    }
});
