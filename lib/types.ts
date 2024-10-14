// define types for the user and mentor profile
import { User, MentorProfile, MenteeProfile } from "@prisma/client";

export type UserWithProfiles = User & {
  mentorProfile: MentorProfile;
  menteeProfile: MenteeProfile;
};
