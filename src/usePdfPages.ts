import { useEffect, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { CanvasTexture, SRGBColorSpace } from "three";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url
).toString()

export function usePdfPages(url: string) {
	const [textures, setTextures] = useState<CanvasTexture[]>([]);

	useEffect(() => {
		(async () => {
			const pdf = await pdfjs.getDocument(url).promise;
			const result: CanvasTexture[] = [];

			for (let i = 1; i <= pdf.numPages; i++) {
				const page = await pdf.getPage(i);
				const viewport = page.getViewport({ scale: 2 });

				const canvas = document.createElement("canvas");
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				const ctx = canvas.getContext("2d")!;
				await page.render({ canvasContext: ctx, canvas, viewport }).promise;

				const texture = new CanvasTexture(canvas);
				texture.colorSpace = SRGBColorSpace;
				texture.anisotropy = 8;
				result.push(texture);
			}

			setTextures(result);
		})();
	}, [url]);

	return textures;
}
