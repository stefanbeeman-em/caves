export enum CaveType {
    River,
    Fault,
    Mine,
    Bloom,
    Fungal,
    Ruins,
    Burrow,
}

export interface Cave {
    xpos: number;
    ypos: number;
    zpos: number;
    scale: number;
    type: CaveType;
    desc: string;
}

function randomPos(): number {
    return ((Math.random() * 20) - 10)
}

function randomScale(): number {
    return ((Math.random() * 3.0))
}

function randomCaveType(): CaveType {
    let n: CaveType = Math.floor(Math.random() * 7)
    return n;
}

function randomCave(): Cave {
    const randomType = randomCaveType();
    return {
        xpos: randomPos(),
        ypos: randomPos(),
        zpos: randomPos(),
        scale: randomScale(),
        type: randomType,
        desc: CaveType[randomType]
    }
}

export function randomCaves(numCaves: number): Cave[] {
    let output = [];
    for (let i = 0; i < numCaves; i++) {
        output.push(randomCave());
    }
    return output;
}