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

const clicker = document.createElement("button");
clicker.innerHTML = "🙃";
clicker.addEventListener("click", makeComment);
app.append(clicker);

function makeComment() {
  message.innerHTML = `${++counter} sarcastic comments`;
}

class Upgrade {
  cost: number = 0;
  rate: number = 0;
  button: HTMLButtonElement;

  constructor(cost: number, rate: number) {
    this.cost = cost;
    this.rate = rate;

    this.button = document.createElement("button");
    this.button.innerHTML = `${cost} bob`;
    this.button.addEventListener("click", () => {
      this.upgradeRate(this.cost, this.rate);
    });
    app.append(this.button);
  }

  upgradeRate(cost: number, rate: number) {
    counter -= cost;
    growth_rate += rate;
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
  status_rate.innerHTML = `${growth_rate.toFixed(1)} comments/sec`;
  lastFrame = timestamp;

  requestAnimationFrame((t) => update(t));
}
