# GameGen - A Tileset splitter and Tile Generator

<img src="https://i.gyazo.com/47d1da0cb96ecf3c078a2fcc74505b39.png">

GameGen is a toolbox of generators for various gamedev uses.
It currently includes a multi-purpose Tileset splitter and a purpose-made Tile Generator for Godot.

Additional generators may or may not be added at some point.

This tool might be adapted to support other engines, but don't count on it.

## Usage

While I doubt people will use this, here's a quick run down.

```git
$ git clone https://github.com/Blade67/GameGen

$ npm i

$ node _generate.js --generator=<generator>
```

### Available generators

#### `tile`

```git
node _generate.js --generator=tile

Arguments:
    --tileset=<path>        - Path to the tileset
    --spriteWidth=<int>     - Width of the individual tile
    --spriteHeight=<int>    - Height of the individual tile
    --output=<path>         - Folder path where to save the sprites
Optional:
    --startX=<int>          - Horizontal tile where to start
    --endX=<int>            - Horizontal tile where to end
    --startY=<int>          - Vertical tile where to start
    --endY=<int>            - Vertical tile where to end
```

#### `split`

```git
node _generate.js --generator=split

Arguments:
    --sprites=<path>        - Folder path where the sprites reside
    --output=<path>.tscn    - Output path where to save the .tscn file
Optional:
    --spacing=<int>         - Spacing between the tiles
    --itemsPerRow=<int>     - Amount of items per row
```

## Socials

Discord: `Blade#6667`<br>
Twitter: `@Blade67470`<br>
Email: `contact@codamie.com`

---

The tileset used in this repository is a modified version of [KenneyNL](https://www.kenney.nl/)'s free MapPack tileset.
