const path = require('path');
const fs = require('fs-extra');

module.exports = function() {
  // copy the assets folder to the project if it doesn't already exist
  if (fs.readdirSync("../../").indexOf("assets") === -1) {
    fs.copySync(path.join(__dirname,"assets"), path.join(__dirname,"../../assets"));
  }
  
  // copy normalize scss to the
  // fs.copySync(path.join(__dirname,"assets"), path.join(__dirname,"../../assets/scss"));
}