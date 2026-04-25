export interface Tag {
  raw: string;
  label: string;
}

export interface ContentBlock {
  type: "html";
  html: string;
  tags: Tag[];
}

export interface Card {
  title: string;
  tags: Tag[];
  blocks: ContentBlock[];
}

export interface Column {
  title: string;
  cards: Card[];
}

export interface Cheatsheet {
  title: string;
  columns: Column[];
}
