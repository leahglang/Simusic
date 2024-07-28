var isStarted = false;
const startGameBtn = document.getElementById('startGame');
var isClickInLevel = false;
var indexInLevel;
var selectedArr;
var point = 0;
//מספר הלחיצה של היוזר בשלב
var userSelectedIndex;
var lastLevel;
var secondes;
var moves;
var onSound;

//המערך שמכיל את מה שהוגרל
let arr = [
    { id: 12, classOfKey: "c", audioId: "ckey12", keyId: "key12" },
    { id: 11, classOfKey: "c1", audioId: "ckey11", keyId: "key11" },
    { id: 10, classOfKey: "d", audioId: "dkey10", keyId: "key10" },
    { id: 9, classOfKey: "d1", audioId: "dkey9", keyId: "key9" },
    { id: 8, classOfKey: "e", audioId: "ekey8", keyId: "key8" },
    { id: 7, classOfKey: "f", audioId: "fkey7", keyId: "key7" },
    { id: 6, classOfKey: "f1", audioId: "fkey6", keyId: "key6" },
    { id: 5, classOfKey: "g", audioId: "gkey5", keyId: "key5" },
    { id: 4, classOfKey: "g1", audioId: "gkey4", keyId: "key4" },
    { id: 3, classOfKey: "a", audioId: "akey3", keyId: "key3" },
    { id: 2, classOfKey: "a1", audioId: "akey2", keyId: "key2" },
    { id: 1, classOfKey: "b", audioId: "bkey1", keyId: "key1" },];


function sound(id, userClick = false) {

    if (isStarted == true) {

        if (userClick === false || (userClick === true && (userSelectedIndex < selectedArr.length))) {
            if (userClick === true) {
                isClickInLevel = true;
                if (id !== selectedArr[userSelectedIndex]) {
                    //אם לחץ לא נכון
                    gameOver();
                    return;
                }
                userSelectedIndex++;
            }
            //השמעת הקובץ
            if (onSound === false || userClick === false) {

                let elementInArr = arr.filter(item => item.id === id);
                let specificElementInArr;
                let keyElement;
                let audioElement;
                if (elementInArr && elementInArr.length > 0) {
                    specificElementInArr = elementInArr[0];

                    keyElement = document.getElementById(specificElementInArr.keyId);
                    audioElement = document.getElementById(specificElementInArr.audioId);

                    audioElement.src = '../audio/' + specificElementInArr.audioId + '.mp3';
                    keyElement.classList.add(specificElementInArr.classOfKey);
                    audioElement.play();
                }
                setTimeout(() => {
                    keyElement.classList.remove(specificElementInArr.classOfKey);
                }, 500);
            }
        }
        else {
            //נלחץ יותר מהשלב
            gameOver();

        }
    }
}



//  ---פונקציית התחלה---
function startTheGame() {
    if (isStarted === false) {
        if (moves) {
            clearInterval(moves);
        }
        isStarted = true;
        //מאפס את הנקודות
        noPoints();
        //מקסימום השלבים במשחק
        lastLevel = 13;
        //האם אני בתהליך של השמעה כדי לא לאפשר ליוזר ללחוץ תוך כדי
        onSound = true;
        //בתחילת שלב מאתחלים את האינדקס של הלחיצה של היזור
        userSelectedIndex = 0;
        //מערך שמכיל את הקלידים הבחורים לפי הסדר
        selectedArr = [];
        // הזמן ללחיצה
        secondes = 3000;
        //בפעם הראשונה מגרילים ויקרה מיד בלי לחכות 7 שניות
        initRandom();
        //אחרי השמעה ראשונה מאפשרים למשתמש ללחןץ
        onSound = false;
        //יקרה כל 7 שניות
        moves = setInterval(function () {
            gameDuration();
        }, secondes);
    }
}



