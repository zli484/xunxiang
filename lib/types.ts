// define types for the user and mentor profile
import {
  User,
  MentorProfile,
  MenteeProfile,
  Application,
  Question,
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
