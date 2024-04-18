import { ConnectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export async function GET(req) {
  if (req.method === "GET") {
    try {
      // Connect to MongoDB
      await ConnectToDatabase();

      // Get all prompts
      const prompts = await Prompt.find({}).populate("Creator");
      return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
      // Return an error response
      console.error("Get Prompts Error:", error);
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
