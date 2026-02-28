import * as fs from 'fs';
import * as path from 'path';

export class JSONHelper {
  // Read JSON file and return object
  static readJSON(fileName: string): any {
    const filePath = path.resolve(__dirname, '../test-data', fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`JSON file not found: ${filePath}`);
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  // Write object to JSON file
  static writeJSON(fileName: string, data: any): void {
    const filePath = path.resolve(__dirname, '../test-data', fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  // Append object to existing JSON array
  static appendJSON(fileName: string, data: any): void {
    const existingData = this.readJSON(fileName) || [];
    if (!Array.isArray(existingData)) {
      throw new Error(`JSON file must contain an array to append: ${fileName}`);
    }
    existingData.push(data);
    this.writeJSON(fileName, existingData);
  }
}