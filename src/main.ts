import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "WOW such a good game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter = 0;
const message = document.createElement("div");
message.innerHTML = `${counter} sarcastic comments`;
app.append(message);

const status_rate = document.createElement("div");
app.append(status_rate);

const button = document.createElement("button");
button.innerHTML = "🙃";
button.addEventListener("click", makeComment);
app.append(button);

const upgrade = document.createElement("button");
upgrade.innerHTML = "10 bob";
upgrade.addEventListener("click", updateGrowth);
app.append(upgrade);

function makeComment() {
  message.innerHTML = `${++counter} sarcastic comments`;
}

const UPGRADE_COST = 10;
function updateGrowth() {
  counter -= UPGRADE_COST;
  growth_rate++;
}

const PER_SECOND = 1000;
let growth_rate = 0;
let lastFrame = performance.now();

requestAnimationFrame((t) => update(t));

function update(timestamp: number) {
  if (counter < UPGRADE_COST) upgrade.disabled = true;
  else upgrade.disabled = false;

  const elapsed = timestamp - lastFrame;
  counter += (elapsed * growth_rate) / PER_SECOND;
  message.innerHTML = `${Math.trunc(counter)} sarcastic comments`;
  status_rate.innerHTML = `${growth_rate} comments/sec`;
  lastFrame = timestamp;

  requestAnimationFrame((t) => update(t));
}
