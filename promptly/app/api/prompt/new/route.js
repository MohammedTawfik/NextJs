import Prompt from "@models/prompt";
import { ConnectToDatabase } from "@utils/database";

export async function POST(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to MongoDB
      await ConnectToDatabase();

      // Get the prompt data from the request body
      const { userId, prompt, tag } = await req.json();
      console.log("userId", userId);
      console.log("prompt", prompt);
      console.log("tag", tag);
      // Create a new prompt document
      const promptToCreate = new Prompt({
        Creator: userId,
        Prompt: prompt,
        Tag: tag,
      });
      await promptToCreate.save();
      return new Response(JSON.stringify(promptToCreate), { status: 201 });
    } catch (error) {
      // Return an error response
      console.error("Create Prompt Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  } else {
    // Return a method not allowed response
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
    });
  }
}
