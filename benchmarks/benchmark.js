const { performance, PerformanceObserver } = require('perf_hooks');

// SETUP 🏁

let iterations = 1e7;

const a = 1;
const b = 2;

const add = (x, y) => x + y;

const obs = new PerformanceObserver((items, observer) => {
  const measure = items.getEntriesByName('My Special Benchmark')[0];
  console.log(measure);
  performance.clearMarks();
  observer.disconnect();
});
obs.observe({entryTypes: ['measure']});

// 🔚 SETUP

performance.mark('start');
console.log("building..");

// EXERCISE 💪

while (iterations--) {
  add(a, b);
}

// 🔚 EXERCISE

performance.mark('end');

performance.measure('My Special Benchmark', 'start', 'end');
