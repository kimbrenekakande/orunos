async function call() {
  const response = await fetch('http://localhost:3000/api/ai/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: 'Explain quantum entanglement.',
    }),
  })
  const data = await response.json()
  console.log(data)
    
}
call()