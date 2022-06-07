import mongoose, { Document, Schema } from "mongoose";

interface IPhrase {
  words: string;
}

interface IPhraseModel extends IPhrase, Document {}

const phraseSchema: Schema = new Schema(
  {
    words: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Phrase = mongoose.model<IPhraseModel>("Phrase", phraseSchema);

export default Phrase;
