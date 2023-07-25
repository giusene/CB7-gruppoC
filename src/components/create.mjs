import fs from "fs";

try {
  if (!fs.existsSync("./Component")) {
    fs.mkdirSync("./Component");
  }
} catch (err) {
  console.error(err);
}

fs.writeFile(
  "./Component/Component.jsx",
  `import "./Component.module.scss" 
  const Component = () => {}
  export default Component`,
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);

fs.writeFile(
  "./Component/index.jsx",
  `import Component from "./Component" 
export default Component`,
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);

fs.writeFile("./Component/Component.module.scss", "", (err) => {
  if (err) {
    console.error(err);
  }
});
