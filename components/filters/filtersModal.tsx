import React, { useState } from "react";
import Image from "next/image";
import email_icon from "@/public/icons/icon-email.png";
import wechat_icon from "@/public/icons/icon-wechat.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MembersFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MembersFilterModal: React.FC<MembersFilterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedClass, setSelectedClass] = useState("");

  const classes = ["2020", "2021", "2022", "2023", "2024", "2025"];

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    // Here you can handle state update or trigger any action based on the selection
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <div />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Info and Graduation Class Filter</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="flex justify-between m-6">
            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-xs uppercase">
                  <Image
                    src={email_icon}
                    alt="Email"
                    width={20}
                    height={20}
                    className="inline mr-2"
                  />
                  Email
                </h2>
              </div>
              <div>
                <h2 className="text-xs uppercase">
                  <Image
                    src={wechat_icon}
                    alt="WeChat"
                    width={20}
                    height={20}
                    className="inline mr-2"
                  />
                  WeChat
                </h2>
              </div>
              <div>
                <label
                  htmlFor="graduation-class"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Graduation Class
                </label>
                <select
                  id="graduation-class"
                  value={selectedClass}
                  onChange={handleClassChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </DialogDescription>
        <DialogFooter>
          {/* Add any buttons or additional footer content here */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MembersFilterModal;
