import { axiosInstance } from "@/config/axios-instance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const search = searchParams.get("search");

    console.log({ limit, page, search });

    // const response = await axiosInstance.get("/speakers", {
    //   params: {
    //     ...(limit && { limit: parseInt(limit) }),
    //     ...(page && { page: parseInt(page) }),
    //     ...(search && { search }),
    //   },
    // });

    // return NextResponse.json(response.data);

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get speakers" },
      { status: 500 }
    );
  }
}
