import mongoose from "mongoose";

export const connectdB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://prachig150904_db_user:ilUTvLmPQh2FcwH0@cluster0.zmgnpvv.mongodb.net/Trustline"
    )
    .then(() => console.log("DB connected"));
};
