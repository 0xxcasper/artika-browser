export type NavigationSub = {
  id: string;
  name: string;
  href: string;
};

export type NavigationMenu = {
  label: string;
  href: string;
  subs?: NavigationSub[];
};

export enum SubMenuType {
  outdoor = "outdoor-sculpture-park",
  personal = "personal-art-museum",
  artists = "artists-featured",
  memories = "memories-of-stone",
  whispers = "whispers-of-moss",
  voices = "voices-of-bloom",
  breathing = "breathing-guidance"
}