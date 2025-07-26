  import { NavigationMenu, SubMenuType } from "./types";

export const navigation: NavigationMenu[] = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Art Walk",
    href: "/artwalk",
    subs: [
      {
        id: SubMenuType.outdoor,
        name: "Outdoor Sculpture Park",
        href: `/artwalk/${SubMenuType.outdoor}`
      },
      {
        id: SubMenuType.personal,
        name: "Personal Art Museum",
        // href: `/artwalk/${SubMenuType.personal}`
        href: ""
      },
      {
        id: SubMenuType.artists,
        name: "Artists Featured",
        href: `/artwalk/${SubMenuType.artists}`
      },
      {
        id: SubMenuType.memories,    
        name: "Memories of Stone",
        // href: `/artwalk/${SubMenuType.memories}`
        href: ""
      },
      {
        id: SubMenuType.whispers,
        name: "Whispers of Moss", 
        // href: `/artwalk/${SubMenuType.whispers}`
        href: ""
      },
      {
        id: SubMenuType.voices,
        name: "Voices of Bloom",
        // href: `/artwalk/${SubMenuType.voices}`
        href: ""
      },
      {
        id: SubMenuType.breathing,
        name: "Breathing Guidance",
        // href: `/artwalk/${SubMenuType.breathing}`
        href: ""
      }
    ]
  },
  {
    label: "Forest Bathing",
    href: ""
  },
  {
    label: "About Artika",
    href: ""
  }, 
  {
    label: "News & Events",
    href: ""
  }
];

export default {
  "pages": {
    "home": {
      "title": "HOME",
      "hero": {
        "title": "Inspiration Awaits in Sapa",
        "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      "about": {
        "title": "Introduction",
        "description": "Immerse yourself in the serene beauty and vibrant adventure of our resort. Nestled in breathtaking landscapes, our retreat blends luxurious comfort with nature's tranquility. Whether you seek relaxation or exploration, each moment promises to be a unique and enchanting experience.",
        "button": "BOOK YOUR STAY"
      },
      "arts": {
        "title": "Every space is a\nWork of art"
      },
      "focus": {
        "title": "Nourish to flourish.",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "button": "Explore"
      },
      "infos": [
        {
          "id": "gallery",
          "title": "Some title for Art Walk",
          "description": "Step into a world where creativity knows no bounds. Our gallery is a haven for art enthusiasts, culture lovers, and curious minds alike. Experience a vibrant collection of masterpieces that span across eras, styles, and cultures, each telling its own unique story.\n\nFrom the bold strokes of contemporary art to the timeless elegance of classical works, there's something to captivate every visitor.",
          "ctaText": "VISIT US TO DAY",
          "image": "/images/home/banner-1.jpg",
          "imageAlt": "Art gallery interior",
          "textFirst": false 
        },
        {
          "id": "spa", 
          "title": "Some title for Forest Bathing",
          "description": "Step into a world where creativity knows no bounds. Our gallery is a haven for art enthusiasts, culture lovers, and curious minds alike. Experience a vibrant collection of masterpieces that span across eras, styles, and cultures, each telling its own unique story.\n\nFrom the bold strokes of contemporary art to the timeless elegance of classical works, there's something to captivate every visitor.",
          "ctaText": "VISIT US TO DAY",
          "image": "/images/home/banner-2.jpg", 
          "imageAlt": "Yoga pose by pool",
          "textFirst": true
        }
      ],
      "gridImages": {
        "title": "Latest news & events"
      }
    },
    "artwalk": {
      "title": "Art Walk",
      "description": "Art Walk",
      "hero": {
        "title": "Discover Art, Discover Yourself.",
        "subtitle": "Discover our diverse collection of art, from timeless classics to contemporary pieces. Each work offers a unique story and invites you to see the world differently."
      }
    }
  },
  "common": {
    "language": "Language",
    "english": "English",
    "vietnamese": "Vietnamese",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
  }
}; 