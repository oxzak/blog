const fs = require("fs");
const files = fs.readdirSync("posts").filter(f => f.endsWith(".md"));
fs.writeFileSync("../posts/posts.json", JSON.stringify(files, null, 2));
console.log(`Indexed ${files.length} post(s).`);
