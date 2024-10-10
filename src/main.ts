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
  purchased: number = 0;
  button: HTMLButtonElement;

  constructor(
    public name: string,
    public cost: number,
    public rate: number,
  ) {
    this.button = document.createElement("button");
    this.button.innerHTML = `${this.name}: ${this.purchased}<br>
      Cost: ${this.cost}`;
    this.button.addEventListener("click", () => {
      this.upgradeRate();
    });
    app.append(this.button);
  }

  upgradeRate() {
    counter -= this.cost;
    growth_rate += this.rate;

    this.cost *= 1.15;
    this.purchased++;
    this.button.innerHTML = `${this.name}: ${this.purchased}<br>
      Cost: ${this.cost.toFixed(1)}`;
  }
}

const upgrades: Upgrade[] = [
  new Upgrade("Small", 10, 0.1),
  new Upgrade("Medium", 100, 2.0),
  new Upgrade("Large", 1000, 50),
];

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
  status.innerHTML = `${growth_rate.toFixed(1)} comments/sec<br>`;

  lastFrame = timestamp;

  requestAnimationFrame((t) => update(t));
}
