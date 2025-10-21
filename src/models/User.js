import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username cannot exceed 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    name: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["admin", "editor"],
      default: "admin",
      required: true,
    },
    super: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        return ret
      },
    },
  }
)

// Index for faster queries
UserSchema.index({ email: 1 })
UserSchema.index({ googleId: 1 })

// Static method to find user by email
UserSchema.statics.findByEmail = async function (email) {
  const user = await this.findOne({
    email: email.toLowerCase(),
    isActive: true,
  })
  return user
}

export default mongoose.models.User || mongoose.model("User", UserSchema)
