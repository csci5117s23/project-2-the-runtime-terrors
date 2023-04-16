import { addChild } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function AddChild() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();

  // Add a child to this user's account
  async function add(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const id = e.target.id.value;

    if (userId) {
      const token = await getToken({ template: "codehooks" });
      let newItem = await addChild(token, name, id); // change userId to assignedTo later on ???
      console.log(newItem)
      router.push('/home');
    }
  }

  return (
    <main>
      <h1>Add New Child</h1>
      <form onSubmit={add} className="pure-form pure-form-stacked">
        <fieldset>
          <legend>Add New Child</legend>
          <label for="name">Child's Name</label>
          <input id="name" placeholder="First Name" required/>

          <label for="id">Child's Account ID</label>
          <input id="id" placeholder="user_###" pattern="user_.+" title="Must start with user_" required/>
          <span class="pure-form-message">Your child's account id can be found on the home page of their account. Each id starts with 'user_'.</span>

          <button type="submit" className="pure-button pure-button-primary">Add</button>
        </fieldset>
      </form>
    </main>
  )
}