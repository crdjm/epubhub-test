import { parseEpub } from "epubhub";
const fs = require("fs");

const input = "/Users/crdjm/Desktop/epubs/input_epubs/local/mobydick.epub";
const output = "/Users/crdjm/Desktop/epubs/input_epubs/mobydick_updated.epub";

let writeFileSync = function (path: string, buffer: any) {
  const permission = 438;
  let fileDescriptor: number;

  try {
    fileDescriptor = fs.openSync(path, "w", permission);
  } catch (e) {
    fs.chmodSync(path, permission);
    fileDescriptor = fs.openSync(path, "w", permission);
  }

  if (fileDescriptor) {
    fs.writeSync(fileDescriptor, buffer, 0, buffer.length, 0);
    fs.closeSync(fileDescriptor);
  }
};

async function readepub() {
  const epub = await parseEpub(
    "/Users/crdjm/Desktop/epubs/input_epubs/local/mobydick.epub",
  );

  const entry = epub.spine[0];
  const txt = await entry.item.getText();
  const updated = txt.replace(/\<title\>/g, "<title>INSERTED ");

  await entry.item.setText(updated);
  const buf = await epub.toBuffer();
  writeFileSync(output, buf);
}

readepub();
