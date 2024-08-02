class UserDTO {
  
  constructor(user) {
    this.id = user._id;
    this.name = user.name;
		this.lastName = user.last_name;
    this.email = user.email;
		this.age = user.age;
		this.role = user.role;
  }
}

export default UserDTO;
