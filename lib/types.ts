// define types for the user and mentor profile
import {
  User,
  MentorProfile,
  MenteeProfile,
  Application,
  Question,
  Activity,
  ActivityCategory,
} from "@prisma/client";

export type UserWithProfiles = User & {
  mentorProfile: MentorProfile;
  menteeProfile: MenteeProfile;
};

export type ApplicationWithProfiles = Application & {
  menteeProfile: MenteeProfile & {
    user: User;
  };
  mentorProfile: MentorProfile & {
    user: User;
  };
};

export type QuestionWithUser = Question & {
  askedByUser: User;
};

export interface ActivityPhoto {
  id: string;
  url: string;
  isCover: boolean;
}

export interface ActivityParticipant {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "WITHDRAWN";
  user: User;
}

export type ActivityExtended = Activity & {
  endDate: Date | null;
  location: string | null;
  maxParticipants: number | null;
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";
  genderPreference: "ANY" | "MALE_ONLY" | "FEMALE_ONLY";
  skillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT" | "ANY";
  additionalRequirements: string | null;
  createdByUser: User;
  category: ActivityCategory;
  photos: ActivityPhoto[];
  participants: ActivityParticipant[];
  createdAt: Date;
  updatedAt: Date;
};
