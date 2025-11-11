import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import TurndownService from "turndown";
import { Eye, Code } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  label = "Content",
  placeholder = "Write your content here...",
  minHeight = "400px",
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState("write");

  const handlePaste = (e: React.ClipboardEvent) => {
    const html = e.clipboardData.getData("text/html");
    if (html) {
      e.preventDefault();
      const turndownService = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
      });
      const markdown = turndownService.turndown(html);
      onChange(value + markdown);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass">
          <TabsTrigger value="write" className="flex items-center space-x-2">
            <Code size={16} />
            <span>Write</span>
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center space-x-2">
            <Eye size={16} />
            <span>Preview</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onPaste={handlePaste}
            placeholder={placeholder}
            className="glass border-primary/30 font-mono"
            style={{ minHeight }}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Supports Markdown. Paste formatted content to auto-convert.
          </p>
        </TabsContent>

        <TabsContent value="preview">
          <div
            className="glass rounded-lg p-6 prose prose-invert max-w-none"
            style={{ minHeight }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
              {value || "*No content to preview*"}
            </ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
