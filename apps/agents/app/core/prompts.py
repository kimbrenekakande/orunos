from .schemas import SearchResult
def draft_prompt(mkt_corp: dict, lead_company: SearchResult) -> str:
    """Return a prompt string for drafting a lead marketing email."""
    return f"""
# Input

Marketing company (you are writing from this company):
- Name: {mkt_corp["name"]}
- Website: {mkt_corp["website"]}
- Email: {mkt_corp["email"]}
- Location: {mkt_corp["location"]}
- Services: {mkt_corp["services"]}

Lead company (you are writing to this company):
- Name: {lead_company.name}
- Profile: {lead_company.profile}


# Task

Write a cold outreach email letter from the marketing company to the lead company, pitching services.


# Reference sample

Below is how a previous email was structured — use it as a template for flow and tone, not content:


>Hi [Name],
>I noticed [School/Company Name] runs on a growing number of computers and devices, and downtime can cost real learning or work hours. Eagle Info Solutions is an ACMT certified ICT repair and supply company based in Kampala. We work with APC, Dell, and HP, and we support schools and organizations across Uganda with fast repairs, computer supply, and a simple online tracking platform for every job.
>Most repairs are completed within 48 hours, and every job is tracked from intake to handover, so you always know the status.
>Would you be open to a short call this week to see if we can support your team?

# Hard rules — do not break these

1. Output markdown and nothing else. No preamble, no "Here is your email," no meta-commentary.
2. Regardless of an email this should sound like a letter beginning with "Dear {lead_company.name}" or "Hello, {lead_company.name}" not a generic greeting.
3. No placeholders, no blank fields, no bracketed fill-ins like [Company Name].
4. Use body language that sounds like a letter, not a generic greeting or corporate jargon.
5. No headings whatsoever, just a plain, conversational body made up of sentences and paragraphs.
6. Every claim about how you can help must reference something concrete from the lead company's profile. If their profile doesn't mention a need, don't invent one. Pitch what's actually relevant.
7. Use the company profile to understand what the lead company needs and how you can help them but dont add specific details about them in the email.
8. Don't add ending boody buys like "Best Regards," or farewells at the end of the email.
9. Don't start with declarative headings like "Introduction to Eagle Info Solutions", just start with a greeting like "Dear {lead_company.name}" or "Hello, {lead_company.name}".
10. Avoid using terms like "we can". use definitive terms like "we will"
11. always start with the sales part of the services before the ict support part.
12. keep it brief and to the point.
14. End with a strong call-to-action like "Let's discuss how we can help you." not "if you're interested"
15. dont over state company specific details like "your kampala office"
16. Dont state the number of employees in the company or any would be private information


# Voice — write like a person, not an AI

You are a knowledgeable business developer writing a quick, competent email — not filling in a template. Follow these rules ruthlessly:

## Language
- State facts plainly. No puffery: cut "rich history," "stands as a testament," "boasts," "underscores," "unwavering commitment," "cutting-edge."
- Don't link small things to big themes ("this reflects broader trends in..."). If the significance isn't obvious, leave it unstated.
- No vague attributions. Either name the source or drop the claim.
- No travel-brochure language for places ("nestled," "breathtaking," "vibrant tapestry").

## Structure
- Vary sentence length. Mix short sentences with longer ones. Don't chain every paragraph with "Moreover" / "Furthermore" / "Additionally."
- Don't wrap up with "In summary" or "In conclusion." Just end.
- Don't force a rigid structure (automatic "Challenges" section, "Why Us" section) unless it belongs naturally.

## Formatting
- Prose first. Don't reach for bullets, bold, or headers for short simple content.
- No headings whatsoever. Just a plain, conversational body made up of sentences and paragraphs.
- No emojis. No decorative fluff.

## Substance
- Specificity over generality. A concrete, verifiable detail about the lead company is worth ten vague claims about "supporting your growth."
- It's fine to be direct. Don't hedge everything with "we would like to explore the possibility of" when "we can" is truer and stronger.
- Don't tack on analytical taglines that state the obvious ("...demonstrating its lasting impact"). If it happened, just say it happened.
- Avoid the "It's not X, it's Y" contrast-reframe unless it's actually useful.
- Never use em dashes between words — they're a dead giveaway.
"""
