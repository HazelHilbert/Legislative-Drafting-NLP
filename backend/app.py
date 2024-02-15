from flask import Flask
import APITools
from free_nlp_api_on_example import callOpenAI

app = Flask(__name__)

my_key = "480c76cff050a40771e1190b3cab219d"

@app.route("/")
def hello_world():
    return "Hello World"

@app.route("/billText/<bill_id>")
def getText(bill_id):
    return APITools.getTextFromID(str(bill_id))


@app.route("/billText/<stateName>")
def getState(stateName):
    return pullState(stateName)

@app.route("/summariseText/<text>")
def getSummariseText(text):
    return callOpenAI("summary", "HB0234a -1- HB 234\n New Text Underlined [DELETED TEXT BRACKETED]\n33-LS1044\\B\n HOUSE BILL NO. 234\nIN THE LEGISLATURE OF THE STATE OF ALASKA\nTHIRTY-THIRD LEGISLATURE - SECOND SESSION\nBY REPRESENTATIVE MCCORMICK\nIntroduced: 1/8/24\nReferred: Prefiled\nA BILL\nFOR AN ACT ENTITLED\n1 \"An Act relating to police officer training; establishing the Missing and Murdered\n2 Indigenous Persons Review Commission; relating to missing and murdered indigenous\n3 persons; relating to the duties of the Department of Public Safety; and providing for an\n4 effective date.\"\n5 BE IT ENACTED BY THE LEGISLATURE OF THE STATE OF ALASKA:\n6 * Section 1. AS 18.65.240(a) is amended to read:\n7 (a) A person may not be appointed as a police officer, except on a\n8 probationary basis, unless the person (1) has satisfactorily completed a basic program\n9 of police training approved by the council, which includes at least 12 hours of\n10 instruction regarding domestic violence and at least 12 hours of instruction regarding\n11 sexual assault, as those terms are defined in AS 18.66.990, [AND] (2) possesses other\n12 qualifications the council has established for the employment of police officers,\n13 including minimum age, education, physical and mental standards, citizenship, moral\n14 character, and experience, and (3) has completed cultural training supervised by \n 33-LS1044\\B\nHB 234 -2- HB0234a\n New Text Underlined [DELETED TEXT BRACKETED]\n1 an indigenous coordinator or indigenous entity in the state that is related to\n2 addressing the rates of missing and murdered indigenous persons. The council\n3 shall prescribe the means of presenting evidence of fulfillment of these requirements.\n4 * Sec. 2. AS 44.41 is amended by adding a new section to read:\n5 Sec. 44.41.023. Investigators for missing and murdered indigenous\n6 persons. The Department of Public Safety shall employ at least two persons in the\n7 department to investigate cases involving missing and murdered indigenous persons\n8 and act as liaisons between law enforcement agencies, communities in the state, and\n9 federally recognized tribes.\n10 * Sec. 3. The uncodified law of the State of Alaska is amended by adding a new section to\n11 read:\n12 MISSING AND MURDERED INDIGENOUS PERSONS REVIEW COMMISSION.\n13 (a) The Missing and Murdered Indigenous Persons Review Commission is established in the\n14 Department of Public Safety.\n15 (b) The commission consists of nine members, including\n16 (1) the commissioner of public safety, or the commissioner's designee;\n17 (2) the commissioner of family and community services, or the\n18 commissioner's designee;\n19 (3) one member from a municipal police department, appointed by the\n20 governor;\n21 (4) one member who is a village public safety officer, village public officer, or\n22 tribal police officer, appointed by the governor;\n23 (5) one member from a victim advocacy organization or similar service\n24 provider, appointed by the governor;\n25 (6) one member from an Alaska Native tribal organization or entity, appointed\n26 by the governor;\n27 (7) two members from the legislature, serving as ex officio nonvoting\n28 members, one of whom shall be appointed by the president of the senate and one of whom\n29 shall be appointed by the speaker of the house of representatives; and\n30 (8) one member who is a prosecutor with prosecutorial experience in homicide\n31 cases, appointed by the attorney general. \n 33-LS1044\\B\nHB0234a -3- HB 234\n New Text Underlined [DELETED TEXT BRACKETED]\n1 (c) Vacancies on the commission shall be filled in the same manner as original\n2 appointment.\n3 (d) The commissioner of public safety or the commissioner's designee is the chair of\n4 the commission.\n5 (e) Members of the commission receive no compensation but are entitled to per diem\n6 and travel expenses authorized for boards and commissions under AS 39.20.180.\n7 (f) The commission shall review unresolved cases involving missing and murdered\n8 indigenous persons from different state regions that are identified by the Department of Public\n9 Safety to\n10 (1) examine the trends and patterns related to missing and murdered\n11 indigenous persons; and\n12 (2) make policy, practice, and service recommendations to encourage\n13 collaboration and reduce cases involving indigenous persons.\n14 (g) The commission shall prepare a report of its findings and recommendations. Not\n15 later than January 1, 2027, the commission shall submit the report to the senate secretary and\n16 chief clerk of the house of representatives and notify the legislature that the report is\n17 available. The commission shall make the report publicly available through the Department of\n18 Public Safety.\n19 (h) A person attending a meeting of the commission or a member or staff of the\n20 commission may not disclose information obtained during the review of a case by the\n21 commission.\n22 (i) Documents, materials, and reports obtained or compiled by the commission or a\n23 designated representative of the commission in the course of reviewing a case involving a\n24 missing or murdered indigenous person under this section are confidential and are not public\n25 records under AS 40.25.110 - 40.25.125 or admissible in a criminal or civil proceeding. A\n26 person may not be compelled to disclose information relating to the documents, materials, and\n27 reports through subpoena, discovery, or testimony in a criminal or civil proceeding.\n28 (j) A member of the commission who knowingly uses documents, materials, reports,\n29 or information for a purpose not authorized under (f) or (g) of this section or discloses\n30 information in violation of this section is subject to a civil penalty of not more than $500 for\n31 each instance of unauthorized use or disclosure. \n 33-LS1044\\B\nHB 234 -4- HB0234a\n New Text Underlined [DELETED TEXT BRACKETED]\n1 (k) Meetings of the commission are closed to the public and not subject to the\n2 provisions of AS 44.62.310 - 44.62.319 (Open Meetings Act). Meetings shall take place not\n3 less than four times each calendar year, at least one of which shall take place in person.\n4 (l) The Department of Public Safety shall confer with the commission to establish\n5 standardized methods for investigating missing person reports, including for investigating\n6 missing persons reports and data collection for cases involving missing indigenous persons.\n7 (m) In this section, \"commission\" means the Missing and Murdered Indigenous\n8 Persons Review Commission.\n9 * Sec. 4. The uncodified law of the State of Alaska is amended by adding a new section to\n10 read:\n11 REPORT ON INVESTIGATIVE RESOURCES. The Department of Public Safety\n12 shall conduct a needs assessment to determine how to increase protective and investigative\n13 resources for identifying and reporting cases of missing and murdered indigenous persons\n14 within the state criminal justice system. The department shall work with the governor's office\n15 to convene meetings with tribal and local law enforcement agencies, federally recognized\n16 tribes, and Alaska Native organizations to determine the scope of the issue, identify barriers,\n17 and determine methods for creating partnerships to increase reporting and investigation of\n18 cases involving missing and murdered indigenous persons. The department shall conduct its\n19 work with tribal entities based on the state's government-to-government relationship with\n20 federally recognized tribes in the state. The department shall also work with federal law\n21 enforcement agencies to identify ways to increase information sharing and coordinate\n22 resources. Not later than January 1, 2026, the department shall submit a written report on the\n23 needs assessment to the senate secretary and chief clerk of the house of representatives and\n24 notify the legislature that the report is available.\n25 * Sec. 5. The uncodified law of the State of Alaska is amended by adding a new section to\n26 read:\n27 TRANSITION: TRAINING. Notwithstanding the requirements of AS 18.65.240(a), as\n28 amended by sec. 1 of this Act, a person holding a certificate issued under AS 18.65.240 on or\n29 before the effective date of sec. 1 of this Act has two years from the effective date of sec. 1 of\n30 this Act to comply with the requirements of AS 18.65.240(a), as amended by sec. 1 of this\n31 Act. \n 33-LS1044\\B\nHB0234a -5- HB 234\n New Text Underlined [DELETED TEXT BRACKETED]\n1 * Sec. 6. Section 4 of this Act is repealed January 1, 2026.\n2 * Sec. 7. Section 3 of this Act is repealed January 1, 2027.\n3 * Sec. 8. This Act takes effect January 1, 2025.")