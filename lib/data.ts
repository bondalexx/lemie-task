import { Meme } from "@/types/meme";

export const defaultMemes = [
    {
      id: 1,
      title: "Winter in Boston:",
      imageUrl: "https://www.bu.edu/files/2023/12/Screenshot-2023-12-13-at-10.49.17-AM-600x483.png",
      likes: 34,
      liked:true,
    },
    {
      id: 2,
      title: "How It Feels to",
      imageUrl: "https://www.bu.edu/files/2023/12/unnamed-2.jpg",
      likes: 58,
      liked:false,
    },
    {
      id: 3,
      title: "How It Feels to asdsadafafqfqwf fwasd dadqwedqd",
      imageUrl: "https://www.bu.edu/files/2023/12/unnamed-2.jpg",
      likes: 18,
      liked:false,
    },
    {
      id: 4,
      title: "Military man",
      imageUrl: "https://www.bu.edu/files/2024/12/Screenshot-2024-12-13-at-12.04.58%E2%80%AFPM.png",
      likes: 1,
      liked:true,
    },
    {
      id: 5,
      title: "Chill guy",
      imageUrl: "https://www.bu.edu/files/2024/12/Screenshot-2024-12-13-at-12.32.43%E2%80%AFPM.png",
      likes: 111,
      liked:false,
    },
    {
      id: 6,
      title: "Lebron James",
      imageUrl: "https://www.bu.edu/files/2024/12/Screenshot-2024-12-13-at-12.42.40%E2%80%AFPM.png",
      likes: 33,
      liked:false,
    },
    {
      id: 7,
      title: "Two Steps Ahead",
      imageUrl: "https://www.bu.edu/files/2024/12/Screenshot-2024-12-13-at-1.08.43%E2%80%AFPM-1-600x573.png",
      likes: 6,
      liked:false,
    },
    {
      id: 8,
      title: "Hippo",
      imageUrl: "https://www.bu.edu/files/2024/12/Screenshot-2024-12-13-at-1.12.41%E2%80%AFPM.png",
      likes: 2091,
      liked:true,
    },
    {
      id: 9,
      title: "Caryy the project",
      imageUrl: "https://www.bu.edu/files/2023/12/unnamed-7.jpg",
      likes: 9,
      liked:false,
    },
    {
      id: 10,
      title: "Lack of sleep",
      imageUrl: "https://www.bu.edu/files/2022/12/sleep-deprived-goob-meme-e1671476419982.jpeg",
      likes: 62,
      liked:false,
    },
  ];
  
  export function loadMemes() {
    if (typeof window === 'undefined') return defaultMemes;
    const data = localStorage.getItem("memes");
    return data ? JSON.parse(data) : defaultMemes;
  }
  
  export function saveMemes(memes: Meme[]) {
    localStorage.setItem("memes", JSON.stringify(memes));
  }
  