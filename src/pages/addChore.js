import BuildChore from '@/components/BuildChore';

export default function AddChore() {
  return (
    <main>
      <h1>Add New Chore</h1>
      <BuildChore isEditing={false} chore={""}></BuildChore>
    </main>
  )
}