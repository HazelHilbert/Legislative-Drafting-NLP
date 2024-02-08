# NOTE: Ensure you've got your OpenAI key in your env variables
# If on Windows setx OPENAI_API_KEY "your-api-key-here"
# If on macOS export OPENAI_API_KEY='your-api-key-here'
# I assume you use export on Linux too but the OpenAI docs don't specify this.

from openai import OpenAI
client = OpenAI()

# This var will be pulled from the json parser
citation_string = "The Pennsylvania Supreme Court, in the case of Diehl v. Rodgers, 169 Pa. 316, 322, 32 Atl. 424 *618(1895), adopted the view of a pardon which ascribed to it both effects."

# You can choose to have ChatGPT return the citation(s) as a string or as json
prompt_for_string = "Return ONLY the citation(s) from this string: "
prompt_for_json = "Return ONLY the citation(s) from this string as json: "

#test_prompt = "Existing law requires the governing body of a school district, county office of education, or charter school to confirm that a grade 12 pupil who has not opted out, as specified, completes and submits a Free Application for Federal Student Aid or, if the pupil is exempt from paying nonresident tuition under existing law, completes and submits a form for purposes of the California Dream Act, as provided. Existing law requires the governing board or body of the local educational agency to ensure that the local educational agency directs each high school pupil and, if applicable, the pupil’s parent or legal guardian to any support and assistance services necessary to comply with those requirements to complete and submit those applications that may be available through outreach programs, as provided.\nThis bill would make a nonsubstantive change to the latter provision.\nDIGEST KEY\nVote: majority   Appropriation: no   Fiscal Committee: no   Local Program: no  \nBILL TEXT\nTHE PEOPLE OF THE STATE OF CALIFORNIA DO ENACT AS FOLLOWS:\n\nSECTION 1. Section 51225.7 of the Education Code is amended to read:\n51225.7. (a) For purposes of this section, the following definitions apply:\n(1) “Local educational agency” means a school district, county office of education, or charter school.\n(2) “Opt-out form” means a form developed by the Student Aid Commission that permits parents, legal guardians, a legally emancipated pupil, a pupil who is 18 years of age or older, or a local educational agency on a pupil’s behalf to not fill out a Free Application for Federal Student Aid or California Dream Act Application for any reason.\n(3) “Outreach program” means a nonprofit entity that is exempt from taxation pursuant to Section 501(c)(3) of the United States Internal Revenue Code or a public entity with experience in either or both of the following:\n(A) Assisting pupils with financial aid application completion.\n(B) Serving pupils who are eligible to submit a California Dream Act Application.\n(4) “Pupil” means a pupil in grade 12 attending a high school maintained by a local educational agency.\n(b) Commencing with the 2022–23 school year, except as provided in subdivisions (c) and (d), the governing body of a local educational agency shall confirm that a pupil complies with at least one of the following:\n(1) The pupil completes and submits to the United States Department of Education a Free Application for Federal Student Aid.\n(2) If the pupil is exempt from paying nonresident tuition pursuant to Section 68130.5, the pupil completes and submits to the Student Aid Commission a form established pursuant to Section 69508.5 for purposes of the California Dream Act.\n(c) The parent or legal guardian of the pupil, or the pupil if the pupil is a legally emancipated minor or 18 years of age or older, may opt out of the requirements of this section by filling out and submitting an opt-out form to the local educational agency. The Student Aid Commission shall make the opt-out form available to all local educational agencies pursuant to subdivision (h).\n(d) If the local educational agency determines that a pupil is unable to complete a requirement of this section, the local educational agency shall exempt the pupil or, if applicable, the pupil’s parent or legal guardian from completing and submitting a Free Application for Federal Student Aid, a form established pursuant to Section 69508.5 for purposes of the California Dream Act, or an opt-out form pursuant to subdivision (c). If the local educational agency exempts the pupil from having to complete the requirements of this section, the local educational agency shall complete and submit an opt-out form on the pupil’s behalf.\n(e) The governing board or body of the local educational agency shall ensure both of the following:\n(1) The local educational agency directs each high school pupil and, if applicable, the pupil’s parent or legal guardian to any support and assistance services necessary to comply with the requirement described in subdivision (b) that may be available through outreach programs, including, but not limited to, those programs operated by the Student Aid Commission, postsecondary immigration resource centers, college readiness organizations, postsecondary immigration resource centers, community-based organizations, and legal resource organizations.\n(2) Information shared by parents, legal guardians, and pupils under this section is handled in compliance with the federal Family Educational Rights and Privacy Act of 2001 (20 U.S.C. Sec. 1232g) and applicable state laws, including Chapters 493 and 495 of the Statutes of 2017, regardless of any person’s immigration status or other personal information, in order to protect all pupil and parent data to the fullest extent possible so that schools and all personal data remain safe.\n"

return_type = input("Return [S]tring or [j]son? ")
if (return_type.lower() == "j"):
    prompt = prompt_for_json
else:
    prompt = prompt_for_string


completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": prompt+citation_string}
  ]
)

print(completion.choices[0].message.content)


# summary
# 