# take in string
# return substrings matching regex
import re

pennsylvania_string = "The Pennsylvania Supreme Court, in the case of Diehl v. Rodgers, 169 Pa. 316, 322, 32 Atl. 424 *618(1895), adopted the view of a pardon which ascribed to it both effects."

pennsylvania_cases = re.compile(r"(([1-9][0-9][0-9]|[1-9][0-9]|[1-9]) (Pa\.? ?(Super\.?|Superior)( ?Ct\.?)?|Pa\.? ?(Commw\.?|Commonwealth)( ?Ct\.?)?|Pa\.?) [0-9]+)", re.IGNORECASE)

pennsylvania_matches = pennsylvania_cases.findall(pennsylvania_string)
#print(pennsylvania_matches)
# [('169 Pa. 316', '169', 'Pa.', '', '', '', '')]


# us_code = re.compile(r"[0-9]+ (Ark\.? ?App\.?|Ark\.?) [0-9]+", re.IGNORECASE)
# us_code_string = "the voluntariness of a custodial confession, any conflict in the testimony of the witnesses is for the trial court, as factfinder, to resolve. State v. Graham, 277 Ark. 465, 642 S.W.2d 880 (1982). "
# us_code_matches = us_code.findall(us_code_string)
# print(us_code_matches)