import { User } from "@prisma/client";
import Image from "next/image";
import wechat_icon from "@/public/icons/icon-wechat.svg";
import email_icon from "@/public/icons/icon-email.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserContactInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const UserContactInfoModal: React.FC<UserContactInfoModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <div />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Info</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="flex justify-en m-6">
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xs uppercase">
                    <span>
                      <Image
                        src={email_icon}
                        alt="Email"
                        width={20}
                        height={20}
                        className="inline mr-2"
                      />
                      Email
                    </span>
                  </h2>
                  <p className="pt-2 text-sm">{user.email}</p>
                </div>
                <div>
                  <h2 className="text-xs uppercase">
                    <span>
                      <Image
                        src={wechat_icon}
                        alt="WeChat"
                        width={20}
                        height={20}
                        className="inline mr-2"
                      />
                      WeChat
                    </span>
                  </h2>
                  <p className="pt-2 text-sm">{user.wechatId}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default UserContactInfoModal;
