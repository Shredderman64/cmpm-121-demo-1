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

const messageDiv = document.createElement("div");
messageDiv.classList.add("messageDisplay");
app.append(messageDiv);

const gameData = (function () {
  let counter = 0;
  let growthRate = 0;

  return {
    getCounter() {
      return counter;
    },
    setCounter(val: number) {
      counter += val;
    },
    getRate() {
      return growthRate;
    },
    setRate(val: number) {
      growthRate += val;
    },
  };
})();

const header = document.createElement("h1");
header.innerHTML = gameName;
messageDiv.append(header);

const counterMessage = document.createElement("div");
counterMessage.innerHTML = `${gameData.getCounter()} sarcastic comments`;
messageDiv.append(counterMessage);

const statusMessage = document.createElement("div");
messageDiv.append(statusMessage);

app.append(document.createElement("br"));

const buttonDiv = document.createElement("div");
buttonDiv.classList.add("buttonDisplay");
app.append(buttonDiv);

const commentButton = document.createElement("button");
commentButton.innerHTML = "<font size=5>🙃</font>";
commentButton.addEventListener("click", makeComment);
buttonDiv.append(commentButton);

function makeComment() {
  gameData.setCounter(1);
  counterMessage.innerHTML = `${gameData.getCounter()} sarcastic comments`;
}

buttonDiv.append(document.createElement("br"));

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
    buttonDiv.append(this.button);
  }

  upgradeRate() {
    const rateMultiplier = 1.15;
    gameData.setCounter(-this.cost);
    gameData.setRate(this.rate);

    this.cost *= rateMultiplier;
    this.purchased++;
    this.button.innerHTML = `<b>${this.name}: ${this.purchased}</b><br>
      <font size=2>Cost: ${this.cost.toFixed(1)}</font>`;
  }
}

const upgrades: Upgrade[] = [];
for (const item of availableItems) {
  upgrades.push(new Upgrade(item.name, item.description, item.cost, item.rate));
}

let lastFrame = performance.now();

function calculateNewComments(timestamp: number, lastFrame: number) {
  const perSecond = 1000;
  const timeElapsed = timestamp - lastFrame;
  const commentsPerFrame = (timeElapsed * gameData.getRate()) / perSecond;
  gameData.setCounter(commentsPerFrame);
}

function updateStatus() {
  counterMessage.innerHTML = `${Math.trunc(gameData.getCounter())} sarcastic comments`;
  statusMessage.innerHTML = `${gameData.getRate().toFixed(1)} comments/sec<br>`;
}

requestAnimationFrame((t) => update(t));

function update(timestamp: number) {
  for (const upgrade of upgrades) {
    if (gameData.getCounter() < upgrade.cost) upgrade.button.disabled = true;
    else upgrade.button.disabled = false;
  }

  calculateNewComments(timestamp, lastFrame);
  updateStatus();

  lastFrame = timestamp;

  requestAnimationFrame((t) => update(t));
}
