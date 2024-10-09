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

const status = document.createElement("div");
app.append(status);

const clicker = document.createElement("button");
clicker.innerHTML = "🙃";
clicker.addEventListener("click", makeComment);
app.append(clicker);

function makeComment() {
  message.innerHTML = `${++counter} sarcastic comments`;
}

class Upgrade {
  cost: number;
  rate: number;
  purchased: number = 0;
  button: HTMLButtonElement;

  constructor(cost: number, rate: number) {
    this.cost = cost;
    this.rate = rate;

    this.button = document.createElement("button");
    this.button.innerHTML = `Cost: ${cost}`;
    this.button.addEventListener("click", () => {
      this.upgradeRate();
    });
    app.append(this.button);
  }

  upgradeRate() {
    counter -= this.cost;
    growth_rate += this.rate;

    this.cost *= 1.15;
    this.button.innerHTML = `Cost: ${this.cost.toFixed(1)}`;
    this.purchased++;
  }
}

const upgrades: Upgrade[] = [];

const smallUpgrade = new Upgrade(10, 0.1);
upgrades.push(smallUpgrade);

const mediumUpgrade = new Upgrade(100, 2.0);
upgrades.push(mediumUpgrade);

const largeUpgrade = new Upgrade(1000, 50);
upgrades.push(largeUpgrade);

const PER_SECOND = 1000;
let growth_rate = 0;
let lastFrame = performance.now();

requestAnimationFrame((t) => update(t));

function update(timestamp: number) {
  for (const upgrade of upgrades) {
    if (counter < upgrade.cost) upgrade.button.disabled = true;
    else upgrade.button.disabled = false;
  }

  const elapsed = timestamp - lastFrame;
  counter += (elapsed * growth_rate) / PER_SECOND;

  message.innerHTML = `${Math.trunc(counter)} sarcastic comments`;
  status.innerHTML = `${growth_rate.toFixed(1)} comments/sec <br>
    <b>Small:<b> ${smallUpgrade.purchased}<br>
    <b>Medium:<b> ${mediumUpgrade.purchased}<br>
    <b>Large:<b> ${largeUpgrade.purchased}`;

  lastFrame = timestamp;

  requestAnimationFrame((t) => update(t));
}
