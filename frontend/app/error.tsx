"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Error() {
  const router = useRouter();
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>An error has occurred...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <Button
            variant={"outline"}
            onClick={() => {
              router.push("/");
            }}
          >
            Return to Home Page
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Error;
