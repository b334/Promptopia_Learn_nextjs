import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

// Models object is provided my mongoose library and stores all the registered models. If there is already a model name 'User' in the 'models' object, it assign that existing model to the 'User' variable. This prevents from redefining the model and ensures that the existing model is reused. If the model named 'User' does not exist, then the model function from Mongoose is called to create a new model.
const User = models.User || model("User", UserSchema);
export default User;
