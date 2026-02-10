import { useState, useEffect, useRef } from "react";
import { ExtendedCustomization } from "@/data/drones";
import { supabase } from "@/integrations/supabase/client";

export function useDroneImage(customization: ExtendedCustomization) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastCustomizationRef = useRef<string>("");

  useEffect(() => {
    const customizationKey = JSON.stringify({
      frame: customization.frame?.id,
      camera: customization.camera?.id,
      propeller: customization.propeller?.id,
      lights: customization.lights?.id,
      gimbal: customization.gimbal?.id,
    });

    // Don't regenerate if the relevant customization hasn't changed
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
        // Silently handle credit/rate limit errors - just use default image
        if (msg.includes("non-2xx") || msg.includes("402") || msg.includes("429")) {
          console.warn("AI image generation unavailable, using default image");
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
