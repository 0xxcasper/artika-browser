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

export type NavigationCTA = {
  cta_label: string;
  cta_link: string;
};

export type ScheduleTourValidationMessages = {
  schedule_tour_phone_required: string;
  schedule_tour_email_required: string;
  schedule_tour_date_required: string;
  schedule_tour_phone_invalid: string;
  schedule_tour_email_invalid: string;
  schedule_tour_date_future: string;
};

export type ScheduleTourFormData = {
  schedule_tour_title: string;
  schedule_tour_description: string;
  schedule_tour_phone_placeholder: string;
  schedule_tour_email_placeholder: string;
  schedule_tour_date_placeholder: string;
  schedule_tour_button_text: string;
  schedule_tour_success_message: string;
  schedule_tour_error_message: string;
  schedule_tour_validation_messages: ScheduleTourValidationMessages;
};

export type NavigationData = {
  items: NavigationMenu[];
  cta: NavigationCTA;
  scheduleTourForm?: ScheduleTourFormData;
};

export enum SubMenuType {
  // Artwalk
  outdoor = "outdoor-sculpture-park",
  personal = "personal-art-museum",
  artists = "artists-featured",
  memories = "memories-of-stone",
  whispers = "whispers-of-moss",
  voices = "voices-of-bloom",
  breathing = "breathing-guidance"

}