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
      await addUser(token, name, isParent);   
      router.push('/home');
    }
  }

  return (
    <main>
      <h1 className="margin-top center">Setting Up Your Account</h1>

      {/* Need to get user's name and type of account (parent or child) */}
      <form className="form" onSubmit={addAcountInfo}>
        <fieldset className="no-bg">
        <h2 className="form-title">Quick questions</h2>

          <label htmlFor="name">First Name</label>
          <input id="name" placeholder="Your preferred name" required/>

          <label htmlFor="account">Account Type</label>
          <select id="account" required>
              <option value="parent">Parent</option>
              <option value="child">Child</option>
          </select>
          <button type="submit" className="pure-button pure-button-primary">Sign in</button>
        </fieldset>
      </form>
    </main>
  )
}