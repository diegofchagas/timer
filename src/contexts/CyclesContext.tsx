import {
  ReactNode,
  createContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCyclesAsFinishedAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeTaskId: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCicle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CylesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({ children }: CylesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateJSON = localStorage.getItem("@timer-cycles-state");

      if (storedStateJSON) {
        JSON.parse(storedStateJSON);
      }

      return initialState
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeTaskId = cycles.find((task) => task.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    // nesse caso eu observo se tem um task ativa se tiver eu vejo a diferenca entre as duas , conseguindo recuperar o tempo da mesma caso eu precise autalizar a pagina , como estou salvando no localStorage foi necessario fazer essa conversao direto no useState. Retornando assim a diferença em segundos da data atual da data que o projeto foi inicializado

    if (activeTaskId) {
      return differenceInSeconds(new Date(), new Date(activeTaskId.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem("@timer-cycles-state", stateJSON);
    // localStorage.clear();
  }, [cyclesState]);

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCyclesAsFinishedAction());
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
  };

  const createNewCicle = (data: CreateCycleData) => {
    const newCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    //setCycles((state) => [...state, newCycle]);
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  };

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction());
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
    console.log("chamou");
  };

  return (
    <CyclesContext.Provider
      value={{
        activeTaskId,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCicle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
