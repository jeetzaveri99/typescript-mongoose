import mongoose from 'mongoose';

const DB_URL="mongodb://0.0.0.0:27017/userPost"

const connectDB = async () => {
  try {
    mongoose.Promise = Promise;
    await mongoose.connect(DB_URL).then(() => {
			console.log('MongoDB Connection Established...');
		});
	} catch (error) {
		console.log("Error while connection MongoDB ::::::: \n", error);
		process.exit(1);
	}
};

export default connectDB;