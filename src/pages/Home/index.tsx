import { HandPalm, Play } from "@phosphor-icons/react";
import { HomeContainer, StartButton, StopButton } from "./styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";


interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeTaskId: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds:number)=> void
}

export const CyclesContext = createContext({} as CyclesContextType);

// como estou utilizando o zod para validação não precisar criar uma interface para validar os tipos que estou recenbendo com a ajuda do zod eu posso inferir os dados , no caso essa inferencia vira minha iterface assim utilizando tudo que a biblioteca nós proporcionar para a validação dos dados.
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe o nome da tarefa"),
  minutesAmount: zod.number().min(1).max(60),
});

//"Sempre que utilizamos variaves javascript no typescript precisamos informa ao typescript o tipo da mesma para não haver erros de identificação de tipo de variável, por isso uso de typeof".
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm   = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm

  const activeTaskId = cycles.find((task) => task.id === activeCycleId);

  const setSecondsPassed = (seconds:number) => {
    setAmountSecondsPassed(seconds)
  }

  const markCurrentCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  };

  const handleCreateNewCicle = (data: NewCycleFormData) => {
    const newCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);

    //Esse reset restarta meus dados para o valor default dos inputs.
    reset();
  };

  const handleInterruptCycle = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  };

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
      <CyclesContext.Provider
        value={{ activeTaskId, activeCycleId, markCurrentCycleAsFinished,amountSecondsPassed,setSecondsPassed }}
      >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />
      </CyclesContext.Provider>
        {activeTaskId ? (
          <StopButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopButton>
        ) : (
          <StartButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartButton>
        )}
      </form>
    </HomeContainer>
  );
};
