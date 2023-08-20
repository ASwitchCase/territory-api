export class TerritoriesController {
    constructor(territoriesRepository) {
        this.territoriesRepository = territoriesRepository;
    }
  
    // TODO split into a separate controller focusing on the vertical slice of territories. One controller per route would make the most sense in most cases
    // Get Territory Cards from MongoDb
    async load_data (req,res) {
        let result = await this.territoriesRepository.all();  
        res.json(result);
    }

    // Update Exsisting Territory Card
    async upload_data (req,res) {

        await this.territoriesRepository.update(
            req.body.newTerritory.tid, // TODO remove the id from the request body, instead pass it in the route
            req.body.newTerritory);
        
        // TODO instead of returning the body that was posted, lookup the saved value from the database and return it.
        // consider adding a Location response header with a path to the resources that was created (/territories/{tid})
        // this allows consumers to dynamically traverse your response payload to make easy to build UIs
        res.send(req.body.newTerritory);
        res.end()
    }
}

  
  // module.exports = {
  //   upload_data: upload_data,
  //   load_data: load_data,
  //   get_users: get_users
  // }