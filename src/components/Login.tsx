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
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    if (!email || !password) {
      console.log("no email password");
      return;
    }

    setLoading(true);
    const { error } = await authService.login(email, password);
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
      title: "Success ",
      description: "Logged in successfully",
    });
  };

  return (
    <Card className="w-auto mx-2 md:w-[450px]">
      <CardHeader>
        <CardTitle className="text-center text-xl">Login</CardTitle>
        <CardDescription className="text-center text-sm">Already have an account? <a href="/login" className="font-semibold hover:text-violet-700">Sign up</a>  </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user_email">Email:</Label>
              <Input
                id="user_email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center ">
        <Button className="w-full tracking-wide" disabled={loading} onClick={onSubmit} type="submit">
          {loading ? "loading..." : "Sign in"}
        </Button>
      </CardFooter>
    </Card>
  );
}
