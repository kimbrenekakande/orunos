const promptParts = [
  `Document ID : 42`,
  `Document Type :  coursework`,
  `questions : Whats afro futurism`
]

promptParts.push(`cachedContent : shit`)

let x = ""
// promptParts.join("/n")
promptParts.map(prom => {
  x = x + "\n" + prom
})

console.log(x)
