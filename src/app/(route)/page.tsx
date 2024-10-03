import { auth } from "@/auth";

import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  } else {
    redirect("/feed?view=ddudu");
  }
};

export default Home;
