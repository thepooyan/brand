import { account, ID } from "~/lib/appwrite";

const test = () => {

  const ff = async () => {
    await account.create(ID.unique(), "tests@gmail.com", "@Aa12345", "ali");
  }

  return (
    <div onclick={ff}>test</div>
  )
}

export default test
