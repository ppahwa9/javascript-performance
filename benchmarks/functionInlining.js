//RUN -> node --trace-turbo-inlining functionInlining.js 

const { performance, PerformanceObserver } = require('perf_hooks');

// SETUP 🏁

let iterations = 100000;

const square = (x) => x*x;
const sumOfSquare = (a, b) => square(a) + square(b);
// const sumOfSquare = (a, b) => a*a + b*b;


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
    sumOfSquare(iterations, iterations+1);
}

// 🔚 EXERCISE

performance.mark('end');

performance.measure('My Special Benchmark', 'start', 'end');
