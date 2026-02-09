import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CustomizationCategory {
  id: string;
  label: string;
  icon: string;
  sort_order: number;
}

export interface CustomizationOption {
  id: string;
  category_id: string;
  name: string;
  price: number;
  description: string;
  sort_order: number;
  is_default: boolean;
}

export function useCustomizationCategories() {
  return useQuery({
    queryKey: ["customization-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customization_categories")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as CustomizationCategory[];
    },
  });
}

export function useCustomizationOptions() {
  return useQuery({
    queryKey: ["customization-options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customization_options")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as CustomizationOption[];
    },
  });
}
