import { useState } from "react";
import {
  ChartBar,
  Code,
  Briefcase,
  LineChart,
  Presentation,
  Building,
  Coins,
  Lightbulb,
  Wrench,
  Users,
  Calculator,
  Megaphone,
  Search,
  TrendingUp,
  DollarSign,
  MoreHorizontal,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface RoleCategoryBarProps {
  onRoleSelect: (role: string) => void;
  roles: string[];
}

const RoleCategoryBar: React.FC<RoleCategoryBarProps> = ({
  onRoleSelect,
  roles,
}) => {
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    onRoleSelect(role);
  };

  const formatRole = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getIcon = (role: string) => {
    switch (role) {
      case "DATA_SCIENTIST":
        return <ChartBar className="h-6 w-6" />;
      case "SOFTWARE_ENGINEER":
        return <Code className="h-6 w-6" />;
      case "CONSULTANT":
        return <Presentation className="h-6 w-6" />;
      case "PRODUCT_MANAGER":
        return <LineChart className="h-6 w-6" />;
      case "PROGRAM_MANAGER":
        return <Users className="h-6 w-6" />;
      case "INVESTMENT_BANKING_ANALYST":
        return <Building className="h-6 w-6" />;
      case "PRIVATE_EQUITY_ANALYST":
        return <Coins className="h-6 w-6" />;
      case "FOUNDER":
        return <Lightbulb className="h-6 w-6" />;
      case "SOLUTIONS_ENGINEER":
        return <Wrench className="h-6 w-6" />;
      case "ACCOUNT_EXECUTIVE":
        return <Users className="h-6 w-6" />;
      case "ACTUARIAL_ANALYST":
        return <Calculator className="h-6 w-6" />;
      case "MARKETING_MANAGER":
        return <Megaphone className="h-6 w-6" />;
      case "RESEARCH_ANALYST":
        return <Search className="h-6 w-6" />;
      case "QUANTITATIVE_ANALYST":
        return <TrendingUp className="h-6 w-6" />;
      case "FINANCIAL_ANALYST":
        return <DollarSign className="h-6 w-6" />;
      default:
        return <MoreHorizontal className="h-6 w-6" />;
    }
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 p-4">
        {roles.map((role) => (
          <button
            key={role}
            className={`flex flex-col items-center space-y-2 ${
              selectedRole === role ? "text-primary" : "text-muted-foreground"
            }`}
            onClick={() => handleRoleSelect(role)}
          >
            <div className="rounded-full bg-muted p-2">{getIcon(role)}</div>
            <span className="text-xs font-medium">{formatRole(role)}</span>
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="opacity-0" />
    </ScrollArea>
  );
};

export default RoleCategoryBar;
