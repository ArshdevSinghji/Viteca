import { axiosInstance } from "@/config/axios-instance";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const filter = requestBody.filter || requestBody;

  console.log(filter);

  const response = await axiosInstance.post(
    "digital-resources/search",
    filter,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return NextResponse.json(response.data);

  // return NextResponse.json({ message: "Hello World", filter });
}
