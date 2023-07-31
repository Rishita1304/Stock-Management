import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = "mongodb+srv://admin123:admin123@cluster0.1c26ayy.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const query = request.nextUrl.searchParams.get("query");
    const products = await inventory
      .aggregate([
        {
          $match: {
            $or: [
              { slug: { $regex: query, $options: "i" } },
            //   { category: { $regex: query, $options: "i" } },
            ],
          },
        },
      ])
      .toArray();
    return NextResponse.json({ success: true, products });
  } finally {
    await client.close();
  }
}
