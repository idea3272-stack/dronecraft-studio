import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customization } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build prompt based on customization
    const frameColor = customization.frame?.name?.includes("Carbon") ? "matte black carbon fiber" 
      : customization.frame?.name?.includes("Aluminum") ? "silver aluminum" 
      : customization.frame?.name?.includes("Titanium") ? "dark gray titanium" 
      : "black";
    
    const hasCamera = customization.camera?.name?.includes("4K") ? "with a 4K camera mounted" 
      : customization.camera?.name?.includes("8K") ? "with a professional 8K cinema camera" 
      : customization.camera?.name?.includes("Thermal") ? "with a thermal imaging camera" 
      : "";
    
    const hasLights = customization.lights?.name?.includes("RGB") ? "with RGB LED lights glowing" 
      : customization.lights?.name?.includes("Navigation") ? "with navigation lights" 
      : customization.lights?.name?.includes("Strobe") ? "with bright strobe lights" 
      : "";
    
    const propellerStyle = customization.propeller?.name?.includes("High") ? "high-efficiency propellers" 
      : customization.propeller?.name?.includes("Low") ? "quiet low-noise propellers" 
      : customization.propeller?.name?.includes("Racing") ? "racing propellers" 
      : "standard propellers";

    const hasGimbal = customization.gimbal?.name?.includes("3-Axis") ? "with a professional 3-axis gimbal" 
      : customization.gimbal?.name?.includes("2-Axis") ? "with a 2-axis gimbal" 
      : "";

    const prompt = `A professional product photo of a high-end custom quadcopter drone with ${frameColor} frame, ${propellerStyle} ${hasCamera} ${hasGimbal} ${hasLights}. The drone is shown on a clean dark gradient background with dramatic studio lighting. Photorealistic, 8K quality, product photography style. The drone appears sleek and futuristic. Ultra high resolution.`;

    console.log("Generating drone image with prompt:", prompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          { role: "user", content: prompt }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Failed to generate image" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    console.log("AI response received");
    
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error("No image URL in response:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "No image generated" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ imageUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating drone image:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
