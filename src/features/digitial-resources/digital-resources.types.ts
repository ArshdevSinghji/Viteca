enum Modality {
  Virtual = "virtual",
  Presential = "presential",
}

enum GeneratedLanguage {
  Automatic = "automatic",
  Human = "human",
}

enum Category {
  InternalTraining = "internal_training",
  SubjectPresentation = "subject_presentation",
  TeacherPresentation = "teacher_presentation",
  ProgramPresentation = "program_presentation",
  InteractiveExpositorySession = "interactive_expository_session",
  NonInteractiveExpositorySession = "non_interactive_expository_session",
  SubjectEvaluationSystem = "subject_evaluation_system",
  ProgramEvaluationSystem = "program_evaluation_system",
}

enum Status {
  Published = "published",
  NotPublished = "not_published",
}

enum Subtitle {
  en = "en",
  pt = "pt",
  fr = "fr",
  it = "it",
  es = "es",
}

enum Language {
  en = "en",
  pt = "pt",
  fr = "fr",
  it = "it",
  es = "es",
}

interface DigitalResourceFilter {
  search?: string;
  modality?: Modality;
  generated_language?: GeneratedLanguage;
  category?: Category;
  subjects?: string[];
  status?: Status;
  subtitle_languages?: Subtitle[];
  audio_languages?: Language[];
  authors?: string[];
  campuses?: string[];
  date_filter?: {
    publication_date?: string;
    date_comparison?: "gt" | "lt" | "eq" | "gte" | "lte";
  };
  sort?: {
    order?: "ASC" | "DESC";
    field?: string;
  };
  pagination?: {
    page: number;
    limit: number;
  };
}

export { Modality, GeneratedLanguage, Category, Status, Subtitle, Language };
export type { DigitalResourceFilter };