async function gameDuration() {
    clearInterval(moves);
    secondes = secondes + 1500;
    userSelectedIndex = 0;
    if (isClickInLevel) {
        //מתחיל תהליך השמעה - יחסום לחיצה של משתמש
        onSound = true;
        //מאתחלים אינדקס של לחיצה של משתמש
        userSelectedIndex = 0;
        //איפוס אינדקס בתוך השלב
        indexInLevel = 0;
        const timer = ms => new Promise(res => setTimeout(res, ms));
        //ריצה על כל המערך שכבר הבהב והשהיה של חצי שניה בין השמעה להשמעה
        for (let index = 0; index < selectedArr.length; index++) {
            sound(selectedArr[index]);
            indexInLevel++;
            await timer(500);
        }
        //הגרלה של אחד חדש
        if (selectedArr.length > 0) {
            initRandom();
        }
        //הפסקת תהליך השמעה ואפשור לחיצה ליוזר
        onSound = false;
        addPoints();
        isClickInLevel = false;
        moves = setInterval(async function () {
            gameDuration();
        }, secondes);
    }
    else {
        //אם הוא לא לחץ 
        gameOver();
    }
}



// הגרלת מספר רנדומלי חדש והכנסתו למערך של הרצפים הקודמים
function initRandom() {
    let id = Math.floor(Math.random() * 12 + 1);
    selectedArr.push(id);
    sound(id);
}



// נגמר המשחק
function gameOver() {
    clearInterval(moves);
    let wrongAudio;
    wrongAudio = document.getElementById('fail');
    wrongAudio.src = "../audio/wrong_choice.wav";
    wrongAudio.play();
    isStarted = false;
}


//פונקציה שמוסיפה נקודות
function addPoints() {
    point += selectedArr.length;
    document.getElementById('points').innerHTML = point;
}

//מאפסת את הנקודות כשמתחיל משחק חדש
function noPoints() {
    point = 0;
    document.getElementById('points').innerHTML = point;
}


// כפתורים כדי לעבור דפים
// יוצא מהמשתמש
function logOut() {
    localStorage.removeItem('curentUser');
    window.location = "log in.html";
}

function goHome() {
    window.location = "home.html";
}

function instraction() {
    window.location = "instractions.html";
}

// var isStarted = false;
// const startGameBtn = document.getElementById('startGame');
// var isClickInLevel = false;
// var indexInLevel;
// var selectedArr;
// var point = 0;
// //מספר הלחיצה של היוזר בשלב
// var userSelectedIndex;
// var lastLevel;
// var secondes;
// var moves;
// var onSound;

// //המערך שמכיל את מה שהוגרל
// let arr = [
//     { id: 12, classOfKey: "c", audioId: "ckey12", keyId: "key12" },
//     { id: 11, classOfKey: "c1", audioId: "ckey11", keyId: "key11" },
//     { id: 10, classOfKey: "d", audioId: "dkey10", keyId: "key10" },
//     { id: 9, classOfKey: "d1", audioId: "dkey9", keyId: "key9" },
//     { id: 8, classOfKey: "e", audioId: "ekey8", keyId: "key8" },
//     { id: 7, classOfKey: "f", audioId: "fkey7", keyId: "key7" },
//     { id: 6, classOfKey: "f1", audioId: "fkey6", keyId: "key6" },
//     { id: 5, classOfKey: "g", audioId: "gkey5", keyId: "key5" },
//     { id: 4, classOfKey: "g1", audioId: "gkey4", keyId: "key4" },
//     { id: 3, classOfKey: "a", audioId: "akey3", keyId: "key3" },
//     { id: 2, classOfKey: "a1", audioId: "akey2", keyId: "key2" },
//     { id: 1, classOfKey: "b", audioId: "bkey1", keyId: "key1" },];


// function sound(id, userClick = false) {

//     if (isStarted == true) {

//         if (userClick === false || (userClick === true && (userSelectedIndex < selectedArr.length))) {
//             if (userClick === true) {
//                 isClickInLevel = true;
//                 if (id !== selectedArr[userSelectedIndex]) {
//                     //אם לחץ לא נכון
//                     gameOver();
//                     return;
//                 }
//                 userSelectedIndex++;
//             }
//             //השמעת הקובץ
//             if (onSound === false || userClick === false) {

//                 let elementInArr = arr.filter(item => item.id === id);
//                 let specificElementInArr;
//                 let keyElement;
//                 let audioElement;
//                 if (elementInArr && elementInArr.length > 0) {
//                     specificElementInArr = elementInArr[0];

