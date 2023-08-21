export class UsersRepository {
    constructor(mongo) {
        this.mongo = mongo;
    }

    async all() {
        return this.mongo.get_all();
    }
}