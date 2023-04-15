export default function AccountSetUp() {

  // state shit 

  function addAcountInfo(){
    // 
  }

  return (
    <main>
      <h1>Setting Up Your Account</h1>

      {/* Need to get user's name and type of account (parent or child) */}
      <form className="pure-form pure-form-stacked">
      <fieldset>
          <legend>Just two quick questions</legend>
          <label for="first-name">First Name</label>
          <input type="email" id="first-name" placeholder="Your name" required/>
          <span className="pure-form-message">This is a required field.</span>
          <label for="account-type">Account Type</label>
          <select id="account-type">
              <option>Parent</option>
              <option>Child</option>
          </select>
          <span className="pure-form-message">This is a required field.</span>
          <button onclick={addAcountInfo} className="pure-button pure-button-primary">Sign in</button>
      </fieldset>
      </form>

      {/* Need some way for parents to list their children - maybe make user _id 
        available on your profile --> parents can get it from thier child's account
      */}

    </main>
  )
}


