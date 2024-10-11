import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  {
    name: "Caffeine Patch",
    description: "A transdermal patch to keep you grinding through the night",
    cost: 10,
    rate: 0.1,
  },
  {
    name: "Synthetic Insecurities",
    description: "Drip-fed insecurities to help forge the mask of wit",
    cost: 100,
    rate: 2.0,
  },
  {
    name: "Zoomer Army",
    description: "A legion of chronically online goblins loyal to the cause",
    cost: 1000,
    rate: 50,
  },
  {
    name: "Norm.AI",
    description:
      "A Twitter bot that replicates the beautiful mind of Norm Macdonald",
    cost: 10000,
    rate: 200,
  },
  {
    name: "Neuralink Backdoor",
    description:
      "The future is now. Activate our sleeper agents to produce maximum sarcastic output",
    cost: 100000,
    rate: 1000,
  },
];

const gameName = "WOW such a good game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const clicker = document.createElement("button");
clicker.innerHTML = "<font size=5>🙃</font>";
clicker.addEventListener("click", makeComment);
app.append(clicker);

let counter = 0;
const message = document.createElement("div");
message.innerHTML = `${counter} sarcastic comments`;
app.append(message);

const status = document.createElement("div");
app.append(status);

function makeComment() {
  message.innerHTML = `${++counter} sarcastic comments`;
}

class Upgrade {
  purchased: number = 0;
  button: HTMLButtonElement;

  constructor(
    public name: string,
    public description: string,
    public cost: number,
    public rate: number,
  ) {
    this.button = document.createElement("button");
    this.button.innerHTML = `<b>${this.name}: ${this.purchased}</b><br>
      <font size=2>Cost: ${this.cost}</font>`;
    this.button.setAttribute("title", `${this.description}`);
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
    this.button.innerHTML = `<b>${this.name}: ${this.purchased}</b><br>
      <font size=2>Cost: ${this.cost.toFixed(1)}</font>`;
  }
}

const upgrades: Upgrade[] = [];
for (const item of availableItems) {
  upgrades.push(new Upgrade(item.name, item.description, item.cost, item.rate));
}

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
