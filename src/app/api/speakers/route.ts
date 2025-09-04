import { getSession } from "@/app/auth/session-token";
import { axiosInstance } from "@/config/axios-instance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const token = session?.user?.token;
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const search = searchParams.get("search");

    console.log({ limit, page, search });

    const response = await axiosInstance.get(
      `/speakers?limit=${limit}&page=${page}&search=${search || ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data);

    // return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get speakers" },
      { status: 500 }
    );
  }
}
