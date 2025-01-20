import { Button } from '@/components/ui/button';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  Printer,
  BarChart,
  FileCodeIcon as FileContract,
  FolderOpen,
  LogOut,

} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
interface LeftSidebarProps {
  className?: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ className }) => {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <SidebarHeader className="p-4">
        <RadioGroup
          defaultValue="search"
          className="flex justify-center space-x-2"
        >
          <div className="flex items-center space-x-2">
            <Label htmlFor="search" className="flex items-center">
              بحث
            </Label>
            <RadioGroupItem value="search" id="search" />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="create" className="flex items-center">
              تسجيل
            </Label>
            <RadioGroupItem value="create" id="create" />
          </div>
        </RadioGroup>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-auto flex flex-col items-center justify-center gap-2 py-4 border border-gray-200 rounded-lg"
                  >
                    <Printer className="h-6 w-6" />
                    <span>طباعة تقارير</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-auto flex flex-col items-center justify-center gap-2 py-4 border border-gray-200 rounded-lg"
                  >
                    <BarChart className="h-6 w-6" />
                    <span>إحصائيات</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-auto flex flex-col items-center justify-center gap-2 py-4 border border-gray-200 rounded-lg"
                  >
                    <FileContract className="h-6 w-6" />
                    <span>عقود المشروع</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-auto flex flex-col items-center justify-center gap-2 py-4 border border-gray-200 rounded-lg"
                  >
                    <FolderOpen className="h-6 w-6" />
                    <span>وثائق المشروع</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-auto flex flex-col items-center justify-center gap-2 py-4 border border-gray-200 rounded-lg"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>خروج</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
};

export default LeftSidebar;
