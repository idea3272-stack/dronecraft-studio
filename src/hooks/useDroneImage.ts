import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useDroneImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const generateImage = useCallback(async (customization: Record<string, any>) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("generate-drone-image", {
        body: { customization },
      });

      if (fnError) {
        console.warn("AI image generation error:", fnError.message);
        setError("AI ไม่พร้อมใช้งาน กรุณาลองใหม่ภายหลัง");
        return;
      }

      if (data?.error) {
        console.warn("AI image generation error:", data.error);
        setError(data.error === "Payment required" 
          ? "เครดิต AI หมด กรุณาเติมเครดิตที่ Settings" 
          : "ไม่สามารถสร้างภาพได้");
        return;
      }

      if (data?.imageUrl) {
        setImageUrl(data.imageUrl);
      }
    } catch (err) {
      console.warn("AI image generation failed:", err);
      setError("ไม่สามารถสร้างภาพได้");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return { imageUrl, isLoading, error, generateImage };
}
