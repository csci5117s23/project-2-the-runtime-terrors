import { addUser } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function AccountSetUp() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();

  async function addAcountInfo(e){
    e.preventDefault();
    let name = e.target.name.value;
    let isParent = false; 

    if(e.target.account.value === "parent"){
      isParent = true;
    }

    if (userId) {
      const token = await getToken({ template: "codehooks" });
      let newUser = await addUser(token, name, isParent);   
      console.log(newUser);
      router.push('/home');
    }
  }

  return (
    <main>
      <h1>Setting Up Your Account</h1>

      {/* Need to get user's name and type of account (parent or child) */}
      <form onSubmit={addAcountInfo} className="pure-form pure-form-stacked">
        <fieldset>
          <legend>Just two quick questions</legend>
          <label for="name">First Name</label>
          <input id="name" placeholder="Your name" required/>

          <label for="account">Account Type</label>
          <select id="account" required>
              <option value="parent">Parent</option>
              <option value="child">Child</option>
          </select>
          <button type="submit" className="pure-button pure-button-primary">Sign in</button>
        </fieldset>
      </form>

      {/* Need some way for parents to list their children - maybe make user _id 
        available on your profile --> parents can get it from thier child's account
      */}

    </main>
  )
}