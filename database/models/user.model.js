
import mongoose from "mongoose";

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name required']
  },
  email: {
    type: String,
    required: [true, 'email required'],

  },
  password: {
    type: String,
    required: [true, 'password required'],
    min: [6, "MinLength 6 Characters"]

  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },


})

// userSchema.pre("save", function () {
//   this.password = bcrypt.hashSync(this.password, 8);
// })
// userSchema.pre("findOneAndUpdate", function () {
//   if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8);
// })


export const userModel = mongoose.model('user', userSchema)