import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "This email already exists"],
  },
  userName: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "This username already exists"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
