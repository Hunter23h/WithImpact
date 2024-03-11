"use client";
import React, { useEffect, useState } from "react";
import Container from "./container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import Search from "./nav/Search";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Nav() {
  const [mobileNavOn, setMobileNavOn] = useState(false);

  const MENU_LINKS: { title: string; href: string; pathName: string }[] = [
    {
      title: "Home",
      href: "/",
      pathName: "/",
    },
    {
      title: "About Us",
      href: "/aboutUs",
      pathName: "/aboutUs",
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

  const handleLogout = async () => {
    await signOut();
  };

  useEffect(() => {
    setMobileNavOn(false);
  }, [pathname]);

  return (
    <>
      <span className="min-h-[70px]"></span>
      <nav className="bg-primary2 fixed left-0 right-0 top-0 z-[4]">
        <Container className="flex justify-between gap-[50px] items-center py-[15px]">
          <Link
            className="font-PROFILE_LINKS = []
          bold leading-tight tracking-widest text-white text-body min-w-fit"
            href={MENU_LINKS[0].href}
          >
            WITH IMPACT
          </Link>

          <div className="w-[100%] max-w-[596px] min-w-[250px] relative hidden md:flex">
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

          <div className="flex gap-[10px] items-center">
            <NavigationMenu className="hidden md:block">
              <NavigationMenuItem className="">
                {/* @ts-ignore */}
                <NavigationMenuTrigger className="" showArrow={true}>
                  Menu
                </NavigationMenuTrigger>

                <NavigationMenuContent className="flex flex-col gap-[5px] p-[10px] !w-[220px]">
                  {MENU_LINKS.filter((link) => {
                    if (!session && link.pathName === "/favourites")
                      return false;
                    return true;
                  }).map((item, key) => (
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
              <Dialog>
                <DialogTrigger>
                  <Avatar>
                    <AvatarImage src={session?.user?.image || ""} />
                    <AvatarFallback>KY</AvatarFallback>
                  </Avatar>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                    <DialogDescription>See you next time!</DialogDescription>
                  </DialogHeader>
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                </DialogContent>
              </Dialog>
            ) : (
              <Link href={"/auth/signin"}>
                <Button>Login</Button>
              </Link>
            )}

            {/* Mobile Nav */}
            <div className="block md:hidden">
              <Dialog open={mobileNavOn} onOpenChange={setMobileNavOn}>
                <DialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="bg-transparent border-[2px] hover:bg-white/10 py-1 px-2"
                  >
                    <Image
                      src={"/icons/menu.png"}
                      height={28}
                      width={23}
                      alt="icon"
                    />
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="h-full max-w-full"
                  onOpenAutoFocus={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div>
                    <DialogHeader>
                      <DialogTitle className="text-left text-2xl">
                        Navigation
                      </DialogTitle>
                    </DialogHeader>
                    <div className="h-full mt-[30px]">
                      {MENU_LINKS.filter((link) => {
                        if (!session && link.pathName === "/favourites")
                          return false;
                        return true;
                      }).map((item, key) => (
                        <Link href={item.href} key={key}>
                          <Button
                            variant={"default"}
                            className={cn(
                              "w-[100%] justify-start bg-white text-black hover:bg-primary hover:text-white",
                              {
                                "bg-primary text-white":
                                  pathname === item.pathName,
                              }
                            )}
                          >
                            {item.title}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}

export default Nav;
