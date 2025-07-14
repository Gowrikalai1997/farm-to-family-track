import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, Search, Globe, FileText, Settings } from "lucide-react";
import { PageEditor } from "./PageEditor";
import { SEOManager } from "./SEOManager";
import { useToast } from "@/hooks/use-toast";

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
  createdAt: string;
  updatedAt: string;
}

export function CMSDashboard() {
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>([
    {
      id: "1",
      title: "About Us",
      slug: "about",
      content: "<h1>About FarmTrace</h1><p>We connect farmers directly with consumers...</p>",
      status: "published",
      seo: {
        metaTitle: "About FarmTrace - Organic Farm to Table",
        metaDescription: "Learn about our mission to connect organic farmers with families through transparent supply chain tracking.",
        keywords: "organic farming, farm to table, sustainable agriculture"
      },
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20"
    },
    {
      id: "2",
      title: "How It Works",
      slug: "how-it-works",
      content: "<h1>How FarmTrace Works</h1><p>Simple steps to get fresh organic produce...</p>",
      status: "draft",
      seo: {
        metaTitle: "How FarmTrace Works - Simple Steps",
        metaDescription: "Discover how easy it is to get fresh organic produce delivered to your door with full farm-to-table tracking.",
        keywords: "organic delivery, subscription, farm tracking"
      },
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showSEOManager, setShowSEOManager] = useState(false);

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePage = () => {
    setSelectedPage(null);
    setShowEditor(true);
  };

  const handleEditPage = (page: Page) => {
    setSelectedPage(page);
    setShowEditor(true);
  };

  const handleDeletePage = (pageId: string) => {
    setPages(pages.filter(page => page.id !== pageId));
    toast({
      title: "Page deleted",
      description: "The page has been successfully deleted.",
    });
  };

  const handleSavePage = (pageData: Partial<Page>) => {
    if (selectedPage) {
      // Update existing page
      setPages(pages.map(page =>
        page.id === selectedPage.id
          ? { ...page, ...pageData, updatedAt: new Date().toISOString().split('T')[0] }
          : page
      ));
      toast({
        title: "Page updated",
        description: "The page has been successfully updated.",
      });
    } else {
      // Create new page
      const newPage: Page = {
        id: Date.now().toString(),
        title: pageData.title || "Untitled",
        slug: pageData.slug || "untitled",
        content: pageData.content || "",
        status: pageData.status || "draft",
        seo: pageData.seo || { metaTitle: "", metaDescription: "", keywords: "" },
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setPages([...pages, newPage]);
      toast({
        title: "Page created",
        description: "The new page has been successfully created.",
      });
    }
    setShowEditor(false);
    setSelectedPage(null);
  };

  const handlePreviewPage = (page: Page) => {
    // Open preview in new tab
    const previewUrl = `/preview/${page.slug}`;
    window.open(previewUrl, '_blank');
  };

  if (showEditor) {
    return (
      <PageEditor
        page={selectedPage}
        onSave={handleSavePage}
        onCancel={() => {
          setShowEditor(false);
          setSelectedPage(null);
        }}
      />
    );
  }

  if (showSEOManager) {
    return (
      <SEOManager
        pages={pages}
        onUpdatePage={(pageId, seoData) => {
          setPages(pages.map(page =>
            page.id === pageId
              ? { ...page, seo: seoData, updatedAt: new Date().toISOString().split('T')[0] }
              : page
          ));
          toast({
            title: "SEO updated",
            description: "Page SEO settings have been updated.",
          });
        }}
        onBack={() => setShowSEOManager(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
            <p className="text-muted-foreground mt-2">
              Create, edit, and manage your website pages
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowSEOManager(true)}
              variant="outline"
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              SEO Manager
            </Button>
            <Button onClick={handleCreatePage} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Page
            </Button>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Pages</p>
                  <p className="text-2xl font-bold">{pages.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold">
                    {pages.filter(p => p.status === "published").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pages List */}
        <Card>
          <CardHeader>
            <CardTitle>Pages</CardTitle>
            <CardDescription>
              Manage your website pages and content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPages.map((page) => (
                <div
                  key={page.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{page.title}</h3>
                      <Badge variant={page.status === "published" ? "default" : "secondary"}>
                        {page.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      /{page.slug}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Updated: {page.updatedAt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreviewPage(page)}
                      className="gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPage(page)}
                      className="gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePage(page.id)}
                      className="gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}