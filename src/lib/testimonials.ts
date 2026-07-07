// Client-safe testimonial type + in-code defaults.
export type Testimonial = {
  name: string;
  source: string; // e.g. "Google Review · Tanay"
  quote: string;
  rating: number;
};

// Verbatim 5-star Google reviews, one per branch (M. WR's is excerpted at a
// sentence boundary from a longer review).
export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { name: "Edmund Cuntapay", source: "Google Review · Tanay", quote: "Communication was clear and timely, expectations were well-defined, and their professionalism made the process smooth and efficient.", rating: 5 },
  { name: "M. WR", source: "Google Review · Dasma", quote: "Highly recommended. Dr. Jelo Gibas is very professional and kind Clinical Audiologist. He is very gentle with his patients and clearly explained things you need to know in doing the hearing test.", rating: 5 },
  { name: "Ferniepe Layon", source: "Google Review · Cebu", quote: "Very approachable, and accomodated. Thank you Linaw Dinig Hearing", rating: 5 },
];
