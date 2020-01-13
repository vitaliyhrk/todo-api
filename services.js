const fs = require("fs");

const getData = () => JSON.parse(fs.readFileSync("todo.json", "utf8"));

const setData = (data) => {
    const upData = JSON.stringify(data);
    fs.writeFileSync("todo.json", upData);
    return data;
};
const getItem = (data, id) => data.find(item => item.id === id);

module.exports.getItem = getItem;
module.exports.getData = getData;
module.exports.setData = setData;
