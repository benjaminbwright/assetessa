const path = require('path');
const fs = require('fs-extra');

module.exports = function() {
  fs.copySync(path.join(__dirname,"assets"), path.join(__dirname,"../../assets"));
}