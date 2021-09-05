export interface WorkCategories {
  name: string;
  type: string;
}

export interface MarkdownFileData {
  slug: string;
  frontmatter: {
    category: string;
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
  };
  content: string;
}
