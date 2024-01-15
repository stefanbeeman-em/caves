export interface Cave {
    xpos: number;
    ypos: number;
    zpos: number;
    scale: number;
}

function randomPos(): number {
    return ((Math.random() * 7.2) - 3.6)
}

function randomScale(): number {
    return ((Math.random() * 3.0))
}

function randomCave(): Cave {
    return {
        xpos: randomPos(),
        ypos: randomPos(),
        zpos: randomPos(),
        scale: randomScale(),
    }
}

export function randomCaves(numCaves: number): Cave[] {
    let output = [];
    for (let i = 0; i < numCaves; i++) {
        output.push(randomCave());
    }
    return output;
}