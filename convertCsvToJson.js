const fs = require("fs");
const path = require("path");

function reconstructJson(filePath, outputJsonPath) {
  try {
    const lines = fs.readFileSync(filePath, "utf-8").split("\n");

    const jsonLines = lines
      .map((line) => line.trim()) 
      .filter((line) => line && !line.startsWith("//")) 
      .map((line) => {
        if (line.endsWith(",")) {
          return line.slice(0, -1);
        }
        return line;
      });

    const jsonString = jsonLines.join("").replace(/,$/, "");

    const validJsonString = jsonString.startsWith("{") ? jsonString : `{${jsonString}}`;

    const jsonObject = JSON.parse(validJsonString);
    fs.writeFileSync(outputJsonPath, JSON.stringify(jsonObject, null, 2));
    console.log(`JSON reconstruit et sauvegardé dans : ${outputJsonPath}`);
  } catch (err) {
    console.error(`Erreur lors de la reconstruction du JSON depuis ${filePath}: ${err.message}`);
  }
}

const inputFiles = [
  "FA58691.csv",
  "Facture_1.csv",
  "Facture_2.csv",
  "Facture_3.csv"
];

inputFiles.forEach((file) => {
  const inputPath = path.join(__dirname, "train_data", file);
  const outputPath = inputPath.replace(".csv", ".json");
  reconstructJson(inputPath, outputPath);
});
