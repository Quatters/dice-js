console.log('CAUTION! Spoilers here.')

const dice = document.querySelector('.dice6');
const rollButton = document.querySelector('#roll-button');
let animation = null;

const sideRotations = [
    [0, 0, 0],
    [-90, 90, 90],
    [90, 90, 0],
    [-90, 90, 0],
    [90, 0, 90],
    [180, 0, 0],
]

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomChoose(arr) {
    return arr[randomInt(0, arr.length)];
}

function getSideRotationString(sideRotation) {
    return `
        rotateX(${sideRotation[0]}deg)
        rotateY(${sideRotation[1]}deg)
        rotateZ(${sideRotation[2]}deg)
    `;
}

function randomizeSideRotation(side) {
    const noRotationAxisNum = randomInt(0, 3);
    return sideRotations[side].map((val, idx) =>
        idx === noRotationAxisNum
            ? val
            : val + 360 * randomInt(1, 2) * randomChoose([1, -1])
    );
}

let currentRotationString = getSideRotationString(sideRotations[5]);

document.querySelector('#roll-button').addEventListener('click', () => {
    rollButton.toggleAttribute('disabled');

    const side = randomInt(0, 6);
    console.log('Rolled:', side + 1);

    let endRotationString = null;
    do {
        endRotationString = getSideRotationString(randomizeSideRotation(side));
    } while (endRotationString === currentRotationString);

    animation = dice.animate({
        transform: [
            currentRotationString,
            endRotationString,
        ],
        easing: ['cubic-bezier(0.1, 0.4, 0.5, 1)'],
    }, randomInt(3150, 3600));

    animation.addEventListener('finish', () => {
        dice.style.transform = endRotationString;
        currentRotationString = endRotationString;
        rollButton.toggleAttribute('disabled');
    }, { once: true });
});
