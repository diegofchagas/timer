import { useContext,useEffect } from "react";
import { CountdownContainer,Separator } from "./style";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export const CountDown = () => {
  const {activeTaskId,activeCycleId,markCurrentCycleAsFinished,amountSecondsPassed,setSecondsPassed } = useContext(CyclesContext);
  

  const totalSeconds = activeTaskId ? activeTaskId.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeTaskId) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeTaskId.startDate
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycleId, activeTaskId, totalSeconds,markCurrentCycleAsFinished,setSecondsPassed]);

  const currentSeconds = activeTaskId ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = minutesAmount.toString().padStart(2, "0");
  const seconds = secondsAmount.toString().padStart(2, "0");

  useEffect(() => {
    if (activeTaskId) {
      document.title = `${minutes} ${seconds}`;
    }
  }, [minutes, seconds, activeTaskId]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
};
