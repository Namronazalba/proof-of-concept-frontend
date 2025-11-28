import fs from "fs";
import path from "path";

function listRoutes(basePath) {
  return fs
    .readdirSync(basePath, { withFileTypes: true })
    .flatMap((dirent) => {
      if (dirent.isDirectory()) {
        const page = path.join(basePath, dirent.name, "page.js");
        if (fs.existsSync(page)) {
          return [`/${dirent.name}`];
        }
      }
      if (dirent.name === "page.js") return ["/"];
      return [];
    });
}

console.log(listRoutes("src/app"));
