import BuildChore from '@/components/BuildChore';

export default function AddChore() {
  return (
    <>
      <h1 className="margin-top center">Add New Chore</h1>
      <BuildChore isEditing={false} chore={""}></BuildChore>
    </>
  )
}