const { argv } = require("yargs");
const chalk = require("chalk");

/**
 * node _generate.js --generator=<generator>
 */

switch (argv.generator) {
    case "split":
        /**
         * Split:
         *   --tileset=<path> --spriteWidth=<int> --spriteHeight=<int> --output=<path>
         *
         * Optional Arguments:
         *   --startX=<int>         - default 0
         *   --endX=<int>           - default tileset.width / spriteWidth
         *   --startY=<int>         - default 0
         *   --endY=<int>           - default tileset.height / spriteHeight
         */
        if (!argv.tileset)
            return console.error(
                chalk.red("[ERROR]"),
                `Invalid tileset path "${argv.tileset}"! Use the '--tileset="your/file.*"' argument!`
            );
        if (!argv.spriteWidth)
            return console.error(
                chalk.red("[ERROR]"),
                `Invalid sprite width "${argv.spriteWidth}"! Use the '--spriteWidth=<int>' argument!`
            );
        if (!argv.spriteHeight)
            return console.error(
                chalk.red("[ERROR]"),
                `Invalid sprite height "${argv.spriteHeight}"! Use the '--spriteHeight=<int>' argument!`
            );
        if (!argv.output)
            return console.error(
                chalk.red("[ERROR]"),
                `Invalid output path "${argv.output}"! Use the '--output="your/outputFolder"' argument!`
            );
        require("./generators/split.js")(
            { output: argv.output },
            argv.tileset,
            { width: argv.spriteWidth, height: argv.spriteHeight },
            { start: { x: argv.startX | 0, y: argv.startY | 0 }, end: { x: argv.endX | 0, y: argv.endY | 0 } }
        );
        break;
    case "tiles":
        /**
         * Tiles:
         *   --sprites=<path> --output=<path>
         *
         * Optional Arguments:
         *   --spacing<int>        - default 3
         *   --itemsPerRow=<int>   - default 10
         */
        if (!argv.sprites)
            return console.error(
                chalk.red("[ERROR]"),
                `Invalid sprites folder "${argv.sprites}"! Use the '--sprites="your/spritesFolder"' argument!`
            );
        if (typeof argv.spacing !== Number && argv.spacing !== undefined)
            return console.error(
                chalk.red("[ERROR]"),
                `Invalid tile spacing "${argv.spacing}"! Use the '--spacing=<int>' argument!`
            );
        if (!argv.output)
            return console.error(
                chalk.red("[ERROR]"),
                `Invalid output path "${argv.output}"! Use the '--output="your/outputFolder/TilesScene.tscn"' argument!`
            );
        require("./generators/tiles.js")(argv.sprites, argv.output, argv.spacing, argv.itemsPerRow);
        break;
    default:
        console.log(chalk.red("[ERROR]"), `Received unknown argument "${argv.generator}"!`);
        break;
}
