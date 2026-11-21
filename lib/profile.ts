type NewsItem = {
  date: string;
  text: string;
  tag?: string;
};

export const profile = {
  name: "Seungwoo Kim",

  links: [
    { label: "github", href: "https://www.github.com/seungwoos" },
    { label: "linkedin", href: "https://www.linkedin.com/in/seungwoos/" },
    {
      label: "google scholar",
      href: "https://scholar.google.com/citations?user=rzQvCtEAAAAJ&hl=en",
    },
  ],

  email: "seungwoo.s.kim at gmail dot com",

  bio: [
    "I am an AI Engineer at [3billion](https://3billion.io), working on language models for rare disease diagnosis. I received my master's degree in Artificial Intelligence from [UNIST](https://www.unist.ac.kr), where I worked on medical imaging, computer vision, and diffusion models.",
  ],

  image: null as string | null,

  // Maximum number of items shown on the main page
  maxNewsItems: 5,
  maxBlogPosts: 5,

  news: [
    {
      date: "May 2026",
      text: "[AIVARI Agent](https://openreview.net/forum?id=By0A3FZ4Tf) has been accepted at ICML 2026 [GenBio](https://genbio-workshop.github.io/2026/) Workshop!",
      tag: "Spotlight",
    },
  ] satisfies NewsItem[],
};
