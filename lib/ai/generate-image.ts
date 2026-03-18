export type ImageSize = "512x512" | "1024x1024" | "1024x1792";
export type ImageStyle = "" | "anime" | "realistic" | "cartoon" | "oil-painting";

type GenerateImageInput = {
  prompt: string;
  size: ImageSize;
  style: ImageStyle;
};

type GenerateImageResult = {
  imageSrc: string;
};

function normalizeDataUrl(value: string) {
  if (value.startsWith("data:image/")) return value;
  return `data:image/png;base64,${value}`;
}

/**
 * 前端直连第三方 AI 生图接口（无后端）。
 *
 * 需要在 .env.local 中配置：
 * - NEXT_PUBLIC_AI_IMAGE_API_URL
 * - NEXT_PUBLIC_AI_IMAGE_API_KEY（可选）
 *
 * 接口返回兼容两类常见格式：
 * 1) 直接返回图片二进制（content-type: image/*）
 * 2) 返回 JSON（包含 url / imageUrl / b64_json / imageBase64 等字段）
 */
export async function generateImageWithApi(input: GenerateImageInput): Promise<GenerateImageResult> {
  const endpoint = process.env.NEXT_PUBLIC_AI_IMAGE_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_AI_IMAGE_API_KEY;

  if (!endpoint) {
    throw new Error("未配置 AI 生图接口地址，请设置 NEXT_PUBLIC_AI_IMAGE_API_URL");
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {})
      },
      body: JSON.stringify({
        prompt: input.prompt,
        size: input.size,
        style: input.style || undefined
      })
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`接口请求失败（${response.status}）：${errorText || "请检查接口可用性"}`);
    }

    const contentType = response.headers.get("content-type") ?? "";

    // 部分公开接口会直接返回图片二进制
    if (contentType.includes("image/")) {
      const blob = await response.blob();
      const imageSrc = URL.createObjectURL(blob);
      return { imageSrc };
    }

    // 也有很多接口返回 JSON
    const data = (await response.json()) as Record<string, unknown>;

    const imageUrl =
      (typeof data.imageUrl === "string" && data.imageUrl) ||
      (typeof data.url === "string" && data.url) ||
      (typeof data.output_url === "string" && data.output_url) ||
      (Array.isArray(data.data) &&
        typeof data.data[0] === "object" &&
        data.data[0] &&
        "url" in data.data[0] &&
        typeof (data.data[0] as { url: unknown }).url === "string" &&
        ((data.data[0] as { url: string }).url || "")) ||
      "";

    if (imageUrl) {
      return { imageSrc: imageUrl };
    }

    const base64 =
      (typeof data.b64_json === "string" && data.b64_json) ||
      (typeof data.imageBase64 === "string" && data.imageBase64) ||
      (Array.isArray(data.data) &&
        typeof data.data[0] === "object" &&
        data.data[0] &&
        "b64_json" in data.data[0] &&
        typeof (data.data[0] as { b64_json: unknown }).b64_json === "string" &&
        ((data.data[0] as { b64_json: string }).b64_json || "")) ||
      "";

    if (base64) {
      return { imageSrc: normalizeDataUrl(base64) };
    }

    throw new Error("接口返回中未找到可用图片字段（url/imageUrl/b64_json）");
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "网络请求失败，可能是 CORS 限制或接口不可达。请确认 API 是否支持前端跨域访问。"
      );
    }
    throw error;
  }
}
