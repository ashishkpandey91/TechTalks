import authService from "@/appwrite/services/Auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    if (!email || !password) {
      console.log("no email password");
      return;
    }

    setLoading(true);
    const { error } = await authService.singup(email, password, name);
    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      return;
    }

    toast({
      title: "Success",
      description: "Account created",
    });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user_name">Name:</Label>
              <Input
                type="text"
                id="user_name"
                placeholder="Name of your project"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user_email">Email:</Label>
              <Input
                id="user_email"
                placeholder="Name of your project"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user_password">Password:</Label>
              <Input
                id="user_password"
                placeholder="Name of your project"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button disabled={loading} onClick={onSubmit} type="submit">
          {loading ? "loading..." : "submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
