import ChoreList from '@/components/ChoreList';


export default function Home() {

  // Get user info about if this is a parent or child ???
  let isParent = true; 

  return (
    <main>
    <ChoreList isParent={isParent}></ChoreList>
    </main>
  )
}