//                     keyElement = document.getElementById(specificElementInArr.keyId);
//                     audioElement = document.getElementById(specificElementInArr.audioId);

//                     audioElement.src = '../audio/' + specificElementInArr.audioId + '.mp3';
//                     keyElement.classList.add('glow');
//                     audioElement.play();
//                 }
//                 setTimeout(() => {
//                     keyElement.classList.remove('glow');
//                 }, 500);
//             }
//         }
//         else {
//             //נלחץ יותר מהשלב
//             gameOver();

//         }
//     }
// }



// //  ---פונקציית התחלה---
// function startTheGame() {
//     if (isStarted === false) {
//         if (moves) {
//             clearInterval(moves);
//         }
//         isStarted = true;
//         //מאפס את הנקודות
//         noPoints();
//         //מקסימום השלבים במשחק
//         lastLevel = 13;
//         //האם אני בתהליך של השמעה כדי לא לאפשר ליוזר ללחוץ תוך כדי
//         onSound = true;
//         //בתחילת שלב מאתחלים את האינדקס של הלחיצה של היזור
//         userSelectedIndex = 0;
//         //מערך שמכיל את הקלידים הבחורים לפי הסדר
//         selectedArr = [];
//         // הזמן ללחיצה
//         secondes = 3000;
//         //בפעם הראשונה מגרילים ויקרה מיד בלי לחכות 7 שניות
//         initRandom();
//         //אחרי השמעה ראשונה מאפשרים למשתמש ללחןץ
//         onSound = false;
//         //יקרה כל 7 שניות
//         moves = setInterval(function () {
//             gameDuration();
//         }, secondes);
//     }
// }



// async function gameDuration() {
//     clearInterval(moves);
//     secondes = secondes + 1500;
//     userSelectedIndex = 0;
//     if (isClickInLevel) {
//         //מתחיל תהליך השמעה - יחסום לחיצה של משתמש
//         onSound = true;
//         //מאתחלים אינדקס של לחיצה של משתמש
//         userSelectedIndex = 0;
//         //איפוס אינדקס בתוך השלב
//         indexInLevel = 0;
//         const timer = ms => new Promise(res => setTimeout(res, ms));
//         //ריצה על כל המערך שכבר הבהב והשהיה של חצי שניה בין השמעה להשמעה
//         for (let index = 0; index < selectedArr.length; index++) {
//             sound(selectedArr[index]);
//             indexInLevel++;
//             await timer(500);
//         }
//         //הגרלה של אחד חדש
//         if (selectedArr.length > 0) {
//             initRandom();
//         }
//         //הפסקת תהליך השמעה ואפשור לחיצה ליוזר
//         onSound = false;
//         addPoints();
//         isClickInLevel = false;
//         moves = setInterval(async function () {
//             gameDuration();
//         }, secondes);
//     }
//     else {
//         //אם הוא לא לחץ 
//         gameOver();
//     }
// }



// // הגרלת מספר רנדומלי חדש והכנסתו למערך של הרצפים הקודמים
// function initRandom() {
//     let id = Math.floor(Math.random() * 12 + 1);
//     selectedArr.push(id);
//     sound(id);
// }



// // נגמר המשחק
// function gameOver() {
//     clearInterval(moves);
//     let wrongAudio;
//     wrongAudio = document.getElementById('fail');
//     wrongAudio.src = "../audio/wrong_choice.wav";
//     wrongAudio.play();
//     isStarted = false;
// }


// //פונקציה שמוסיפה נקודות
// function addPoints() {
//     point += selectedArr.length;
//     document.getElementById('points').innerHTML = point;
// }

// //מאפסת את הנקודות כשמתחיל משחק חדש
// function noPoints() {
//     point = 0;
//     document.getElementById('points').innerHTML = point;
// }


// // כפתורים כדי לעבור דפים
// // יוצא מהמשתמש
// function logOut() {
//     localStorage.removeItem('curentUser');
//     window.location = "log in.html";
// }

// function goHome() {
//     window.location = "home.html";
// }

// function instruction() {
//     window.location = "instructions.html";
// }
