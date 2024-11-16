import prisma from "@/lib/services/prisma";

async function main() {
  // First, create some activity categories
  const categories = await Promise.all([
    prisma.activityCategory.create({
      data: {
        name: "Sports",
        description: "Physical activities and sports events",
      },
    }),
    prisma.activityCategory.create({
      data: {
        name: "Study Groups",
        description: "Academic and learning activities",
      },
    }),
    prisma.activityCategory.create({
      data: {
        name: "Social",
        description: "Social gatherings and networking events",
      },
    }),
    prisma.activityCategory.create({
      data: {
        name: "Career",
        description: "Career development and professional events",
      },
    }),
  ]);

  // Get a sample user to be the creator of activities
  const sampleUser = await prisma.user.findFirst();

  if (!sampleUser) {
    console.error("No users found in the database. Please seed users first.");
    return;
  }

  // Create some activities
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        title: "Weekend Basketball Game",
        description:
          "Join us for a friendly basketball game! All skill levels welcome.",
        cost: null,
        location: "Campus Basketball Court",
        maxParticipants: 10,
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        endDate: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
        ), // 2 hours duration
        status: "PUBLISHED",
        genderPreference: "ANY",
        skillLevel: "ANY",
        createdByUserId: sampleUser.id,
        categoryId: categories[0].id, // Sports
        photos: {
          create: {
            url: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
            isCover: true,
          },
        },
      },
    }),
    prisma.activity.create({
      data: {
        title: "Machine Learning Study Group",
        description:
          "Weekly study group focusing on ML fundamentals and practical applications.",
        cost: null,
        location: "Library Room 204",
        maxParticipants: 8,
        startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        status: "PUBLISHED",
        genderPreference: "ANY",
        skillLevel: "INTERMEDIATE",
        createdByUserId: sampleUser.id,
        categoryId: categories[1].id, // Study Groups
        photos: {
          create: {
            url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            isCover: true,
          },
        },
      },
    }),
    prisma.activity.create({
      data: {
        title: "Photography Walk",
        description:
          "Explore the city while practicing photography techniques. Bring your own camera!",
        cost: "15.00",
        currency: "USD",
        location: "City Park Main Entrance",
        maxParticipants: 12,
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        status: "PUBLISHED",
        genderPreference: "ANY",
        skillLevel: "BEGINNER",
        createdByUserId: sampleUser.id,
        categoryId: categories[2].id, // Social
        photos: {
          create: {
            url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
            isCover: true,
          },
        },
      },
    }),
    prisma.activity.create({
      data: {
        title: "Resume Workshop",
        description: "Get help with your resume from industry professionals.",
        cost: null,
        location: "Online (Zoom)",
        maxParticipants: 20,
        startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        status: "PUBLISHED",
        genderPreference: "ANY",
        skillLevel: "ANY",
        createdByUserId: sampleUser.id,
        categoryId: categories[3].id, // Career
        photos: {
          create: {
            url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
            isCover: true,
          },
        },
      },
    }),
  ]);

  // Add some participants to the activities
  await Promise.all(
    activities.map((activity) =>
      prisma.activityParticipant.create({
        data: {
          userId: sampleUser.id,
          activityId: activity.id,
          status: "APPROVED",
        },
      })
    )
  );

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
