
const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');
const map = TileMaps.map;
const scale = 2;

canvas.width = map.width * map.tilewidth * scale;
canvas.height = map.height * map.tileheight * scale;

const layer = {
    ground: 0,
    grass: 1,
    walls: 2,
    walls2: 3,
    stuff: 4,
    characters: 5,
    weapons: 6
};

const startids = {
    hero: 124,
    skeleton: 130,
    blob: 169,
    bat: 172,
    ghost: 175,
    spider: 178
};

const deadids = {
    hero: 217 + 1,
    skeleton: 217 + 6,
    blob: 217 + 7,
    bat: 217 + 8,
    ghost: 217 + 9,
    spider: 217 + 10
};


// TILES

const loadImages = (callback) => {
    let imagesLoaded = 0;
    const onImageLoaded = () => {
        imagesLoaded++;
        if (imagesLoaded == map.tilesets.length)
            callback();
    }

    for(const tileset of map.tilesets) {
        tileset.elem = new Image();
        tileset.elem.addEventListener('load', onImageLoaded, false);
        tileset.elem.src = tileset.image;
    }
}

const getTileSet = (gid) => {
    for(const tileset of map.tilesets) {
        if (gid >= tileset.firstgid && gid < tileset.firstgid + tileset.tilecount)
            return tileset;
    }
};

const getTile = (gid) => {
    const tileset = getTileSet(gid);
    const offset = gid - tileset.firstgid;
    const row = Math.floor(offset / tileset.columns);
    const column = offset % tileset.columns;
    return {
        image: tileset.elem,
        sx: column * tileset.tilewidth,
        sy: row * tileset.tileheight
    }
}

const drawTile = (tile, [row, col]) => {
    context.drawImage(
        tile.image, // image
        tile.sx, // source x
        tile.sy, // source y
        map.tilewidth, // source width
        map.tileheight, // source height
        col * map.tilewidth * scale, // target x
        row * map.tileheight * scale, // target y
        map.tilewidth * scale, // target width
        map.tileheight * scale // target height
    );
}

const getOffset = ([row, col]) => (row * map.width) + col;
const getPosition = (offset) => {
    return [
        /* row */ Math.floor(offset / map.width),
        /* col */ offset % map.width
    ]
};
const positionEq = ([row1, col1], [row2, col2]) => row1 === row2 && col1 === col2;

const renderMap = () => {
    for(let row = 0; row < map.height; row++)
        for(let col = 0; col < map.width; col++)
            renderTile([row, col]);
}

const renderTile = (pos) => {
    for(const layer of map.layers) {
        const gid = layer.data[getOffset(pos)];
        if (gid == 0)
            continue;
        const tile = getTile(gid);
        drawTile(tile, pos);
    }
}

const isCollision = (pos) => {
    for(let l = layer.walls; l < layer.weapons; l++) {
        if (map.layers[l].data[getOffset(pos)] > 0)
            return true;
    }
    return false;
}

// MOTION

const getCharacterIds = (character) => {
    const startid = startids[character];
    const dead = deadids[character];

    const getAnimationIds = (id) => {
        return {
            walk1: id,
            still: id + 1,
            walk2: id + 2,
            dead: dead
        };
    };

    return {
        down: getAnimationIds(startid),
        left: getAnimationIds(startid + 12),
        right: getAnimationIds(startid + 24),
        up: getAnimationIds(startid + 36),
    };
}

const getDirection = (character, id) => {
    for(const direction in character) {
        if (character[direction].walk1 === id || 
            character[direction].still === id || 
            character[direction].walk2 === id ||
            character[direction].attack === id ||
            character[direction].dead === id)
            return direction;
    }
    return null;
}

const hasId = (character, id) => getDirection(character, id) !== null;

const getNextId = (currentId, animation) => {
    switch(currentId) {
        case animation.still: return animation.walk1;
        case animation.walk1: return animation.walk2;
        case animation.walk2: return animation.walk1;
        case animation.attack: return animation.still;
        default: return animation.still;
    }
}

const findCharacters = (character) => {
    const ret = [];
    for(let offset = 0; offset < map.layers[layer.characters].data.length; offset++) {
        const id = map.layers[layer.characters].data[offset];
        if (hasId(character, id))
            ret.push(getPosition(offset))
    }
    return ret;
}

const getNextPosition = ([row, col], direction) => {
    switch(direction) {
        case 'right': return [row, col + 1];
        case 'left': return  [row, col - 1];
        case 'up': return    [row - 1, col];
        case 'down': return  [row + 1, col];
    }
}

const isValidPosition = ([row, col]) => 
    row >= 0 && row < map.height && col >= 0 &&  col < map.width;

