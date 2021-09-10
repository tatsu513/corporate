export interface WorkCategories {
  name: string;
  type: string;
}

export interface MarkdownFileData {
  slug: string;
  frontmatter: {
    categories: string[];
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
  };
  content: string;
}
