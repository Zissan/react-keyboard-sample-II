import React from "react";

const CodilityTest = props => {
  function solution(A) {
    let sortedArray = A.sort(),
      length = sortedArray.length,
      firstItem = sortedArray[0],
      lastItem = sortedArray[length - 1],
      missingItems = [];

    if (lastItem <= 0) return 1;
    let uniqueItems = [];
    let removedDuplicateItems = new Set(sortedArray.sort());
    for (const iterator of removedDuplicateItems.values()) {
      if (missingItems.length > 0) break;
      if (iterator === firstItem) {
        uniqueItems.push(iterator);
      } else {
        missingItems.push(firstItem);
      }
      firstItem++;
      console.log("test");
    }
    if (!missingItems.length) return lastItem + 1;

    return missingItems[0];
  }

  /**
   * NUMBER REDUCER - counts the step required to reduce the given number to zero
   * **************************************
   * It follows two rules:
   * Divide the number by two if it is an even number
   * Substract it by 1 if it is an odd number
   * ****************************************
   * @param {*} S : String of binary number
   * @output : The count of the steps required to reduce the number
   * @usage : solutionTwo("011100") => 7
   */
  function solutionTwo(S) {
    let num = parseInt(S, 2),
      steps = 0;
    if (num === 0) return 0;
    if (num === 1) return 1;
    if (num === 2) return 2;
    while (num !== 0) {
      if (num % 2 === 0) {
        num = num / 2;
      } else {
        num = num - 1;
      }
      steps++;
    }

    return steps;
  }

  /**
   * OERATIONS INTERPRETER
   * **************************************************************************************************************
   * DUP: Duplicate
   * POP: Poping an item from the machine stack memory
   * 13, 4, 5: Are the items pushed to the machine stack memory
   * "+, -"": Are operations to performed.
   * "+": Two top most items to be popped out and there sum has to be pushed to the machine stack memory
   * "-": Two top most items to be popped out and then substract second top most item from the first top most item.
   * @param {*} S : String of commands, like, "13 DUP 4 POP 5 DUP + DUP + -"
   * @output : The top most item of the stack. If an exception is thrown, the output is -1.
   * @usage : solutionThird("13 DUP 4 POP 5 DUP + DUP + -") => 7, solutionThird("5 6 + -") => -1, solutionThird("3 DUP 5 - -") => -1
   */
  function solutionThird(S) {
    const commands = S.split(" ");

    if (!commands.length) return -1;

    let machineStack = [];
    const sum = (num1, num2) => {
      return parseInt(num1) + parseInt(num2);
    };
    const substract = (num1, num2) => {
      return parseInt(num2) - parseInt(num1);
    };
    const commandDictionary = {
      DUP: arr => {
        const lastItem = arr[arr.length - 1];
        arr.push(lastItem);
      },
      POP: arr => {
        arr.pop();
      },
      "+": arr => {
        const temp = arr.splice(-2);
        if (temp.length < 2) throw Error("No operands found");
        arr.push(sum(...temp));
      },
      "-": arr => {
        const temp = arr.splice(-2);
        if (temp.length < 2) throw Error("No operands found");
        const result = substract(...temp);
        if (result < 0) {
          throw Error("yielded negative result from substraction");
        }
        arr.push(result);
      },
      PUSH: (arr, item) => {
        arr.push(item);
      }
    };

    try {
      for (const command of commands) {
        let action = commandDictionary[command];
        if (action) {
          action(machineStack);
        } else {
          commandDictionary["PUSH"](machineStack, command);
        }
      }

      return machineStack[machineStack.length - 1];
    } catch (error) {
      return -1;
    }
  }

  return (
    <>
      <h1>Codility Coding Test Solution</h1>
      <h2>Solution</h2>
      <h3>
        <span>solution([1,2,3]) =></span>
        {solution([1, 2, 3])}
      </h3>
      <h3>
        <span>solution([-4,-2]) =></span>
        {solution([-4, -2])}
      </h3>
      <h3>
        <span>solution([1,2,3, 1, 5, 6]) =></span>
        {solution([1, 2, 3, 1, 5, 6])}
      </h3>
      <br />
      <h2>Solution Two</h2>
      <h3>
        <span>solutionTwo("011100") =></span>
        {solutionTwo("011100")}
      </h3>
      <br />
      <h2>Solution Three</h2>
      <h3>
        <span>solutionThird("13 DUP 4 POP 5 DUP + DUP + -") =></span>
        {solutionThird("13 DUP 4 POP 5 DUP + DUP + -")}
      </h3>
      <h3>
        <span>solutionThird("3 DUP 5 - -") =></span>
        {solutionThird("3 DUP 5 - -")}
      </h3>
    </>
  );
};

export default CodilityTest;
