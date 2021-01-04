(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("map",
{ "compressionlevel":-1,
 "editorsettings":
    {
     "export":
        {
         "format":"js",
         "target":"map.js"
        }
    },
 "height":14,
 "infinite":false,
 "layers":[
        {
         "data":[12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 17, 17, 17, 17, 17, 12, 65, 12, 12, 15, 15, 15, 15, 15, 12, 12, 9, 9, 9, 9, 9, 12, 12, 17, 17, 17, 17, 17, 17, 12, 12, 12, 12, 15, 15, 15, 15, 15, 12, 12, 9, 9, 9, 9, 9, 12, 12, 17, 17, 17, 17, 17, 17, 12, 12, 12, 12, 15, 15, 15, 15, 15, 12, 12, 9, 9, 9, 9, 9, 12, 12, 17, 17, 51, 17, 17, 17, 12, 12, 12, 12, 15, 15, 15, 15, 15, 12, 12, 9, 9, 51, 9, 9, 65, 12, 12, 12, 11, 12, 12, 12, 12, 12, 12, 12, 15, 15, 51, 15, 15, 12, 12, 12, 12, 11, 12, 12, 12, 12, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 65, 12, 65, 11, 12, 12, 12, 65, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 22, 22, 22, 22, 12, 12, 12, 12, 11, 12, 12, 12, 12, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 22, 66, 12, 12, 12, 65, 12, 12, 11, 12, 12, 65, 12, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 22, 12, 12, 12, 12, 12, 12, 12, 11, 12, 22, 22, 12, 12, 12, 11, 12, 12, 12, 12, 12, 12, 12, 12, 22, 12, 12, 12, 11, 11, 11, 11, 11, 12, 22, 22, 22, 22, 22, 89, 22, 22, 22, 22, 22, 22, 22, 22, 22, 12, 12, 12, 12, 12, 12, 12, 12, 12, 22, 22, 22, 22, 12, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 65, 65, 12, 12, 65, 12, 12, 12, 12, 12, 12, 12, 11, 12, 12, 65, 12, 12, 12, 12, 12, 12, 65, 12, 12],
         "height":14,
         "id":1,
         "name":"ground",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":24,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 59, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 30, 30, 30, 30, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 30, 0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 31, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 30, 30, 30, 30, 0, 30, 30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 59, 0, 0, 0, 0, 0, 0],
         "height":14,
         "id":4,
         "name":"grass",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":24,
         "x":0,
         "y":0
        }, 
        {
         "data":[39, 39, 39, 39, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 6, 0, 0, 0, 0, 16, 0, 0, 0, 0, 39, 39, 2, 1, 1, 1, 2, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 16, 0, 0, 0, 0, 39, 0, 2, 0, 0, 0, 2, 0, 0, 6, 0, 0, 0, 0, 6, 0, 39, 0, 0, 16, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 39, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 0, 24, 24, 0, 0, 0, 61, 0, 61, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 16, 25, 26, 26, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 33, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 25, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 26, 26, 26, 0, 26, 26, 26, 26, 26, 26, 26, 26, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 42, 42, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":14,
         "id":2,
         "name":"walls",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":24,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 42, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 0, 42, 42, 42, 42, 42, 42, 42, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":14,
         "id":3,
         "name":"walls2",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":24,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 55, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":14,
         "id":5,
         "name":"stuff",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":24,
         "x":0,
         "y":0
        }],
 "nextlayerid":6,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.4.3",
 "tileheight":16,
 "tilesets":[
        {
         "columns":8,
         "firstgid":1,
         "image":"basictiles.png",
         "imageheight":240,
         "imagewidth":128,
         "margin":0,
         "name":"basictiles",
         "spacing":0,
         "tilecount":120,
         "tileheight":16,
         "tilewidth":16
        }, 
        {
         "columns":12,
         "firstgid":121,
         "image":"characters.png",
         "imageheight":128,
         "imagewidth":192,
         "margin":0,
         "name":"characters",
         "spacing":0,
         "tilecount":96,
         "tileheight":16,
         "tilewidth":16
        }, 
        {
         "columns":3,
         "firstgid":217,
         "image":"dead.png",
         "imageheight":64,
         "imagewidth":48,
         "margin":0,
         "name":"dead",
         "spacing":0,
         "tilecount":12,
         "tileheight":16,
         "tilewidth":16
        }, 
        {
         "columns":12,
         "firstgid":229,
         "image":"things.png",
         "imageheight":128,
         "imagewidth":192,
         "margin":0,
         "name":"things",
         "spacing":0,
         "tilecount":96,
         "tileheight":16,
         "tilewidth":16
        }],
 "tilewidth":16,
 "type":"map",
 "version":1.4,
 "width":24
});