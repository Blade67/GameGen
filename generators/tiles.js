module.exports = function (spriteFolder, outputFolder, spacing = 3, itemsPerRow = 10) {
    const fs = require("fs");
    const path = require("path");
    const chalk = require("chalk");

    let header = `[gd_scene format=2]`;
    let meshResource = `[ext_resource path="res://Assets/Models/DefaultTile/tile.obj" type="ArrayMesh" id=1]`;

    let extResources = [];
    let extResource = `[ext_resource path="%path%" type="Texture" id=%id%]`;

    let subResources = [];
    let subResource = `[sub_resource type="SpatialMaterial" id=%id%]\nflags_transparent = true\nalbedo_texture = ExtResource( %ext% )`;

    let parentNode = `[node name="Tiles" type="Spatial"]`;

    let nodes = [];
    let node = `[node name="Tile%id%" type="MeshInstance" parent="."]\n%transform%mesh = ExtResource( 1 )\nmaterial/0 = SubResource( %sub% )\nmaterial/1 = null`;

    let cleanFolder = path.dirname(path.normalize(outputFolder));
    console.log("Clean", cleanFolder);
    if (!fs.existsSync(cleanFolder)) {
        fs.mkdirSync(cleanFolder);
    }

    let sprites = fs
        .readdirSync(spriteFolder, "utf-8")
        .filter((val) => new RegExp(".(jpg|bmp|jpeg|gif|png|tif)(?!.import)", "gi").test(val))
        .sort((a, b) => {
            return parseInt(a) - parseInt(b);
        });

    console.log(chalk.blue("[DEBUG]"), "Assembling Tiles...");

    for (let i = 0; i < sprites.length; i++) {
        console.log(chalk.green("[⚙]"), sprites[i]);
        extResources.push(
            extResource
                .replace(
                    /%path%/,
                    `res://${path.normalize(spriteFolder).replace(new RegExp(/\\/, "gi"), "/")}/${sprites[i]}`
                )
                .replace(/%id%/, i + 2)
        );
        subResources.push(subResource.replace(/%id%/, i + 1).replace(/%ext%/, i + 2));
        nodes.push(
            node
                .replace(/%id%/, i)
                .replace(/%sub%/, i + 1)
                .replace(
                    /%transform%/,
                    i === 0
                        ? ""
                        : `transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, ${
                              i * spacing - Math.floor(i / itemsPerRow) * spacing * itemsPerRow
                          }, 0, ${Math.floor(i / itemsPerRow) * spacing} )\n`
                )
        );
    }

    let output = `${header}\n\n${meshResource}\n\n${extResources.join("\n")}\n\n\n${subResources.join(
        "\n\n"
    )}\n\n\n${parentNode}\n\n\n${nodes.join("\n\n")}`;

    fs.writeFileSync(outputFolder, output);
    console.log(chalk.blue("[DEBUG]"), "Tiles Assembled!");
};
