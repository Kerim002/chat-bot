import { Button } from "@/shared/ui/button";
import { Brain, Plus, Telescope, Zap } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
export const ChatSettingsPopover = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full size-10" variant="ghost">
          <Plus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-2xl -ml-2 w-56" align="start">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Fast
            <DropdownMenuShortcut>
              <Zap />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="">
            Normal
            <DropdownMenuShortcut>
              <Telescope />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Smart
            <DropdownMenuShortcut>
              <Brain />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    // <Popover>
    //   <PopoverTrigger asChild>
    //     <Button className="rounded-full size-10" variant="ghost">
    //       <Plus />
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className="rounded-2xl -ml-2" align="start">
    //     <ToggleGroup
    //       className="flex flex-col w-full"
    //       variant="outline"
    //       type="single"
    //     >
    //       <ToggleGroupItem
    //         variant="outline"
    //         className="w-full border p-2 rounded-xl"
    //         value="bold"
    //         aria-label="Toggle bold"
    //       >
    //         <Bold className="h-4 w-4" />
    //       </ToggleGroupItem>
    //       <ToggleGroupItem
    //         variant="outline"
    //         className="w-full p-2"
    //         value="italic"
    //         aria-label="Toggle italic"
    //       >
    //         <Italic className="h-4 w-4" />
    //       </ToggleGroupItem>
    //       <ToggleGroupItem
    //         className="w-full"
    //         value="strikethrough"
    //         aria-label="Toggle strikethrough"
    //       >
    //         <Underline className="h-4 w-4" />
    //       </ToggleGroupItem>
    //     </ToggleGroup>
    //   </PopoverContent>
    // </Popover>
  );
};
