"use client";

import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "@chakra-ui/react";
import { User } from "@prisma/client";
import UserSection from "@/components/user/sections/user-section";
import { SubmitButton } from "../form/Buttons";
import UserSectionRecentJoins from "../user/sections/user-section-recent-joins";
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";

import LaraChatBubble from "../core-ui/lara-chat-bubble";
import SearchShotcutCardSection from "../search/sections/search-card-section";
import { BasicButton } from "../form/Buttons";

const randomDescriptions = [
  "喜欢美食", // likes gourmet food
  "热爱旅行", // loves traveling
  "音乐爱好者", // music lover
  "运动狂热", // sports fanatic
  "电影迷", // movie buff
  "书籍爱好者", // book lover
  "技术爱好者", // tech enthusiast
  "艺术鉴赏", // art appreciation
  "户外探险", // outdoor adventures
  "摄影爱好者", // photography enthusiast
  "动漫迷", // anime fan
  "游戏玩家", // gamer
  "动物爱好者", // animal lover
  "植物爱好者", // plant lover
  "时尚达人", // fashionista
  "美妆达人", // beauty guru
  "健身达人", // fitness enthusiast
  "瑜伽爱好者", // yoga lover
  "烹饪大师", // master chef
];

export default function UserScreen({
  totalUserCount,
  newUsers,
  savedUsersIDs,
}: {
  totalUserCount: number;
  newUsers: User[];
  savedUsersIDs: string[];
}) {
  const [streamData, setStreamData] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingButton1, setIsLoadingButton1] = useState(false); // State for when data is being fetched
  const [isLoadingButton2, setIsLoadingButton2] = useState(false); // State for when data is being fetched

  const [description, setDescription] = useState(""); // State to store the fetched data

  const handleChange = (e: any) => {
    setDescription(e.target.value);
  };

  async function getLaraRecommendation() {
    console.log("request from getLaraRecommendation() is", description, users);
    setIsLoadingButton2(true);
    setStreamData("");
    const response = await fetch("/api/recommendation/laraReason/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: description, users: users }),
    });

    if (response.body) {
      const reader = response.body.getReader();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }
        const text = new TextDecoder().decode(value);

        setStreamData((prevData) => prevData + text);
      }
    } else {
      console.log("no response body");
    }
  }

  const findUsersByDescription = async () => {
    try {
      setIsLoadingButton1(true);
      const response = await fetch("/api/recommendation/find", {
        method: "POST", // or "GET", depending on your backend setup
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: description, topK: 5 }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const jsonData = await response.json();
      setUsers(jsonData.data);
      setIsLoadingButton1(false);

      // getLaraRecommendation();
      // setBio(jsonData.data[1].metadata.bio);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const findRandomUser = async () => {
    try {
      setIsLoadingButton2(true);

      const randomDescription =
        randomDescriptions[
          Math.floor(Math.random() * randomDescriptions.length)
        ];

      const response = await fetch("/api/recommendation/find", {
        method: "POST", // or "GET", depending on your backend setup
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: randomDescription, topK: 1 }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      console.log("response is", response);
      const jsonData = await response.json();

      console.log("jsondata is", jsonData.data);
      setUsers(jsonData.data);

      console.log("members are", users);
      setIsLoadingButton2(false);

      // getLaraRecommendation();
      // setBio(jsonData.data[1].metadata.bio);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function setInput(input: string) {
    setDescription(input);
  }

  // Render your component with the fetched data
  return (
    <div className="my-24 mx-12">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-serif  mb-8">
          Who do you want to meet?
        </div>
        <div className="flex flex-col justify-center items-center w-full lg:w-3/4">
          <div className="w-full">
            <Textarea
              value={description}
              onChange={handleChange}
              placeholder="Search in either English or Chinese, e.g., 'People who enjoy art'"
              rows={3}
            />

            <SearchShotcutCardSection setInput={setInput} />
          </div>
          <div className="flex justify-center w-32 mt-12 space-x-6">
            <BasicButton
              size="lg"
              text={"Search"}
              isLoading={isLoadingButton1}
              onClick={findUsersByDescription}
            />
            <BasicButton
              size="lg"
              text={"Random"}
              isLoading={isLoadingButton2}
              onClick={findRandomUser}
            />
          </div>
        </div>
      </div>
      <div className="pt-32">
        <div>
          {streamData && <LaraChatBubble text={streamData} />}

          {/* <UserSection users={users} /> */}
        </div>
        <UserSection users={users} savedUsersIDs={savedUsersIDs} />
      </div>
      <div className="flex justify-center">{totalUserCount} Members</div>
    </div>
  );
}
