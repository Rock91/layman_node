const mongo = require('../config/mongodb');


const getId = async (type) => {
    let counterInfo = await mongo.ggDb.model(mongo.models.counters).findOneAndUpdate({
        query: {
            name: type
        },
        update: {
            $inc: {
                count: 1
            }
        },
        options: {
            upsert: true,
            new: true
        }
    })
    return counterInfo.count;
}

module.exports = {
    getGameId,
    getId
}