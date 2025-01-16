const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const textSpeak = new SpeechSynthesisUtterance(text);

    textSpeak.rate = 1;
    textSpeak.volume = 1;
    textSpeak.pitch = 1;

    window.speechSynthesis.speak(textSpeak);
}

function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning, Boss.");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon, Master.");
    } else {
        speak("Good Evening, Sir.");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        content.textContent = transcript;
        takeCommand(transcript.toLowerCase());
    };

    btn.addEventListener('click', () => {
        content.textContent = "Listening...";
        recognition.start();
    });

    function takeCommand(message) {
        if (message.includes('hey') || message.includes('hello')) {
            speak("Hello Sir, How may I assist you?");
        } else if (message.includes("open google")) {
            window.open("https://google.com", "_blank");
            speak("Opening Google...");
        } else if (message.includes("open youtube")) {
            window.open("https://youtube.com", "_blank");
            speak("Opening YouTube...");
        } else if (message.includes("open facebook")) {
            window.open("https://facebook.com", "_blank");
            speak("Opening Facebook...");
        } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
            speak(`This is what I found on the internet regarding ${message}.`);
        } else if (message.includes('wikipedia')) {
            const searchTerm = message.replace("wikipedia", "").trim();
            window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(searchTerm)}`, "_blank");
            speak(`This is what I found on Wikipedia regarding ${searchTerm}.`);
        } else if (message.includes('time')) {
            const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            speak(`The current time is ${time}.`);
        } else if (message.includes('date')) {
            const date = new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" });
            speak(`Today's date is ${date}.`);
        } else if (message.includes('calculator')) {
            window.open('calc:///', '_blank'); // Note: This may not work as intended in some browsers
            speak("Opening Calculator.");
        } else {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
            speak(`I found some information for ${message} on Google.`);
        }
    }
} else {
    alert('Your browser does not support speech recognition.');
}
