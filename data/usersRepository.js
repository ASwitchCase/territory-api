export class UsersRepository {
    constructor(mongo) {
        this.mongo = mongo;
        this.mongo.configure('TerritoryDB', 'users');
    }

    async all() {
        return this.mongo.get_all();
    }
}