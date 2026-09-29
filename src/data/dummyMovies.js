// Temporary data shaped like TMDb responses,
// so switching to the real API later is easy.
const poster = (seed) => `https://picsum.photos/seed/${seed}/500/750`;
const backdrop = (seed) => `https://picsum.photos/seed/${seed}/1280/720`;

export const dummyGenres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Sci-Fi" },
  { id: 27, name: "Horror" },
];

export const dummyMovies = [
  {
    id: 1,
    title: "Neon Horizon",
    release_date: "2024-05-12",
    vote_average: 8.2,
    poster_path: poster("neon"),
    backdrop_path: backdrop("neon"),
    genres: [{ id: 878, name: "Sci-Fi" }, { id: 28, name: "Action" }],
    overview:
      "In a city that never sleeps, a rogue engineer discovers a signal that could rewrite reality itself.",
    cast: ["Ava Sterling", "Marcus Cole", "Ren Tanaka", "Lucia Vega"],
    trailerKey: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "The Last Laugh",
    release_date: "2023-11-03",
    vote_average: 7.1,
    poster_path: poster("laugh"),
    backdrop_path: backdrop("laugh"),
    genres: [{ id: 35, name: "Comedy" }],
    overview:
      "A washed-up comedian gets one final shot at a comeback special, if he can survive his own family.",
    cast: ["Tom Riley", "Priya Nair", "Sam Okafor"],
    trailerKey: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Quiet Rivers",
    release_date: "2022-09-21",
    vote_average: 8.7,
    poster_path: poster("rivers"),
    backdrop_path: backdrop("rivers"),
    genres: [{ id: 18, name: "Drama" }],
    overview:
      "Three generations return to a fading village and confront the secrets buried beneath its river.",
    cast: ["Elena Marsh", "Kofi Mensah", "Hana Sato"],
    trailerKey: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Midnight Hollow",
    release_date: "2024-10-31",
    vote_average: 6.4,
    poster_path: poster("hollow"),
    backdrop_path: backdrop("hollow"),
    genres: [{ id: 27, name: "Horror" }],
    overview:
      "A group of friends rents a remote cabin and learns why nobody stays past midnight.",
    cast: ["Jake Moran", "Bella Cruz", "Owen Pike"],
    trailerKey: "dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Iron Meridian",
    release_date: "2021-07-16",
    vote_average: 7.6,
    poster_path: poster("meridian"),
    backdrop_path: backdrop("meridian"),
    genres: [{ id: 28, name: "Action" }, { id: 18, name: "Drama" }],
    overview:
      "A retired courier is pulled back into a global chase when a package goes missing.",
    cast: ["Dmitri Volkov", "Sara Lindqvist", "Leo Grant"],
    trailerKey: "dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Starlit Orbit",
    release_date: "2025-02-14",
    vote_average: 8.0,
    poster_path: poster("orbit"),
    backdrop_path: backdrop("orbit"),
    genres: [{ id: 878, name: "Sci-Fi" }, { id: 18, name: "Drama" }],
    overview:
      "Two astronauts stranded on a silent station must trust each other to make it home.",
    cast: ["Nadia Rahman", "Chris Bolt"],
    trailerKey: "dQw4w9WgXcQ",
  },
  {
    id: 7,
    title: "Pocket Full of Trouble",
    release_date: "2020-03-06",
    vote_average: 6.9,
    poster_path: poster("pocket"),
    backdrop_path: backdrop("pocket"),
    genres: [{ id: 35, name: "Comedy" }, { id: 28, name: "Action" }],
    overview:
      "A clumsy pickpocket steals the wrong wallet and ends up with a crime boss on his tail.",
    cast: ["Diego Ramos", "Mei Lin", "Paul Adeyemi"],
    trailerKey: "dQw4w9WgXcQ",
  },
  {
    id: 8,
    title: "The Whispering Wall",
    release_date: "2023-06-09",
    vote_average: 7.3,
    poster_path: poster("wall"),
    backdrop_path: backdrop("wall"),
    genres: [{ id: 27, name: "Horror" }, { id: 18, name: "Drama" }],
    overview:
      "A young family moves into an old house where the walls seem to repeat what they say.",
    cast: ["Grace Holloway", "Ivan Petrov", "Zoe Adams"],
    trailerKey: "dQw4w9WgXcQ",
  },
];