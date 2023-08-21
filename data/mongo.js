export class Mongo {
    /// receives a mongodb client
    constructor(client, collection) {
        this.client = client;
        this.collection = collection;
        this.db = 'TerritoryDB';
    }

    async get_all() {
        return this.mongo.exec(async (collection) => 
            collection
                .find({},{projection:{ _id: 0 }})
                .toArray());
    }

    async exec(action) {
        const uri = process.env.URI;
        const client = new MongoClient(uri);
        
        try {
            await client.connect();
            var collection = client.db(this.db).collection(this.collection);
            await action(collection);
        } catch (e){
            // todo, replace with a logger
            console.error(e);
        } finally {
            await client.close();
        }
    }
}