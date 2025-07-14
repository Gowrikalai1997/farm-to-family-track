import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Eye, Type, Image, Video, Link } from "lucide-react";

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

interface PageEditorProps {
  page?: Page | null;
  onSave: (pageData: Partial<Page>) => void;
  onCancel: () => void;
}

export function PageEditor({ page, onSave, onCancel }: PageEditorProps) {
  const [title, setTitle] = useState(page?.title || "");
  const [slug, setSlug] = useState(page?.slug || "");
  const [content, setContent] = useState(page?.content || "");
  const [status, setStatus] = useState<"draft" | "published">(page?.status || "draft");
  const [metaTitle, setMetaTitle] = useState(page?.seo.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(page?.seo.metaDescription || "");
  const [keywords, setKeywords] = useState(page?.seo.keywords || "");
  const [showPreview, setShowPreview] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!page && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setSlug(generatedSlug);
    }
  }, [title, page]);

  const handleSave = () => {
    const pageData = {
      title,
      slug,
      content,
      status,
      seo: {
        metaTitle: metaTitle || title,
        metaDescription,
        keywords
      }
    };
    onSave(pageData);
  };

  const insertContent = (type: string) => {
    const cursor = content.length;
    let insertText = "";
    
    switch (type) {
      case "heading":
        insertText = "\n<h2>Your Heading</h2>\n";
        break;
      case "paragraph":
        insertText = "\n<p>Your paragraph text here...</p>\n";
        break;
      case "image":
        insertText = '\n<img src="/api/placeholder/400/300" alt="Description" className="w-full h-auto rounded-lg" />\n';
        break;
      case "video":
        insertText = '\n<video controls className="w-full rounded-lg">\n  <source src="your-video.mp4" type="video/mp4" />\n  Your browser does not support the video tag.\n</video>\n';
        break;
      case "link":
        insertText = '<a href="https://example.com" className="text-primary hover:underline">Link text</a>';
        break;
    }
    
    setContent(content.slice(0, cursor) + insertText + content.slice(cursor));
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Editor
            </Button>
            <div className="text-sm text-muted-foreground">
              Preview Mode
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto p-6">
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button variant="outline" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to CMS
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Page
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Content</CardTitle>
                <CardDescription>
                  Create and edit your page content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter page title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="page-url-slug"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    URL: yourdomain.com/{slug}
                  </p>
                </div>

                {/* Content Tools */}
                <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-lg">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertContent("heading")}
                  >
                    <Type className="h-3 w-3 mr-1" />
                    Heading
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertContent("paragraph")}
                  >
                    <Type className="h-3 w-3 mr-1" />
                    Paragraph
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertContent("image")}
                  >
                    <Image className="h-3 w-3 mr-1" />
                    Image
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertContent("video")}
                  >
                    <Video className="h-3 w-3 mr-1" />
                    Video
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertContent("link")}
                  >
                    <Link className="h-3 w-3 mr-1" />
                    Link
                  </Button>
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your page content (HTML supported)"
                    className="min-h-[400px] font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    You can use HTML tags for formatting
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Page Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Page Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={(value: "draft" | "published") => setStatus(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Optimize your page for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO title (60 chars max)"
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {metaTitle.length}/60 characters
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="SEO description (160 chars max)"
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {metaDescription.length}/160 characters
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate keywords with commas
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}