// In a client component
import { userSession } from "./lib/session";
async function Home() {
  const session = await userSession()
  const user = session?.user;
  console.log(user)
}

Home()