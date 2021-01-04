
const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');
const map = TileMaps.map;
const scale = 2;

canvas.width = map.width * map.tilewidth * scale;
canvas.height = map.height * map.tileheight * scale;

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

const drawLayerTile = (layer, row, col) => {
    const offset = (row * layer.width) + col;
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

let heroDown = null;
let heroLeft = null;
let heroRight = null;
let heroUp = null;

let heroTile = null;
let heroRow = 11;
let heroCol = 0;

const moveHero = (row, col) => {
    renderTile(heroRow, heroCol);
    heroRow = row;
    heroCol = col;
    drawTile(heroTile, heroRow, heroCol);
};

const changeHero = (tile) => {
    heroTile = tile;
    drawTile(heroTile, heroRow, heroCol);
}

loadImages(() => {
    renderMap();
    heroDown = getTile(125);
    heroLeft = getTile(137);
    heroRight = getTile(149);
    heroUp = getTile(161);
    heroTile = heroRight;
    drawTile(heroTile, heroRow, heroCol);
});

const right = () => {
    if (heroTile == heroRight)
        moveHero(heroRow, heroCol + 1);
    else
        changeHero(heroRight);
};
const left = () => {
    if (heroTile == heroLeft)
        moveHero(heroRow, heroCol - 1);
    else
        changeHero(heroLeft);
};
const up = () => {
    if (heroTile == heroUp)
        moveHero(heroRow - 1, heroCol);
    else
        changeHero(heroUp);
};
const down = () => {
    if (heroTile == heroDown)
        moveHero(heroRow + 1, heroCol);
    else
        changeHero(heroDown);
};

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight': return right();
        case 'ArrowLeft': return left();
        case 'ArrowUp': return up();
        case 'ArrowDown': return down();
    }
});

