async function fetchResponse() {
  const agentsURL = "http://127.0.0.1:8000/api/v1"
  let fullDoc = ""

  fetch(`${agentsURL}/fast`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      docID : "1",
      docType: "coursework",
      question: "private equity rollup as the next flontier of pan african companies that are worthy the NYSE",
    }),
  })
    .then(async (res) => {
      if (!res.ok) throw new Error(`Agents responded with ${res.status}`);
      const data = await res.json();

      for (const sec of data.sections) fullDoc += `${sec.content}\n`
      console.log("Full document")
      console.log(fullDoc)
    })
    .catch(console.error);
}

fetchResponse()


const fuck = []