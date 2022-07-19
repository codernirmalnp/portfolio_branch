interface User {
  _id?: string;
  name: string;
  email: string;
  password: string | undefined;
  posts: string[];
  address: {};
}

export default User;
