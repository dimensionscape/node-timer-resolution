const timerResolution = require('./build/Release/timer_resolution');

console.log("Setting Windows Timer Resolution to 1ms..."); 
const success = timerResolution.setTimerResolution();
if (!success) {
    console.error("Failed to set timer resolution.");
    process.exit(1);
}
console.log("Timer resolution set to 1ms.\n");

// Function to test setTimeout accuracy
function testSetTimeout() {
    const results = [];
    let i = 0;

    function runTest() {
        const start = process.hrtime.bigint();
        setTimeout(() => {
            const end = process.hrtime.bigint();
            const elapsedMs = Number(end - start) / 1e6; // Convert nanoseconds to milliseconds
            results.push(elapsedMs);
            i++;

            if (i < 10) {
                runTest(); // Run 10 iterations
            } else {
                console.log("\nsetTimeout(1ms) results (actual delays in ms):");
                console.log(results);
                console.log(`Min: ${Math.min(...results).toFixed(3)}ms`);
                console.log(`Max: ${Math.max(...results).toFixed(3)}ms`);
                console.log(`Avg: ${(results.reduce((a, b) => a + b, 0) / results.length).toFixed(3)}ms`);

                // Restore default timer resolution after test
                console.log("\n Restoring default timer resolution...");
                const resetSuccess = timerResolution.resetTimerResolution();
                console.log(resetSuccess ? "Timer resolution restored." : "Failed to restore resolution.");
            }
        }, 1);
    }

    runTest();
}

// Run the timer test
testSetTimeout();
