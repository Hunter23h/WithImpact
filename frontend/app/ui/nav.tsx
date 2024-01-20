"use client";
import React from "react";
import Container from "./container";
import Image from "next/image";
import Link from "next/link";
import PrimaryLink from "../../components/ui/NavLink";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function Nav() {
  const components: { title: string; href: string }[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Browse",
      href: "/browse",
    },
    {
      title: "SDGs",
      href: "sdgs",
    },
    {
      title: "Project Submission",
      href: "project-submission",
    },
    {
      title: "Submission Criteria",
      href: "submission-criteria",
    },
  ];

  const pathname = usePathname();

  return (
    <nav>
      <div className="flex justify-between items-center border-default py-[10px] px-[30px] ">
        {/* <Image src={"/logos/logo.png"} height={70} width={70} alt="logo" /> */}
        <p className="font-bold tracking-widest">WITH IMPACT</p>

        <div className="w-[100%] max-w-[596px] min-w-[250px] relative flex">
          <Input
            placeholder="Search projects, owners, sdg goals, etc..."
            className=""
          />
          <button className="absolute right-0 top-[50%] translate-y-[-50%] h-[100%] w-[50px] flex justify-center bg-secondary rounded-[calc(0.5em-2px)] rounded-l-none border-l-0 border-default">
            <Image
              src={"/icons/search.svg"}
              height={10}
              width={10}
              alt="search"
            />
          </button>
        </div>

        <div className="flex gap-[30px] items-center">
          <NavigationMenu>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col gap-[5px] p-[10px]">
                {components.map((item, key) => (
                  <Link href={item.href} key={key}>
                    <NavigationMenuLink>
                      <Button
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className="w-[100%] justify-start"
                      >
                        {item.title}
                      </Button>
                    </NavigationMenuLink>
                  </Link>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
          <Button>
            <Link href="login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
