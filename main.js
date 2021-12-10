let app;
let tiles = [];
let rowsCols = 10;
let defaultTile = {
    width: 50,
    height: 50,
};
let map = {
    0: {
        name: "fountainTile",
    },
};

window.onload = function () {
    app = new PIXI.Application({
        width: 640,
        height: 500,
        resolution: window.devicePixelRatio || 1,
    });
    document.body.appendChild(app.view);

    tiles["defaultTile"] = new PIXI.Sprite.from(
        "/assets/city/PNG/cityTiles_072.png"
    );
    tiles["defaultTile"].offsetY = 0;

    tiles["fountainTile"] = new PIXI.Sprite.from(
        "/assets/city/PNG/cityTiles_043.png"
    );
    tiles["fountainTile"].offsetY = -0.5;
    tiles["topCornerRoadTile"] = new PIXI.Sprite.from(
        "/assets/city/PNG/cityTiles_122.png"
    );
    tiles["rightCornerRoadTile"] = new PIXI.Sprite.from(
        "/assets/city/PNG/cityTiles_125.png"
    );
    tiles["bottomCornerRoadTile"] = new PIXI.Sprite.from(
        "/assets/city/PNG/cityTiles_126.png"
    );
    tiles["leftCornerRoadTile"] = new PIXI.Sprite.from(
        "/assets/city/PNG/cityTiles_124.png"
    );

    tiles["RoadDownRightTile"] = new PIXI.Sprite.from(
        "/assets/city/PNG/cityTiles_073.png"
    );
    tiles["RoadDownLeftTile"] = new PIXI.Sprite.from(
        "/assets/city/PNG/cityTiles_081.png"
    );

    const container = new PIXI.Container();
    container.x = app.renderer.width / 2;
    container.y = app.renderer.height / 2;

    app.stage.addChild(container);
    renderDefaultTiles(container);

    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;

    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
};

function renderDefaultTiles(container) {
    const marginLeft = (rowsCols * 50) / 2;

    for (let row = 0; row < rowsCols; row++) {
        for (let i = 0; i < rowsCols; i++) {
            let tile;
            let tileObject;
            const currentTileNumber = row * rowsCols + i;

            if (!!map[currentTileNumber]) {
                var texture = tiles[map[currentTileNumber].name].texture;
                tileObject = tiles[map[currentTileNumber].name];
                tile = new PIXI.Sprite(texture);
            } else {
                tile = new PIXI.Sprite(tiles["defaultTile"].texture);
                tileObject = tiles["defaultTile"];
            }

            tile.width = defaultTile.width;
            tile.height = defaultTile.height;
            tile.anchor.set(0.5);

            tile.x = calculateX(marginLeft, i, row);
            tile.y = calculateY(i, row, tileObject);
            container.addChild(tile);
        }
    }
}

function calculateX(marginLeft, i, row) {
    return marginLeft + i * 25 - row * 25;
}

function calculateY(i, row, tileObject) {
    const OffsetMultiplier = 0.25;
    const offset = (row + 1) * OffsetMultiplier + i * OffsetMultiplier;

    return (50 * i) / 3 + row * 17 - offset - tileObject.offsetY;
}
