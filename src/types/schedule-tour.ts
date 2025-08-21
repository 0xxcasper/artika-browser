export interface ScheduleTourFormConfig {
  phonePlaceholder: string;
  emailPlaceholder: string;
  datePlaceholder: string;
  buttonText: string;
}

export interface ScheduleTourMessages {
  success: string;
  error: string;
}

export interface ScheduleTourValidation {
  phoneRequired: string;
  emailRequired: string;
  dateRequired: string;
  phoneInvalid: string;
  emailInvalid: string;
  dateFuture: string;
}

export interface ScheduleTourData {
  title: string;
  description: any; // RichTextField from Prismic
  form: ScheduleTourFormConfig;
  messages: ScheduleTourMessages;
  validation: ScheduleTourValidation;
  raw?: any; // Raw Prismic document
}
