import { axiosInstance } from "@/config/axios-instance";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const filter = await request.json();

  console.log(filter);

  //   const response = await axiosInstance.post("digital-resources/search", {
  //     filter,
  //   });

  return NextResponse.json({ message: "Hello World", filter });
}
