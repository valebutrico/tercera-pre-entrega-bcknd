import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: function () {
      return !this.githubId;
    },
  },
  last_name: {
    type: String,
    required: function () {
      return !this.githubId;
    },
  },
  email: { type: String, required: true, unique: true },
  age: {
    type: Number,
    required: function () {
      return !this.githubId;
    },
  },
  password: {
    type: String,
    required: function () {
      return !this.githubId;
    },
  },
  githubId: { type: String },
  role: { type: String, default: "user" },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;