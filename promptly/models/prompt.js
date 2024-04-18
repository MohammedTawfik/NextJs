import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  Creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Prompt: {
    type: String,
    required: [true, "Please provide a prompt"],
  },
  Tag: {
    type: String,
    required: [true, "Please provide a tag"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;
