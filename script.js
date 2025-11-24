const stats = {
  uptime: document.querySelector('[data-stat="uptime"]'),
  clusters: document.querySelector('[data-stat="clusters"]'),
  latency: document.querySelector('[data-stat="latency"]'),
};

const regionMetrics = {
  na: document.querySelector('[data-region="na"]'),
  eu: document.querySelector('[data-region="eu"]'),
  apac: document.querySelector('[data-region="apac"]'),
};

const regionSelector = document.getElementById("regionSelector");
const trafficSlider = document.getElementById("trafficSlider");
const storageSlider = document.getElementById("storageSlider");
const simulateBtn = document.getElementById("simulateBtn");
const insightList = document.getElementById("insightList");
const timeline = document.getElementById("timeline");
const heatmap = document.getElementById("heatmap");
const testimonialCarousel = document.getElementById("testimonialCarousel");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const yearSpan = document.getElementById("year");
const themeToggle = document.querySelector("[data-theme-toggle]");

const insights = [
  "Autoscaler predicted burst capacity and pre-warmed 32 nodes.",
  "Budget sentry recommends shifting 12% traffic to carbon-neutral zones.",
  "Threat graph detected anomalous spikes on API gateways.",
  "Storage tiering moved cold data to glacier class to save 18%.",
  "Latency adviser nudged CDN edges closer to Delhi POP.",
  "Observability Atlas stitched traces to a rogue deployment.",
];

const services = ["Compute", "Storage", "Network", "Security", "AI", "Edge"];

const regionNames = {
  na: "North America",
  eu: "Europe",
  apac: "Asia Pacific",
  latam: "Latin America",
};

const randomBetween = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

function pulseStats() {
  stats.uptime.textContent = `${(99.97 + Math.random() * 0.03).toFixed(3)}%`;
  stats.clusters.textContent = randomBetween(430, 520);
  stats.latency.textContent = `${randomBetween(28, 44)}ms`;

  Object.values(regionMetrics).forEach((node) => {
    node.textContent = `${randomBetween(2, 18)}ms`;
  });
}

function drawHeatmap(traffic, storage) {
  heatmap.innerHTML = "";

  services.forEach((service) => {
    const intensity = Math.min(1, (traffic / 200 + storage / 40) / 2);
    const alpha = (0.08 + intensity * 0.4).toFixed(2);
    const card = document.createElement("div");
    card.style.background = `rgba(125, 211, 252, ${alpha})`;
    card.innerHTML = `<strong>${service}</strong><p>${randomBetween(
      70,
      99
    )}% healthy</p>`;
    heatmap.appendChild(card);
  });
}

function updateInsights(region, traffic, storage) {
  insightList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const regionLabel = regionNames[region] || "Region";

  [0, 1, 2].forEach(() => {
    const li = document.createElement("li");
    li.textContent = `${regionLabel}: ${insights[randomBetween(0, insights.length - 1)]}`;
    fragment.appendChild(li);
  });
  const summary = document.createElement("li");
  summary.innerHTML = `<strong>Live load:</strong> ${traffic} Gbps · ${storage} PB`;
  fragment.appendChild(summary);

  insightList.appendChild(fragment);
}

function addTimelineEvent(region) {
  const block = document.createElement("span");
  const now = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
  block.textContent = `${now} · ${regionNames[region]} stable`;
  timeline.prepend(block);
  while (timeline.children.length > 6) {
    timeline.removeChild(timeline.lastChild);
  }
}

function cycleTestimonials() {
  if (!testimonialCarousel) return;
  testimonialCarousel.animate(
    [{ transform: "translateX(0)" }, { transform: "translateX(-4px)" }],
    { duration: 400, easing: "ease-out" }
  );
}

function simulate() {
  const region = regionSelector.value;
  const traffic = Number(trafficSlider.value);
  const storage = Number(storageSlider.value);

  simulateBtn.disabled = true;
  simulateBtn.textContent = "Simulating...";

  setTimeout(() => {
    updateInsights(region, traffic, storage);
    drawHeatmap(traffic, storage);
    addTimelineEvent(region);
    simulateBtn.disabled = false;
    simulateBtn.textContent = "Simulate load shift";
  }, 600);
}

function handleForm(event) {
  event.preventDefault();
  formStatus.textContent = "Generating topology report...";
  setTimeout(() => {
    formStatus.textContent =
      "Request received! Architects will reply within a day.";
    contactForm.reset();
  }, 800);
}

function toggleGlow() {
  document.body.classList.toggle("glow-on");
}

function init() {
  pulseStats();
  drawHeatmap(Number(trafficSlider.value), Number(storageSlider.value));
  updateInsights(regionSelector.value, trafficSlider.value, storageSlider.value);
  addTimelineEvent(regionSelector.value);
  setInterval(pulseStats, 4000);
  setInterval(cycleTestimonials, 5000);
  yearSpan.textContent = new Date().getFullYear();

  simulateBtn.addEventListener("click", simulate);
  contactForm.addEventListener("submit", handleForm);
  themeToggle.addEventListener("click", toggleGlow);
}

document.addEventListener("DOMContentLoaded", init);

