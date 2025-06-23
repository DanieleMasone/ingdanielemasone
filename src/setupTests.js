// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock getContext on HTMLCanvasElement
HTMLCanvasElement.prototype.getContext = jest.fn(() => {
    return {
        // mock methods used by Chart.js
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        getImageData: jest.fn(() => ({data: []})),
        putImageData: jest.fn(),
        createImageData: jest.fn(),
        save: jest.fn(),
        restore: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        closePath: jest.fn(),
        stroke: jest.fn(),
        fillText: jest.fn(),
        measureText: jest.fn(() => ({width: 100})),
        fill: jest.fn(),
        arc: jest.fn(),
        clip: jest.fn(),
        setTransform: jest.fn(),
        transform: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        rotate: jest.fn(),
    };
});

