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
app.append(message);

const button = document.createElement("button");
button.innerHTML = "🙃";
button.addEventListener("click", makeComment);
app.append(button);

function makeComment() {
  message.innerHTML = `${++counter} sarcastic comments`;
}

const upgrade = document.createElement("button");
upgrade.innerHTML = "10 bob";
upgrade.addEventListener("click", updateGrowth);
app.append(upgrade);

const UPGRADE_COST = 10;
let growth_rate = 0;
function updateGrowth() {
  growth_rate++;
  counter -= UPGRADE_COST;
}

const PER_SECOND = 1000;
let zero = performance.now();
requestAnimationFrame((t) => update(t));

function update(timestamp: number) {
  if (counter < 10) upgrade.disabled = true;
  else upgrade.disabled = false;

  const elapsed = timestamp - zero;
  counter += (elapsed * growth_rate) / PER_SECOND;
  message.innerHTML = `${Math.trunc(counter)} sarcastic comments`;
  zero = timestamp;

  requestAnimationFrame((t) => update(t));
}
