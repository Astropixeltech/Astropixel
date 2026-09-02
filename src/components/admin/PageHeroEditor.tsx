import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Loader2, Sparkles, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export interface PageHeroField {
  key: string;
  label: string;
  description: string;
  type: "input" | "textarea";
  fallback: string;
}

interface Props {
  pageName: string;
  title: string;
  subtitle?: string;
  fields: PageHeroField[];
}

export default function PageHeroEditor({ pageName, title, subtitle, fields }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["page-hero-editor", pageName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("content_key, content_en")
        .eq("page_name", pageName)
        .eq("site_scope", "agency")
        .in("content_key", fields.map((f) => f.key));
      if (error) throw error;
      return data as { content_key: string; content_en: string | null }[];
    },
  });

  useEffect(() => {
    const map: Record<string, string> = {};
    fields.forEach((f) => {
      const row = data?.find((r) => r.content_key === f.key);
      map[f.key] = row?.content_en ?? f.fallback;
    });
    setValues(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const rows = fields.map((f) => ({
        page_name: pageName,
        content_key: f.key,
        content_en: values[f.key] ?? "",
        site_scope: "agency",
      }));
      const { error } = await (supabase as any)
        .from("page_content")
        .upsert(rows as any, { onConflict: "site_scope,page_name,content_key" });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Hero section updated");
      queryClient.invalidateQueries({ queryKey: ["page-hero-editor", pageName] });
      queryClient.invalidateQueries({ queryKey: ["page-hero", pageName] });
      queryClient.invalidateQueries({ queryKey: ["page-content"] });
    },
    onError: (e: any) => toast.error(e.message || "Failed to save"),
  });

  return (
    <Card>
      <button type="button" onClick={() => setOpen((v) => !v)} className="w-full text-left">
        <CardHeader className="flex flex-row items-center justify-between gap-3 hover:bg-muted/40 transition-colors rounded-t-lg">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {open ? "Click to collapse" : subtitle ?? "Click to edit the top hero section"}
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </CardHeader>
      </button>
      {open && (
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-5 mt-2">
              {fields.map((f) => (
                <div key={f.key} className="p-5 rounded-xl border border-border/60 bg-gradient-to-br from-card to-muted/20 shadow-sm transition-all focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/5">
                  <div className="mb-3">
                    <Label className="text-base font-bold text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/80" />
                      {f.label}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1 ml-3.5 border-l-2 border-muted pl-2">{f.description}</p>
                  </div>
                  <div className="ml-3.5">
                    {f.type === "textarea" ? (
                      <Textarea
                        rows={3}
                        value={values[f.key] ?? ""}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        className="resize-none bg-background/50 border-border/60 focus:bg-background transition-colors"
                      />
                    ) : (
                      <Input
                        value={values[f.key] ?? ""}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        className="bg-background/50 border-border/60 focus:bg-background transition-colors"
                      />
                    )}
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4 border-t border-border/40 mt-6">
                <Button 
                  onClick={() => saveMutation.mutate()} 
                  disabled={saveMutation.isPending}
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/25 rounded-full px-8"
                >
                  {saveMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Hero Section
                </Button>
              </div>
            </div>
          )}
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Hero Section
                </Button>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
}
