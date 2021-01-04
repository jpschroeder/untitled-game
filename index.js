
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

const drawTile = (tile, row, col) => {
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

const getOffset = (layer, row, col) => (row * layer.width) + col;

const drawLayerTile = (layer, row, col) => {
    const offset = getOffset(layer, row, col);
    const gid = layer.data[offset];
    if (gid == 0)
        return;
    const tile = getTile(gid);
    drawTile(tile, row, col);
}

const renderMap = () => {
    for(const layer of map.layers) {
        for(let row = 0; row < layer.height; row++) {
            for(let col = 0; col < layer.width; col++) {
                drawLayerTile(layer, row, col);
            }
        }
    }
}

const renderTile = (row, col) => {
    for(const layer of map.layers) {
        drawLayerTile(layer, row, col);
    }
}

const isCollision = (row, col) => {
    // anything after the first 2 layers is a collision
    for(let i = 2; i < map.layers.length; i++) {
        const layer = map.layers[i];
        const offset = getOffset(layer, row, col);
        if (layer.data[offset] > 0)
            return true;
    }
    return false;
}

// MOTION

let hero = {};

const getCharacterDirection = (startid) => {
    return {
        walk1: getTile(startid),
        still: getTile(startid + 1),
        walk2: getTile(startid + 2)
    }
}

const getCharacter = (startid) => {
    return {
        down: getCharacterDirection(startid),
        left: getCharacterDirection(startid + 12),
        right: getCharacterDirection(startid + 24),
        up: getCharacterDirection(startid + 36),
        tile: null,
        row: 0,
        col: 0
    }
}

const changeHero = (tile, row, col) => {
    renderTile(hero.row, hero.col);
    hero.tile = tile;
    hero.row = row;
    hero.col = col;
    drawTile(hero.tile, hero.row, hero.col);
}

const getNextTile = (dir) => {
    switch(hero.tile) {
        case dir.still: return dir.walk1;
        case dir.walk1: return dir.walk2;
        case dir.walk2: return dir.walk1;
        default: return dir.still;
    }
}

const heroMotion = (dir, row, col) => {
    const next = getNextTile(dir);
    if (next == dir.still || row < 0 || col < 0 || row >= map.height || col >= map.width || isCollision(row, col))
        changeHero(dir.still, hero.row, hero.col);
    else
        changeHero(next, row, col);
};

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight': return heroMotion(hero.right, hero.row, hero.col + 1);
        case 'ArrowLeft':  return heroMotion(hero.left, hero.row, hero.col - 1);
        case 'ArrowUp':    return heroMotion(hero.up, hero.row - 1, hero.col);
        case 'ArrowDown':  return heroMotion(hero.down, hero.row + 1, hero.col);
    }
});

// ENEMIES

let bat = {};

setInterval(() => {

}, 1000);

// INIT

loadImages(() => {
    renderMap();

    hero = getCharacter(124);
    hero.tile = hero.right.still;
    hero.row = 11;
    hero.col = 0;
    drawTile(hero.tile, hero.row, hero.col);

    bat = getCharacter(172);
    bat.tile = bat.right.still;
    bat.row = 1;
    bat.col = 20;
    drawTile(bat.tile, bat.row, bat.col);
});

