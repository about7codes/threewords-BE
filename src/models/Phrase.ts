import mongoose, { Document, Schema } from "mongoose";

export interface IPhrase {
  words: string;
  owner: string;
}

export interface IPhraseModel extends IPhrase, Document {}

const phraseSchema: Schema = new Schema(
  {
    words: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      // validate: {
      //   validator: async (owner: string) => {
      //     const user = await mongoose.model("User").findById(owner);
      //     if (!user) return false;
      //     return true;
      //   },
      //   message: "User does not exist",
      // },
    },
  },
  { timestamps: true, versionKey: false }
);

const Phrase = mongoose.model<IPhraseModel>("Phrase", phraseSchema);

export default Phrase;
