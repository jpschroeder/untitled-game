
const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');
const map = TileMaps.map;
const scale = 2;

canvas.width = map.width * map.tilewidth * scale;
canvas.height = map.height * map.tileheight * scale;

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
    // anything after the first 2 layers is a collision
    for(let i = 2; i < map.layers.length; i++) {
        if (map.layers[i].data[getOffset(pos)] > 0)
            return true;
    }
    return false;
}

// MOTION

const getCharacterIds = (startid) => {
    const getAnimationIds = (id) => {
        return {
            walk1: id,
            still: id + 1,
            walk2: id + 2
        };
    };

    return {
        down: getAnimationIds(startid),
        left: getAnimationIds(startid + 12),
        right: getAnimationIds(startid + 24),
        up: getAnimationIds(startid + 36),
    };
}

const hasId = (character, id) => {
    const hasAnimationId = (animation) => 
        animation.walk1 === id || 
        animation.still === id || 
        animation.walk2 === id;
    
    return hasAnimationId(character.down) ||
           hasAnimationId(character.left) ||
           hasAnimationId(character.right) ||
           hasAnimationId(character.up);
}

const getNextId = (currentId, animation) => {
    switch(currentId) {
        case animation.still: return animation.walk1;
        case animation.walk1: return animation.walk2;
        case animation.walk2: return animation.walk1;
        default: return animation.still;
    }
}

const charLayer = map.layers[5]; // characters
const heroIds = getCharacterIds(124);
const batIds = getCharacterIds(172);

const findCharacters = (character) => {
    const ret = [];
    for(let offset = 0; offset < charLayer.data.length; offset++) {
        const id = charLayer.data[offset];
        if (hasId(character, id))
            ret.push(getPosition(offset))
    }
    return ret;
}

let heroPos = findCharacters(heroIds)[0];

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
    const t0 = performance.now();
    const currentOffset = getOffset(currentPos);
    const nextPos = getNextPosition(currentPos, direction);
    const currentId = charLayer.data[currentOffset];
    const nextId = getNextId(currentId, characterIds[direction]);
    if (nextId == characterIds[direction].still || !isValidPosition(nextPos) || isCollision(nextPos)) {
        // stay in the same place (stand still)
        charLayer.data[currentOffset] = characterIds[direction].still;
        renderTile(currentPos);
    }
    else {
        // move as expected
        const nextOffset = getOffset(nextPos);
        charLayer.data[currentOffset] = 0;
        charLayer.data[nextOffset] = nextId;
        heroPos = nextPos;
        renderTile(currentPos);
        renderTile(nextPos);
    }
    const t1 = performance.now();
    console.log(`move took: ${t1 - t0}ms`)
};

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight': return moveCharacter(heroIds, heroPos, 'right');
        case 'ArrowLeft':  return moveCharacter(heroIds, heroPos, 'left');
        case 'ArrowUp':    return moveCharacter(heroIds, heroPos, 'up');
        case 'ArrowDown':  return moveCharacter(heroIds, heroPos, 'down');
    }
});

// ENEMIES

/*
let i = 0;
setInterval(() => {
    if (i % 12 < 3)
        motion(bat, bat.right, bat.row, bat.col + 1);
    else if (i % 12 < 6)
        motion(bat, bat.down, bat.row + 1, bat.col);
    else if (i % 12 < 9)
        motion(bat, bat.left, bat.row, bat.col - 1);
    else
        motion(bat, bat.up, bat.row - 1, bat.col);
    i++;
}, 500);
*/

// INIT

loadImages(() => {
    const t0 = performance.now();
    renderMap();
    const t1 = performance.now();
    console.log(`render took: ${t1 - t0}ms`)
});

