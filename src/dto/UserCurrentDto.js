class UserCurrentDTO {
  
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.role = user.role;
    this.githubId = user.githubId;
  }
}

export default UserCurrentDTO;
