module.exports = function (path, tileset, size, offset) {
    const fs = require("fs");
    const chalk = require("chalk");
    const sharp = require("sharp");

    if (!fs.existsSync(path.output)) {
        fs.mkdirSync(path.output);
    }

    let spr = sharp(tileset);
    spr.metadata().then((metadata) => {
        console.log(offset.end.y > 0, offset.end.x > 0);
        console.log(chalk.blue("[DEBUG]"), "Splitting texture...");
        let count = 0;
        for (
            let y = Math.max(0, offset.start.y);
            y < Math.max(0, offset.end.y > 0 ? offset.end.y : metadata.height / size.height);
            y++
        ) {
            for (
                let x = Math.max(0, offset.start.x);
                x < Math.max(0, offset.end.x > 0 ? offset.end.x : metadata.width / size.width);
                x++
            ) {
                console.log(chalk.green("[✂]"), x, y);
                spr.extract({
                    left: x * size.width,
                    top: y * size.height,
                    width: size.width,
                    height: size.height,
                }).toFile(`${path.output}/${count}.png`);
                count++;
            }
        }
    });

    console.log(chalk.blue("[DEBUG]"), "Texture split!");
};
