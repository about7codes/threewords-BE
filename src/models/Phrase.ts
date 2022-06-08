import mongoose, { Document, Schema } from "mongoose";

export interface IPhrase {
  words: string;
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
  },
  { timestamps: true, versionKey: false }
);

const Phrase = mongoose.model<IPhraseModel>("Phrase", phraseSchema);

export default Phrase;
