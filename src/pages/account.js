export default function AccountSetUp() {

  // state shit 

  function addAcountInfo(){

  }

  return (
    <main>
      <h1>Setting Up Your Account</h1>

      {/* Need to get user's name and type of account (parent or child) */}
      <form class="pure-form pure-form-stacked">
      <fieldset>
          <legend>Just two quick questions</legend>
          <label for="first-name">First Name</label>
          <input type="email" id="first-name" placeholder="Your name" required/>
          <span class="pure-form-message">This is a required field.</span>
          <label for="account-type">Account Type</label>
          <select id="account-type">
              <option>Parent</option>
              <option>Child</option>
          </select>
          <span class="pure-form-message">This is a required field.</span>
          <button onclick={addAcountInfo} class="pure-button pure-button-primary">Sign in</button>
      </fieldset>
      </form>
    </main>
  )
}


