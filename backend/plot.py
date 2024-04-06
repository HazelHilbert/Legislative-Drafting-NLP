import matplotlib.pyplot as plt
import ast


file2 = open("performance.txt", "r")
scores = ast.literal_eval(file2.readline().strip())


# scores1 = [70, 40, 30, 40, 12]
# scores2 = [100, 90, 95, 88, 91]

scores1 = list(scores[0])
scores2 = list(scores[1])

citations = [1, 2, 3, 4, 5, 6, 7]

plt.plot(citations, scores1)
plt.plot(citations, scores2)
plt.title("Performance of prompts")
plt.legend(["prompt1", "prompt2"])
plt.xlabel("Fulltext number")
plt.ylabel("% of citations identified")
plt.show()