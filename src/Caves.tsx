export interface Cave {
    xpos: number;
    ypos: number;
    zpos: number;
    xsize: number;
    ysize: number;
    zsize: number;
}

function randomBound(): number {
    return ((Math.random() * 7.2) - 3.6)
}

function randomCave(): Cave {
    return {
        xpos: randomBound(),
        ypos: randomBound(),
        zpos: randomBound(),
        xsize: 0,
        ysize: 0,
        zsize: 0
    }
}

export function randomCaves(numCaves: number): Cave[] {
    let output = [];
    for (let i = 0; i < numCaves; i++) {
        output.push(randomCave());
    }
    return output;
}