const moveCharacter = (characterIds, currentPos, direction) => {
    const currentOffset = getOffset(currentPos);
    const nextPos = getNextPosition(currentPos, direction);
    const currentId = map.layers[layer.characters].data[currentOffset];
    const currentDirection = getDirection(characterIds, currentId);
    const nextId = getNextId(currentId, characterIds[direction]);

    if (currentId === characterIds[currentDirection].dead)
        return currentPos;

    if (currentId === characterIds[currentDirection].attack) {
        // remove sword
        const swordPos = getNextPosition(currentPos, currentDirection);
        map.layers[layer.weapons].data[getOffset(swordPos)] = 0; 
        renderTile(swordPos);
    }

    if (nextId === characterIds[direction].still || !isValidPosition(nextPos) || isCollision(nextPos)) {
        // stay in the same place (stand still)
        map.layers[layer.characters].data[currentOffset] = characterIds[direction].still;
        renderTile(currentPos);
        return currentPos;
    }
    else {
        // move as expected
        const nextOffset = getOffset(nextPos);
        map.layers[layer.characters].data[currentOffset] = 0;
        map.layers[layer.characters].data[nextOffset] = nextId;
        renderTile(currentPos);
        renderTile(nextPos);
        return nextPos;
    }
};

const heroIds = getCharacterIds('hero');
heroIds.right.attack = 325 + (6 * 6) + 2; // starting id + (row * rowwidth) + col
heroIds.right.sword = 325 + (6 * 6) + 3;
heroIds.left.attack = 325 + (7 * 6) + 3;
heroIds.left.sword = 325 + (7 * 6) + 2;
heroIds.down.attack = 325 + (8 * 6) + 4;
heroIds.down.sword = 325 + (9 * 6) + 4;
heroIds.up.attack = 325 + (3 * 6) + 3;
heroIds.up.sword = 325 + (4 * 6) + 1;
let heroPosition = findCharacters(heroIds)[0];

document.addEventListener('keydown', (e) => {
    const keys = {
        'ArrowRight': 'right',
        'ArrowLeft': 'left',
        'ArrowUp': 'up',
        'ArrowDown': 'down'
    };

    if (e.code in keys) {
        heroPosition = moveCharacter(heroIds, heroPosition, keys[e.code]);
    }
});


// ENEMIES

const enemies = [{
    ids: getCharacterIds('skeleton')
}, {
    ids: getCharacterIds('blob')
}, {
    ids: getCharacterIds('bat')
}, {
    ids: getCharacterIds('ghost')
}, {
    ids: getCharacterIds('spider')
}]

for(const enemy of enemies) {
    enemy.positions = findCharacters(enemy.ids);
}

let iteration = 0;
const getNextDirection = () => {
    if (iteration % 12 < 3) return 'right';
    if (iteration % 12 < 6) return 'down';
    if (iteration % 12 < 9) return 'left';
    if (iteration % 12 < 12) return 'up';
};

setInterval(() => {
    const direction = getNextDirection();
    for(const enemy of enemies) {
        for(let i = 0; i < enemy.positions.length; i++) {
            enemy.positions[i] = moveCharacter(enemy.ids, enemy.positions[i], direction);
        }
    }
    iteration++;
}, 500);


// COMBAT

const attack = (characterIds, currentPos) => {
    const currentOffset = getOffset(currentPos);
    const currentId = map.layers[layer.characters].data[currentOffset];
    const direction = getDirection(characterIds, currentId);
    const swordPos = getNextPosition(currentPos, direction);
    const nextId = currentId !== characterIds[direction].attack
                    ? characterIds[direction].attack
                    : characterIds[direction].still;

    map.layers[layer.characters].data[currentOffset] = nextId;
    renderTile(currentPos);
    
    if (!isValidPosition(swordPos))
        return

    const swordOffset = getOffset(swordPos);
    if (currentId === characterIds[direction].attack) {
        // Un-Attack
        map.layers[layer.weapons].data[swordOffset] = 0;
    }
    else {
        // Attack
        map.layers[layer.weapons].data[swordOffset] = characterIds[direction].sword;
        // Kill Enemies
        for(const enemy of enemies) {
            for(const position of enemy.positions){
                if (positionEq(position, swordPos))
                    map.layers[layer.characters].data[swordOffset] = enemy.ids.down.dead;
            }
        }
    }
    renderTile(swordPos);
};

document.addEventListener('keydown', (e) => {
    if (e.code === "Space")
        attack(heroIds, heroPosition);
});


// INIT

loadImages(() => {
    const t0 = performance.now();
    renderMap();
    const t1 = performance.now();
    console.log(`render took: ${t1 - t0}ms`)
});

