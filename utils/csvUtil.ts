import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

export class CSVHelper {
  // Parse CSV file into array of objects
  static async parseCSV(fileName: string, delimiter = ','): Promise<any[]> {
    const filePath = path.resolve(__dirname, '../test-data', fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`CSV file not found: ${filePath}`);
    }

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    let headers: string[] = [];
    const result: any[] = [];

    for await (const line of rl) {
      const values = line.split(delimiter);
      if (headers.length === 0) {
        headers = values.map(h => h.trim());
      } else {
        const obj: any = {};
        headers.forEach((header, i) => (obj[header] = values[i]?.trim() ?? ''));
        result.push(obj);
      }
    }

    return result;
  }
}