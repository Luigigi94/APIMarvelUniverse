export type Movie = {
    id: string;
    slug: string;
    title: string;
    releaseDate: string | null;
    chronologicalOrder: number | null;
    phase?: string | null;
    type?: string | null;
    rate?: string | null;
    recommended?: boolean;
};