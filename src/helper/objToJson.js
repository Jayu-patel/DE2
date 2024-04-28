import data from "../data/data.js"
import { writeFile } from "fs";
 writeFile('file.json', JSON.stringify(data), (error) => {
    if (error) throw error;
  });