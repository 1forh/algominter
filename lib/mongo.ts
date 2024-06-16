import { env } from '@/env.mjs';
import mongoose from 'mongoose';
import 'server-only';

declare global {
  var mongoose: any;
}

//https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    try {
      cached.promise = mongoose.connect(env.MONGO_URI || '', opts).then((mongoose) => {
        return mongoose;
      });
    } catch (e) {
      throw new Error('Error connecting to database');
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// export const getProfile = cache(async (id: string, fields?: string[]): Promise<ProfileT | null> => {
//   await connect();
//   const result = await Profile.findOne({ _id: id }, fields).lean();
//   return result ? JSON.parse(JSON.stringify(result)) : null;
// });
