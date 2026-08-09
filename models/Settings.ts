import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  razorpayKeyId: string;
  razorpayKeySecret: string;
  platformName: string;
  supportEmail: string;
}

const SettingsSchema: Schema = new Schema(
  {
    razorpayKeyId: {
      type: String,
      default: "",
    },
    razorpayKeySecret: {
      type: String,
      default: "",
    },
    platformName: {
      type: String,
      default: "LearnWithTP",
    },
    supportEmail: {
      type: String,
      default: "support@learnwithtp.com",
    },
  },
  { timestamps: true }
);

// Settings will be a singleton document. We just get the first one.
const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);

export default Settings;
