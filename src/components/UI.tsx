import { atom, useAtom } from "jotai";
import { useEffect } from "react";
// получаем все картинки из /public/images, поддерживаем jpg и png
// eager: true — сразу загружает модули
const modules = import.meta.glob("/public/images/Аня_pages-to-jpg-0*.{jpg,png}", { eager: true });

// преобразуем в массив с именами файлов
const imageFiles = Object.keys(modules)
  .map((path) => {
    const match = path.match(/Аня_pages-to-jpg-0(\d+)\.(jpg|png)$/);
    if (!match) return null;
    return { name: match[0].replace(/\.(jpg|png)$/, ""), num: parseInt(match[1], 10) };
  })
  .filter(Boolean)
  .sort((a, b) => a!.num - b!.num) as { name: string; num: number }[];

export const pageAtom = atom(0);
export const pages: { front: string, back: string }[] = [];

// обложка
if (imageFiles.length > 0) {
  pages.push({
    front: "front",
    back: imageFiles[0].name,
  });
}

// страницы парами
for (let i = 1; i < imageFiles.length - 1; i += 2) {
  pages.push({
    front: imageFiles[i].name,
    back: imageFiles[i + 1].name,
  });
}

// задняя обложка
if (imageFiles.length > 1) {
  pages.push({
    front: imageFiles[imageFiles.length - 1].name,
    back: "back",
  });
}

export const UI = () => {



  return (
    <>

    </>
  );
};
