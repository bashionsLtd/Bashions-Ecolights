import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../lib/utils/supabase/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    // Parse multipart/form-data from the request
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const fileBuffer = new Uint8Array(arrayBuffer);
      const fileName = `${Date.now()}-${file.name}`;

      // Upload file to Supabase Storage
      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, fileBuffer, {
          contentType: file.type || "image/png",
        });

      if (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Get public URL (Supabase v2)
      const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
      uploadedUrls.push(data.publicUrl);
    }

    return NextResponse.json({
      url: uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls,
    });
  } catch (error: unknown) {
    console.error("Unexpected error:", error);

    // Narrow the error to access message safely
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
