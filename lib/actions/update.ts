
export async function f2update({output } : {output : string}, {id} : {id : string} ) {
  const response = await fetch(`http://localhost:3000/api/papers/fetch?id=cmi3fb55e000foctaw2d96f3d`);
	const work = await response.json()
	const answer = `${work.answer}`;
  return  answer
}
