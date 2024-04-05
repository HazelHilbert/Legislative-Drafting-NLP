# If on Windows setx OPENAI_API_KEY "your-api-key-here"
# If on macOS export OPENAI_API_KEY='your-api-key-here'

from free_nlp_api_on_example import call_open_ai

prompt_number = []
prompt_number.append(input("Prompt number 1: "))
prompt_number.append(input("Prompt number 2: "))



# # Choose what prompt you want
def get_prompt(type):
    match type:
        case "1":
            "summary"
        case "2":
            return "citationJSON"
        case "3":
            return "citationString"
        case "4":
            return "citationLong"
        case "5":
            return "citationShort"
        case "6":
            return "citationMean"



input_text = ["Per Curiam. Appellant Carolyn Fleming has filed amotion for rule on the clerk. The judgment of conviction was filed on June 16 2003. A notice of appeal was filed prior to the date of judgment; however it is treated as if it was filed the day after the judgment was entered. See Ark. R. App. P. — Civ. 4(a). The record on appeal was thus due to be filed on September 15 2003 but it was not tendered until September 18. Her attorney Mark F. Hampton admits responsibility for tendering the record late. We find that such error admittedly made by .the attorney for a criminal defendant is good cause to grant the motion. See Williams v. State 351 Ark. 214 89 S.W.3d 933 (2002) (per curiam); Jackson v. State 351 Ark. 212 89 S.W.3d 930 (2002) (per curiam): The motion for rule on the clerk is therefore granted. A copy of this opinion will be forwarded to the Committee on Professional Conduct. See In Re: Belated Appeals in Criminal Cases 265 Ark. 964 (1979) (per curiam). It is so ordered.", "Per Curiam. In 1997 Kingrale Collins was found guilty by a jury of capital murder and sentenced to death. We affirmed. Collins v. State 338 Ark. 1 991 S.W.2d 541 (1999). Now before us is a motion filed by attorney Chris A. Tarver who asks to be relieved as counsel for Collins and for other counsel to be appointed to represent him. Although Tarver states that Collins is at a “critical stage of his appeal” no record of any proceeding in circuit court accompanied the motion and there is no proceeding currently pending in this court. So that it can be ascertained whether this court has jurisdiction to relieve counsel and appoint counsel at this juncture we direct that Tarver file an amended motion clarifying the status of Mr. Collins’s criminal case. If this court’s jurisdiction is based on a proceeding in circuit court at least a certified partial record of that court’s proceedings should accompany the amended motion. Amended motion requested.", "Per Curiam. Appellant Timothy Moses by his attorney Richard H. Young has filed a motion for rule on the clerk. His attorney “excepts full responsibility for the late filing.” We assume he means he “accepts” responsibility for the error. We find that such error admittedly made by the attorney for a criminal defendant is good cause to grant the motion. See per curiam order dated February 5 1979. In re: Belated Appeals in Criminal Cases 265 Ark. 964; Terry v. State 272 Ark. 243 613 S.W.2d 90 (1981). A copy of this opinion will be forwarded to the Committee on Professional Conduct.", "Cockrill C. J. The indictment is good under the decisions of Dilling v. State and Felker v. State 54 Ark. 492-3. Robinson v. State 5 Ark. 659. The cause will be remanded with instructions to sentence the prisoner. It is so ordered. An oral and unreported decision.—[Rep.", "Robert L. Brown Justice. The State of Arkansas petitions this court for rehearing for the sole purpose of changing the disposition of the case from reversed and dismissed to reversed and remanded. We conclude that the State is correct in this regard and that the proper disposition of the case when evidence has been excluded on appeal due to trial error is a reversal and remand for the possibility of a new trial. See Nard v. State 304 Ark. 159 163-A 801 S.W.2d 634 637 (1991) (supplemental opinion). Accordingly we reverse and remand this case.", "Hemingway J. It is well settled by the decisions of this court that there can be no recovery against a county for services in caring for or burying a poor person residing therein unless such person has been declared a pauper by the county court of the county prior to the performance of the services. Brem v. Ark. Co. Court 9 Ark. 240; Lee Co. v. Lackie 30 Ark. 764; Cantrell v. Clark Co. 47 Ark. 239; Clark Co. v. Huie 49 Ark. 145. It follows that the court below properly held that the appellant could not maintain this suit against Pulaski county. Whether he could maintain such a suit against the city of Little Rock is a question not involved in the case which we for that reason have not considered and could not decide. Affirm.", "Wood J. (after stating the facts). It is not negligence “per se ” to jump from a moving train. But where one compos mentis under no circumstances of emergency or constraint takes “a leap in the dark” from a train moving at the rate shown in this case his conduct is reckless and foolhardy. St. Louis etc. R. Co. v. Rosenberry 45 Ark. 256 ; Catlett v. Railway Company 57 Ark. 461. The learned circuit judge upon appellee’s own statement and the undisputed facts might very properly have directed a verdict for appellant. Reversed and dismissed.", ". 'Wood J. (after stating the facts). Every litigant has the right of appeal from an adverse judgment no matter how small the amount thereof may be. Constitution-of Arkansas art. 7 § 42; Kirby’s Digest § 4665; Chicago R. I. & P. Ry. Co. v. Langley 78 Ark. 207; see also Brown v. Higgins 45 Ark. 456; Townsend v. Timmons 44 Ark. 482. Reversed and remanded with directions to reinstate the appeal from the justice court.", "Per Curiam. Appellant Robert Lewis by his attorney Sandra Cordi has filed a motion for rule on the clerk. His attorney admits that the record was tendered late due to a mistake on her part. We find that such error admittedly made by the attorney for a criminal defendant is good cause to grant the motion. See Terry v. State 272 Ark. 243 613 S.W.2d 90 (1981); In Re: Belated Appeals in Criminal Cases 295 Ark. 964 (1979)(per curiam). A copy of this per curiam will be forwarded to the Committee on Professional Conduct. In Re: Belated Appeals in Criminal Cases supra."]
citations = ["351 Ark. 212, 89 S.W.3d 930, 351 Ark. 214, 89 S.W.3d 933", "991 S.W.2d 541, 338 Ark. 1", "613 S.W.2d 90, 272 Ark. 243", "5 Ark. 659", "304 Ark. 159, 801 S.W.2d 634", "49 Ark. 145, 30 Ark. 764, 47 Ark. 239, 9 Ark. 240", "57 Ark. 461, 45 Ark. 256", "78 Ark. 207, 45 Ark. 456, 44 Ark. 482","613 S.W.2d 90, 272 Ark. 243"]

responses = [] # should be identical to citations
scores = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]

# populate responses with all of ChatGPT's responses with a given prompt
for k in range(2): # for each prompt we're checking
    for i in range(6): # for each input text
        responses.append(call_open_ai(get_prompt(str(prompt_number[k])), input_text[i]))




        current_citations = citations[i].split(",")
        for j in range(len(current_citations)):
            if (current_citations[j] in responses[i]):
                scores[k][i]+=1

        scores[k][i] /= len(current_citations)
        scores[k][i] *=100

# 20 different bills
# testing-langchain

    print("Scores as %:")
    print(scores)

    # print("responses:")
    print(responses)

# Try different prompts with different texts
# evaluate 

# file1 = open("performance.txt", "w")
# file1.write(str(scores))
# file1.close()

file2 = open("performance.txt", "w")
file2.write(str(scores)) # scores1

file2.close()

# score2
# citations