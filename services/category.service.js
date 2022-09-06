const {Category} = require("../models");
const getCategoryStatistic = async () => {
    const statistic = await Category.aggregate([
        {$project: {name: '$name', count: {$size: '$products'}}}
    ])
    return statistic;
}

module.exports = {
    getCategoryStatistic
}
