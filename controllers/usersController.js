export class UsersController {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
    // Get user accounts from MongoDb
  get_users = async () =>{
    return await this.usersRepository.all();  
  }
}