import { ConnectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export async function GET(req, { params }) {
  if (req.method === "GET") {
    try {
      // Connect to MongoDB
      await ConnectToDatabase();

      // Get the prompt
      const prompt = await Prompt.findById(params.id);
      return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
      // Return an error response
      console.error("Get Prompt Error:", error);
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

export async function PATCH(req, { params }) {
  if (req.method === "PATCH") {
    try {
      const { prompt, tag } = await req.json();
      // Connect to MongoDB
      await ConnectToDatabase();
      // Update the prompt
      const promptToUpdate = await Prompt.findById(params.id);
      if (!promptToUpdate) {
        return new Response(JSON.stringify({ message: "Prompt not found" }), {
          status: 404,
        });
      }
      promptToUpdate.Prompt = prompt;
      promptToUpdate.Tag = tag;

      const updatedPrompt = await promptToUpdate.save();
      return new Response(JSON.stringify(updatedPrompt), { status: 200 });
    } catch (error) {
      // Return an error response
      console.error("Update Prompt Error:", error);
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

export async function DELETE(req, { params }) {
  if (req.method === "DELETE") {
    try {
      // Connect to MongoDB
      await ConnectToDatabase();

      // Delete the prompt
      const prompt = await Prompt.findByIdAndDelete(params.id);
      return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
      // Return an error response
      console.error("Delete Prompt Error:", error);
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
