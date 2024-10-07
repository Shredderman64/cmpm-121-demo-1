import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My spectacular game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "This is a button 🙃";
app.append(button);
