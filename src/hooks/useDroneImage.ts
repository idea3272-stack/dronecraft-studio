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
          console.warn("AI image generation unavailable, disabling:", fnError.message);
          setDisabled(true);
          return;
        }

        if (data?.error) {
          console.warn("AI image generation error:", data.error);
          setDisabled(true);
          return;
        }
        
        if (data?.imageUrl) {
          setImageUrl(data.imageUrl);
        }
      } catch (err) {
        console.warn("AI image generation failed, disabling for this session");
        setDisabled(true);
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
