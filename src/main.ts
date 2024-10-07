import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "WOW such a good game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
const message = document.createElement("div");
message.innerHTML = `${counter} sarcastic comments`;
app.append(message)

const button = document.createElement("button");
button.innerHTML = "🙃";
button.addEventListener("click", () => {
    message.innerHTML = `${++counter} sarcastic comments`;
})
app.append(button);
