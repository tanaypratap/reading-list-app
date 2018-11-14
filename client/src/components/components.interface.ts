export type Author = {
    id: string;
    name: string;
    age: number;
    books: Book[]
}

export type Book = {
    id: string;
    name: string;
    genre: string;
    author: Author;
}

export type Response = {
    books: Book[];
}
