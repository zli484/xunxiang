import { User } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MentorProfile } from "@prisma/client";

export default function MentorshipCard({
  mentorProfile,
}: {
  mentorProfile: MentorProfile;
}) {
  // Assuming these properties exist on the User type for mentors
  const {
    bio,
    yearsOfExperience,
    pastExperience,
    menteeExpectations,
    menteeQualifications,
    maxMentees,
    availability,
  } = mentorProfile;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mentorship Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {menteeQualifications.map((area, index) => (
                <Badge key={index} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Availability</h3>
            <p>{availability}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Mentorship Experience</h3>
            <p>{yearsOfExperience}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Mentorship Style</h3>
            <p>{bio || "Not specified"}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Current Mentees</h3>
            <p>{maxMentees || 0} mentees</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
