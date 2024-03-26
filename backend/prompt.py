# If on Windows setx OPENAI_API_KEY "your-api-key-here"
# If on macOS export OPENAI_API_KEY='your-api-key-here'

from free_nlp_api_on_example import call_open_ai


prompt_number = input("Prompt number: ")

# Choose what prompt you want
def get_prompt(type):
    match type:
        case "1":
            "Return ONLY the citation(s) from this string as json: "
        case "2":
            return "Return ONLY the citation(s) from this string: "
        case "3":
            return "Return ONLY the legal citations from this string. If no citations exist, return no characters"
       
input_text = ["Per Curiam. Appellant Carolyn Fleming has filed amotion for rule on the clerk. The judgment of conviction was filed on June 16 2003. A notice of appeal was filed prior to the date of judgment; however it is treated as if it was filed the day after the judgment was entered. See Ark. R. App. P. — Civ. 4(a). The record on appeal was thus due to be filed on September 15 2003 but it was not tendered until September 18. Her attorney Mark F. Hampton admits responsibility for tendering the record late. We find that such error admittedly made by .the attorney for a criminal defendant is good cause to grant the motion. See Williams v. State 351 Ark. 214 89 S.W.3d 933 (2002) (per curiam); Jackson v. State 351 Ark. 212 89 S.W.3d 930 (2002) (per curiam): The motion for rule on the clerk is therefore granted. A copy of this opinion will be forwarded to the Committee on Professional Conduct. See In Re: Belated Appeals in Criminal Cases 265 Ark. 964 (1979) (per curiam). It is so ordered.", "Per Curiam. In 1997 Kingrale Collins was found guilty by a jury of capital murder and sentenced to death. We affirmed. Collins v. State 338 Ark. 1 991 S.W.2d 541 (1999). Now before us is a motion filed by attorney Chris A. Tarver who asks to be relieved as counsel for Collins and for other counsel to be appointed to represent him. Although Tarver states that Collins is at a “critical stage of his appeal” no record of any proceeding in circuit court accompanied the motion and there is no proceeding currently pending in this court. So that it can be ascertained whether this court has jurisdiction to relieve counsel and appoint counsel at this juncture we direct that Tarver file an amended motion clarifying the status of Mr. Collins’s criminal case. If this court’s jurisdiction is based on a proceeding in circuit court at least a certified partial record of that court’s proceedings should accompany the amended motion. Amended motion requested.", "Per Curiam. Appellant Timothy Moses by his attorney Richard H. Young has filed a motion for rule on the clerk. His attorney “excepts full responsibility for the late filing.” We assume he means he “accepts” responsibility for the error. We find that such error admittedly made by the attorney for a criminal defendant is good cause to grant the motion. See per curiam order dated February 5 1979. In re: Belated Appeals in Criminal Cases 265 Ark. 964; Terry v. State 272 Ark. 243 613 S.W.2d 90 (1981). A copy of this opinion will be forwarded to the Committee on Professional Conduct.", "Cockrill C. J. The indictment is good under the decisions of Dilling v. State and Felker v. State 54 Ark. 492-3. Robinson v. State 5 Ark. 659. The cause will be remanded with instructions to sentence the prisoner. It is so ordered. An oral and unreported decision.—[Rep.", "Robert L. Brown Justice. The State of Arkansas petitions this court for rehearing for the sole purpose of changing the disposition of the case from reversed and dismissed to reversed and remanded. We conclude that the State is correct in this regard and that the proper disposition of the case when evidence has been excluded on appeal due to trial error is a reversal and remand for the possibility of a new trial. See Nard v. State 304 Ark. 159 163-A 801 S.W.2d 634 637 (1991) (supplemental opinion). Accordingly we reverse and remand this case."]
citations = ["351 Ark. 212, 89 S.W.3d 930, 351 Ark. 214, 89 S.W.3d 933", "991 S.W.2d 541, 338 Ark. 1", "613 S.W.2d 90, 272 Ark. 243", "5 Ark. 659", "304 Ark. 159, 801 S.W.2d 634"]


responses = [] # should be identical to citations
scores = [0, 0, 0]

# populate responses with all of ChatGPT's responses with a given prompt
for i in range(2):
    responses.append(call_open_ai(get_prompt(str(prompt_number)), input_text[i]))




    current_citations = citations[i].split(",")
    for j in range(len(current_citations)):
        if (current_citations[j] in responses[i]):
            scores[i]+=1

    scores[i] /= len(current_citations)
    scores[i] *=100


print("Scores as %:")
print(scores)

print("responses:")
print(responses)

# Try different prompts with different texts
# evaluate 

file = open("performances", "w")
file.write(scores)