import * as fs from "fs";
import * as path from "path";

async function ensureDirectoryExists(directoryPath: string): Promise<void> {
  try {
    await fs.promises.access(directoryPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.promises.mkdir(directoryPath, { recursive: true });
    } else {
      throw err;
    }
  }
}

export async function writeFileSync(filePath: string, buffer: any) {
  const permission = 438;
  let fileDescriptor: number;

  const directory = path.dirname(filePath);
  await ensureDirectoryExists(directory);

  try {
    fileDescriptor = fs.openSync(filePath, "w", permission);
  } catch (e) {
    fs.chmodSync(filePath, permission);
    fileDescriptor = fs.openSync(filePath, "w", permission);
  }

  if (fileDescriptor) {
    fs.writeSync(fileDescriptor, buffer, 0, buffer.length, 0);
    fs.closeSync(fileDescriptor);
  }
}
