import { HandPalm, Play } from "@phosphor-icons/react";
import { HomeContainer, StartButton, StopButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";



// como estou utilizando o zod para validação não precisar criar uma interface para validar os tipos que estou recenbendo com a ajuda do zod eu posso inferir os dados , no caso essa inferencia vira minha iterface assim utilizando tudo que a biblioteca nós proporcionar para a validação dos dados.
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe o nome da tarefa"),
  minutesAmount: zod.number().min(1).max(60),
});

//"Sempre que utilizamos variaves javascript no typescript precisamos informa ao typescript o tipo da mesma para não haver erros de identificação de tipo de variável, por isso uso de typeof".
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = () => {

  const {createNewCicle, interruptCurrentCycle, activeTaskId} = useContext(CyclesContext)

  const newCycleForm   = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, } = newCycleForm



  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCicle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />
  
        {activeTaskId ? (
          <StopButton onClick={interruptCurrentCycle} type="button">
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
