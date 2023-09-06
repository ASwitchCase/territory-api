export class TerritoriesRepository {
    constructor(mongo) {
        this.mongo = mongo;
    }

    async all() {
        return this.mongo.get_all();
    }

    async update(id,newDoc){
        console.log(id)
        const result = await this.mongo.exec(collection => collection.updateOne({tid: id},{$set: newDoc});
        console.log(`${result.matchedCount} document(s) matched the query criteria`);
        console.log(`${result.modifiedCount} were updated`)
    }
}