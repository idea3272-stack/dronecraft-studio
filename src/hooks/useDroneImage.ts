import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useDroneImage(customization: Record<string, any>) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastCustomizationRef = useRef<string>("");

  useEffect(() => {
    if (disabled) return;

    const customizationKey = JSON.stringify(customization);

    if (customizationKey === lastCustomizationRef.current) {
      return;
    }

    // Debounce to avoid too many requests
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      lastCustomizationRef.current = customizationKey;
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: fnError } = await supabase.functions.invoke("generate-drone-image", {
          body: { customization },
        });

        if (fnError) {
          // Silently fail for payment/rate limit errors - just use default image
          if (fnError.message?.includes("402") || fnError.message?.includes("429")) {
            console.warn("AI image generation unavailable:", fnError.message);
            return;
          }
          throw new Error(fnError.message);
        }

        if (data?.error) {
          // Silently handle payment/rate limit errors
          if (data.error === "Payment required" || data.error === "Rate limited, please try again later.") {
            console.warn("AI image generation unavailable:", data.error);
            return;
          }
          setError(data.error);
        } else if (data?.imageUrl) {
          setImageUrl(data.imageUrl);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("non-2xx") || msg.includes("402") || msg.includes("429") || msg.includes("Payment")) {
          console.warn("AI image generation unavailable, disabling for this session");
          setDisabled(true);
        } else {
          console.error("Failed to generate drone image:", err);
          setError(msg);
        }
      } finally {
        setIsLoading(false);
      }
    }, 1500); // Wait 1.5 seconds before generating

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [customization]);

  return { imageUrl, isLoading, error };
}
