export interface Sponsor {
  name: string;
  github: string;
  avatarUrl: string;
  x?: string;
  url?: string;
}

export const SPONSORS: Sponsor[] = [
  {
    name: "Peter Dave Hello",
    github: "https://github.com/PeterDaveHello",
    avatarUrl: "https://avatars.githubusercontent.com/u/3691490?s=64&v=4",
    x: "https://x.com/PeterDaveHello",
    url: "https://www.peterdavehello.org/",
  },
];
