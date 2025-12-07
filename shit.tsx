

async function getter(){
  const id =  'cmiviy7j10003ocpgqec0rn4q'
  const response = await fetch(`http://localhost:3000/api/papers/fetch?id=${id}`);
  const paper = await response
  // const answer = await `${paper.answer}`;
  console.log(paper)
}


getter()