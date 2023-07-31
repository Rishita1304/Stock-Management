import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = "mongodb+srv://admin123:admin123@cluster0.1c26ayy.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const query = {};
    const products = await inventory.find().toArray();
    return NextResponse.json({ success:true, products });
  } finally {
    await client.close();
  }
}
export async function POST(request) {
  let body = await request.json();
  console.log(body);
  const uri = "mongodb+srv://admin123:admin123@cluster0.1c26ayy.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const query = {};
    const product = await inventory.insertOne(body)
    console.log(product);
    return NextResponse.json({ product, ok:true });
  } finally {
    await client.close();
  }
}
