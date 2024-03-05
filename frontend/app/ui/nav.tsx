"use client";
import React from "react";
import Container from "./container";
import Image from "next/image";
import Link from "next/link";
import PrimaryLink from "../../components/ui/NavLink";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import Search from "./nav/Search";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";

function Nav() {
  const PROFILE_LINKS = [
    {
      title: "Favourited Projects",
      href: "/favourites",
      pathName: "profile/favourites",
    },
  ];

  const MENU_LINKS: { title: string; href: string; pathName: string }[] = [
    {
      title: "Home",
      href: "/",
      pathName: "/",
    },
    {
      title: "Browse",
      href: "/browse?page=1",
      pathName: "/browse",
    },
    {
      title: "SDGs",
      href: "/sdgs",
      pathName: "/sdgs",
    },
    {
      title: "Project Submission",
      href: "/project-submission",
      pathName: "/project-submission",
    },
    {
      title: "Submission Criteria",
      href: "/submission-criteria",
      pathName: "/submission-criteria",
    },
    {
      title: "Favourited Projects",
      href: "/favourites",
      pathName: "/favourites",
    },
  ];
  const { data: session, status } = useSession();
  const pathname = usePathname();
  return (
    <nav className="bg-primary2 ">
      <Container className="flex justify-between items-center py-[15px] px-[30px]">
        <Link
          className="font-PROFILE_LINKS = []
          bold tracking-widest text-white text-body"
          href={MENU_LINKS[0].href}
        >
          WITH IMPACT
        </Link>

        <div className="w-[100%] max-w-[596px] min-w-[250px] relative flex">
          <Search />
          <button className="absolute right-0 top-[50%] translate-y-[-50%] h-[100%] w-[50px] flex justify-center items-center bg-white rounded-[calc(0.5em-2px)] rounded-l-none border-l-0 border-default">
            <Image
              src={"/icons/search.svg"}
              height={15}
              width={15}
              alt="search"
            />
          </button>
        </div>

        <div className="flex gap-[20px] items-center">
          <NavigationMenu>
            <NavigationMenuItem className="">
              <NavigationMenuTrigger className="" showArrow={true}>
                Menu
              </NavigationMenuTrigger>

              <NavigationMenuContent className="flex flex-col gap-[5px] p-[10px] !w-[220px]">
                {MENU_LINKS.map((item, key) => (
                  <Link href={item.href} key={key}>
                    <Button
                      variant={"default"}
                      className={cn(
                        "w-[100%] justify-start bg-white text-black hover:bg-primary hover:text-white",
                        {
                          "bg-primary text-white": pathname === item.pathName,
                        }
                      )}
                    >
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
          {status === "authenticated" ? (
            <Avatar>
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback>KY</AvatarFallback>
            </Avatar>
          ) : (
            <Link href={"/auth/signin"}>
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
}

export default Nav;
