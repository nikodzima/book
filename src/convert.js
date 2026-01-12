import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = "../public/images";     // папка с исходниками
const outputDir = "./images_png"; // папка для PNG (можно ту же)

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const allowedExt = [".jpg", ".jpeg", ".png", ".webp"];

fs.readdir(inputDir, async (err, files) => {
	if (err) {
		console.error("Ошибка чтения директории:", err);
		return;
	}

	for (const file of files) {
		const ext = path.extname(file).toLowerCase();
		if (!allowedExt.includes(ext)) continue;

		const inputPath = path.join(inputDir, file);
		const outputPath = path.join(
			outputDir,
			path.basename(file, ext) + ".png"
		);

		try {
			await sharp(inputPath)
				.png({
					compressionLevel: 9,
					adaptiveFiltering: true,
				})
				.toFile(outputPath);

			console.log(`✔ ${file} → ${path.basename(outputPath)}`);
		} catch (e) {
			console.error(`✖ Ошибка при обработке ${file}`, e);
		}
	}
});
