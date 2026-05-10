import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/**
 * Read-only site_content field with Supabase Realtime updates (same table as EditableText).
 */
export function useSiteContentField(
  page: string,
  section: string,
  defaultValue: string,
): string {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    let cancelled = false;

    async function fetchContent() {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("page", page)
        .eq("section", section)
        .maybeSingle();

      if (cancelled) return;

      if (!error && data?.content != null && data.content !== "") {
        setValue(data.content);
      } else {
        setValue(defaultValue);
      }
    }

    void fetchContent();

    const channel = supabase
      .channel(`site-content-read-${page}-${section}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_content",
          filter: `page=eq.${page}`,
        },
        (payload) => {
          const row =
            payload.eventType === "DELETE"
              ? (payload.old as { section?: string; content?: string })
              : (payload.new as { section?: string; content?: string });

          if (row.section !== section) {
            return;
          }

          setValue(row.content ?? defaultValue);
        },
      );

    void channel.subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, [page, section, defaultValue]);

  return value;
}
