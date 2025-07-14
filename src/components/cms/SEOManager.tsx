import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, CheckCircle, AlertCircle, Globe } from "lucide-react";

interface Page {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

interface SEOManagerProps {
  pages: Page[];
  onUpdatePage: (pageId: string, seoData: { metaTitle: string; metaDescription: string; keywords: string }) => void;
  onBack: () => void;
}

export function SEOManager({ pages, onUpdatePage, onBack }: SEOManagerProps) {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSEOScore = (page: Page) => {
    let score = 0;
    const seo = page.seo;
    
    if (seo.metaTitle && seo.metaTitle.length >= 30 && seo.metaTitle.length <= 60) score += 35;
    if (seo.metaDescription && seo.metaDescription.length >= 120 && seo.metaDescription.length <= 160) score += 35;
    if (seo.keywords && seo.keywords.split(',').length >= 3) score += 30;
    
    return score;
  };

  const getSEOStatus = (score: number) => {
    if (score >= 80) return { status: "Excellent", color: "bg-green-500", icon: CheckCircle };
    if (score >= 60) return { status: "Good", color: "bg-yellow-500", icon: CheckCircle };
    return { status: "Needs Work", color: "bg-red-500", icon: AlertCircle };
  };

  const handleSEOUpdate = (seoData: { metaTitle: string; metaDescription: string; keywords: string }) => {
    if (selectedPage) {
      onUpdatePage(selectedPage.id, seoData);
      setSelectedPage(null);
    }
  };

  if (selectedPage) {
    return <SEOEditor page={selectedPage} onSave={handleSEOUpdate} onBack={() => setSelectedPage(null)} />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="outline" onClick={onBack} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to CMS
            </Button>
            <h1 className="text-3xl font-bold text-foreground">SEO Manager</h1>
            <p className="text-muted-foreground mt-2">
              Optimize your pages for search engines
            </p>
          </div>
        </div>

        {/* SEO Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
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
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Well Optimized</p>
                  <p className="text-2xl font-bold">
                    {pages.filter(page => getSEOScore(page) >= 80).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Need Attention</p>
                  <p className="text-2xl font-bold">
                    {pages.filter(page => getSEOScore(page) < 60).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
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

        {/* Pages List */}
        <Card>
          <CardHeader>
            <CardTitle>Page SEO Status</CardTitle>
            <CardDescription>
              Review and optimize SEO settings for each page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPages.map((page) => {
                const score = getSEOScore(page);
                const seoStatus = getSEOStatus(score);
                const StatusIcon = seoStatus.icon;
                
                return (
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
                      <div className="flex items-center gap-2 mt-2">
                        <StatusIcon className={`h-4 w-4 ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`} />
                        <span className="text-sm font-medium">SEO Score: {score}/100</span>
                        <Badge variant="outline" className="text-xs">
                          {seoStatus.status}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <div className={`w-2 h-2 rounded-full ${page.seo.metaTitle ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-muted-foreground">
                            Meta Title: {page.seo.metaTitle ? `${page.seo.metaTitle.length} chars` : 'Missing'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className={`w-2 h-2 rounded-full ${page.seo.metaDescription ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-muted-foreground">
                            Meta Description: {page.seo.metaDescription ? `${page.seo.metaDescription.length} chars` : 'Missing'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className={`w-2 h-2 rounded-full ${page.seo.keywords ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-muted-foreground">
                            Keywords: {page.seo.keywords ? `${page.seo.keywords.split(',').length} keywords` : 'Missing'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedPage(page)}
                    >
                      Optimize SEO
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface SEOEditorProps {
  page: Page;
  onSave: (seoData: { metaTitle: string; metaDescription: string; keywords: string }) => void;
  onBack: () => void;
}

function SEOEditor({ page, onSave, onBack }: SEOEditorProps) {
  const [metaTitle, setMetaTitle] = useState(page.seo.metaTitle);
  const [metaDescription, setMetaDescription] = useState(page.seo.metaDescription);
  const [keywords, setKeywords] = useState(page.seo.keywords);

  const handleSave = () => {
    onSave({ metaTitle, metaDescription, keywords });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to SEO Manager
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings: {page.title}</CardTitle>
            <CardDescription>
              Optimize this page for search engines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Enter SEO title (30-60 characters recommended)"
                maxLength={60}
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-muted-foreground">
                  This appears as the clickable headline in search results
                </p>
                <p className={`text-xs ${metaTitle.length >= 30 && metaTitle.length <= 60 ? 'text-green-600' : 'text-red-600'}`}>
                  {metaTitle.length}/60 characters
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Enter SEO description (120-160 characters recommended)"
                maxLength={160}
                rows={3}
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-muted-foreground">
                  This appears as the description below your title in search results
                </p>
                <p className={`text-xs ${metaDescription.length >= 120 && metaDescription.length <= 160 ? 'text-green-600' : 'text-red-600'}`}>
                  {metaDescription.length}/160 characters
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="keyword1, keyword2, keyword3 (separate with commas)"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Keywords: {keywords ? keywords.split(',').filter(k => k.trim()).length : 0} 
                (3-5 keywords recommended)
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave}>
                Save SEO Settings
              </Button>
              <Button variant="outline" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}