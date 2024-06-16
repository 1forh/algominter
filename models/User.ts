import { UserSchemaT, UserT } from 'lib/types';
import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const fields: UserSchemaT = {
  id: Number,
  address: String,
  subscribedOn: Date,
};

const UserSchema = new Schema(fields, {
  timestamps: true,
});

const User = models?.User || model('User', UserSchema);

export default User as mongoose.Model<UserT>;
