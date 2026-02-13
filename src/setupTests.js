// vitest.setup.js - JavaScript PURO for Vitest
import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder
if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = require('util').TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = require('util').TextDecoder;
}

// Canvas COMPLETE mock for Chart.js (no jest.fn - just pure functions)
HTMLCanvasElement.prototype.getContext = () => ({
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({data: []}),
    putImageData: () => {},
    createImageData: () => {},
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    fillText: () => {},
    measureText: () => ({width: 100}),
    fill: () => {},
    arc: () => {},
    clip: () => {},
    setTransform: () => {},
    transform: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {}
});
